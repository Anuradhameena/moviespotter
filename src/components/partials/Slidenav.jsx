import React from "react";
import { Link } from "react-router-dom";

const Slidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-500 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span className="text-2xl">MovieMate</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 gap-3">
        <h1 className="text-white text-xl mt-3 mb-2">New Feeds</h1>
        <Link to='/trending' className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to='/popular' className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link to='/movie' className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link to='/tv' className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to='/person' className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg mb-3">
          {" "}
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>
      <hr />
      <nav className="flex flex-col text-zinc-400 gap-3">
        <h1 className="text-white text-xl mt-3 mb-2">Website Info. </h1>
        <Link className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-information-fill"></i> About{" "}
        </Link>
        <Link className="p-3 duration-300 hover:text-white hover:bg-[#6556CD] rounded-lg">
          {" "}
          <i className="ri-phone-fill"></i> Contact Us.
        </Link>
      </nav>
    </div>
  );
};

export default Slidenav;
