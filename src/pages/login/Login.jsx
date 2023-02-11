import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
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
  //处理登录
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (handleValidation()) {
      const { data } = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      // console.log(data);
      //后端请求验证数据
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        dispatch({ type: "LOGIN_FAILURE" });
      }
      if (data.status === true) {
        navigate("/");
        dispatch({ type: "LOGIN_SUCCESS", payload: data.others });
      }
    }
  };
  //输入数据验证
  const handleValidation = () => {
    if (userRef.current.value === "") {
      toast.error("用户名不能为空!", toastOptions);
      return false;
    }
    if (passwordRef.current.value === "") {
      toast.error("密码不能为空!", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>用户名:</label>
          <input type="text" placeholder="请输入用户名..." ref={userRef} />
          <label>密码:</label>
          <input
            type="password"
            placeholder="请输入密码..."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            登录
          </button>
        </form>
        <Link to="/register" className="link">
          <button className="loginRegisterButton">注册</button>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
