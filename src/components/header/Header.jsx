import React from "react";
import "./header.css";

function Header() {
  //轮播图
  return (
    <>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitlesSm">React & Node.js</span>
          <span className="headerTitlesLg">Blog</span>
        </div>
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                src="https://th.bing.com/th/id/R.fbe72959f3378189752e0188af64ff80?rik=S3koHse5NvR7ng&riu=http%3a%2f%2fi.imgur.com%2fS2N2hh5.jpg&ehk=erLQQs22IF5ZlR36wSOux3UaJxCIAcPdIH5O71O%2bhvU%3d&risl=&pid=ImgRaw&r=0"
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="https://www.dongmanzx.com/wp-content/uploads/2018/11/2018110210510922.jpg"
                className="d-block w-100"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.cb574714bc468f759407c29d4efc7ba9?rik=r2v7jKcHRgx9Lg&pid=ImgRaw&r=0"
                className="d-block w-100"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
