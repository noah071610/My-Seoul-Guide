/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Popover } from "antd";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { checkListStore, mainStore } from "../@store/store";
import { PathObj } from "../types";
import LandingPage from "./LandingPage/LandingPage";
import MainPageWrapper from "./MainPage/MainPageWrapper";
import { Directions } from "./MainPage/_Common/Directions";
import HomeModal from "./MainPage/_Common/HomeModal";

const HomeWrapper = (isSubmit: boolean, isPermanetSubmit: boolean) => css`
  transition: 0.8s all;
  transform: translateY(${isSubmit ? (isPermanetSubmit ? 0 : "-50%") : 0});
`;

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const Home = observer(() => {
  const [toPlacePath, setToPlacePath] = useState<PathObj | null>(null);

  const togoPopup = (id: string, path: PathObj) => (
    <div className="popup_togo">
      <a onClick={() => setToPlacePath(path)}>Direction 🚘</a>
      <a onClick={() => onClickDeleteTogo(id)}>Delete ❌</a>
    </div>
  );

  const onClickDeleteTogo = useCallback((id: string) => {
    mainStore.deleteTogoList(id);
  }, []);

  useEffect(() => {
    if (checkListStore.isPermanetSubmit) {
      checkListStore.clearOverlayCnt(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkListStore.isPermanetSubmit]);

  useEffect(() => {
    if (checkListStore.overlayCnt === 0) {
      checkListStore.clearOverlayCnt(0);
    }
  }, []);

  return (
    <div css={HomeWrapper(checkListStore.isSubmit, checkListStore.isPermanetSubmit)}>
      {!checkListStore.isPermanetSubmit && <LandingPage />}
      {checkListStore.isSubmit && (
        <MainPageWrapper>
          <LoadScript googleMapsApiKey={"1"}>
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
                  <div className="togo_preview">
                    <h3>Your base place</h3>
                    <h4>{mainStore.place?.title._text}</h4>
                    <span>🌟</span>
                  </div>
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
                        <div className="togo_preview">
                          <h3>List No.{i + 1}</h3>
                          <h4>{v.title}</h4>
                          <span>📍</span>
                        </div>
                      </Popover>
                    </OverlayView>
                  );
                })}
              {toPlacePath && (
                <Directions origin={mainStore.place?.stationPath} destination={toPlacePath} />
              )}
            </GoogleMap>
          </LoadScript>
          <div
            style={checkListStore.overlayCnt <= 0 ? { display: "none" } : { display: "block" }}
            onClick={() => checkListStore.discountOverlayCnt()}
            className="overlay"
          />
          <HomeModal />
        </MainPageWrapper>
      )}
    </div>
  );
});

export default Home;
