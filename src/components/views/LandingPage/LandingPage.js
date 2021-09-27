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

function LandingPage() {
  return (
    <div>
      {/* <div className="navbar-links">
        <a href="#content-section-1" className="navbar-item">
          COVID-19 현황
        </a>
        <a href="#content-section-2" className="navbar-item">
          시도별 발생동향
        </a>
        <a href="#content-section-3" className="navbar-item">
          국외 발생동향
        </a>
        <a href="#content-section-4" className="navbar-item">
          백신 접종 현황
        </a>
      </div> */}

      {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

      {/* <div className="before-load"> */}
      {/* <div className="loading">
        <svg className="loading-circle">
          <circle cx="50%" cy="50%" r="25"></circle>
        </svg>
      </div> */}
      <div className="container">
        {/* 코로나 시대 살아남기 COVID-19 현황    시도별 발생동향  국외 발생동향     백신 접종 현황 */}
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
        <div className="normal-content">
          <Content1 />

          <Content2 />

          <Content3 />

          <Content4 />

          <Content5 />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
