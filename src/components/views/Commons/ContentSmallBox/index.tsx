import { observer } from "mobx-react";
import { useCallback } from "react";
import CountUp from "react-countup";
import { checkListStore, mainStore } from "@store/store";
import { PlaceCardInter } from "types";
import { ContentSmallWrapper } from "./styles";

const ContentSmallBox = observer(
  ({ place, index, isBest }: { place: PlaceCardInter; index?: number; isBest?: boolean }) => {
    const onClickPlaceCard = useCallback(
      (listNum?: number) => {
        if (!isNaN(listNum!)) {
          mainStore.changeDestination(listNum!);
        } else {
          mainStore.changePlace(place.id - 1);
          checkListStore.discountOverlayCnt();
        }
      },
      [place.id]
    );

    return (
      <ContentSmallWrapper onClick={() => onClickPlaceCard(index)}>
        <h2 className="cardTitle">
          <span className="cardTitle_text">{place.title._text}</span>
          <a>View Route 📍</a>
        </h2>
        <div className="image_wrapper">
          <img
            className="place_img"
            alt="tour_acm_redcommendation_img"
            src={place.firstimage._text}
          />
        </div>
        {checkListStore.overlayCnt === 2 && (
          <h3 className="get_point">
            Get Points : <CountUp className="countUp" duration={2} start={0} end={place.point} />{" "}
          </h3>
        )}
        {isBest && (
          <img
            className="crown"
            alt="crown_for_top"
            src="https://img.icons8.com/fluent/70/000000/crown.png"
          />
        )}
      </ContentSmallWrapper>
    );
  }
);

export default ContentSmallBox;
