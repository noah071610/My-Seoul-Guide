import { createContext, FC, ReactNode } from "react";
import { checkListStore, mainStore } from "./store/store";
import { ApolloProvider, createHttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import analyzerStore from "./store/analyzerStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "same-origin",
});
//"https://api.myseoulguide.site"

const client = new ApolloClient({
  link,
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
