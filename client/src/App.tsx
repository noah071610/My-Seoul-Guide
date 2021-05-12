import "antd/dist/antd.css";
import "./styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Suspense } from "react";
import ActivityContent from "./components/MainPage/ActivityPage/ActivityContent";
import AnalyzerContent from "./components/MainPage/AnalyzerPage/AnalyzerContent";
import MapContent from "./components/MainPage/Acm&AirportPage/MapContent";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" component={Home} />
        <Route exact path="/stay" component={MapContent} />
        <Route exact path="/airport_route" component={MapContent} />
        <Route exact path="/activity/:category" component={ActivityContent} />
        <Route exact path="/analyzer" component={AnalyzerContent} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
