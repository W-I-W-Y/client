import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user);
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prvite, setPrvite] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrvite(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

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
      writer: user.userData._id,
      title: videoTitle,
      description: description,
      privacy: prvite,
      filePath: filePath,
      category: category,
    };

    Axios.post("/api/community/uploadvideo", variable).then((response) => {
      if (response.data.success) {
        message.success("성공적으로 업로드했습니다");

        setTimeout(() => {
          props.history.push("/community");
        }, 3000);
      } else {
        alert("파일 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>게시글 작성하기</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* {Drop Zone} */}
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
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={videoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={description}></TextArea>
        <br />
        <br />

        <select onChange={onPrivateChange}>
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
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CommunityUploadePage;
