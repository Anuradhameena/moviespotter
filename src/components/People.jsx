import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true);

  document.title="SCSDB | People "+" " + category.toLocaleUpperCase();

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      
      if(data.results.length > 0){
        setpeople((prevState)=> [...prevState,...data.results])
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
    if(people.length === 0){
      GetPeople();
    }
    else{
      setpage(1);
      setpeople([]);
      GetPeople();
    }
  }

  console.log(people);

  useEffect(() => {
    refersHandler();
  }, [category]);

  let navigate = useNavigate(-1);

  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex justify-between items-center">
        <h1
          onClick={() => navigate(-1)}
          className=" cursor-pointer w-[25%] mr-5 text-2xl font-semibold text-zinc-400"
        >
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i> People
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
           
          <div className="w-[2%]"></div>
           
        </div>
      </div>

      <InfiniteScroll
       dataLength={people.length}
       next={GetPeople}
       hasMore={hasMore}
       loader={<h1>Loading....</h1>}
      >
          <Card data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
