import { gql, useQuery } from "@apollo/client";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useCallback } from "react";
import { checkListStore, mainStore } from "../../../../@store/store";
import LoadingPage from "../../LoadingPage";
import { TogoRecommedInter } from "../../../../types";
import useSortList from "../../../../hooks/useSortList";
import { NO_IMAGE_URL, SM_SIZE } from "../../../../config";
import styled from "@emotion/styled";

const ActivityModalComponent = styled.div`
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  margin: 0;
  width: 95%;
  height: 95%;
  overflow-y: auto;
  .recommend {
    &_container {
      display: grid;
      grid-template-rows: repeat(3, 32%);
      grid-template-columns: repeat(3, 1fr);
      height: 80%;
      gap: 7px;
    }
    &_tags {
      margin: 0.5rem 0;
      li {
        margin-right: 0.5rem;
      }
    }
    &_card {
      cursor: pointer;
      position: relative;
      transition: 0.4s all;
      &:hover {
        h4 {
          opacity: 1;
        }
        .recommend_img {
          opacity: 0.3;
        }
      }
      .recommend_img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      h4 {
        opacity: 0;
        position: absolute;
        width: 80%;
        font-size: 0.9rem;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &_submit {
      button {
        font-size: 1.2rem;
        font-weight: bold;
        &:hover {
          color: $BLUE_COLOR;
        }
      }
    }
    &_checked {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    top: 10%;
    height: 70%;
    .recommend {
      &_container {
        gap: 4px;
      }
      &_card {
        h4 {
          width: 100%;
          font-size: 0.5rem;
        }
      }
      &_checked {
        width: 30%;
      }
    }
  }
`;

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
    <ActivityModalComponent
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
        <button onClick={() => checkListStore.discountOverlayCnt()} className="underLineBtn">
          Let`s start guide
        </button>
      </div>
    </ActivityModalComponent>
  );
});

export default ActivityModal;
