/* eslint-disable jsx-a11y/anchor-is-valid */
import { observer } from "mobx-react";
import { useCallback } from "react";
import CountUp from "react-countup";
import { useHistory } from "react-router";
import { mainStore } from "../../../@store/store";
import { PlaceCardInter } from "../../../types";

const PlaceCard = observer(
  ({ place, index, isBest }: { place: PlaceCardInter; index?: number; isBest?: boolean }) => {
    const history = useHistory();
    const onClickPlaceCard = useCallback(
      (listNum?: number) => {
        if (listNum) {
          mainStore.changeDestination(listNum);
        } else {
          mainStore.changePlace(place.id - 1);
          history.push("/stay");
        }
      },
      [history, place.id]
    );

    return (
      <div onClick={() => onClickPlaceCard(index)} className="content_small_box">
        <h2>
          <span>{place.title._text}</span>
          <a>View Route 📍</a>
        </h2>
        <div className="image_wrapper">
          <img
            className="place_img"
            alt="tour_acm_redcommendation_img"
            src={place.firstimage._text}
          />
        </div>
        {place.point > 0 && (
          <h3>
            Get Point : <CountUp duration={5} start={0} end={place.point} />{" "}
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

export default PlaceCard;
