import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useHistory } from "react-router";

function LikeDislikes(props) {
  const [good, setGood] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [likeAction, setLikeAction] = useState(false);
  const [disLikeAction, setDisLikeAction] = useState(false);

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

  const check = () => {
    if (props.likes === 0) {
      //얼마나 많은 좋아요를 받았는지
      setGood(props.likes);

      //내가 이미 좋아요를 눌렀는지

      if (props.isLike) {
        setLikeAction("liked");
      }
    } else {
      // alert("like의 정보를 가져오지 못했습니다.");
    }

    if (props.hates >= 0) {
      //얼마나 많은 싫어요를 받았는지
      setDislikes(props.hates);

      //내가 이미 싫어요를 눌렀는지

      if (props.isHate) {
        setDisLikeAction("disliked");
      }
    } else {
      // alert("dislike의 정보를 가져오지 못했습니다.");
    }
  };
  const history = useHistory();
  const onLike = () => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    // check();
    //좋아요 버튼 클릭이 안되어있을때
    const variable = {
      likes: props.likes + 1,
      isLike: true,
    };
    const disvariable = {
      likes: props.likes - 1,
      isLike: false,
    };

    if (likeAction === false) {
      Axios.patch(`${USER_SERVER}/api/post/like/${props.postId}`, variable, {
        headers,
      }).then((response) => {
        console.log(response.data);
        if (response.data === "submitLike") {
          setGood(props.likes);
          console.log(good);

          window.location.reload();

          setLikeAction(true);
          //   if (disLikeAction !== null) {
          //     setDisLikeAction(null);
          //     setDislikes(dislikes - 1);
          //   }
        } else {
          alert("Like를 올리지 못했습니다");
        }
      });
    } else {
      //클릭이 되어있을 때
      Axios.patch(`${USER_SERVER}/api/post/like/${props.postId}`, {
        headers,
      }).then((response) => {
        if (response.data === "cancelLike") {
          setGood(good - 1);
          setLikeAction(false);
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
    if (likeAction !== null) {
      Axios.patch(`${USER_SERVER}/api/post/hate/${props.postId}`, {
        headers,
      }).then((response) => {
        if (response.data === "cancelHate") {
          setDislikes(dislikes - 1);
          setDisLikeAction(null);
        } else {
          alert("Dislike를 내리지 못했습니다");
        }
      });
    } else {
      //클릭이 되어있지않을 때
      Axios.patch(`${USER_SERVER}/api/post/hate/${props.postId}`, {
        headers,
      }).then((response) => {
        if (response.data === "submitHate") {
          setDislikes(dislikes + 1);
          setDisLikeAction("disliked");

          if (likeAction !== null) {
            setLikeAction(null);
            setGood(good - 1);
          }
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
            // theme={likeAction === "liked" ? "filled" : "outlined"}
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
            // theme={likeAction === "disliked" ? "filled" : "outlined"}
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
