import React, { useEffect, useState } from "react";
import { Tooltip } from "antd"; //Icon
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useHistory } from "react-router";

function CommentLikeDislikes(props) {
  const history = useHistory();

  const onLike = () => {
    console.log("좋아요");

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    const variable = {
      commentId: props.commentList.id,
    };

    Axios.patch(
      `${USER_SERVER}/api/comment/like/${props.commentList.id}`,
      variable,
      {
        headers,
      }
    ).then((response) => {
      if (response.data === "submitLike") {
        window.location.reload();
      } else if (response.data === "cancelLike") {
        alert("댓글 좋아요를 취소했습니다.");
        window.location.reload();
      } else {
        alert("좋아요를 반영하지 못했습니다.");
      }
    });
  };

  const onDisLike = () => {
    console.log("싫어요");

    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    const variable = {
      commentId: props.commentList.id,
    };

    Axios.patch(
      `${USER_SERVER}/api/comment/hate/${props.commentList.id}`,
      variable,
      {
        headers,
      }
    ).then((response) => {
      if (response.data === "submitHate") {
        window.location.reload();
      } else if (response.data === "cancelHate") {
        alert("댓글 싫어요를 취소했습니다.");
        window.location.reload();
      } else {
        alert("싫어요를 반영하지 못했습니다.");
      }
    });
  };

  return (
    <>
      <span key="comment-basic-like">
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {props.commentList.likes}
        </span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-like">
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {props.commentList.hates}
        </span>
      </span>
      &nbsp;&nbsp;
    </>
  );
}
export default CommentLikeDislikes;

/*
 <Tooltip title="Like">
          <Icon
            type="like"
            theme={props.commentList.isLike === true ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>


<Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={props.commentList.isHate === true ? "filled" : "outlined"}
            onClick={onDisLike}
          />
        </Tooltip>
*/
