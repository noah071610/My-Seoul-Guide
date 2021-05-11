/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { observer } from "mobx-react";
import { useState } from "react";
import { checkListStore } from "../@store/store";
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
  const [onOverlay, setOnOverlay] = useState(true);
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
            ></GoogleMap>
          </LoadScript>
          <div
            style={onOverlay ? { display: "block" } : { display: "none" }}
            onClick={() => setOnOverlay(false)}
            className="overlay"
          />
          <HomeModal onOverlay={onOverlay} />
        </MainPageWrapper>
      )}
    </div>
  );
});

export default Home;
