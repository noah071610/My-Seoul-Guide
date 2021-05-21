/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
import { BLUE_COLOR, WHITE_COLOR } from "../config";

const Preview = styled.div`
  background-color: ${WHITE_COLOR};
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  transform: translateY(-100%);
  z-index: 1;
  cursor: pointer;
  h3 {
    color: ${BLUE_COLOR};
  }
  span {
    position: absolute;
    font-size: 2rem;
    bottom: -1rem;
    left: -1rem;
  }
`;

const Popup = styled.div`
  display: flex;
  width: 200px;
  a {
    width: 50%;
    text-align: center;
  }
`;

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
    <Popup>
      <a onClick={() => setToPlacePath(path)}>Direction 🚘</a>
      <a onClick={() => onClickDeleteTogo(id)}>Delete ❌</a>
    </Popup>
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
                  <Preview>
                    <h3>Your base place</h3>
                    <h4>{mainStore.place?.title._text}</h4>
                    <span>🌟</span>
                  </Preview>
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
                        <Preview>
                          <h3>List No.{i + 1}</h3>
                          <h4>{v.title}</h4>
                          <span>📍</span>
                        </Preview>
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
            style={checkListStore.overlayCnt === 0 ? { display: "none" } : { display: "block" }}
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
