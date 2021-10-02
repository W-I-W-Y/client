import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
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
import AddBoard from "./views/BoardPage/AddBoard.js";
import DeleteBoard from "./views/BoardPage/DeleteBoard.js";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/board/add" component={AddBoard} />
          <Route exact path="/board/delete" component={DeleteBoard} />
          <Route exact path="/community" component={CommunityPage} />
          <Route
            exact
            path="/board/:boardId/view/:pageNum"
            component={CommunitySectionPage1}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/join" component={RegisterPage} />
          <Route
            exact
            path="/post/add/:boardId"
            component={CommunityUploadePage}
          />
          <Route exact path="/file/:fileId" component={FileDetailPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
