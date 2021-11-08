import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { QueryClient, QueryClientProvider } from "react-query";

const persistor = persistStore(store);

ReactDOM.render(
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
  document.getElementById("root")
);
