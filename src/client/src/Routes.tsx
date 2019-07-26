import React, { FunctionComponent } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { Index } from "./pages/index";
import { Events } from "./pages/events";
import { LogIn } from "./pages/login";
import  { ProfilePage } from "./pages/profilePage";
import { NewsListPage } from "./pages/news";
import { NewsDetailsPage } from "./pages/newsDetails";

export const Routes: FunctionComponent = () => (
  <BrowserRouter>
    <PrivateRoute path="/profile" component={ProfilePage} exact />
    <Route path="/login" component={LogIn} exact />
    <Route path="/events" component={Events} exact />
    <Route path="/news" component={NewsListPage} exact />
    <Route path="/news/:newsId" component={NewsDetailsPage} exact />
    <Route path="/" component={Index} exact />
  </BrowserRouter>
);
