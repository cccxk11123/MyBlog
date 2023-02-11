import React from "react";
import "./topBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function TopBar() {
  //图片路径
  const PF = "http://localhost:5000/images/";
  //导航
  const navigate = useNavigate();
  // const user = true;

  //获取用户信息
  const { user, dispatch } = useContext(Context);
  const [destination, setDestination] = useState("");

  //处理搜索
  const handleSearch = () => {
    navigate("/list", { state: { destination } });
    window.location.reload();
  };

  //更新搜索框值
  const getInput = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //登出并更新用户状态
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bstop">
        <div className="container-fluid topLeft">
          <i className="topIcon fa-solid fa-microphone"></i>
          <i className="topIcon fa-solid fa-person-running"></i>
          <i className="topIcon fa-solid fa-music"></i>
          <i className="topIcon fa-solid fa-basketball"></i>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse topComponents"
            id="navbarSupportedContent"
          >
            <div className="topCenter">
              <div className="d-flex" role="search">
                <input
                  className="searchInput me-2"
                  type="search"
                  placeholder="帖子、用户、类别"
                  aria-label="Search"
                  onKeyDown={getInput}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <button
                  className="btn btn-outline-success bsbutton"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 bsnavlist">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  主页
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/write">
                  发布
                </Link>
              </li>
              <li className="nav-link active" onClick={handleLogout}>
                {user && "退出"}
              </li>
            </ul>
            <div className="topRight">
              {user ? (
                <Link to="/settings">
                  <img
                    crossOrigin="anonymous"
                    className="topImg"
                    src={
                      user.profilePic
                        ? PF + user.profilePic
                        : PF + "defalut02.jpg"
                    }
                    alt="userImg"
                  />
                </Link>
              ) : (
                <ul className="topList">
                  <li className="topListItem">
                    <Link className="link" to="/login">
                      登录
                    </Link>
                  </li>
                  <li className="topListItem">
                    <Link className="link" to="/register">
                      注册
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopBar;

{
  /* <div className="top">
        <div className="topLeft">
          <i className="topIcon fa-solid fa-microphone"></i>
          <i className="topIcon fa-solid fa-person-running"></i>
          <i className="topIcon fa-solid fa-music"></i>
          <i className="topIcon fa-solid fa-basketball"></i>
        </div>
        <div className="topCenter">
          <div className="searchbar">
            <i
              className="topSearchIcon fa-solid fa-magnifying-glass"
              onClick={handleSearch}
            ></i>
            <input
              placeholder="帖子、用户、类别..."
              className="searchInput"
              onKeyDown={getInput}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        <div className="topComponents">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                主页
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">
                写作
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {user && "退出"}
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <img
                className="topImg"
                src={
                  user.profilePic ? PF + user.profilePic : PF + "defalut02.jpg"
                }
                alt="userImg"
              />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  登录
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  注册
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div> */
}
