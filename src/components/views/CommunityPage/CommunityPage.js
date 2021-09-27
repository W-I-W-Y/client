import React, { useEffect, useState } from "react";
import "../../../css/index.css";
import covidLogo from "../../../images/covid.png";
import mypageImg from "../../../images/my.png";
import infoImg1 from "../../../images/picture1.png";
import infoImg2 from "../../../images/picture2.png";
import infoImg3 from "../../../images/picture3.png";
// import "../../../js/index";
import $ from "jquery";
import { Helmet } from "react-helmet";
import PostPage from "./Section/PostPage";
import axios from "axios";

function CommunityPage() {
  useEffect(() => {
    // var $window = $(window),
    //   $head = $("head"),
    //   $body = $("body");

    // // Sidebar.
    // var $sidebar = $("#sidebar"),
    //   $sidebar_inner = $sidebar.children(".inner");

    // // Inactive by default on <= large.
    // skel
    //   .on("+large", function () {
    //     $sidebar.addClass("inactive");
    //   })
    //   .on("-large !large", function () {
    //     $sidebar.removeClass("inactive");
    //   });

    // // Hack: Workaround for Chrome/Android scrollbar position bug.
    // if (skel.vars.os == "android" && skel.vars.browser == "chrome")
    //   $(
    //     "<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>"
    //   ).appendTo($head);

    // // Toggle.
    // if (skel.vars.IEVersion > 9) {
    //   $('<a href="#sidebar" class="toggle">Toggle</a>')
    //     .appendTo($sidebar)
    //     .on("click", function (event) {
    //       // Prevent default.
    //       event.preventDefault();
    //       event.stopPropagation();

    //       // Toggle.
    //       $sidebar.toggleClass("inactive");
    //     });
    // }

    // // Events.

    // // Link clicks.
    // $sidebar.on("click", "a", function (event) {
    //   // >large? Bail.
    //   if (!skel.breakpoint("large").active) return;

    //   // Vars.
    //   var $a = $(this),
    //     href = $a.attr("href"),
    //     target = $a.attr("target");

    //   // Prevent default.
    //   event.preventDefault();
    //   event.stopPropagation();

    //   // Check URL.
    //   if (!href || href == "#" || href == "") return;

    //   // Hide sidebar.
    //   $sidebar.addClass("inactive");

    //   // Redirect to href.
    //   setTimeout(function () {
    //     if (target == "_blank") window.open(href);
    //     else window.location.href = href;
    //   }, 500);
    // });

    // // Prevent certain events inside the panel from bubbling.
    // $sidebar.on("click touchend touchstart touchmove", function (event) {
    //   // >large? Bail.
    //   if (!skel.breakpoint("large").active) return;

    //   // Prevent propagation.
    //   event.stopPropagation();
    // });

    // // Hide panel on body click/tap.
    // $body.on("click touchend", function (event) {
    //   // >large? Bail.
    //   if (!skel.breakpoint("large").active) return;

    //   // Deactivate.
    //   $sidebar.addClass("inactive");
    // });

    // // Scroll lock.
    // // Note: If you do anything to change the height of the sidebar's content, be sure to
    // // trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

    // $window.on("load.sidebar-lock", function () {
    //   var sh, wh, st;

    //   // Reset scroll position to 0 if it's 1.
    //   if ($window.scrollTop() == 1) $window.scrollTop(0);

    //   $window
    //     .on("scroll.sidebar-lock", function () {
    //       var x, y;

    //       // IE<10? Bail.
    //       if (skel.vars.IEVersion < 10) return;

    //       // <=large? Bail.
    //       if (skel.breakpoint("large").active) {
    //         $sidebar_inner.data("locked", 0).css("position", "").css("top", "");

    //         return;
    //       }

    //       // Calculate positions.
    //       x = Math.max(sh - wh, 0);
    //       y = Math.max(0, $window.scrollTop() - x);

    //       // Lock/unlock.
    //       if ($sidebar_inner.data("locked") == 1) {
    //         if (y <= 0)
    //           $sidebar_inner
    //             .data("locked", 0)
    //             .css("position", "")
    //             .css("top", "");
    //         else $sidebar_inner.css("top", -1 * x);
    //       } else {
    //         if (y > 0)
    //           $sidebar_inner
    //             .data("locked", 1)
    //             .css("position", "fixed")
    //             .css("top", -1 * x);
    //       }
    //     })
    //     .on("resize.sidebar-lock", function () {
    //       // Calculate heights.
    //       wh = $window.height();
    //       sh = $sidebar_inner.outerHeight() + 30;

    //       // Trigger scroll.
    //       $window.trigger("scroll.sidebar-lock");
    //     })
    //     .trigger("resize.sidebar-lock");
    // });

    // Menu.
    var $menu = $("#menu"),
      $menu_openers = $menu.children("ul").find(".opener");

    // Openers.
    $menu_openers.each(function () {
      var $this = $(this);

      $this.on("click", function (event) {
        // Prevent default.
        event.preventDefault();

        // Toggle.
        $menu_openers.not($this).removeClass("active");
        $this.toggleClass("active");

        // // Trigger resize (sidebar lock).
        // $window.triggerHandler("resize.sidebar-lock");
      });
    });
  }, []);

  const [file, setFile] = useState([]);

  useEffect(() => {
    axios.get("/api/community/getFiles").then((response) => {
      if (response.data.success) {
        console.log(response.data.files);
        setFile(response.data.files);
      } else {
        alert("파일을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <Helmet>
        <script src="../../../js/jquery.min.js"></script>
        <script src="../../../js/skel.min.js"></script>
        <script src="../../../js/util.js"></script>
        <script src="../../../js/index.js"></script>
      </Helmet>

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
                    <strong>코로나 시대</strong> 살아남기
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

                <section id="banner">
                  <div class="content">
                    <header>
                      <h1>
                        코로나 시대를 살아가는 여러분들을 위한
                        <br />
                        <strong>코로나 정보 제공 서비스</strong>
                      </h1>
                      <p>확진자 정보부터 국내외 발생 현황, 백신 현황까지</p>
                    </header>
                    <p>
                      저희 서비스를 이용하시면 확진환자, 격리해제, 격리중,
                      사망자의 현황을 파악할 수 있고, 시도별 확진자 수를 확인할
                      수 있으며, 국내뿐만 아니라 국외 발생동향도 알 수 있습니다.
                      더 나아가 코로나 백신 접종 현황까지 한 눈에 확인
                      가능합니다.
                    </p>
                    <ul class="actions">
                      <li>
                        <a href="/" class="button big">
                          정보 알아보기
                        </a>
                      </li>
                    </ul>
                  </div>
                  <span class="image object">
                    <img src={covidLogo} alt="" />
                  </span>
                </section>

                <section>
                  <header class="major">
                    <h2>게시판</h2>
                  </header>
                  <div class="posts">
                    <article>
                      <div class="board">
                        <h3>자유게시판</h3>
                        <a class="list" href="#">
                          <time>방금</time>
                          <p>가나다</p>
                        </a>
                      </div>
                      <ul class="actions" id="actions-more">
                        <li>
                          <a href="board_main.html" class="button">
                            More
                          </a>
                        </li>
                      </ul>
                    </article>
                  </div>
                </section>
                <section>
                  <PostPage />
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
                          <a href="/community/1">자유게시판</a>
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
    </div>
  );
}

export default CommunityPage;
