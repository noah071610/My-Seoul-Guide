import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Popover } from "antd";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { checkListStore, mainStore } from "@store/store";
import { PathObj } from "types";
import LandingPage from "../LandingPage";
import MainLayout from "../Layout";
import { MapDirections } from "@views/Commons/MapDirections";
import { MainPageWrapper, RoutePreview, TogoPopup } from "./styles";
import MapModal from "./Sections/MapModal";
import MenuModal from "./Sections/MenuModal";
import PlaceModal from "./Sections/PlaceModal";
import ActivityModal from "./Sections/ActivityModal";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const MainPage = observer(() => {
  const [toPlacePath, setToPlacePath] = useState<PathObj | null>(null);

  const togoPopup = (id: string, path: PathObj) => (
    <TogoPopup>
      <a onClick={() => setToPlacePath(path)}>Direction 🚘</a>
      <a onClick={() => onClickDeleteTogo(id)}>Delete ❌</a>
    </TogoPopup>
  );

  const onClickDeleteTogo = useCallback((id: string) => {
    mainStore.deleteTogoList(id);
  }, []);

  useEffect(() => {
    if (checkListStore.isPermanetSubmit) {
      checkListStore.clearOverlayCnt(0);
    }
  }, [checkListStore.isPermanetSubmit]);

  useEffect(() => {
    if (checkListStore.overlayCnt === 0) {
      checkListStore.clearOverlayCnt(0);
    }
  }, []);

  return (
    <div css={MainPageWrapper(checkListStore.isSubmit, checkListStore.isPermanetSubmit)}>
      {!checkListStore.isPermanetSubmit && <LandingPage />}
      {checkListStore.isSubmit && (
        <MainLayout>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={
                mainStore.place?.stationPath || { lat: 37.549687466128496, lng: 126.9809660539474 }
              }
              zoom={12}
            >
              {mainStore.place && (
                <OverlayView
                  position={mainStore.place?.stationPath}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <RoutePreview>
                    <h3>Your base place</h3>
                    <h4>{mainStore.place?.title._text}</h4>
                    <span>🌟</span>
                  </RoutePreview>
                </OverlayView>
              )}
              {mainStore.togoLists.length > 0 &&
                mainStore.togoLists.map((v, i) => {
                  return (
                    <OverlayView
                      key={i}
                      position={v.path}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <Popover content={() => togoPopup(v.contentid, v.path)}>
                        <RoutePreview>
                          <h3>List No.{i + 1}</h3>
                          <h4>{v.title}</h4>
                          <span>📍</span>
                        </RoutePreview>
                      </Popover>
                    </OverlayView>
                  );
                })}
              {toPlacePath && (
                <MapDirections origin={mainStore.place?.stationPath} destination={toPlacePath} />
              )}
            </GoogleMap>
          </LoadScript>
          <div
            style={checkListStore.overlayCnt === 0 ? { display: "none" } : { display: "block" }}
            onClick={() => checkListStore.discountOverlayCnt()}
            className="overlay"
          />
          <MapModal />
          <MenuModal />
          <PlaceModal />
          <ActivityModal />
        </MainLayout>
      )}
    </div>
  );
});

export default MainPage;
