import React from "react";
import Settings from "./Settings";
import Preview from "./Preview";
import { RouteComponentProps } from "@reach/router";

function App(_: RouteComponentProps) {
  return (
    <div>
      <div>Life Count Down</div>
      <Settings />
      <Preview />
    </div>
  );
}

export default App;
