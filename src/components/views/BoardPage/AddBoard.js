import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import { USER_SERVER } from "../../Config";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
function AddBoard() {
  const history = useHistory();
  const [boardTitle, setBoardTitle] = useState("");
  const [description, setDescription] = useState("");
  const onTitleChange = (e) => {
    setBoardTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onSubmit = (e) => {
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
        }, 2000);
      } else {
        alert("게시판 생성을 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>게시판 생성하기</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <Button type="primary" size="large" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddBoard;
