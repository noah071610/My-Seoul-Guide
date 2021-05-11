import { createContext, FC, ReactNode } from "react";
import { checkListStore, mainStore } from "./@store/store";
import ReactDOM from "react-dom";
import App from "./App";

const storeContext = createContext({
  checkListStore,
  mainStore,
});

interface Props {
  children: ReactNode;
}

const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <storeContext.Provider value={{ checkListStore, mainStore }}>{children}</storeContext.Provider>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
