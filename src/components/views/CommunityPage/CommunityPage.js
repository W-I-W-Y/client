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

import ModalSetting from "./Section/ModalPage";

function CommunityPage() {
  const [community, setCommunity] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);
  const [vote, setVote] = useState([]);

  const [sidebar, setSidebar] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const changeState = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/vote/view`).then((response, index) => {
      console.log("투표확인");
      console.log(response.data);
      if (response.data !== null) {
        setVote({
          content: response.data.content,
          createDate: response.data.createDate,
          voteId: response.data.voteId,
          agreeCnt: response.data.agreeCnt,
          disagreeCnt: response.data.disagreeCnt,
        });
      } else {
        alert("투표 정보를 가져오는데 실패했습니다.");
      }
    });

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
  const agreeClick = () => {
    console.log("찬성");

    const variable = {
      voteId: vote.voteId,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.patch(`${USER_SERVER}/api/vote/agree/${vote.voteId}`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "submitAgree") {
        window.location.reload();
      } else if (response.data === "cancelAgree") {
        alert("투표를 취소했습니다.");
        window.location.reload();
      } else if (response.data === "nonMember") {
        history.push("../../../login");
      } else {
        alert("찬성 투표 반영하지 못했습니다.");
      }
    });
  };

  const disagreeClick = () => {
    console.log("반대");
    const variable = {
      voteId: vote.voteId,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.patch(`${USER_SERVER}/api/vote/disagree/${vote.voteId}`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "submitDisagree") {
        window.location.reload();
      } else if (response.data === "cancelDisagree") {
        alert("투표를 취소했습니다.");
        window.location.reload();
      } else if (response.data === "nonMember") {
        history.push("../../../login");
      } else {
        alert("반대 투표 반영하지 못했습니다.");
      }
    });
  };

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
                    "/board/" + Number(community.boardId) + "/view/" + Number(1)
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
            {sidebar ? (
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
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "1.3rem",
                          }}
                        >
                          확진자 정보, 백신접종 정보, 국내외 발생 현황, 전세계
                          확진 현황
                        </p>
                      </header>
                      <p
                        style={{ fontFamily: "Droid Sans", fontSize: "1.1rem" }}
                      >
                        저희 서비스를 이용하시면{" "}
                        <strong>
                          확진환자, 격리해제, 격리중, 사망자의 현황
                        </strong>
                        을 알 수 있고, <strong>백신접종 현황</strong>을 알 수
                        있습니다. 또한 <strong>시도별 확진자 수</strong>를
                        확인할 수 있으며,{" "}
                        <strong>국내뿐만 아니라 국외 발생동향</strong>도 알 수
                        있습니다. 더 나아가 코로나 백신 접종 현황까지 한 눈에
                        확인 가능합니다.
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
                        <li>
                          <a
                            onClick={modalClose}
                            className="button big"
                            style={{
                              fontFamily: "Droid Sans",
                              fontSize: "0.8rem",
                            }}
                          >
                            내 주변 선별진료소 확인
                          </a>
                          {modalOpen && (
                            <ModalSetting
                              modalClose={modalClose}
                            ></ModalSetting>
                          )}
                        </li>
                      </ul>
                    </div>
                    <span className="image object">
                      <img src={covidLogo} alt="" />
                    </span>
                  </section>

                  <section>
                    <div style={{ textAlign: "center" }}>
                      <h1>
                        {" "}
                        <strong style={{ color: "#f56a6a" }}>
                          {" "}
                          오늘의 투표
                        </strong>
                      </h1>
                      <h1
                        style={{
                          fontFamily: "Droid Sans",
                          fontSize: "2rem",
                          textAlign: "center",
                          marginBottom: "30px",
                        }}
                      >
                        "{vote.content}"
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
                      <div
                        className="true"
                        style={{
                          width: `${(
                            (vote.agreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}%`,
                          cursor: "pointer",
                        }}
                        onClick={agreeClick}
                      >
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "left",
                            marginBottom: "30px",
                          }}
                        >
                          <strong style={{ color: "#FA6A90" }}>찬성</strong>{" "}
                          {(
                            (vote.agreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}
                          %(
                          {vote.agreeCnt}명)
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
                      </div>
                      <div
                        className="false"
                        style={{
                          width: `${(
                            (vote.disagreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}%`,
                          cursor: "pointer",
                        }}
                        onClick={disagreeClick}
                      >
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "right",
                            marginBottom: "30px",
                          }}
                        >
                          {(
                            (vote.disagreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}
                          %({vote.disagreeCnt}명){" "}
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
            ) : (
              <div id="main" style={{ width: "100%" }}>
                <div
                  className="inner"
                  style={{ width: "127%", transform: "translate(-192px,10px)" }}
                >
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
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "1.3rem",
                          }}
                        >
                          확진자 정보, 백신접종 정보, 국내외 발생 현황, 전세계
                          확진 현황
                        </p>
                      </header>
                      <p
                        style={{ fontFamily: "Droid Sans", fontSize: "1.1rem" }}
                      >
                        저희 서비스를 이용하시면{" "}
                        <strong>
                          확진환자, 격리해제, 격리중, 사망자의 현황
                        </strong>
                        을 알 수 있고, <strong>백신접종 현황</strong>을 알 수
                        있습니다. 또한 <strong>시도별 확진자 수</strong>를
                        확인할 수 있으며,{" "}
                        <strong>국내뿐만 아니라 국외 발생동향</strong>도 알 수
                        있습니다. 더 나아가 코로나 백신 접종 현황까지 한 눈에
                        확인 가능합니다.
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
                        <li>
                          <a
                            onClick={modalClose}
                            className="button big"
                            style={{
                              fontFamily: "Droid Sans",
                              fontSize: "0.8rem",
                            }}
                          >
                            내 주변 선별진료소 확인
                          </a>
                          {modalOpen && (
                            <ModalSetting
                              modalClose={modalClose}
                            ></ModalSetting>
                          )}
                        </li>
                      </ul>
                    </div>
                    <span className="image object">
                      <img src={covidLogo} alt="" />
                    </span>
                  </section>

                  <section>
                    <div style={{ textAlign: "center" }}>
                      <h1>
                        {" "}
                        <strong style={{ color: "#f56a6a" }}>
                          {" "}
                          오늘의 투표
                        </strong>
                      </h1>
                      <h1
                        style={{
                          fontFamily: "Droid Sans",
                          fontSize: "2rem",
                          textAlign: "center",
                          marginBottom: "30px",
                        }}
                      >
                        "{vote.content}"
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
                      <div
                        className="true"
                        style={{
                          width: `${(
                            (vote.agreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}%`,
                          cursor: "pointer",
                        }}
                        onClick={agreeClick}
                      >
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "left",
                            marginBottom: "30px",
                          }}
                        >
                          <strong style={{ color: "#FA6A90" }}>찬성</strong>{" "}
                          {(
                            (vote.agreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}
                          %(
                          {vote.agreeCnt}명)
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
                      </div>
                      <div
                        className="false"
                        style={{
                          width: `${(
                            (vote.disagreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}%`,
                          cursor: "pointer",
                        }}
                        onClick={disagreeClick}
                      >
                        <h1
                          style={{
                            fontFamily: "Droid Sans",
                            fontSize: "2rem",
                            textAlign: "right",
                            marginBottom: "30px",
                          }}
                        >
                          {(
                            (vote.disagreeCnt /
                              (vote.agreeCnt + vote.disagreeCnt)) *
                            100
                          ).toFixed(1)}
                          %({vote.disagreeCnt}명){" "}
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
            )}
            <SideBar sidebar={sidebar} changeState={changeState} />
          </div>
        </body>
      </html>
    </>
  );
}

export default CommunityPage;
