import React from "react";
import "./settings.css";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Settings() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  //错误信息提示样式设置
  const toastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  //输入数据验证
  const handleValidation = () => {
    if (username === "") {
      toast.error("用户名不能为空!", toastOptions);
      return false;
    }
    if (email === "") {
      toast.error("邮箱不能为空!", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("新密码不能为空!", toastOptions);
      return false;
    }
    toast.success("更新成功！!", toastOptions);
    return true;
  };

  //信息更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "UPDATE_START" });
      //用户数据
      const updateUser = {
        userId: user._id,
        username,
        email,
        password,
      };
      if (file) {
        //图片上传
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updateUser.profilePic = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        const res = await axios.put("/users/" + user._id, updateUser);
        // console.log(res);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        window.location.replace("/");
      } catch (err) {
        console.log(err);
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
  };

  //账号删除
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setOpen(false);
      await axios.delete("/users/" + user._id, { data: { userId: user._id } });
      window.location.replace("/login");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };

  //弹窗警告
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TopBar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">更新个人信息</span>
            <Button variant="outlined" color="error" onClick={handleClickOpen}>
              注销账号(慎选)
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"删除你的账号"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  确定清除账号吗？无法恢复哦！！
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={handleDelete} autoFocus>
                  确定
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>个人头像</label>
            <div className="settingsPP">
              <img
                className="settingsPPImg"
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt="profileImg"
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-solid fa-user"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>用户名</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>邮箱</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>新密码</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button className="settingsButton" type="submit">
              修改
            </button>
          </form>
          <div></div>
          <ToastContainer />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Settings;
