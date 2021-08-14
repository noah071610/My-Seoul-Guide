import styled from "@emotion/styled";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { checkListStore } from "../../../store/store";
import { SM_SIZE } from "../../../config";

const MapModalComponent = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 620px;
  @media only screen and (max-width: ${SM_SIZE}) {
    width: 90%;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
  }
`;

export const MapModal = observer(() => {
  return (
    <MapModalComponent
      style={
        checkListStore.overlayCnt > 3
          ? { display: "block", animation: "border 2s infinite" }
          : { display: "none" }
      }
      className="modal"
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
        <span>Third</span> Check Activities and Festivals out, and pick your own's like Attractions.
      </h4>
    </MapModalComponent>
  );
});

export default MapModal;
