import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { useCallback } from "react";
import CountUp from "react-countup";
import { checkListStore, mainStore } from "../../../@store/store";
import { MD_SIZE, SM_SIZE } from "../../../config";
import { PlaceCardInter } from "../../../types";

export const ContentSmall = styled.div`
  position: relative;
  padding: 1rem;
  transition: 0.4s all;
  width: 100%;
  .cardTitle {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 1.3rem;
    &_text {
      font-family: "Kaushan Script", cursive;
    }
    a:last-child {
      font-size: 0.9rem;
    }
  }
  .get_point {
    margin: 0.8rem 0 0 0;
  }
  .image_wrapper {
    overflow: hidden;
    border-radius: 10px;
    .place_img {
      width: 100%;
      height: 175px;
      transition: 0.4s all;
      border-radius: 10px;
    }
  }
  .crown {
    position: absolute;
    top: 3rem;
    right: -1rem;
    transform: rotate(45deg);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    .place_img {
      transform: scale(1.05);
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    .cardTitle {
      a {
        display: none;
      }
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    padding: 0.5rem;
    .cardTitle {
      margin: 0 0 0.3rem 0;
      &_text {
        font-size: 1.2rem;
      }
    }
    .image_wrapper {
      .place_img,
      .airport_img {
        height: 120px;
      }
    }
  }
`;

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
      <ContentSmall onClick={() => onClickPlaceCard(index)}>
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
      </ContentSmall>
    );
  }
);

export default ContentSmallBox;
