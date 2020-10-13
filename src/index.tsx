import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { globalHistory, Router } from "@reach/router";
import { QueryParamProvider } from "use-query-params";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryParamProvider {...{ path: "/" }} reachHistory={globalHistory}>
        <App default />
      </QueryParamProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
