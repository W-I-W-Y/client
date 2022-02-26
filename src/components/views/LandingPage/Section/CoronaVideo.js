import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Row, Col } from "react-bootstrap";

function Content3() {
  return (
    <section className="content-section" id="content-section-3">
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24} sm={24}>
          <iframe
            className="youtube"
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/IFIMlZPa62Q"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <iframe
            className="youtube"
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/ZFUnG41xJOY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <iframe
            className="youtube"
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/PQOS0CBbM80"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Col>
      </Row>
    </section>
  );
}

export default Content3;
