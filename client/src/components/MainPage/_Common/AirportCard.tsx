import { observer } from "mobx-react";
import { mainStore } from "../../../@store/store";
import { airportList } from "../../../config";

const AirportCard = observer(() => {
  return (
    <div style={{ display: "flex" }}>
      <div onClick={() => mainStore.setAirport(0)} className="content_small_box">
        <h2>
          <span>From {airportList[0]?.name}</span>
        </h2>
        <div className="image_wrapper">
          <img
            className="airport_img"
            alt="tour_acm_redcommendation_img"
            src={airportList[0]?.src}
          />
        </div>
      </div>
      <div onClick={() => mainStore.setAirport(1)} className="content_small_box">
        <h2>
          <span>From {airportList[1]?.name}</span>
        </h2>
        <div className="image_wrapper">
          <img
            className="airport_img"
            alt="tour_acm_redcommendation_img"
            src={airportList[1]?.src}
          />
        </div>
      </div>
    </div>
  );
});

export default AirportCard;
