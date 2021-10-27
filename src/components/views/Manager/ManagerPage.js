import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Typography, Button, Form, message, Input, Icon, Row, Col } from "antd";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
function ManagerPage() {
  const history = useHistory();
  const [boardTitle, setBoardTitle] = useState("");
  const [description, setDescription] = useState("");

  const [board, setBoard] = useState([]);
  const [boardOption, setBoardOption] = useState("자유게시판");

  const [add, setAdd] = useState(true);

  const [voteContent, setVoteContent] = useState("");

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/board/view`, { headers }).then(
      (response, index) => {
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
      }
    );
  }, []);

  const onTitleChange = (e) => {
    setBoardTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onBoardChange = (e) => {
    setBoardOption(e.currentTarget.value);
  };

  const onAddSubmit = (e) => {
    e.preventDefault();

    const variable = {
      boardName: boardTitle,
      description: description,
      // privacy: prvite,
      // filePath: filePath,
      // category: category,
    };

    Axios.post(`${USER_SERVER}/api/board/add`, variable).then((response) => {
      console.log(response.data);
      if (response.data === "addBoard") {
        message.success("게시판을 성공적으로 생성했습니다");
        setTimeout(() => {
          history.push("/community");
          window.scrollTo(0, 0);
          window.location.reload();
        }, 2000);
      } else {
        alert("게시판 생성을 실패했습니다.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      boardName: String(boardOption),
      description: "Hi",
      // privacy: prvite,
      // filePath: filePath,
      // category: category,
    };
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.post(`${USER_SERVER}/api/board/delete`, variable, { headers }).then(
      (response) => {
        console.log(response.data);
        if (response.data === "deleteBoard") {
          message.success("게시판을 성공적으로 삭제했습니다");
          setTimeout(() => {
            history.push("/community");
            // window.scrollTo(0, 0);
          }, 3000);
          // window.location.reload();
        } else {
          alert("게시판 삭제를 실패했습니다.");
        }
      }
    );
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleDelete = () => {
    setAdd(false);
  };

  const onVoteSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: voteContent,
    };
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.post(`${USER_SERVER}/api/vote/add`, variable, { headers }).then(
      (response) => {
        console.log(response.data);
        if (response.data === "addVote") {
          message.success("투표를 성공적으로 생성했습니다.");
          setTimeout(() => {
            history.push("/community");
            // window.scrollTo(0, 0);
          }, 3000);
          // window.location.reload();
        } else {
          alert("투표 생성을 실패했습니다.");
        }
      }
    );
  };

  const onVoteChange = (e) => {
    setVoteContent(e.currentTarget.value);
  };

  return (
    <div>
      <ul className="actions" id="actions-more">
        <li>
          <a
            className="button"
            onClick={handleAdd}
            style={{
              fontFamily: "Droid Sans",
              fontSize: "0.7rem",
              margin: "10px",
            }}
          >
            게시판 만들기
          </a>
          <a
            className="button"
            onClick={handleDelete}
            style={{
              fontFamily: "Droid Sans",
              fontSize: "0.7rem",
              margin: "10px",
            }}
          >
            게시판 삭제하기
          </a>
        </li>
      </ul>

      <div>
        {add ? (
          <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
              <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <Title level={2}>게시판 생성하기</Title>
                </div>

                <Form onSubmit={onAddSubmit}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <br />
                    <br />
                    <label>Title</label>
                    <Input onChange={onTitleChange} value={boardTitle} />
                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea
                      onChange={onDescriptionChange}
                      value={description}
                    ></TextArea>
                    <br />
                    <br />
                    <Button type="primary" size="large" onClick={onAddSubmit}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        ) : (
          <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
              <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <Title level={2}>게시판 삭제하기</Title>
                </div>

                <table className="tabel-list">
                  <thead className="table-head py-3 px-4 d-none d-lg-block bg-light">
                    <tr className="row align-items-sm-center text-center text-dark">
                      <th className="col-sm-10">게시판 제목</th>
                      <th className="col-sm-14">게시판 설명</th>
                    </tr>
                  </thead>

                  {board.map((board, index) => (
                    <>
                      <tbody
                        key={index}
                        className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
                        style={{ cursor: "pointer" }}
                      >
                        <tr>
                          {/* <Checkbox key={index} name="board" /> */}
                          <td></td>
                          <td id={index} className="col-sm-10 thtitle">
                            {board.boardName}
                          </td>
                          <td id={index} className="col-sm-14">
                            {board.description}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </table>
                <select onChange={onBoardChange}>
                  {board.map((board, index) => (
                    <option key={index} value={board.boardName}>
                      {board.boardName}
                    </option>
                  ))}
                </select>
                <Button type="primary" size="large" onClick={onSubmit}>
                  삭제하기
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <div>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>투표 생성하기</Title>
        </div>
        <Form onSubmit={onVoteSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "60%",
              alignItems: "center",
            }}
          >
            <br />
            <br />
            <label>투표 제목</label>
            <Input onChange={onVoteChange} value={voteContent} />
            <br />
            <br />

            <Button type="primary" size="large" onClick={onVoteSubmit}>
              투표 생성
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ManagerPage;
