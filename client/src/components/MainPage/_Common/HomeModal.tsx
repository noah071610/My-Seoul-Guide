import React from "react";
import PlaceModal from "./Modals/PlaceModal";
import MapModal from "./Modals/MapModal";
import MenuModal from "./Modals/MenuModal";
import ActivityModal from "./Modals/ActivityModal";

const HomeModal = () => {
  return (
    <>
      <MapModal />
      <MenuModal />
      <PlaceModal />
      <ActivityModal />
    </>
  );
};

export default HomeModal;
