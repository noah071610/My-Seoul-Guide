import { gql, useQuery } from "@apollo/client";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useCallback } from "react";
import { checkListStore, mainStore } from "../../../@store/store";
import LoadingPage from "../LoadingPage";
import { TogoRecommedInter } from "../../../types";
import useSortList from "../../../hooks/useSortList";
import { NO_IMAGE_URL } from "../../../config";

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
export const HomeModalTogo = observer(() => {
  const onClickAddCard = useCallback((arg: TogoRecommedInter) => {
    let form = {
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
    <div
      style={checkListStore.overlayCnt === 1 ? { display: "block" } : { display: "none" }}
      className="home_recommend_togo_modal home_modal"
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
        {useSortList(data)?.map((v: TogoRecommedInter, i: number) => (
          <div key={i} onClick={() => onClickAddCard(v)} className="recommend_card">
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
      <div className="recommend_submit_btn">
        <button onClick={() => checkListStore.discountOverlayCnt()} className="underLineBtn">
          Let`s start guide
        </button>
      </div>
    </div>
  );
});

export default HomeModalTogo;
