import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchItem from "../../components/searchItem/SearchItem";
import TopBar from "../../components/topbar/TopBar";
import "./list.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

//显示搜索结果的页面
function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/posts/search/?info=${destination}`);
      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, [destination]);

  return (
    <>
      <TopBar />
      <div className="search">
        <div className="listResult">
          <div className="searchResult">搜索结果:</div>
          {data[0] ? (
            data.map((item) => <SearchItem item={item} key={item._id} />)
          ) : (
            <p>Not Found</p>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default List;
