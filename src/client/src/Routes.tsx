import React, { FunctionComponent } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { Index } from "./pages/index";
import { Events } from "./pages/events";

export const Routes: FunctionComponent = () => (
  <BrowserRouter>
    <Route path="/events" component={Events} exact />
    <Route path="/" component={Index} exact />
  </BrowserRouter>
);
