import { observer } from "mobx-react";
import { airportList } from "../../../config";

const AirportCard = observer(({ onClickAirport }: { onClickAirport: (number: number) => void }) => {
  return (
    <div style={{ display: "flex" }}>
      <div onClick={() => onClickAirport(1)} className="article_small_box">
        <h2>
          <span>From {airportList[0]?.name}</span>
        </h2>
        <div className="image_wrapper">
          <img alt="tour_acm_redcommendation_img" src={airportList[0]?.src} />
        </div>
      </div>
      <div onClick={() => onClickAirport(2)} className="article_small_box">
        <h2>
          <span>From {airportList[1]?.name}</span>
        </h2>
        <div className="image_wrapper">
          <img alt="tour_acm_redcommendation_img" src={airportList[1]?.src} />
        </div>
      </div>
    </div>
  );
});

export default AirportCard;
