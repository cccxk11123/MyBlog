import React from "react";
import { useState, useEffect } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function SideBar() {
  const [cats, setCats] = useState([]);

  //获取到用户的兴趣爱好
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/cate");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">个人简介</span>
          <img
            src="https://tse1-mm.cn.bing.net/th/id/OIP-C.4LeaWeYWjYZVHWQaN42NfQHaEo?w=251&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7"
            alt="aboutImg"
          />
          <p>练习时长两年半的大学生</p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">标签</span>
          <ul className="sidebarList">
            {cats.map((c, index) => (
              <Link to={`/?cat=${c.name}`} className="link" key={index}>
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
