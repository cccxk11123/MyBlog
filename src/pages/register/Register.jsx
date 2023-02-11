import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //错误信息提示样式设置
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

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
      toast.error("密码不能为空!", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //防止无内容时提交表单页面也刷新
    if (handleValidation()) {
      try {
        const res = await axios.post("/auth/register", {
          username,
          email,
          password,
        });
        if (res.data) window.location.replace("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>用户名:</label>
        <input
          type="text"
          placeholder="请输入您的用户名..."
          onChange={(e) => setusername(e.target.value)}
        />
        <label>邮箱:</label>
        <input
          type="text"
          placeholder="请输入您的邮箱..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>密码:</label>
        <input
          type="password"
          placeholder="请输入您的密码"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          注册
        </button>
      </form>
      <Link to="/login" className="link">
        <button className="registerLoginButton">登录</button>
      </Link>
      <ToastContainer />
    </div>
  );
}

export default Login;
