import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
      console.log(data.results);
    } catch (error) {
      console.log("Errors" + error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] flex mx-auto items-center relative">
      <i className="mr-3 text-xl text-white ri-search-2-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search Anything."
        className=" text-white w-[50%] rounded p-4 text-xl border-none outline-none bg-transparent"
      />
      {query.length > 0 && (
        <i
          onClick={() => {
            setquery("");
          }}
          className="mr-3 text-xl text-white ri-close-fill"
        ></i>
      )}

      <div className=" z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded ">
        {searches &&
          searches.map((s, i) => (
            <Link 
             to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="flex items-center justify-start border-b-2 border-zinc-100 hover:bg-zinc-500 text-zinc-600 font-semibold w-full duration-300 p-4"
            >
              <img
                className="w-[15vh] h-[15vh] object-cover rounded p-2 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.name || s.title || s.orignal_name || s.orignal_title}
              </span>
              {s.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Topnav;
