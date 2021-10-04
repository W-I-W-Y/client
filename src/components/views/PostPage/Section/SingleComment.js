import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../../Config";

import Axios from "axios";
import CommentLikeDislikes from "../Section/CommentLikeDislikes";
import profile from "../../../../images/icon1.png";

function SingleComment(props) {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const deleteComment = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    const variable = {
      commentId: props.commentList.id,
    };
    Axios.post(
      `${USER_SERVER}/api/comment/delete/${props.commentList.id}`,
      variable,
      {
        headers,
      }
    ).then((response) => {
      if (response.data === "deleteComment") {
        console.log(response.data);
      } else {
        alert("커멘트를 삭제하지 못했습니다");
      }
    });
    window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: commentValue,
    };
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.post(`${USER_SERVER}/api/comment/add/${props.postId}`, variable, {
      headers,
    }).then((response) => {
      if (response.data === "addComment") {
        console.log(response.data);
        setCommentValue("");
      } else {
        alert("커멘트를 저장하지 못했습니다");
      }
    });
    window.location.reload();
  };

  const actions = [
    // <LikeDislikes
    //   userId={localStorage.getItem("userId")}
    //   commentId={props.comment._id}
    // />,
    // <CommentLikeDislikes
    //   postId={props.postId}
    //   commentList={props.commentList}
    //   commentId={props.commentList.id}
    // />,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      답글달기
    </span>,
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Comment
          actions={actions}
          author={props.commentList.username}
          avatar={<Avatar src={profile} alt />}
          content={<p>{props.commentList.content}</p>}
        />
        {props.commentList.isAuthor ? (
          <button
            style={{ width: "80px", height: "20px", padding: "0px" }}
            onClick={deleteComment}
          >
            댓글 삭제
          </button>
        ) : (
          <div />
        )}
      </div>

      <hr />

      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={commentValue}
            placeholder="코멘트를 작성해주세요"
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
