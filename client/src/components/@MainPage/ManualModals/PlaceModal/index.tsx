import { Divider } from "antd";
import { observer } from "mobx-react";
import { checkListStore, mainStore } from "../../../../store/store";
import ContentSmallBox from "../../../Common/ContentSmallBox";
import { PlaceModalWrapper } from "./styles";

export const PlaceModal = observer(() => {
  return (
    <PlaceModalWrapper
      style={checkListStore.overlayCnt === 2 ? { display: "block" } : { display: "none" }}
      className="modal"
    >
      <h3 className="recom_for_title">Here is our Recommendation place to stay for you 😘</h3>
      <ul className="placeTags">
        {mainStore.userInfo?.purpose.concat(mainStore.userInfo?.acm).map((v, i) => (
          <li className="tag" key={i}>
            {v}
          </li>
        ))}
      </ul>
      <Divider />
      <div className="placeCards">
        <ContentSmallBox isBest={true} place={mainStore.recommend_places[0]} />
        <ContentSmallBox place={mainStore.recommend_places[1]} />
      </div>
      <Divider />
      <h3 className="recom_choose_title">
        Check Accommodation page and choose one which you like !
      </h3>
    </PlaceModalWrapper>
  );
});

export default PlaceModal;
