import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";

import Detail from "./Sections/Detail";

import covidLogo from "../../../images/covid.png";
import mypageImg from "../../../images/my.png";
import infoImg1 from "../../../images/picture1.png";
import infoImg2 from "../../../images/picture2.png";
import infoImg3 from "../../../images/picture3.png";

function FileDetailPage(props) {
  const fileId = props.match.params.fileId;
  const variable = { fileId: fileId };
  const [fileDetail, setFileDetail] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Axios.post("/api/community/getFileDetail", variable).then((response) => {
      if (response.data.success) {
        setFileDetail(response.data.fileDetail);
      } else {
        alert("비디오 정보를 가져오는데 실패했습니다");
      }
    });

    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
        console.log(comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패 하였습니다");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment));
  };

  if (fileDetail.writer) {
    return (
      <html th="http://www.thymeleaf.org" src="http://www.w3.org/1999/xhtml">
        <head>
          <title>코로나 시대 살아남기</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </head>
        <body>
          <div id="wrapper">
            <div id="main">
              <div class="inner">
                <header id="header">
                  <a href="community.html" class="logo">
                    <strong>자유게시판</strong>
                  </a>
                  <ul class="icons">
                    <li>
                      <a href="#" class="icon fa-twitter">
                        <span class="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="icon fa-facebook">
                        <span class="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="icon fa-snapchat-ghost">
                        <span class="label">Snapchat</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="icon fa-instagram">
                        <span class="label">Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="icon fa-medium">
                        <span class="label">Medium</span>
                      </a>
                    </li>
                  </ul>
                </header>

                <section>
                  <Detail
                    fileDetail={fileDetail}
                    fileId={fileId}
                    comments={comments}
                    refreshFunction={refreshFunction}
                  />
                </section>
              </div>
            </div>

            <div id="sidebar">
              <div class="inner">
                <section id="search" class="alt">
                  <form method="post" action="#">
                    <input
                      type="text"
                      name="query"
                      id="query"
                      placeholder="Search"
                    />
                  </form>
                </section>

                <nav id="menu">
                  <header class="major">
                    <h2>Menu</h2>
                  </header>
                  <ul>
                    <li>
                      <a href="/">홈</a>
                    </li>
                    <li>
                      <span class="opener">게시판</span>
                      <ul>
                        <li>
                          <a href="/">자유게시판</a>
                        </li>
                        <li>
                          <a href="/">비밀게시판</a>
                        </li>
                        <li>
                          <a href="/">정보공유게시판</a>
                        </li>
                        <li>
                          <a href="/">백신게시판</a>
                        </li>
                        <li>
                          <a href="/">코로나검사게시판</a>
                        </li>
                        <li>
                          <a href="/">자가격리게시판</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/">항목 추가하기</a>
                    </li>
                  </ul>
                </nav>

                <section>
                  <header class="major">
                    <h2>My page</h2>
                  </header>
                  <div class="mini-posts">
                    <article id="mypage">
                      <a href="#" class="image">
                        <img src={mypageImg} alt="" />
                      </a>
                      {/* <p>회원명 : {file.writer.name}</p> */}

                      <p align="center">
                        커뮤니티 이용을 위해 <br />
                        회원가입이 필요합니다!
                      </p>
                    </article>
                  </div>
                  <ul class="actions" id="actions-more">
                    <li>
                      <a href="../member/signIn.html" class="button">
                        Sign in
                      </a>
                    </li>
                    <li>
                      <a href="../member/signUp.html" class="button">
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <header class="major">
                    <h2>Information</h2>
                  </header>
                  <div class="mini-posts">
                    <article>
                      <a
                        href="https://blog.naver.com/mohw2016/222358574027"
                        class="image"
                      >
                        <img src={infoImg1} alt="" />
                      </a>
                    </article>
                    <article>
                      <a
                        href="http://ncov.mohw.go.kr/infoBoardView.do?brdId=3&brdGubun=32&dataGubun=328&ncvContSeq=4720&contSeq=4720&board_id=&gubun="
                        class="image"
                      >
                        <img src={infoImg2} alt="" />
                      </a>
                    </article>
                    <article>
                      <a
                        href="https://www.youtube.com/watch?v=6e3JLnOMPQk"
                        class="image"
                      >
                        <img src={infoImg3} alt="" />
                      </a>
                    </article>
                  </div>
                  <ul class="actions" id="actions-more">
                    <li>
                      <a href="#" class="button">
                        More
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <header class="major">
                    <h2>Get in touch</h2>
                  </header>
                  <p>
                    이 서비스는 충북대학교 소프트웨어학과 4학년 졸업작품
                    프로젝트로, WIWY팀이 창작한 것입니다. 수정 사항 및 요청
                    사항이 있으면 아래로 연락 바랍니다.
                  </p>
                  <ul class="contact">
                    <li class="fa-envelope-o">
                      <a href="#">spy03128@naver.com</a>
                    </li>
                    <li class="fa-phone">010-4934-0543</li>
                    <li class="fa-home">
                      충청북도 청주시 서원구 충대로1
                      <br />
                      충북대학교, 28644
                    </li>
                  </ul>
                </section>

                <footer id="footer">
                  homepage, made by <i class="fa fa-love"></i>
                  <a href="https://naver.com">WIWY</a>
                  <div class="footer-row">
                    <ul class="icons">
                      <li>
                        <a href="#" class="icon fa-twitter">
                          <span class="label">Twitter</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="icon fa-facebook">
                          <span class="label">Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="icon fa-instagram">
                          <span class="label">Instagram</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="icon fa-github">
                          <span class="label">Github</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="icon fa-dribbble">
                          <span class="label">Dribbble</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="icon fa-tumblr">
                          <span class="label">Tumblr</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default FileDetailPage;
