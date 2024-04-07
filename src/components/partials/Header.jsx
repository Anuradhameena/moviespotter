import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 5%",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start pl-[5%] pb-3 "
    >
      <h1 className=" text-[5xl] w-[70%] font-black text-white">
        {data.name || data.title || data.orignal_name || data.orignal_title}{" "}
      </h1>

      <p className="w-[70%] mt-3 mb-3  text-white">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>{" "}
      </p>
      <p className="text-white ">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Info.."}
        <i className="text-yellow-500 ri-album-fill ml-5"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-4 bg-[#6556CD] rounded mt-3 font-semibold text-white">
        Watch Trailer.
      </Link>
    </div>
  );
};

export default Header;
