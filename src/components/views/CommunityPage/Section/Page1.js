import React, { useEffect, useState } from "react";

function Page1() {
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
  return (
    <div>
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
                  <div class="posts">
                    <article>
                      <div class="board">
                        <a class="list" href="#">
                          <time>방금</time>
                          <p>가나다</p>
                        </a>
                        <a class="list" href="#">
                          <time>방금</time>
                          <p>가나다</p>
                        </a>
                        <a class="list" href="#">
                          <time>방금</time>
                          <p>가나다</p>
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
              </div>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
}

export default Page1;
