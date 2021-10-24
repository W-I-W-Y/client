import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../Config";
import Axios from "axios";
import "../../../css/index.css";
import covidLogo from "../../../images/covid.png";

// import "../../../js/index";
import $ from "jquery";
import { Helmet } from "react-helmet";
import SideBar from "./Section/SideBar";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";

import trueimg from "../../../images/true.png";
import falseimg from "../../../images/false.png";

import votetitle from "../../../images/votetitle.png";

function CommunityPage() {
  const [community, setCommunity] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);

  useEffect(() => {
    // const headers = {
    //   Authorization: `Bearer ` + localStorage.getItem("token"),
    // };

    Axios.get(`${USER_SERVER}/api/community`).then((response, index) => {
      if (response.data !== null) {
        response.data.forEach((lists) => {
          setCommunity((state) => [
            ...state,
            {
              smallPostDTOS: lists.smallPostDTOS,
              boardName: lists.boardName,
              boardId: lists.boardId,
            },
          ]);

          lists.smallPostDTOS.forEach((smallPostDTOS) => {
            setCommunityPost((state) => [
              ...state,
              {
                postName: smallPostDTOS.postName,
                calculateTime: smallPostDTOS.calculateTime,
                postId: smallPostDTOS.postId,
              },
            ]);
          });
        });
      } else {
        alert("게시판을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const history = useHistory();
  const detailPost = (id) => {
    history.push("../../../post/view/" + id);
    window.scrollTo(0, 0);
  };

  const renderCards = community.map((community, index) => {
    return (
      <Col key={index} lg={12} md={12} sm={24} xs={24}>
        <div className="posts">
          <article>
            <div className="board">
              <h3
                style={{
                  fontFamily: "Droid Sans",
                  fontSize: "1rem",
                }}
              >
                {community.boardName}
              </h3>
              {community.smallPostDTOS.map((communityPost, index) => (
                <a
                  key={index}
                  className="list"
                  onClick={() => detailPost(communityPost.postId)}
                >
                  <time
                    style={{
                      fontFamily: "Droid Sans",
                      fontSize: "0.7rem",
                    }}
                  >
                    {communityPost.calculateTime}
                  </time>
                  <p
                    style={{
                      fontFamily: "Droid Sans",
                      fontSize: "0.8rem",
                    }}
                  >
                    {communityPost.postName}
                  </p>
                </a>
              ))}
            </div>
            <ul
              className="actions"
              id="actions-more"
              style={{
                width: "500px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <li>
                <a
                  className="button"
                  href={
                    "/board/" + Number(community.boardId) + "/view/" + Number(0)
                  }
                  style={{
                    fontFamily: "Droid Sans",
                    fontSize: "0.8rem",
                  }}
                >
                  more
                </a>
              </li>
            </ul>
          </article>
        </div>
      </Col>
    );
  });

  return (
    <>
      <Helmet>
        <script src="../../../js/jquery.min.js"></script>
        <script src="../../../js/skel.min.js"></script>
        <script src="../../../js/util.js"></script>
        <script src="../../../js/index.js"></script>
      </Helmet>

      <html th="http://www.thymeleaf.org" src="http://www.w3.org/1999/xhtml">
        <head>
          <title>코로나 시대 살아남기</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </head>
        <body>
          <div id="wrapper">
            <div id="main">
              <div className="inner">
                <header id="header">
                  <a
                    href="community.html"
                    className="logo"
                    style={{ fontFamily: "Droid Sans", fontSize: "1.1rem" }}
                  >
                    <strong>코로나 시대</strong> 살아남기
                  </a>
                  <ul className="icons">
                    <li>
                      <a href="#" className="icon fa-twitter">
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon fa-facebook">
                        <span className="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon fa-snapchat-ghost">
                        <span className="label">Snapchat</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon fa-instagram">
                        <span className="label">Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon fa-medium">
                        <span className="label">Medium</span>
                      </a>
                    </li>
                  </ul>
                </header>

                <section id="banner">
                  <div className="content">
                    <header>
                      <h1
                        style={{
                          fontFamily: "Droid Sans",
                          fontSize: "2rem",
                          marginBottom: "20px",
                        }}
                      >
                        코로나 시대를 살아가는 여러분들을 위한
                        <strong style={{ color: "#f56a6a" }}>
                          {" "}
                          COVID-19 정보 제공 서비스
                        </strong>
                      </h1>
                      <p
                        style={{ fontFamily: "Droid Sans", fontSize: "1.3rem" }}
                      >
                        확진자 정보, 백신접종 정보, 국내외 발생 현황, 전세계
                        확진 현황
                      </p>
                    </header>
                    <p style={{ fontFamily: "Droid Sans", fontSize: "1.1rem" }}>
                      저희 서비스를 이용하시면{" "}
                      <strong>확진환자, 격리해제, 격리중, 사망자의 현황</strong>
                      을 알 수 있고, <strong>백신접종 현황</strong>을 알 수
                      있습니다. 또한 <strong>시도별 확진자 수</strong>를 확인할
                      수 있으며, <strong>국내뿐만 아니라 국외 발생동향</strong>
                      도 알 수 있습니다. 더 나아가 코로나 백신 접종 현황까지 한
                      눈에 확인 가능합니다.
                    </p>
                    <ul className="actions">
                      <li>
                        <a
                          href="/"
                          className="button big"
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "0.8rem",
                          }}
                        >
                          정보 알아보기
                        </a>
                      </li>
                    </ul>
                  </div>
                  <span className="image object">
                    <img src={covidLogo} alt="" />
                  </span>
                </section>

                <section>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={votetitle}
                      style={{
                        marginBottom: "50px",
                        width: "500px",
                        height: "130px",
                      }}
                    ></img>
                    <h1
                      style={{
                        fontFamily: "Droid Sans",
                        fontSize: "2rem",
                        textAlign: "center",
                        marginBottom: "30px",
                      }}
                    >
                      "백신 접종은 필수로 맞아야한다"
                    </h1>
                  </div>
                  <br />
                  <Row
                    gutter={16}
                    style={{
                      display: "flex",
                      marginRight: "0px",
                      marginLeft: "0px",
                    }}
                  >
                    <div className="true" style={{ width: "40%" }}>
                      <a>
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "left",
                            marginBottom: "30px",
                          }}
                        >
                          <strong style={{ color: "#FA6A90" }}>찬성</strong>{" "}
                          40%(80명)
                        </h1>
                        <div
                          style={{
                            backgroundColor: "#FA6A90",
                            height: "30px",
                            position: "relative",
                          }}
                        ></div>
                        <img
                          src={trueimg}
                          style={{
                            width: "100px",
                            height: "100px",
                            position: "relative",
                            top: "-74px",
                            float: "right",
                          }}
                        />
                      </a>
                    </div>
                    <div className="false" style={{ width: "60%" }}>
                      <a>
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "right",
                            marginBottom: "30px",
                          }}
                        >
                          60%(120명){" "}
                          <strong style={{ color: "#6AA8FA" }}>반대</strong>
                        </h1>
                        <div
                          style={{ backgroundColor: "#6AA8FA", height: "30px" }}
                        ></div>
                        <img
                          src={falseimg}
                          style={{
                            width: "100px",
                            height: "100px",
                            position: "relative",
                            top: "-74px",
                            float: "left",
                          }}
                        />
                      </a>
                    </div>
                  </Row>
                </section>
                <section>
                  <header className="major">
                    <h2
                      style={{ fontFamily: "Droid Sans", fontSize: "1.8rem" }}
                    >
                      게시판
                    </h2>
                  </header>

                  <Row gutter={16}>{renderCards}</Row>
                </section>
              </div>
            </div>
            <SideBar />
          </div>
        </body>
      </html>
    </>
  );
}

export default CommunityPage;
