import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import CommunityPage from "./views/CommunityPage/CommunityPage";
import CommunitySectionPage1 from "./views/CommunityPage/Section/Page1";

import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import CommunityUploadePage from "./views/CommunityUploadePage/CommunityUploadePage";
import FileDetailPage from "./views/FileDetailPage/FileDetailPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route
            exact
            path="/community"
            component={Auth(CommunityPage, null)}
          />
          <Route
            exact
            path="/community/1"
            component={Auth(CommunitySectionPage1, null)}
          />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/community/upload"
            component={Auth(CommunityUploadePage, true)}
          />
          <Route
            exact
            path="/file/:fileId"
            component={Auth(FileDetailPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
