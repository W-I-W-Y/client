import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { Row, Col } from "react-bootstrap";
import coronaNews1 from "../../../../images/coronaNews1.jpeg";
import coronaNews2 from "../../../../images/coronaNews2.jpeg";
import coronaNews3 from "../../../../images/coronaNews3.jpeg";
import coronaNews4 from "../../../../images/coronaNews4.jpeg";
import coronaNews5 from "../../../../images/coronaNews5.jpeg";
import coronaNews6 from "../../../../images/coronaNews6.jpeg";

function Content3() {
  return (
    <section className="content-section" id="content-section-3">
      <Row gutter={16} style={{ padding: "10px" }}>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145000&nPage=6&vlist_no_npage=10&keyField=&keyWord=&orderby=">
            <img src={coronaNews1} width="100%" alt="" />
          </a>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145007&nPage=5&vlist_no_npage=9&keyField=&keyWord=&orderby=">
            <img src={coronaNews2} width="100%" alt="" />
          </a>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145055&nPage=5&vlist_no_npage=9&keyField=&keyWord=&orderby=">
            <img src={coronaNews3} width="100%" alt="" />
          </a>
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: "10px" }}>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145101&nPage=4&vlist_no_npage=7&keyField=&keyWord=&orderby=">
            <img src={coronaNews4} width="100%" alt="" />
          </a>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145272&nPage=2&vlist_no_npage=3&keyField=&keyWord=&orderby=">
            <img src={coronaNews5} width="100%" alt="" />
          </a>
        </Col>
        <Col lg={8} md={12} xs={24} sm={24}>
          <a href="http://kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&b_list=9&act=view&list_no=145330&nPage=1&vlist_no_npage=1&keyField=&keyWord=&orderby=">
            <img src={coronaNews6} width="100%" alt="" />
          </a>
        </Col>
      </Row>
    </section>
  );
}

export default Content3;
