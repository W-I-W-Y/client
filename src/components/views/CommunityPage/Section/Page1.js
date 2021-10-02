import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../Config";
import Axios from "axios";

function Page1(props) {
  const boardId = props.match.params.boardId;
  const pageNum = props.match.params.pageNum;
  console.log(boardId);
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

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/board/${boardId}/view/0`).then(
      (response, index) => {
        if (response.data !== null) {
          console.log("data check");
          console.log(response.data);
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
              <div class="inner">
                <header id="header">
                  <a href="community.html" class="logo">
                    <strong>{post.boardName}</strong>
                    <p>{post.description}</p>
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
                <table className="tabel-list">
                  <thead className="table-head py-3 px-4 d-none d-lg-block bg-light">
                    <tr className="row align-items-sm-center text-center text-dark">
                      <th className="col-sm-7">내용</th>
                      <th className="col-sm-2">작성자</th>
                      <th className="col-sm-3">작성일</th>
                    </tr>
                  </thead>

                  {post.map((post, index) => (
                    <tbody
                      key={index}
                      className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                      style={{ cursor: "pointer" }}
                    >
                      <tr>
                        <td id={index} className="col-sm-7 thtitle">
                          {post.postName}
                          <div className="tag">
                            <p>{post.content}</p>
                          </div>
                        </td>
                        <td id={index} className="col-sm-2">
                          {post.username}
                        </td>
                        <td id={index} className="col-sm-3">
                          {post.calculateTime}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>

                <section>
                  <div class="posts">
                    <article>
                      <div class="board">
                        <a class="list" href="#">
                          <time>{post.calculateTime}</time>
                          <p>{post.content}</p>
                        </a>
                      </div>
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
