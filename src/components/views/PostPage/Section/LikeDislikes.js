import React from "react";
import { Tooltip, Icon } from "antd";

function LikeDislikes() {
  return (
    <>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            // theme={likeAction === "liked" ? "filled" : "outlined"}
            // onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>좋아요</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-like">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            // theme={likeAction === "disliked" ? "filled" : "outlined"}
            // onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>싫어요</span>
      </span>
      &nbsp;&nbsp;
    </>
  );
}

export default LikeDislikes;
