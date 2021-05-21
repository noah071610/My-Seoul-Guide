import styled from "@emotion/styled";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { checkListStore, mainStore } from "../../../../@store/store";
import { SM_SIZE } from "../../../../config";
import PlaceCard from "../ContentSmallBox";

const PlaceModalComponent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 90%;
  height: 550px;
  .placeTags {
    margin: 1rem 0;
    .tag {
      margin: 1rem 0.5rem 1rem 0;
      cursor: default;
    }
  }
  .placeCards {
    width: 100%;
    display: flex;
    span {
      background-color: rgba(0, 0, 0, 0);
      color: black;
      text-decoration: underline;
    }
    .card_title {
      font-size: 1.7rem;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    font-size: 0.8rem;
    width: 95%;
    top: 12%;
    left: 2.5%;
    transform: inherit;
    height: 420px;
    margin: 0;
    .placeTags {
      margin: 0;
    }
    .placeCards {
      span {
        font-size: 1rem;
      }
      .card_title {
        font-size: 1.4rem;
      }
    }
    .crown {
      width: 3rem;
    }
  }
`;

export const PlaceModal = observer(() => {
  return (
    <PlaceModalComponent
      style={checkListStore.overlayCnt === 2 ? { display: "block" } : { display: "none" }}
      className="modal"
    >
      <h3>Here is our Recommendation place to stay for you 😘</h3>
      <ul className="placeTags">
        {mainStore.userInfo?.purpose.concat(mainStore.userInfo?.acm).map((v, i) => (
          <li className="tag" key={i}>
            {v}
          </li>
        ))}
      </ul>
      <Divider />
      <div className="placeCards">
        <PlaceCard isBest={true} place={mainStore.recommend_places[0]} />
        <PlaceCard place={mainStore.recommend_places[1]} />
      </div>
      <Divider />
      <h3>Check Accommodation page and choose one which you like !</h3>
    </PlaceModalComponent>
  );
});

export default PlaceModal;
