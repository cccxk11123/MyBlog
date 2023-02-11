import React from "react";
import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import TopBar from "../../components/topbar/TopBar";

function Single() {
  return (
    <>
      <TopBar />
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
    </>
  );
}

export default Single;
