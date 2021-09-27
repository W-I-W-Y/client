import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function PostPage() {
  const [file, setFile] = useState([]);

  useEffect(() => {
    axios.get("/api/community/getFiles").then((response) => {
      if (response.data.success) {
        console.log(response.data.files);
        setFile(response.data.files);
      } else {
        alert("파일을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const renderCards = file.map((file, index) => {
    return (
      <Col key={index} lg={24} md={24} xs={24}>
        <a href={`/file/${file._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${file.filePath}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            ></div>
          </div>
        </a>
        <br />
        <Meta avatar={<Avatar src={file.writer.image} />} title={file.title} />
        <span>{file.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> 조회수 {file.views} | </span>-
        <span> {moment(file.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "50%", margin: "3rem auto" }}>
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default PostPage;
