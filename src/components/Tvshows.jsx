import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Tvshows = () => {
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true);

  document.title="SCSDB | Tv Shows "+" " + category.toLocaleUpperCase();

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      
      if(data.results.length > 0){
        settv((prevState)=> [...prevState,...data.results])
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
    if(tv.length === 0){
      GetTv();
    }
    else{
      setpage(1);
      settv([]);
      GetTv();
    }
  }

  console.log(tv);

  useEffect(() => {
    refersHandler();
  }, [category]);

  let navigate = useNavigate(-1);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex justify-between items-center">
        <h1
          onClick={() => navigate(-1)}
          className=" cursor-pointer w-[25%] mr-5 text-2xl font-semibold text-zinc-400"
        >
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i> Movies <small className="ml-2 text-sm text-zinc-600">({category})</small> 
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["on_the_air", "airing_today","popular","top_rated"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
           
        </div>
      </div>

      <InfiniteScroll
       dataLength={tv.length}
       next={GetTv}
       hasMore={hasMore}
       loader={<h1>Loading....</h1>}
      >
          <Card data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;
