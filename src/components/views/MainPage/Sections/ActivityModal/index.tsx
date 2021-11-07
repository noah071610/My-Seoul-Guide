import { Divider } from "antd";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { checkListStore, mainStore } from "@store/store";
import { TogoRecommedInter } from "types";
import useSortList from "@hooks/useSortList";
import { ActivityModalWrapper } from "./styles";
import { NO_IMAGE_URL } from "config";
import axios from "axios";
import dataSlicer from "@hooks/useDataSlicer";

export const ActivityModal = observer(() => {
  const [foodRecommends, setFoodRecommends] = useState<Array<any> | null>(null);
  const [shoppingRecommends, setShoppingRecommends] = useState<Array<any> | null>(null);
  const [nearRecommends, setNearRecommends] = useState<Array<any> | null>(null);
  const onClickCard = useCallback((arg: TogoRecommedInter) => {
    //추천 놀거리를 클릭하면 메인페이지의 구글맵에 추천 루트에 반영되게 합니다.
    const form = {
      path: { lat: parseFloat(arg.mapy._text), lng: parseFloat(arg.mapx._text) },
      title: arg.title._text,
      contentid: arg.contentid._text,
    };
    if (mainStore.togoLists.find((togo) => togo.contentid === form.contentid)) {
      mainStore.deleteTogoList(form.contentid);
    } else {
      mainStore.addTogoList(form);
    }
  }, []);
  useEffect(() => {
    if (mainStore.userInfo?.purpose.includes("Food")) {
      axios(
        `https://myseoulguide.herokuapp.com/http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.REACT_APP_TOUR_SERVICE_KEY}&contentTypeId=82&areaCode=1&sigunguCode=&cat1=A05&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=P&numOfRows=12&pageNo=1`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/xml; charset=utf-8",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        setFoodRecommends(dataSlicer(res, 3));
      });
    }
    if (mainStore.userInfo?.purpose.includes("Shopping")) {
      axios(
        `https://myseoulguide.herokuapp.com/http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.REACT_APP_TOUR_SERVICE_KEY}&contentTypeId=79&areaCode=1&sigunguCode=&cat1=A04&cat2=A0401&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/xml; charset=utf-8",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        setShoppingRecommends(dataSlicer(res, 3));
      });
    }
    if (mainStore.place?.stationPath.lng && mainStore.place?.stationPath.lat) {
      axios(
        `https://myseoulguide.herokuapp.com/http://api.visitkorea.or.kr/openapi/service/rest/EngService/locationBasedList?ServiceKey=${process.env.REACT_APP_TOUR_SERVICE_KEY}&contentTypeId=&mapX=${mainStore.place?.stationPath.lng}&mapY=${mainStore.place?.stationPath.lat}&radius=2000&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/xml; charset=utf-8",
          },
          withCredentials: true,
        }
      ).then((res: any) => {
        setNearRecommends(dataSlicer(res, 9));
      });
    }
  }, []);

  return (
    <ActivityModalWrapper
      style={checkListStore.overlayCnt === 1 ? { display: "block" } : { display: "none" }}
      className="modal"
    >
      <h3>
        Hello, {mainStore.userInfo?.gender} ! We found attraction you may like, Click and add list
        to go 🚶
      </h3>
      <ul className="recommend_tags">
        {mainStore.userInfo?.purpose.map((v, i) => (
          <li key={i} className="tag">
            {v}
          </li>
        ))}
      </ul>
      <Divider />
      <div className="recommend_container">
        {nearRecommends &&
          useSortList({
            data: {
              FoodRecommendCards: foodRecommends ? foodRecommends : [],
              ShoppingRecommendCards: shoppingRecommends ? shoppingRecommends : [],
              NearRecommendCards: nearRecommends,
            },
            isKpop: mainStore.userInfo?.purpose.includes("K-pop"),
          })?.map((v: TogoRecommedInter, i: number) => (
            <div key={i} onClick={() => onClickCard(v)} className="recommend_card">
              <img
                className="recommend_img"
                src={v.firstimage?._text || NO_IMAGE_URL}
                alt={v.firstimage?._text || "no_image"}
              />
              <h4>{v.title._text}</h4>
              {mainStore.togoLists.find((togo) => togo.contentid === v.contentid._text) && (
                <img
                  alt="checked"
                  className="recommend_checked"
                  src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"
                />
              )}
            </div>
          ))}
      </div>
      <Divider />
      <div className="recommend_submit">
        <button onClick={() => checkListStore.discountOverlayCnt()} className="btn-underLine">
          Start guide 🛫
        </button>
      </div>
    </ActivityModalWrapper>
  );
});

export default ActivityModal;
