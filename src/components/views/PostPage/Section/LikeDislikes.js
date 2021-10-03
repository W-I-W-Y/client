import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useHistory } from "react-router";

function LikeDislikes(props) {
  const [good, setGood] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  console.log(props.likes);
  console.log(props.hates);
  console.log(props.isHate);
  console.log(props.isLike);

  // let variable = {};

  // if (props.viedo) {
  //   variable = { videoId: props.videoId, userId: props.userId };
  // } else {
  //   variable = { commentId: props.commentId, userId: props.userId };
  // }

  const history = useHistory();
  const onLike = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };

    //좋아요 버튼 클릭이 안되어있을때
    const variable = {
      likes: props.likes + 1,
      isLike: true,
    };
    const disvariable = {
      likes: props.likes - 1,
      isLike: false,
    };

    if (props.isLike === false) {
      Axios.patch(`${USER_SERVER}/api/post/like/${props.postId}`, variable, {
        headers,
      }).then((response) => {
        console.log(response.data);
        if (response.data === "submitLike") {
          window.location.reload();
        } else {
          alert("Like를 올리지 못했습니다");
        }
      });
    } else {
      //클릭이 되어있을 때
      Axios.patch(`${USER_SERVER}/api/post/like/${props.postId}`, disvariable, {
        headers,
      }).then((response) => {
        if (response.data === "cancelLike") {
          window.location.reload();
        } else {
          alert("Like를 내리지 못했습니다");
        }
      });
    }
  };

  const onDisLike = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    //싫어요 버튼이 클릭되어있을때

    const variable = {
      likes: props.hates + 1,
      isLike: true,
    };
    const disvariable = {
      likes: props.hates - 1,
      isLike: false,
    };
    if (props.isHate === true) {
      Axios.patch(`${USER_SERVER}/api/post/hate/${props.postId}`, disvariable, {
        headers,
      }).then((response) => {
        if (response.data === "cancelHate") {
          window.location.reload();
        } else {
          alert("Dislike를 내리지 못했습니다");
        }
      });
    } else {
      //클릭이 되어있지않을 때
      Axios.patch(`${USER_SERVER}/api/post/hate/${props.postId}`, variable, {
        headers,
      }).then((response) => {
        if (response.data === "submitHate") {
          window.location.reload();
        } else {
          alert("Like를 올리지 못했습니다");
        }
      });
    }
  };

  return (
    <>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={props.isLike === true ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {props.likes}좋아요
        </span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-like">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={props.isHate === true ? "filled" : "outlined"}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {props.hates}싫어요
        </span>
      </span>
      &nbsp;&nbsp;
    </>
  );
}

export default LikeDislikes;
