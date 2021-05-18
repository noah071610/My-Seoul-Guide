import "antd/dist/antd.css";
import "./styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./components/Home";
import { Route, useHistory, withRouter } from "react-router-dom";
import { Suspense, useEffect } from "react";
import ActivityContent from "./components/MainPage/ActivityPage/ActivityContent";
import AnalyzerContent from "./components/MainPage/AnalyzerPage/AnalyzerContent";
import MainPage from "./components/MainPage/Acm&AirportPage/MapPage";
import LoadingPage from "./components/MainPage/LoadingPage";
import { checkListStore, mainStore } from "./@store/store";
import analyzerStore from "./@store/analyzerStore";
import { observer } from "mobx-react";

const App = observer(() => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("togo_list")) {
      mainStore.setTogoList(JSON.parse(localStorage.getItem("togo_list")!));
    }
    if (localStorage.getItem("recommend_places")) {
      mainStore.setRecommend_places(JSON.parse(localStorage.getItem("recommend_places")!));
    }
    if (localStorage.getItem("place")) {
      mainStore.changePlace(JSON.parse(localStorage.getItem("place")!).id - 1);
    }
    if (localStorage.getItem("userInfo")) {
      mainStore.setUserInfo(JSON.parse(localStorage.getItem("userInfo")!));
    }
    if (localStorage.getItem("chartValue")) {
      analyzerStore.setChart(JSON.parse(localStorage.getItem("chartValue")!));
    }
    if (localStorage.getItem("payment_list")) {
      analyzerStore.setPaymentList(
        JSON.parse(localStorage.getItem("payment_list")!),
        JSON.parse(localStorage.getItem("original_total")!)
      );
    }
  }, []);

  useEffect(() => {
    if (!checkListStore.isSubmit) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Route exact path="/" component={Home} />
      <Route exact path="/stay" component={MainPage} />
      <Route exact path="/airport_route" component={MainPage} />
      <Route exact path="/activity/:category" component={ActivityContent} />
      <Route exact path="/analyzer" component={AnalyzerContent} />
    </Suspense>
  );
});

export default withRouter(App);
