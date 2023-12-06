import React from "react";
import ReactDOM from "./pages/ReactDOM/ReactDOM";
import { Provider } from "react-redux";
import { HashRouter as Router, } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./mobile/store/Store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
      <Router>
        <App />
      </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
