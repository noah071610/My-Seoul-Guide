/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { checkListStore } from "../@store/store";
import LandingPage from "./LandingPage/LandingPage";
import MainContent from "./MainPage/MainContent";

const HomeWrapper = (isSubmit: boolean) => css`
  transition: 1.1s all;
  transform: translateY(${isSubmit ? "-50%" : 0});
`;

const Home = observer(() => {
  return (
    <div css={HomeWrapper(checkListStore.isSubmit)}>
      <LandingPage />
      {checkListStore.isSubmit && <MainContent />}
    </div>
  );
});

export default Home;
