import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Typography, Form, message, Input, Row, Col, Table } from "antd";
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

  const columns = [
    {
      title: "게시판 제목",
      dataIndex: "boardName",
      key: "boardName",
    },
    {
      title: "게시판 설명",
      dataIndex: "description",
      key: "description",
    },
  ];

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
                  <Title
                    level={2}
                    style={{ fontFamily: "Droid Sans", fontSize: "1.7rem" }}
                  >
                    게시판 생성하기
                  </Title>
                </div>

                <Form onSubmit={onAddSubmit}>
                  <div
                    style={{
                      display: "block",
                      justifyContent: "space-between",
                    }}
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

                    <a
                      className="button"
                      onClick={onAddSubmit}
                      style={{
                        fontFamily: "Droid Sans",
                        fontSize: "0.7rem",
                        margin: "10px",
                      }}
                    >
                      Submit
                    </a>
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
                  <Title
                    level={2}
                    style={{ fontFamily: "Droid Sans", fontSize: "1.7rem" }}
                  >
                    게시판 삭제하기
                  </Title>
                </div>

                <Table
                  dataSource={board}
                  columns={columns}
                  pagination={{
                    total: 1000,
                    pageSize: 1000,
                    hideOnSinglePage: true,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select onChange={onBoardChange}>
                    {board.map((board, index) => (
                      <option key={index} value={board.boardName}>
                        {board.boardName}
                      </option>
                    ))}
                  </select>

                  <a
                    className="button"
                    onClick={onSubmit}
                    style={{
                      fontFamily: "Droid Sans",
                      fontSize: "0.7rem",
                      margin: "10px",
                    }}
                  >
                    DELETE
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={24} xs={24}>
          <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <Title
                level={2}
                style={{ fontFamily: "Droid Sans", fontSize: "1.7rem" }}
              >
                투표 생성하기
              </Title>
            </div>
            <Form onSubmit={onVoteSubmit}>
              <div
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label>Vote Content</label>
                <Input onChange={onVoteChange} value={voteContent} />
                <br />

                <a
                  className="button"
                  onClick={onVoteSubmit}
                  style={{
                    fontFamily: "Droid Sans",
                    fontSize: "0.7rem",
                    margin: "10px",
                  }}
                >
                  SUBMIT
                </a>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ManagerPage;
