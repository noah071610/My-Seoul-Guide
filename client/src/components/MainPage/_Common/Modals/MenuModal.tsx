import styled from "@emotion/styled";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { checkListStore } from "../../../../@store/store";
import { SM_SIZE } from "../../../../config";

const MenuModalComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  @media only screen and (max-width: ${SM_SIZE}) {
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    height: 330px;
  }
`;

export const MenuModal = observer(() => {
  return (
    <MenuModalComponent
      style={
        checkListStore.overlayCnt === 3
          ? { display: "block", animation: "border 2s infinite" }
          : { display: "none" }
      }
      className="modal"
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
        <span>Attractions</span>Check popular play place in Seoul.
      </h4>
      <h4>
        <span>Analyzer</span>You can manage budget and payment for travel here.
      </h4>
    </MenuModalComponent>
  );
});

export default MenuModal;
