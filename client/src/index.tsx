import { createContext, FC, ReactNode } from "react";
import { checkListStore, mainStore } from "./@store/store";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import analyzerStore from "./@store/analyzerStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "https://api.myseoulguide.site",
  cache: new InMemoryCache(),
});

const storeContext = createContext({
  checkListStore,
  mainStore,
  analyzerStore,
});

interface Props {
  children: ReactNode;
}

const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <storeContext.Provider value={{ checkListStore, mainStore, analyzerStore }}>
      {children}
    </storeContext.Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
