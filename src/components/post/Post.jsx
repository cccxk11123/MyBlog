import React from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import "./post.css";

export default function Post({ post }) {
  //图片路径
  const PF = "http://localhost:5000/images/";
  return (
    <>
      <div className="post">
        {post.photo && (
          <img
            className="postImg"
            src={PF + post.photo}
            alt="postImg"
            crossOrigin="Anonymous"
          />
        )}
        <div className="postTop">
          <span className="postTitle">
            <Link to={`/post/${post._id}`} className="link">
              {post.title}
            </Link>
          </span>
          {post.categories.length !== 0 && (
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              label={post.categories}
            />
          )}
        </div>

        <span className="postDesc">
          <div dangerouslySetInnerHTML={{ __html: post.information }} />
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </>
  );
}
