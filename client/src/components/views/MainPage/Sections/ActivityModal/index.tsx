import { gql, useQuery } from "@apollo/client";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useCallback } from "react";
import { checkListStore, mainStore } from "@store/store";
import LoadingPage from "../../../LoadingPage";
import { TogoRecommedInter } from "types";
import useSortList from "@hooks/useSortList";
import { ActivityModalWrapper } from "./styles";
import { NO_IMAGE_URL } from "config";

const GET_RECOMMEND = gql`
  query ($mapx: Float!, $mapy: Float!, $isShopping: Boolean!, $isFood: Boolean!) {
    FoodRecommendCards(isFood: $isFood) {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
      contentid {
        _text
      }
    }
    ShoppingRecommendCards(isShopping: $isShopping) {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
      contentid {
        _text
      }
    }
    NearRecommendCards(mapx: $mapx, mapy: $mapy) {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
      contentid {
        _text
      }
    }
  }
`;
export const ActivityModal = observer(() => {
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
  const { loading, error, data } = useQuery(GET_RECOMMEND, {
    variables: {
      mapx: mainStore.place?.stationPath.lng,
      mapy: mainStore.place?.stationPath.lat,
      isFood: mainStore.userInfo?.purpose.includes("Food"),
      isShopping: mainStore.userInfo?.purpose.includes("Shopping"),
    },
  });
  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error :(</p>;

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
        {useSortList({ data: data, isKpop: mainStore.userInfo?.purpose.includes("K-pop") })?.map(
          (v: TogoRecommedInter, i: number) => (
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
          )
        )}
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
