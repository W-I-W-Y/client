import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import CommunityPage from "./views/CommunityPage/CommunityPage";
import CommunitySectionPage1 from "./views/CommunityPage/Section/Page1";
import CommunitySectionPage2 from "./views/CommunityPage/Section/Page2";

import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import CommunityUploadePage from "./views/CommunityUploadePage/CommunityUploadePage";
import CommunityUploadRegionPage from "./views/CommunityUploadePage/CommunityUploadRegionPage";

import PostPage from "./views/PostPage/PostPage.js";
import PostViewByMember from "./views/ByMember/PostViewByMember";
import CommentViewByMember from "./views/ByMember/CommentViewByMember";
import LikeHateByMember from "./views/ByMember/LikeHateByMember";
import ManagerPage from "./views/Manager/ManagerPage";
import MemberPage from "./views/Member/MemberPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        className="classbody"
        style={{
          paddingTop: "69px",
          minHeight: "calc(100vh - 80px)",
          backgroundColor: "#f3f3f3",
        }}
      >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* <Route exact path="/board/add" component={AddBoard} />
          <Route exact path="/board/delete" component={DeleteBoard} /> */}
          <Route exact path="/community" component={CommunityPage} />
          <Route
            exact
            path="/board/:boardId/view/:pageNum"
            component={CommunitySectionPage1}
          />
          <Route
            exact
            path="/sido/view/:pageNum"
            component={CommunitySectionPage2}
          />
          <Route exact path="/post/view/:postId" component={PostPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/join" component={RegisterPage} />
          <Route
            exact
            path="/post/add/:boardId"
            component={CommunityUploadePage}
          />
          <Route exact path="/add/sido" component={CommunityUploadRegionPage} />
          <Route
            exact
            path="/post/viewByMember/:pageNum"
            component={PostViewByMember}
          />
          <Route
            exact
            path="/comment/viewByMember/:pageNum"
            component={CommentViewByMember}
          />
          <Route
            exact
            path="/post/likehateByMember"
            component={LikeHateByMember}
          />
          <Route exact path="/member" component={MemberPage} />
          <Route exact path="/manager" component={ManagerPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
