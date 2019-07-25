import React, { FunctionComponent } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { Index } from "./pages/index";
import { Events } from "./pages/events";
import { LogIn } from "./pages/login";
import  { ProfilePage } from "./pages/profilePage";

export const Routes: FunctionComponent = () => (
  <BrowserRouter>
    <PrivateRoute path="/profile" component={ProfilePage} exact />
    <Route path="/login" component={LogIn} exact />
    <Route path="/events" component={Events} exact />
    <Route path="/" component={Index} exact />
  </BrowserRouter>
);
