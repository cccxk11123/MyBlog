import React from "react";
import "../post/post.css";
import { Link } from "react-router-dom";

function SearchItem({ item }) {
  const PF = "http://localhost:5000/images/";
  return (
    <>
      <div className="post">
        {item.photo && (
          <img
            className="postImg"
            src={PF + item.photo}
            alt="postImg"
            crossOrigin="anonymous"
          />
        )}
        <div className="postInfo">
          <div className="postCats">
            {item.categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
        </div>
        <span className="postTitle">
          <Link to={`/post/${item._id}`} className="link">
            {item.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(item.createdAt).toDateString()}
        </span>
        <p className="postDesc">{item.desc}</p>
      </div>
    </>
  );
}

export default SearchItem;
