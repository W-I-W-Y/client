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
const { Title } = Typography;
const { TextArea } = Input;

function DeleteBoard() {
  const [board, setBoard] = useState([]);
  const [BoardName, setBoardName] = useState([]);

  useEffect(() => {
    Axios.get(`${USER_SERVER}/api/board/view`).then((response, index) => {
      if (response.data !== null) {
        console.log(response.data);

        setBoard(response.data);
        response.data.forEach((lists) => {
          setBoardName((state) => [
            ...state,
            {
              boardName: lists.boardName,
            },
          ]);
        });
      } else {
        alert("파일을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  console.log(BoardName);

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      boardName: "자유게시판",
      //   description: description,
      // privacy: prvite,
      // filePath: filePath,
      // category: category,
    };

    console.log(variable.boardName);

    Axios.post(`${USER_SERVER}/api/board/delete`, variable).then((response) => {
      console.log(response.data);
      if (response.data === "deleteBoard") {
        message.success("게시판을 성공적으로 삭제했습니다");
        // setTimeout(() => {
        //   history.push("/community");
        // }, 3000);
      } else {
        alert("게시판 삭제를 실패했습니다.");
      }
    });
  };

  return (
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
          <tbody
            key={index}
            className="table-content py-3 px-4 notice-wrapper row align-items-sm-center text-center text-dark important"
            style={{ cursor: "pointer" }}
          >
            <tr>
              <Checkbox />
              <td id={index} className="col-sm-10 thtitle">
                {board.boardName}
              </td>
              <td id={index} className="col-sm-14">
                {board.description}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Button type="primary" size="large" onClick={onSubmit}>
        삭제하기
      </Button>
    </div>
  );
}

export default DeleteBoard;
