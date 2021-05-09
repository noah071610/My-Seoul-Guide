import "antd/dist/antd.css";
import "./styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" component={Home} />
        <Route exact path="/place" component={Home} />
        <Route exact path="/experience" component={Home} />
        <Route exact path="/festival" component={Home} />
        <Route exact path="/analyzer" component={Home} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
