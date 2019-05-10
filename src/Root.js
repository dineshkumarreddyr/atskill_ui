import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configireStore from "./engine/Store";
import Routes from "./routes/index";

const store = configireStore();

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default Root;
