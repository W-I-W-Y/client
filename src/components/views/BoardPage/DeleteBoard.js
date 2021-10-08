import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Typography,
  Button,
  Form,
  message,
  Input,
  Icon,
  Row,
  Col,
  Table,
  Checkbox,
} from "antd";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router-dom";
import SideBar from "../CommunityPage/Section/SideBar";

const { Title } = Typography;
const { TextArea } = Input;

function Board() {
  const history = useHistory();
  const [board, setBoard] = useState([]);
  const [boardOption, setBoardOption] = useState("자유게시판");

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

  const onBoardChange = (e) => {
    setBoardOption(e.currentTarget.value);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col lg={4} xs={24} style={{ zIndex: "1000" }}>
        <SideBar />
      </Col>
      <Col lg={20} xs={24}>
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
  );
}

export default Board;
