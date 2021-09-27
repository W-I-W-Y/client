import React from "react";
import { Row, Col, List, Avatar } from "antd";
import SideVideo from "./SideVideo";
import Comment from "./Comment";

function Detail(props) {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <img
            style={{ width: "100%" }}
            src={`http://localhost:5000/${props.fileDetail.filePath}`}
            controls
            alt=""
          ></img>

          <List.Item actions>
            <List.Item.Meta
              avatar={<Avatar src={props.fileDetail.writer.image} />}
              title={props.fileDetail.writer.name}
              description={props.fileDetail.description}
            />
          </List.Item>

          <Comment
            postId={props.fileId}
            commentLists={props.comments}
            refreshFunction={props.refreshFunction}
          />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
}

export default Detail;
