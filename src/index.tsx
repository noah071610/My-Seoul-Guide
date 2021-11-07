import { createContext, FC } from "react";
import { checkListStore, mainStore } from "./store/store";
import ReactDOM from "react-dom";
import analyzerStore from "./store/analyzerStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const storeContext = createContext({
  checkListStore,
  mainStore,
  analyzerStore,
});

const StoreProvider: FC = ({ children }) => {
  return (
    <storeContext.Provider value={{ checkListStore, mainStore, analyzerStore }}>
      {children}
    </storeContext.Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
