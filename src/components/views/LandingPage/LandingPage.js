import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";
import "../../../css/main.css";
import "../../../css/default.css";
// import "../../../js/main";

import Content1 from "./Section/Content1";
import Content2 from "./Section/Content2";
import Content3 from "./Section/Content3";
import Content4 from "./Section/Content4";
import Content5 from "./Section/Content5";
import Content6 from "./Section/Content6";

import CoronaNews from "./Section/CoronaNews";
import CoronaVideo from "./Section/CoronaVideo";

import Text1 from "./Section/Text1";
import Text2 from "./Section/Text2";

function LandingPage() {
  return (
    // {/* <div className="navbar-links">
    //   <a href="#content-section-1" className="navbar-item">
    //     COVID-19 현황
    //   </a>
    //   <a href="#content-section-2" className="navbar-item">
    //     시도별 발생동향
    //   </a>
    //   <a href="#content-section-3" className="navbar-item">
    //     국외 발생동향
    //   </a>
    //   <a href="#content-section-4" className="navbar-item">
    //     백신 접종 현황
    //   </a>
    // </div> */}

    // {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

    // {/* <div className="before-load"> */}
    // {/* <div className="loading">
    //   <svg className="loading-circle">
    //     <circle cx="50%" cy="50%" r="25"></circle>
    //   </svg>
    // </div> */}
    <>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            당일 집계 현황
          </h2>
        </header>
        <Content6 />
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            확진자 현황, 백신 접종 현황
          </h2>
        </header>
        {/* <section className="scroll-section" id="scroll-section-0">
              <h1>WIWY</h1>
              <object
                className="sticky-elem covid-logo"
                data="../../../images/covid-image.svg"
                type="image/svg+xml"
              ></object>
              <div className="sticky-elem main-message a">
                <p>코로나에 대한</p>
              </div>
              <span className="sticky-elem ribbon-path">
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 700 450"
                >
                  <path
                    className="st1"
                    d="M709,41.5c-194,38-387,122-455,159c-64.13,34.89-73.4,42.42,20,26c82.5-14.5,126.34-33.68,185-38 c47.5-3.5,69.22,7.98-11,39c-75,29-251,98-459,169"
                  ></path>
                </svg>
              </span>
              <div className="sticky-elem main-message b">
                <p>모든 것</p>
              </div>
            </section> */}
        <Col
          className="leftarea"
          xl={11}
          lg={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: "30px", paddingRight: "30px", margin: "30px" }}
        >
          <Content1 />
        </Col>

        <Col
          className="rightarea"
          xl={11}
          lg={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: "30px", paddingRight: "30px", margin: "30px" }}
        >
          <Content4 />
        </Col>
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            거리두기 안내, 백신 종류
          </h2>
        </header>
        <Col
          className="leftarea"
          xl={11}
          lg={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: "30px", paddingRight: "30px", margin: "30px" }}
        >
          <Text1 />
        </Col>

        <Col
          className="rightarea"
          xl={11}
          lg={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: "30px", paddingRight: "30px", margin: "30px" }}
        >
          <Text2 />
        </Col>
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            시도별 확진현황
          </h2>
        </header>
        {/* <Content2 /> */}
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            국외 발생동향
          </h2>
        </header>
        <Content3 />
      </Row>

      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            코로나 카드 뉴스
          </h2>
        </header>
        <CoronaNews />
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            코로나 관련 동영상
          </h2>
        </header>
        <CoronaVideo />
      </Row>
      <Row
        className="antdrow"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", paddingTop: "2vw" }}
      >
        <header className="major">
          <h2
            style={{
              fontFamily: "Droid Sans",
            }}
          >
            제공 서비스
          </h2>
        </header>
        <Content5 />
      </Row>
    </>
  );
}

export default LandingPage;
