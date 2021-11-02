import React, { useState, useEffect } from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import SingleComment from "./SingleComment";

function Comment(props) {
  const [commentValue, setCommentValue] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    Axios.get(`${USER_SERVER}/api/post/view/${props.postId}`, { headers }).then(
      (response, index) => {
        if (response.data !== null) {
          console.log("data check");
          console.log(response.data.commentOutputDTOS);

          response.data.commentOutputDTOS.forEach((commentOutputDTOS) => {
            setCommentList((state) => [
              ...state,
              {
                id: commentOutputDTOS.id,
                content: commentOutputDTOS.content,
                calculateTime: commentOutputDTOS.calculateTime,
                createTime: commentOutputDTOS.createTime,
                username: commentOutputDTOS.username,
                postName: commentOutputDTOS.postName,
                isAuthor: commentOutputDTOS.author,
                likes: commentOutputDTOS.likes,
                hates: commentOutputDTOS.hates,
                isLike: commentOutputDTOS.like,
                isHate: commentOutputDTOS.hate,
              },
            ]);
          });
        } else {
          alert("게시글 detail 가져오는데 실패했습니다.");
        }
      }
    );
  }, []);

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

  return (
    <div>
      <br />
      <p>댓글</p>
      <hr />

      {commentList.map((commentList, index) => (
        <React.Fragment key={index}>
          <SingleComment
            key={index}
            commentList={commentList}
            postId={props.postId}
          />
          {/* <ReplyComment
            parentCommentId={commentList.id}
            postId={props.postId}
            commentLists={commentList}
          
          /> */}
        </React.Fragment>
      ))}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
