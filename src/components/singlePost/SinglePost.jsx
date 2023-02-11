import axios from "axios";
import React from "react";
import { useContext, useRef, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Comment from "../commentsection/Comment";
import "./singlepost.css";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/editor/EditorToolbar";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";

function SinglePost() {
  //图片路径
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2]; //id
  // console.log(path);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [information, setInformation] = useState("");
  const [updataMode, setUpdataMode] = useState(false);
  const { user } = useContext(Context);

  //like
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  //更新状态
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/find/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setInformation(res.data.information);
      setLike(res.data.likes.length);
      setCategories(res.data.categories);
      userIsLike();
    };
    getPost();
  }, [path]);

  //删除帖子
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  //更新内容
  //内容更新
  const ondescription = (value) => {
    setContent(value);
  };
  const oninformation = (value) => {
    //描述
    setInformation(value);
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/posts/" + path, {
        username: user.username,
        title,
        content,
        information,
        categories,
      });
      setPost(res.data);
      setUpdataMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  //点赞处理
  const likeHandler = async () => {
    try {
      const res = await axios.put("/posts/" + post._id + "/like", {
        userId: user._id,
      });
      // console.log(res.data);
      setIsLiked(!isLiked);
      setLike(res.data.likes.length);
    } catch (err) {
      console.log(err);
    }
  };

  //查询是否点过赞
  const userIsLike = async () => {
    const res = await axios.get("/posts/find/" + path);
    if (JSON.stringify(res.data) !== "{}") {
      for (var i = 0; i < res.data.likes.length; i++) {
        if (res.data.likes[i] === user._id) {
          setIsLiked(true);
          return;
        }
      }
    }
    setIsLiked(false);
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img
              crossOrigin="anonymous"
              className="singlePostImg"
              src={PF + post.photo}
              alt="singleImg"
            />
          )}
          {updataMode ? (
            <input
              type="text"
              className="singlePostTitleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            ></input>
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon fa-solid fa-pen-to-square"
                    onClick={() => setUpdataMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon fa-solid fa-trash-can"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
            <span>
              作者:
              <Link to={`/?user=${post.username}`} className="link">
                <b className="singlePostAuthor">{post.username}</b>
              </Link>
            </span>

            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updataMode && (
            <TextField
              className="tagInput"
              id="filled-basic"
              label="Tag"
              variant="filled"
              value={post.categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          )}

          {updataMode ? (
            <div className="postInputGroup">
              <div>
                <EditorToolbar toolbarId={"t2"} />
                <ReactQuill
                  theme="snow"
                  value={information}
                  onChange={oninformation}
                  placeholder={"描述在这里在这里"}
                  modules={modules("t2")}
                  formats={formats}
                />
              </div>
              <div>
                <EditorToolbar toolbarId={"t1"} />
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={ondescription}
                  placeholder={"写点什么吧 :)"}
                  modules={modules("t1")}
                  formats={formats}
                />
              </div>
            </div>
          ) : (
            // <p className="singlePostDesc">{content}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
          {updataMode && (
            <button className="singlePostButton" onClick={handlePostUpdate}>
              更新
            </button>
          )}
          {!updataMode && (
            <div className="postLikeButton">
              {isLiked ? (
                <i
                  className="likeIcon2 link fa-solid fa-heart"
                  onClick={likeHandler}
                ></i>
              ) : (
                <i
                  className="likeIcon link fa-solid fa-heart"
                  onClick={likeHandler}
                ></i>
              )}
              <span className="postLikeCounter">{like}</span>
            </div>
          )}

          {JSON.stringify(post) !== "{}" && !updataMode && (
            <Comment post={post} />
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
