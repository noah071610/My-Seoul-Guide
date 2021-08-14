import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { mainStore } from "../../store/store";
import { airportList } from "../../config";

const AirportCardComponent = styled.article`
  display: flex;
  width: 100%;
  .airport {
    &_card {
      width: 50%;
      padding: 1rem;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        .airport_img {
          transform: scale(1.05);
        }
      }
    }
    &_title {
      font-family: "Kaushan Script", cursive;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    &_img {
      width: 100%;
      height: 175px;
      transition: 0.4s all;
      border-radius: 10px;
      &_wrapper {
        overflow: hidden;
        border-radius: 10px;
      }
    }
  }
`;

const AirportCard = observer(() => {
  return (
    <AirportCardComponent>
      <div className="airport_card" onClick={() => mainStore.setAirport(0)}>
        <h2 className="airport_title">From {airportList[0]?.name}</h2>
        <div className="airport_img_wrapper">
          <img className="airport_img" alt="airport_img1" src={airportList[0]?.src} />
        </div>
      </div>
      <div className="airport_card" onClick={() => mainStore.setAirport(1)}>
        <h2 className="airport_title">From {airportList[1]?.name}</h2>
        <div className="airport_img_wrapper">
          <img className="airport_img" alt="airport_img2" src={airportList[1]?.src} />
        </div>
      </div>
    </AirportCardComponent>
  );
});

export default AirportCard;
