import React, { useState, useEffect } from "react";

function Comment() {
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  return (
    <div>
      <br />
      <p>댓글</p>
      <hr />
      <form style={{ display: "flex" }} onSubmit>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
