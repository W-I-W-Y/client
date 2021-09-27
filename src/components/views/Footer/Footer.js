import React from "react";
import { Col } from "antd";
import logo from "../../../images/logo.jpg";
import copylink from "../../../images/copylink.png";
import kakao from "../../../images/kakaotalk.png";
import instagram from "../../../images/instagram.png";

function Footer() {
  return (
    // <div
    //   style={{
    //     height: "80px",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontSize: "1rem",
    //   }}
    // >
    //   <p>
    //     {" "}
    //     Happy Coding <Icon type="smile" />
    //   </p>
    // </div>

    //   .instagram {
    //     background-color: pink;
    //     width: 6vw;
    //     height: 6vw;
    //     float: left;
    //     margin-left: 2vw;
    //     margin-top: 30vw;
    //     border-radius: 5px;
    //   }

    //   .kakaotalk {
    //     background-color: yellow;
    //     width: 6vw;
    //     height: 6vw;
    //     float: left;
    //     margin-left: 2vw;
    //     margin-top: 30vw;
    //     border-radius: 5px;
    //   }

    //   .ft3 img {
    //     padding-top: 0.3vw;
    //   }
    // }
    <div style={{ minWidth: "1100px" }}>
      <Col
        lg={8}
        xs={8}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "20vh",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ display: "grid", justifyContent: "center" }}>
          개발자 : 김준엽 신치용 박지현
        </p>
        <img
          src={logo}
          style={{
            minWidth: "250px",
            minHeight: "60px",
            position: "relative",
            width: "16vw",
            height: "4vw",
          }}
          alt=""
        />
      </Col>
      <Col
        lg={8}
        xs={8}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "20vh",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "center",

            lineHeight: "25px",
            position: "relative",
          }}
        >
          민간이 취합한 집계이므로 공식적인 근거 자료로 활용될 수 없고, <br />
          본 사이트에서 제공하는 정보를 사용하고 공유함으로 인해서 <br />
          발생된 문제의 책임은 전적으로 사용자에게 있습니다.
        </p>
        <p
          id="copyright"
          style={{
            color: "white",
            position: "relative",
            top: "10px",
          }}
        >
          copyrightⓒ All rights reserved by WIWY
        </p>
      </Col>
      <Col
        lg={8}
        xs={8}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "20vh",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          공유하기
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="copylink">
            <a type="copylink" href="/">
              <img src={copylink} alt="" />
            </a>
          </div>
          <div className="instagram">
            <a type="instagram" href="https://www.instagram.com/156.8_cm">
              <img src={instagram} alt="" />
            </a>
          </div>
          <div className="kakaotalk">
            <a type="kakaotalk" href="https://open.kakao.com/o/sSAc6aVc">
              <img src={kakao} alt="" />
            </a>
          </div>
        </div>
      </Col>
    </div>
  );
}

export default Footer;
