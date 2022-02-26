import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import SideBar from "../CommunityPage/Section/SideBar";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router";

function LikeHateByMember(props) {
  const pageNum = props.match.params.pageNum;
  const [pageTotalNum, setPageTotalNum] = useState(4);
  const [pageTotalNum2, setPageTotalNum2] = useState(4);

  const [page, setPage] = useState([]);
  const [page2, setPage2] = useState([]);

  const [post, setPost] = useState([]);
  const [hatePost, setHatePost] = useState([]);
  //SECTION pagination
  const paginationNum = [];
  const paginationNum2 = [];

  // pageTotalNum

  for (let i = 0; i < pageTotalNum; i++) {
    paginationNum.push(i + 1);
  }
  for (let i = 0; i < pageTotalNum2; i++) {
    paginationNum2.push(i + 1);
  }
  const [sidebar, setSidebar] = useState(true);

  const changeState = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };

  const headers = {
    Authorization: `Bearer ` + localStorage.getItem("token"),
  };
  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/post/likeByMember`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          console.log(response.data);
          response.data.forEach((lists) => {
            const newcontent = lists.content
              .replace(/(<([^>]+)>)/gi, " ")
              .replace(/&quot;/g, " ")
              .replace(/\"n/, " ")
              .replace(/&amp;/g, " ")
              .replace(/&nbsp/g, " ")
              .replace(";", "");
            setPost((state) => [
              ...state,
              {
                id: lists.id,
                postName: lists.postName,
                content: newcontent,
                calculateTime: lists.calculateTime,
                createTime: lists.createTime,
                viewCnt: lists.viewCnt,
                likes: lists.likes,
                hates: lists.hates,
                username: lists.username,
                boardName: lists.boardName,
                comCounts: lists.comCounts,
                decription: lists.decription,
              },
            ]);
          });
        } else {
          alert("좋아요를 누른 게시글을 가져오는데 실패했습니다.");
        }
      }
    );

    Axios.get(`${USER_SERVER}/api/post/hateByMember`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          response.data.forEach((lists) => {
            const newcontent = lists.content
              .replace(/(<([^>]+)>)/gi, " ")
              .replace(/&quot;/g, " ")
              .replace(/\"n/, " ")
              .replace(/&amp;/g, " ")
              .replace(/&nbsp/g, " ")
              .replace(";", "");
            setHatePost((state) => [
              ...state,
              {
                id: lists.id,
                postName: lists.postName,
                content: newcontent,
                calculateTime: lists.calculateTime,
                createTime: lists.createTime,
                viewCnt: lists.viewCnt,
                likes: lists.likes,
                hates: lists.hates,
                username: lists.username,
                boardName: lists.boardName,
                comCounts: lists.comCounts,
                decription: lists.decription,
              },
            ]);
          });
        } else {
          alert("좋아요를 누른 게시글을 가져오는데 실패했습니다.");
        }
      }
    );

    Axios.get(`${USER_SERVER}/api/post/likeByMember/pagination`, {
      headers,
    }).then((response, index) => {
      if (response.data !== null) {
        console.log(response.data);
        setPage({
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
        setPageTotalNum(response.data.totalPages);
      } else {
        alert("페이지 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.get(`${USER_SERVER}/api/post/hateByMember/pagination`, {
      headers,
    }).then((response, index) => {
      if (response.data !== null) {
        console.log(response.data);
        setPage2({
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
        setPageTotalNum2(response.data.totalPages);
      } else {
        alert("페이지 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const history = useHistory();
  const detailPost = (id) => {
    history.push("../../../post/view/" + id);
    window.scrollTo(0, 0);
  };

  const deletePost = (postId) => {
    const variable = {
      postId: postId,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.post(`${USER_SERVER}/api/post/delete/${postId}`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "deletePost") {
        console.log(response.data);
      } else {
        alert("파일 삭제를 실패했습니다.");
      }
      window.location.reload();
    });
  };

  return (
    <div>
      <html>
        <head>
          <title>코로나 시대 살아남기</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </head>

        <body>
          <Row gutter={[16, 16]}>
            <Col lg={4} xs={24} style={{ zIndex: "1000" }}>
              <SideBar sidebar={sidebar} changeState={changeState} />
            </Col>
            <Col lg={20} xs={24}>
              <div id="wrapper">
                <div id="main">
                  <div className="inner">
                    <header id="header">
                      <a href="#" className="logo">
                        <strong
                          style={{ fontFamily: "Droid Sans", fontSize: "2rem" }}
                        >
                          좋아요 누른 글
                        </strong>
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

                    <table className="tabel-list">
                      <thead className="table-head py-3 px-4 d-none d-lg-block bg-light">
                        <tr className="row align-items-sm-center text-center text-dark">
                          <Col span={18}>내용</Col>
                          <Col span={6}>작성일</Col>
                        </tr>
                      </thead>

                      {post.map((post, index) => (
                        <tbody
                          value={post.id}
                          key={index}
                          className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                        >
                          <tr style={{ cursor: "pointer" }}>
                            <Col
                              onClick={() => detailPost(post.id)}
                              span={18}
                              style={{
                                fontFamily: "Droid Sans",
                                fontSize: "1rem",
                              }}
                            >
                              <strong>{post.postName}</strong>
                              <p
                                style={{
                                  fontFamily: "Droid Sans",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {post.content}
                              </p>
                              <ul
                                class="article-status"
                                style={{ marginRight: "30px" }}
                              >
                                <li
                                  title="공감"
                                  class="vote"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  👍🏻 {post.likes}
                                </li>
                                <li
                                  title="공감"
                                  class="vote"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  👎🏻 {post.hates}
                                </li>
                                <li
                                  title="댓글"
                                  class="comment"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  💬 {post.comCounts}
                                </li>
                              </ul>
                            </Col>
                            <Col span={6}>{post.calculateTime}</Col>
                          </tr>
                        </tbody>
                      ))}
                    </table>

                    <section>
                      <div
                        class="posts"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <article>
                          <div className="pagination">
                            <ul className="pagination">
                              {paginationNum.map((i, index) => {
                                return (
                                  <li key={index}>
                                    <a
                                      href={"./" + (index + 1)}
                                      className="page active"
                                    >
                                      {paginationNum[index]}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </article>
                      </div>
                    </section>
                  </div>
                  <div className="inner">
                    <header id="header">
                      <a href="#" className="logo">
                        <strong
                          style={{ fontFamily: "Droid Sans", fontSize: "2rem" }}
                        >
                          싫어요 누른 글
                        </strong>
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

                    <table className="tabel-list">
                      <thead className="table-head py-3 px-4 d-none d-lg-block bg-light">
                        <tr className="row align-items-sm-center text-center text-dark">
                          <Col span={18}>내용</Col>
                          <Col span={6}>작성일</Col>
                        </tr>
                      </thead>

                      {hatePost.map((hatePost, index) => (
                        <tbody
                          value={hatePost.id}
                          key={index}
                          className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                        >
                          <tr style={{ cursor: "pointer" }}>
                            <Col
                              onClick={() => detailPost(hatePost.id)}
                              span={16}
                              style={{
                                fontFamily: "Droid Sans",
                                fontSize: "1rem",
                              }}
                            >
                              <strong>{hatePost.postName}</strong>
                              <p
                                style={{
                                  fontFamily: "Droid Sans",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {hatePost.content}
                              </p>
                              <ul
                                class="article-status"
                                style={{ marginRight: "30px" }}
                              >
                                <li
                                  title="공감"
                                  class="vote"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  👍🏻 {hatePost.likes}
                                </li>
                                <li
                                  title="공감"
                                  class="vote"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  👎🏻 {hatePost.hates}
                                </li>
                                <li
                                  title="댓글"
                                  class="comment"
                                  style={{
                                    fontFamily: "Droid Sans",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  💬 {hatePost.comCounts}
                                </li>
                              </ul>
                            </Col>
                            <Col span={6}>{hatePost.calculateTime}</Col>
                          </tr>
                        </tbody>
                      ))}
                    </table>

                    <section>
                      <div
                        class="posts"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <article>
                          <div className="pagination">
                            <ul className="pagination">
                              {paginationNum2.map((i, index) => {
                                return (
                                  <li key={index}>
                                    <a
                                      href={"./" + (index + 1)}
                                      className="page active"
                                    >
                                      {paginationNum2[index]}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                            {/* <ul className="pagination">
                              <li>
                                <span className="button disabled">Prev</span>
                              </li>
                              <li>
                                <a href="#" className="page active">
                                  1
                                </a>
                              </li>
                              <li>
                                <a href="#" className="page">
                                  2
                                </a>
                              </li>
                              <li>
                                <a href="#" className="page">
                                  3
                                </a>
                              </li>
                              <li>
                                <span>&hellip;</span>
                              </li>
                              <li>
                                <a href="#" className="page">
                                  8
                                </a>
                              </li>
                              <li>
                                <a href="#" className="page">
                                  9
                                </a>
                              </li>
                              <li>
                                <a href="#" className="page">
                                  10
                                </a>
                              </li>
                              <li>
                                <a href="#" className="button">
                                  Next
                                </a>
                              </li>
                            </ul> */}
                          </div>
                        </article>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </body>
      </html>
    </div>
  );
}

export default LikeHateByMember;
