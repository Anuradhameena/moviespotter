import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true);

  document.title="SCSDB | Popular"+" " + category.toLocaleUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      
      if(data.results.length > 0){
        setpopular((prevState)=> [...prevState,...data.results])
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
    if(popular.length === 0){
      GetPopular();
    }
    else{
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  }

  console.log(popular);

  useEffect(() => {
    refersHandler();
  }, [category]);

  let navigate = useNavigate(-1);

  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex justify-between items-center">
        <h1
          onClick={() => navigate(-1)}
          className=" cursor-pointer w-[15%] mr-5 text-2xl font-semibold text-zinc-400"
        >
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i> Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
           
        </div>
      </div>

      <InfiniteScroll
       dataLength={popular.length}
       next={GetPopular}
       hasMore={hasMore}
       loader={<h1>Loading....</h1>}
      >
          <Card data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
