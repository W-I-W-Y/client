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

  const [board, setBoard] = useState([]);

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/board/view`).then((response, index) => {
      if (response.data !== null) {
        console.log("data check");
        console.log(response.data);
        response.data.forEach((lists) => {
          setBoard((state) => [
            ...state,
            {
              id: lists.id,
              boardName: lists.boardName,
              description: lists.description,
            },
          ]);
        });
      } else {
        alert("게시판을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const renderCards = board.map((board, index) => {
    return (
      <Col key={index} lg={12} md={12} xs={24}>
        <div className="posts">
          <article>
            <div className="board">
              <h3>{board.boardName}</h3>
              <a className="list" href="#">
                <time>방금</time>
                <p>가나다</p>
              </a>
            </div>
            <ul className="actions" id="actions-more">
              <li>
                <a
                  className="button"
                  href={"/board/" + Number(board.id) + "/view/" + Number(0)}
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
                <ul className="actions" id="actions-more">
                  <li>
                    <a className="button" href="/board/add">
                      게시판 만들기
                    </a>
                    <a className="button" href="/board/delete">
                      게시판 삭제하기
                    </a>
                  </li>
                </ul>
                <header id="header">
                  <a href="community.html" className="logo">
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
                    <ul className="actions">
                      <li>
                        <a href="/" className="button big">
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
                  <header className="major">
                    <h2>게시판</h2>
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
