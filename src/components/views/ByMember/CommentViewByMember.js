import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import SideBar from "../CommunityPage/Section/SideBar";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router";

function CommentViewByMember() {
  const [comment, setComment] = useState([]);
  const headers = {
    Authorization: `Bearer ` + localStorage.getItem("token"),
  };
  // const variable = {
  //   pageNum: Number(0),
  // };
  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/comment/viewByMember/0`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          response.data.forEach((lists) => {
            setComment((state) => [
              ...state,
              {
                id: lists.id,
                content: lists.content,
                calculateTime: lists.calculateTime,
                createTime: lists.createTime,
                username: lists.username,
                postName: lists.postName,
                likes: lists.likes,
                hates: lists.hates,
                author: lists.author,
                postId: lists.postId,
              },
            ]);
          });
          console.log("데이터 받아오는데 성공");
        } else {
          alert("내가 쓴 게시글을 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  const history = useHistory();
  const detailPost = (id) => {
    history.push("../../../post/view/" + id);
    window.scrollTo(0, 0);
  };

  console.log("이건?");

  const deleteComment = (Id) => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    const variable = {
      commentId: Id,
    };
    Axios.post(`${USER_SERVER}/api/comment/delete/${Id}`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "deleteComment") {
        console.log(response.data);
      } else {
        alert("커멘트를 삭제하지 못했습니다");
      }
    });
    window.location.reload();
  };

  return (
    <Row gutter={[16, 16]}>
      <Col lg={4} xs={24} style={{ zIndex: "1000" }}>
        <SideBar />
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
                    내가 쓴 댓글
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
                    <Col span={16}>내용</Col>
                    <Col span={4}>작성일</Col>
                    <Col span={4}></Col>
                  </tr>
                </thead>

                {comment.map((comment, index) => (
                  <tbody
                    value={comment.id}
                    key={index}
                    className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                  >
                    <tr style={{ cursor: "pointer" }}>
                      <Col
                        span={16}
                        style={{
                          fontFamily: "Droid Sans",
                          fontSize: "0.9rem",
                        }}
                        onClick={() => detailPost(comment.postId)}
                      >
                        <p>게시글 제목 : {comment.postName}</p>
                        <p>
                          <strong
                            style={{
                              fontFamily: "Droid Sans",
                              fontSize: "1rem",
                            }}
                          >
                            댓글 : [ {comment.content} ]
                          </strong>
                        </p>
                        <ul
                          className="article-status"
                          style={{ marginLeft: "-30px", float: "left" }}
                        >
                          <li
                            title="공감"
                            className="vote"
                            style={{
                              fontFamily: "Droid Sans",
                              fontSize: "0.9rem",
                            }}
                          >
                            👍🏻 {comment.likes}
                          </li>
                          <li
                            title="공감"
                            className="vote"
                            style={{
                              fontFamily: "Droid Sans",
                              fontSize: "0.9rem",
                            }}
                          >
                            👎🏻 {comment.hates}
                          </li>
                        </ul>
                      </Col>
                      <Col span={4}>{comment.calculateTime}</Col>
                      <Col span={4}>
                        <button
                          style={{ width: "95%", height: "52px" }}
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          댓글 삭제하기
                        </button>
                      </Col>
                    </tr>
                  </tbody>
                ))}
              </table>

              <section>
                <div
                  className="posts"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <article>
                    <div className="pagination">
                      {/* <ul>
                              {paginationNum.map((i, index) => {
                                return (
                                  <li key={index} onClick={paginationOnclick}>
                                    {paginationNum[index]}
                                  </li>
                                );
                              })}
                            </ul> */}
                      <ul className="pagination">
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
  );
}

export default CommentViewByMember;
