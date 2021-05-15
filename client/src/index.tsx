import { createContext, FC, ReactNode } from "react";
import { checkListStore, mainStore } from "./@store/store";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import analyzerStore from "./@store/analyzerStore";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000",
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
  <ApolloProvider client={client}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
