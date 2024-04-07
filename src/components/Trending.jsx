import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true);
  document.title="SCSDB | Trending"+" "+ category.toLocaleUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      
      if(data.results.length > 0){
        settrending((prevState)=> [...prevState,...data.results])
        setpage(page+1);
      }
      else{
        sethasMore(false);
      }
    } catch (error) {
      console.log("error is " + error);
    }
  };

  const refersHandler = ()=>{
    if(trending.length === 0){
      GetTrending();
    }
    else{
      setpage(1);
      settrending([]);
      GetTrending();
    }
  }

  console.log(trending);

  useEffect(() => {
    refersHandler();
  }, [category, duration]);

  let navigate = useNavigate(-1);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex justify-between items-center">
        <h1
          onClick={() => navigate(-1)}
          className=" cursor-pointer w-[15%] mr-5 text-2xl font-semibold text-zinc-400"
        >
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i> Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["all", "movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
       dataLength={trending.length}
       next={GetTrending}
       hasMore={hasMore}
       loader={<h1>Loading....</h1>}
      >
          <Card data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
