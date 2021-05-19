import { observer } from "mobx-react";
import { useCallback } from "react";
import CountUp from "react-countup";
import { useHistory } from "react-router";
import { checkListStore, mainStore } from "../../../@store/store";
import { PlaceCardInter } from "../../../types";

const ContentSmallBox = observer(
  ({ place, index, isBest }: { place: PlaceCardInter; index?: number; isBest?: boolean }) => {
    const history = useHistory();
    const onClickPlaceCard = useCallback(
      (listNum?: number) => {
        if (!isNaN(listNum!)) {
          mainStore.changeDestination(listNum!);
        } else {
          mainStore.changePlace(place.id - 1);
          checkListStore.discountOverlayCnt();
          history.push("/stay");
        }
      },
      [history, place.id]
    );

    return (
      <div onClick={() => onClickPlaceCard(index)} className="content_small_box">
        <h2>
          <span className="card_title">{place.title._text}</span>
          <a>View Route 📍</a>
        </h2>
        <div className="image_wrapper">
          <img
            className="place_img"
            alt="tour_acm_redcommendation_img"
            src={place.firstimage._text}
          />
        </div>
        {checkListStore.overlayCnt === 1 && (
          <h3>
            Get Points : <CountUp className="countUp" duration={5} start={0} end={place.point} />{" "}
          </h3>
        )}
        {isBest && (
          <img
            className="crown"
            alt="crown_for_top"
            src="https://img.icons8.com/fluent/70/000000/crown.png"
          />
        )}
      </div>
    );
  }
);

export default ContentSmallBox;
