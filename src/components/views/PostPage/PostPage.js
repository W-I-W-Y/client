import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../Config";
import { Row, Col, List, Avatar } from "antd";
import LikeDislikes from "./Section/LikeDislikes";
import Comment from "./Section/Comment";

function PostPage(props) {
  const postId = props.match.params.postId;

  const [detailPost, setDetailPost] = useState([]);
  const [like, setLike] = useState(false);
  const [hate, setHate] = useState(false);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.get(`${USER_SERVER}/api/post/view/${postId}`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          console.log("data check");
          console.log(response.data);

          setLike(response.data.like);
          setHate(response.data.hate);

          setDetailPost({
            id: response.data.postOutputDTO.id,
            postName: response.data.postOutputDTO.postName,
            content: response.data.postOutputDTO.content,
            calculateTime: response.data.postOutputDTO.calculateTime,
            createTime: response.data.postOutputDTO.createTime,
            viewCnt: response.data.postOutputDTO.viewCnt,
            likes: response.data.postOutputDTO.likes,
            hates: response.data.postOutputDTO.hates,
            username: response.data.postOutputDTO.username,
            boardName: response.data.postOutputDTO.boardName,
            comCounts: response.data.postOutputDTO.comCounts,
          });
        } else {
          alert("게시글 detail 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

  console.log(like);

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <img src="" />

          <List.Item.Meta
            avatar={<Avatar />}
            title={detailPost.username}
            description={detailPost.createTime}
          />

          <div
            style={{
              width: "100%",
              height: "30vh",
              margin: "20px",
              padding: "10px",
              border: "black solid 0.5px",
            }}
          >
            {detailPost.postName}
            <hr />
            {detailPost.content}
          </div>
          <List.Item
            actions={[
              <LikeDislikes
                postId={detailPost.id}
                likes={detailPost.likes}
                hates={detailPost.hates}
                isLike={like}
                isHate={hate}
              />,
            ]}
          ></List.Item>

          <Comment
          // postId={detailPost.id}
          // commentLists={comments}
          // refreshFunction={refreshFunction}
          />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        {/* <SidePost /> */}
      </Col>
    </Row>
  );
}

export default PostPage;
