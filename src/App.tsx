import React from "react";
import Settings from "./Settings";
import { RouteComponentProps } from "@reach/router";

function App(_: RouteComponentProps) {
  return (
    <div>
      <div>Life Count Down</div>
      <Settings />
    </div>
  );
}

export default App;
