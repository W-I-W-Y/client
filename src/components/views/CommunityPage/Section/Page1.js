import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../Config";
import { Row, Col } from "antd";
import Axios from "axios";
import PostPage from "../../PostPage/PostPage";
import { useHistory } from "react-router-dom";

function Page1(props) {
  const boardId = props.match.params.boardId;
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

  const paginationOnclick = (e) => {
    console.log(Number(e.target.innerText) - 1);
    setPagingNum(Number(e.target.innerText) - 1);
  };

  const [post, setPost] = useState([]);
  const [Board, setBoard] = useState("");
  const [BoardDescription, setBoardDescription] = useState("");

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/board/${boardId}/view/0`).then(
      (response, index) => {
        if (response.data !== null) {
          console.log(response.data);
          setBoard(response.data[0].boardName);
          setBoardDescription(response.data[0].boardDescription);
          response.data.forEach((lists) => {
            setPost((state) => [
              ...state,
              {
                id: lists.id,
                postName: lists.postName,
                content: lists.content,
                calculateTime: lists.calculateTime,
                createTime: lists.createTime,
                viewCnt: lists.viewCnt,
                likes: lists.likes,
                hates: lists.hates,
                username: lists.username,
                boardName: lists.boardName,
                comCounts: lists.comCounts,
              },
            ]);
          });
        } else {
          alert("게시글을 가져오는데 실패했습니다.");
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
          <div id="wrapper">
            <div id="main">
              <div className="inner">
                <header id="header">
                  <a href="community.html" className="logo">
                    <strong
                      style={{ fontFamily: "Droid Sans", fontSize: "2rem" }}
                    >
                      {Board}
                    </strong>
                    <p style={{ fontFamily: "Droid Sans", marginTop: "20px" }}>
                      {BoardDescription}
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
                        </Col>
                        <Col span={4}>{post.username}</Col>
                        <Col span={4}>{post.calculateTime}</Col>
                      </tr>
                    </tbody>
                  ))}
                </table>

                <section>
                  <div class="posts">
                    <article>
                      <div className="pagination">
                        <ul>
                          {paginationNum.map((i, index) => {
                            return (
                              <li key={index} onClick={paginationOnclick}>
                                {paginationNum[index]}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </article>
                  </div>
                </section>
                <a className="button" href={"/post/add/" + Number(boardId)}>
                  글쓰기
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
}

export default Page1;
