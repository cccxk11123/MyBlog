import React from "react";
import "./write.css";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import TopBar from "../../components/topbar/TopBar";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/editor/EditorToolbar";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

function Write() {
  const PF = "http://localhost:5000/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState(null); //封面
  const [content, setContent] = useState(""); //内容
  const [information, setInformation] = useState("");

  //内容更新
  const ondescription = (value) => {
    //正文
    setContent(value);
  };

  const oninformation = (value) => {
    //描述
    setInformation(value);
  };
  //console.log(content);

  const onSubmit = async (e) => {
    e.preventDefault();
    setContent("");
    //设置帖子内容
    const newPost = {
      title,
      content: content,
      information: information,
      username: user.username,
      categories,
    };

    if (file) {
      //封面图片上传
      const data = new FormData();
      const filename = Date.now() + file.name;
      //console.log(file);
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      console.log(res);
      //1.5s后导向至帖子
      setTimeout(() => {
        window.location.replace("/post/" + res.data._id);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBar />
      <div className="write">
        {
          <img
            crossOrigin="anonymous"
            className="writeImg"
            src={file ? URL.createObjectURL(file) : PF + "images/defalut03.jpg"}
            alt="writeImg"
          />
        }
        <form onSubmit={onSubmit} style={{ margin: "2rem" }}>
          <div className="inputTitle">
            <label htmlFor="fileInput">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <TextField
              id="standard-basic"
              label="这里是标题"
              variant="standard"
              className="writeInput"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <div id="inputInformation">
              <EditorToolbar toolbarId={"t2"} />
              <ReactQuill
                theme="snow"
                value={information}
                onChange={oninformation}
                placeholder={"在这里输入简短描述"}
                modules={modules("t2")}
                formats={formats}
              />
            </div>
            <div className="writeInputContent" id="inputContent">
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
          <TextField
            id="filled-basic"
            label="Tag"
            variant="filled"
            onChange={(e) => setCategories(e.target.value)}
          />
          <div style={{ textAlign: "center", margin: "2rem" }}>
            <Button variant="contained" type="submit">
              发布
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Write;

{
  /* <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="标题"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="写点什么吧......"
              type="text"
              className="writeInput writeText"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit" type="submit">
          发布
        </button>
        </form> */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //帖子信息
  //   const newPost = {
  //     username: user.username,
  //     title,
  //     desc,
  //   };
  //   if (file) {
  //     //图片上传
  //     const data = new FormData();
  //     const filename = Date.now() + file.name;
  //     console.log(file);
  //     data.append("name", filename);
  //     data.append("file", file);
  //     newPost.photo = filename;
  //     try {
  //       await axios.post("/upload", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   //帖子发布
  //   try {
  //     const res = await axios.post("/posts", newPost);
  //     //导向至帖子
  //     window.location.replace("/post/" + res.data._id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
}
