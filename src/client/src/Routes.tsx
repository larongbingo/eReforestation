import React, { FunctionComponent } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import { Index } from "./pages/index";
import { Events } from "./pages/events";
import { LogIn } from "./pages/login";
import  { ProfilePage } from "./pages/profilePage";
import { NewsListPage } from "./pages/news";
import { NewsDetailsPage } from "./pages/newsDetails";
import { EventDetailsPage } from "./pages/eventsDetails";
import { Register } from "./pages/register";
import { LogOut } from "./pages/logOut";
import { Page404 } from "./pages/Page404";
import { AboutUs } from "./pages/about/aboutUs";
import { Achievements } from "./pages/about/achievements";
import { Affiliations } from "./pages/about/affiliations";
import { Contact } from "./pages/about/contacts";
import { FAQs } from "./pages/about/faqs";
import { TreePlanting } from "./pages/about/treePlanting";
import { CreateNews } from "./pages/admin/create-news";
import { UpdateNews } from "./pages/admin/update-news";
import { CreateEvent } from "./pages/admin/create-event";
import { UpdateEvent } from "./pages/admin/update-event";
import { Testing } from "./pages/superuser/testing";
import { BackupRestore } from "./pages/superuser/backup-restore";
import { Gallery } from "./pages/gallery";
import { UploadPhoto } from "./pages/admin/upload-photo";
import { Auditing } from "./pages/superuser/auditing";

export const Routes: FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/profile" component={ProfilePage} exact />
      <Route path="/gallery" component={Gallery} exact />
      <Route path="/login" component={LogIn} exact />
      <Route path="/logout" component={LogOut} exact />
      <Route path="/events" component={Events} exact />
      <Route path="/events/:eventId" component={EventDetailsPage} exact />
      <PrivateRoute path="/admin/upload-photo" component={UploadPhoto} exact />
      <PrivateRoute path="/admin/create-event" component={CreateEvent} exact />
      <PrivateRoute path="/admin/create-news" component={CreateNews} exact />
      <PrivateRoute path="/admin/update-news/:newsId" component={UpdateNews} exact />
      <PrivateRoute path="/admin/update-event/:eventId" component={UpdateEvent} exact />
      <PrivateRoute path="/admin/testing" component={Testing} exact />
      <PrivateRoute path="/admin/backup" component={BackupRestore} exact />
      <PrivateRoute path="/admin/audit" component={Auditing} exact />
      <Route path="/about/us" component={AboutUs} exact />
      <Route path="/about/achievements" component={Achievements} exact />
      <Route path="/about/affiliations" component={Affiliations} exact />
      <Route path="/about/tree-planting" component={TreePlanting} exact />
      <Route path="/about/faqs" component={FAQs} exact />
      <Route path="/about/contacts" component={Contact} exact />
      <Route path="/news" component={NewsListPage} exact />
      <Route path="/news/:newsId" component={NewsDetailsPage} exact />
      <Route path="/register" component={Register} />
      <Route path="/" component={Index} exact />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);
