import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../Config";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import SideBar from "./SideBar";

function Page2(props) {
  const pageNum = props.match.params.pageNum;
  // const variable = { boardId: boardId };
  //NOTE 전체 페이지 갯수
  const [pageTotalNum, setPageTotalNum] = useState(4);

  //NOTE 선택한 페이지 번호
  const [pagingNum, setPagingNum] = useState(0);

  //NOTE 10개씩 세팅되는 리스트
  const [pageList, setPageList] = useState([]);

  //SECTION pagination
  const paginationNum = [];
  // pageTotalNum

  for (let i = 0; i < pageTotalNum; i++) {
    paginationNum.push(i + 1);
  }
  const [sidebar, setSidebar] = useState(true);
  const [page, setPage] = useState([]);

  const changeState = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };

  const [post, setPost] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/sido/view/${pageNum}`, {
      headers,
    }).then((response, index) => {
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
              boardDescription: lists.boardDescription,
            },
          ]);
        });
      } else {
        alert("게시글을 가져오는데 실패했습니다.");
      }
    });

    Axios.get(`${USER_SERVER}/api/sido/pagination`, { headers }).then(
      (response, index) => {
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
      }
    );
  }, []);

  const history = useHistory();
  const detailPost = (id) => {
    history.push("../../../post/view/" + id);
    window.scrollTo(0, 0);
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
                          {post[0]?.boardName}
                        </strong>
                        <p
                          style={{
                            fontFamily: "Droid Sans",
                            marginTop: "20px",
                          }}
                        >
                          {post[0]?.boardDescription}
                        </p>
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
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "end",
                            marginTop: "20px",
                          }}
                        >
                          <a className="button" href="/add/sido">
                            글쓰기
                          </a>
                        </div>
                      </ul>
                    </header>

                    <table className="tabel-list">
                      <thead className="table-head py-3 px-4 d-none d-lg-block bg-light">
                        <tr className="row align-items-sm-center text-center text-dark">
                          <Col span={16}>내용</Col>
                          <Col span={4}>작성자</Col>
                          <Col span={4}>작성일</Col>
                        </tr>
                      </thead>

                      {post.map((post, index) => (
                        <tbody
                          onClick={() => detailPost(post.id)}
                          value={post.id}
                          key={index}
                          className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                        >
                          <tr style={{ cursor: "pointer" }}>
                            <Col
                              span={16}
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
                            <Col span={4}>{post.username}</Col>
                            <Col span={4}>{post.calculateTime}</Col>
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
                </div>
              </div>
            </Col>
          </Row>
        </body>
      </html>
    </div>
  );
}

export default Page2;
