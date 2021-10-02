import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../Config";
import { Button, message } from "antd";
import Axios from "axios";
import mypageImg from "../../../../images/my.png";
import infoImg1 from "../../../../images/picture1.png";
import infoImg2 from "../../../../images/picture2.png";
import infoImg3 from "../../../../images/picture3.png";

function SideBar() {
  const [board, setBoard] = useState([]);
  const [BoardName, setBoardName] = useState([]);
  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/board/view`).then((response, index) => {
      if (response.data !== null) {
        console.log(response.data);

        setBoard(response.data);
        response.data.forEach((lists) => {
          setBoardName((state) => [
            ...state,
            {
              boardName: lists.boardName,
            },
          ]);
        });
      } else {
        alert("파일을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div id="sidebar">
      <div className="inner">
        <section id="search" className="alt">
          <form method="post" action="#">
            <input type="text" name="query" id="query" placeholder="Search" />
          </form>
        </section>

        <nav id="menu">
          <header className="major">
            <h2>Menu</h2>
          </header>
          <ul>
            <li>
              <a href="/">홈</a>
            </li>
            <li>
              <span className="opener">게시판</span>
              <ul>
                {BoardName.map((BoardName, index) => (
                  <li key={index}>
                    <a href={"/community/" + Number(index + 1)}>
                      {BoardName.boardName}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="/">항목 추가하기</a>
            </li>
          </ul>
        </nav>

        <section>
          <header className="major">
            <h2>My page</h2>
          </header>
          <div className="mini-posts">
            <article id="mypage">
              <a href="#" className="image">
                <img src={mypageImg} alt="" />
              </a>
              {/* <p>회원명 : {file.writer.name}</p> */}

              <p align="center">
                커뮤니티 이용을 위해 <br />
                회원가입이 필요합니다!
              </p>
            </article>
          </div>
          <ul className="actions" id="actions-more">
            <li>
              <a href="../member/signIn.html" className="button">
                Sign in
              </a>
            </li>
            <li>
              <a href="../member/signUp.html" className="button">
                Sign Up
              </a>
            </li>
          </ul>
        </section>

        <section>
          <header className="major">
            <h2>Information</h2>
          </header>
          <div className="mini-posts">
            <article>
              <a
                href="https://blog.naver.com/mohw2016/222358574027"
                className="image"
              >
                <img src={infoImg1} alt="" />
              </a>
            </article>
            <article>
              <a
                href="http://ncov.mohw.go.kr/infoBoardView.do?brdId=3&brdGubun=32&dataGubun=328&ncvContSeq=4720&contSeq=4720&board_id=&gubun="
                className="image"
              >
                <img src={infoImg2} alt="" />
              </a>
            </article>
            <article>
              <a
                href="https://www.youtube.com/watch?v=6e3JLnOMPQk"
                className="image"
              >
                <img src={infoImg3} alt="" />
              </a>
            </article>
          </div>
          <ul className="actions" id="actions-more">
            <li>
              <a href="#" className="button">
                More
              </a>
            </li>
          </ul>
        </section>

        <section>
          <header className="major">
            <h2>Get in touch</h2>
          </header>
          <p>
            이 서비스는 충북대학교 소프트웨어학과 4학년 졸업작품 프로젝트로,
            WIWY팀이 창작한 것입니다. 수정 사항 및 요청 사항이 있으면 아래로
            연락 바랍니다.
          </p>
          <ul className="contact">
            <li className="fa-envelope-o">
              <a href="#">spy03128@naver.com</a>
            </li>
            <li className="fa-phone">010-4934-0543</li>
            <li className="fa-home">
              충청북도 청주시 서원구 충대로1
              <br />
              충북대학교, 28644
            </li>
          </ul>
        </section>

        <footer id="footer">
          homepage, made by <i className="fa fa-love"></i>
          <a href="https://naver.com">WIWY</a>
          <div className="footer-row">
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
                <a href="#" className="icon fa-instagram">
                  <span className="label">Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon fa-github">
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon fa-dribbble">
                  <span className="label">Dribbble</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon fa-tumblr">
                  <span className="label">Tumblr</span>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SideBar;
