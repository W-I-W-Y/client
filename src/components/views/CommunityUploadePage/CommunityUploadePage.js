import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon, Row, Col } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config";
import SideBar from "../CommunityPage/Section/SideBar";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: "익명으로 올리기" },
  { value: 1, label: "실명으로 올리기" },
];

const CategoryOptions = [
  { value: 0, label: "자유게시판" },
  { value: 1, label: "비밀게시판" },
  { value: 2, label: "정보공유게시판" },
  { value: 3, label: "백신게시판" },
  { value: 4, label: "코로나검사게시판" },
  { value: 5, label: "자가격리게시판" },
];

function CommunityUploadePage(props) {
  const boardId = props.match.params.boardId;
  const user = useSelector((state) => state.user);
  const [postName, setPostName] = useState("");
  const [content, setContent] = useState("");
  const [prvite, setPrvite] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");

  const [sidebar, setSidebar] = useState(true);
  const changeState = () => {
    setSidebar(!sidebar);
    console.log(sidebar);
  };
  const onTitleChange = (e) => {
    setPostName(e.currentTarget.value);
  };

  // const onDescriptionChange = (e) => {
  //   setContent(e.currentTarget.value);
  // };

  // const onPrivateChange = (e) => {
  //   setPrvite(e.currentTarget.value);
  // };

  // const onCategoryChange = (e) => {
  //   setCategory(e.currentTarget.value);
  // };

  const onDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/community/uploadfiles", formData, config).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);

          // let variable = {
          //   url: response.data.url,
          //   fileName: response.data.fileName,
          // };

          setFilePath(response.data.url);
        } else {
          alert("파일 업로드를 실패했습니다.");
        }
      }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      postName: postName,
      content: content.newContent,
      boardId: boardId,

      // privacy: prvite,
      // filePath: filePath,
      // category: category,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    console.log(typeof variable.content);

    Axios.post(`${USER_SERVER}/api/post/add/${boardId}`, variable, {
      headers,
    }).then((response) => {
      console.log(variable.content);
      console.log("포스트 확인");
      console.log(response);
      if (response.data === "addPost") {
        message.success("성공적으로 업로드했습니다");

        setTimeout(() => {
          props.history.push("../../board/" + boardId + "/view/0");
          window.scrollTo(0, 0);
        }, 3000);
      } else {
        alert("파일 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col lg={4} xs={24} style={{ zIndex: "1000" }}>
        <SideBar sidebar={sidebar} changeState={changeState} />
      </Col>
      <Col lg={20} xs={24}>
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title
              level={2}
              style={{
                fontFamily: "Droid Sans",
                fontSize: "2.2rem",
              }}
            >
              게시글 작성하기
            </Title>
          </div>

          <Form onSubmit={onSubmit}>
            <input
              className="title-input"
              type="text"
              placeholder="제목"
              onChange={onTitleChange}
              value={postName}
            />
            <CKEditor
              editor={ClassicEditor}
              placeholder="제목"
              value={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });

                const newContent = data
                  .replace("&lt;", "<")
                  .replace("&gt;", ">")
                  .replace("&amp;lt;", "<")
                  .replace("&amp;gt;", ">")
                  .replace("&amp;nbsp;", " ")
                  .replace("&amp;amp;", "&");
                setContent({
                  ...content,
                  newContent,
                });

                console.log(content);
              }}
            />

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
       
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {filePath && (
            <div>
              <img src={`http://localhost:5000/${filePath}`} alt="fileImage" />
            </div>
          )}
        </div> */}

            {/* <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select> */}
            <br />
            <br />

            <a
              className="button"
              onClick={onSubmit}
              type="primary"
              style={{
                fontFamily: "Droid Sans",
                fontSize: "0.7rem",
                minWidth: "100%",
              }}
            >
              Submit
            </a>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default CommunityUploadePage;
