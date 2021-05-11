import { Divider } from "antd";
import { observer } from "mobx-react";

const HomeModal = observer(({ onOverlay }: { onOverlay: boolean }) => {
  return (
    <>
      <div
        style={onOverlay ? { display: "block" } : { display: "none" }}
        className="home_map_modal home_modal"
      >
        <h3>Let`s start to make Your own Seoul Travel Map!</h3>
        <Divider />
        <h4>
          <span>First</span> Check the Accomodation.
        </h4>
        <h4>
          <span>Second</span> Pick the Recommendation and look around the route from Airport to
          Accomodation.
        </h4>
        <h4>
          <span>Third</span> Check Activities and Festivals out, and pich your own's good
          Attractions.
        </h4>
      </div>
      <div
        style={onOverlay ? { display: "block" } : { display: "none" }}
        className="home_menu_modal home_modal"
      >
        <h3>Menu is simply to use</h3>
        <Divider />
        <h4>
          <span>Home</span> Keep and overview your Collection.
        </h4>
        <h4>
          <span>Accommodation</span>View Recommendation Stay area.
        </h4>
        <h4>
          <span>From Airport</span>Check direction from Airport to Acommodation.
        </h4>
        <h4>
          <span>Activity&Festival</span>Check popular play place in Seoul.
        </h4>
        <h4>
          <span>Analyzer</span>You can manage budget for travel here.
        </h4>
      </div>
    </>
  );
});

export default HomeModal;
