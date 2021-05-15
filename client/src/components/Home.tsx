/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { checkListStore, mainStore } from "../@store/store";
import LandingPage from "./LandingPage/LandingPage";
import MainPageWrapper from "./MainPage/MainPageWrapper";
import HomeModal from "./MainPage/_Common/HomeModal";

const HomeWrapper = (isSubmit: boolean) => css`
  transition: 0.8s all;
  transform: translateY(${isSubmit ? "-50%" : 0});
`;

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const Home = observer(() => {
  const [overlayCnt, setOverlayCnt] = useState(2);
  const onClickDeleteTogo = useCallback((id: string) => {
    mainStore.deleteTogoList(id);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("togo_list")) {
      mainStore.setTogoList(JSON.parse(localStorage.getItem("togo_list")!));
    }
    if (localStorage.getItem("recommend_places")) {
      mainStore.setRecommend_places(JSON.parse(localStorage.getItem("recommend_places")!));
    }
    if (localStorage.getItem("userInfo")) {
      mainStore.setUserInfo(JSON.parse(localStorage.getItem("userInfo")!));
    }
  }, []);
  return (
    <div css={HomeWrapper(checkListStore.isSubmit)}>
      <LandingPage />
      {checkListStore.isSubmit && (
        <MainPageWrapper>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: 37.549687466128496, lng: 126.9809660539474 }}
              zoom={11}
            >
              {mainStore.togoLists.length > 0 &&
                mainStore.togoLists.map((v, i) => {
                  return (
                    <OverlayView
                      key={i}
                      position={v.path}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div onClick={() => onClickDeleteTogo(v.contentid)} className="togo_preview">
                        <h3>List No.{i + 1}</h3>
                        <h4>{v.title}</h4>
                        <span>📍</span>
                      </div>
                    </OverlayView>
                  );
                })}
            </GoogleMap>
          </LoadScript>
          <div
            style={overlayCnt <= 0 ? { display: "none" } : { display: "block" }}
            onClick={() => setOverlayCnt((prev) => --prev)}
            className="overlay"
          />
          <HomeModal overlayCnt={overlayCnt} />
        </MainPageWrapper>
      )}
    </div>
  );
});

export default Home;
