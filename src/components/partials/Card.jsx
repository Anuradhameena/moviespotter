import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Card = ({ data, title }) => {
  console.log(title)
  return (
    <div className="flex flex-wrap w-full h-full mt-5 px-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className=" relative h-[35vh] w-[15%] mr-[5%] mb-[5%]" key={i}>
          <img
            className=" object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }` : noimage}
            alt=""
          />

          <h1 className="text-2xl text-zinc-200 mt-3 font-semibold">
            {c.name || c.title || c.orignal_name || c.orignal_title}
          </h1>

          {
            c.vote_average && <div className="absolute right-[-10%] bottom-[30%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
            {(c.vote_average * 10).toFixed()} <sup>%</sup>
          </div>
          }
          
        </Link>
      ))}
    </div>
  );
};

export default Card;
