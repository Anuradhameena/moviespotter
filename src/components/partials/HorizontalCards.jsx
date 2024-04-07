import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-100% flex mb-5 p-2">
      <div className=" min-w-[40%] p-2 flex overflow-x-auto">
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className=" min-w-[15%]   bg-zinc-950  mr-2 p-2 overflow-x-hidden"
            >
              <img
                className="w-full h-[45%] object-cover"
                src={ d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.profile_path
                }` : noimage}
                alt=""
              />
              <div className="text-white ">
                <h1 className="text-white text-xl mt-3 font-semibold">
                  {d.name ||
                    d.title.slice(0, 40) ||
                    d.orignal_name.slice(0, 40) ||
                    d.orignal_title}
                </h1>
                <p className="mt-3  text-white text-xs">
                  {d.overview.slice(0, 80)}...{" "}
                  <span className="text-blue-400">more</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl text-white font-black text-center">
            Nothing to Show
          </h1>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;
