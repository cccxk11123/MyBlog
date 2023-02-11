import React from "react";
import "./posts.css";
import Post from "../post/Post";

function Posts({ posts }) {
  //遍历渲染帖子
  return (
    <>
      <div className="posts">
        {posts.map((p, indx) => (
          <Post post={p} key={indx} />
        ))}
      </div>
    </>
  );
}

export default Posts;
