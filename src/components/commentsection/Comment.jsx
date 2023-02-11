import React from "react";
import "./comment.css";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function Comment({ post }) {
  //console.log(post);
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  //提交留言
  const handleComment = async () => {
    try {
      const data = await axios.put("/posts/" + post._id + "/comment", {
        value:
          user.profilePic +
          "-" +
          user.username +
          "-" +
          user._id +
          "-" +
          comment +
          "-" +
          new Date().toLocaleString(),
      });
      setComments(data.data?.comments);
    } catch (err) {
      console.log(err);
    }
  };
  // //解析留言中的用户
  // const findUser = async (data) => {
  //   console.log(data);
  //   for (var i = 0; i < data.comments.length; i++) {
  //     commentUserId[i] = data.comments[i].split("-")[0];
  //   }
  //   //获取到该用户的信息
  //   for (var i = 0; i < commentUserId.length; i++) {
  //     commentUser[i] = await axios.get("/users/" + commentUserId[i]);
  //   }
  //   console.log("commentUser + " + commentUser);
  // };
  // findUser(post);
  // console.log(commentUser[0]);

  return (
    <>
      {comments &&
        comments.map((c, i) => (
          <div className="comment" key={i}>
            <div className="commentHeader">
              <img
                className="commentUserImg"
                src={PF + (c && c.split("-")[0])}
                alt="user"
              />
              <span className="commentUser">{c && c.split("-")[1]}</span>
            </div>
            <div className="commentBody">
              <div className="commentInfo">{c && c.split("-")[3]}</div>
              <div className="commentTime">{c && c.split("-")[4]}</div>
            </div>
          </div>
        ))}
      <TextField
        // className="commentFooter"
        id="outlined-basic"
        label="留言栏"
        variant="outlined"
        color="warning"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="commentButton">
        <Button variant="contained" color="warning" onClick={handleComment}>
          提交
        </Button>
      </div>
    </>
  );
}

export default Comment;
