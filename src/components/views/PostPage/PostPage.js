import React, { useEffect, useState } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../Config";
import { Row, Col, List, Avatar, message, Input, Text } from "antd";
import LikeDislikes from "./Section/LikeDislikes";
import Comment from "./Section/Comment";
import profile from "../../../images/icon2.png";
import SideBar from "../CommunityPage/Section/SideBar";

const { TextArea } = Input;

function PostPage(props) {
  const postId = props.match.params.postId;

  const [boardId, setBoardId] = useState();
  const [detailPost, setDetailPost] = useState([]);
  const [like, setLike] = useState(false);
  const [hate, setHate] = useState(false);

  const [isAuthor, setIsAuthor] = useState(false);

  const [postName, setPostName] = useState("");
  const [content, setContent] = useState("");

  const [ismodify, setIsmodify] = useState(false);

  const onTitleChange = (e) => {
    setPostName(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setContent(e.currentTarget.value);
  };

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
          setBoardId(response.data.boardId);
          setIsAuthor(response.data.author);

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
  const modifyPost = () => {
    setIsmodify(!ismodify);
  };

  const savePost = (e) => {
    e.preventDefault();

    const variable = {
      postName: postName,
      content: content,

      // privacy: prvite,
      // filePath: filePath,
      // category: category,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    Axios.patch(`${USER_SERVER}/api/post/modify/${postId}`, variable, {
      headers,
    }).then((response) => {
      console.log("포스트 확인");
      console.log(response);
      if (response.data === "modifyPost") {
        message.success("성공적으로 수정했습니다");

        setTimeout(() => {
          props.history.push("../../board/" + boardId + "/view/0");
          window.scrollTo(0, 0);
        }, 3000);
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    });
  };

  const deletePost = () => {
    const variable = {
      postId: postId,
    };

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.post(`${USER_SERVER}/api/post/delete/${postId}`, variable, {
      headers,
    }).then((response) => {
      console.log("포스트 확인");
      console.log(response);
      if (response.data === "deletePost") {
        message.success("성공적으로 삭제했습니다");
        console.log(boardId);

        setTimeout(() => {
          props.history.push("../../board/" + boardId + "/view/0");
          window.scrollTo(0, 0);
        }, 3000);
      } else {
        alert("파일 삭제를 실패했습니다.");
      }
    });
  };

  console.log(isAuthor);
  return (
    <Row gutter={[16, 16]}>
      <Col lg={4} xs={24} style={{ zIndex: "1000" }}>
        <SideBar />
      </Col>
      <Col lg={20} xs={24}>
        <div style={{ width: "90%", padding: "3rem 4rem" }}>
          <img src="" />

          <List.Item.Meta
            avatar={<Avatar src={profile} />}
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
            {ismodify === false ? (
              <p>{detailPost.postName}</p>
            ) : (
              <Input
                onChange={onTitleChange}
                value={postName}
                placeholder={detailPost.postName}
              />
            )}
            <hr />
            {ismodify === false ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: detailPost.content,
                }}
              ></p>
            ) : (
              <TextArea
                onChange={onDescriptionChange}
                value={content}
                placeholder={detailPost.content}
              ></TextArea>
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
            }}
          >
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
          </div>
          <div style={{ display: "flex" }}>
            {isAuthor === true ? (
              <div style={{ width: "100%" }}>
                {ismodify === false ? (
                  <button
                    style={{ width: "20%", height: "52px" }}
                    onClick={modifyPost}
                  >
                    게시글 수정하기
                  </button>
                ) : (
                  <button
                    style={{ width: "20%", height: "52px" }}
                    onClick={savePost}
                  >
                    저장하기
                  </button>
                )}
              </div>
            ) : (
              <div></div>
            )}

            {isAuthor ? (
              <button
                style={{ width: "20%", height: "52px" }}
                onClick={deletePost}
              >
                게시글 삭제하기
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <Comment
            postId={postId}
            // refreshFunction={refreshFunction}
          />
        </div>
      </Col>
    </Row>
  );
}

export default PostPage;
