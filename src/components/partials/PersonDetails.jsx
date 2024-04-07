import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  asyncloadperson,
  removeperson,
} from "../../store/action/personActions";
import Dropdown from "../partials/Dropdown";
import HorizontalCards from "./HorizontalCards";
import Loading from "./Loading";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen h-[250vh] bg-[#1F1E24]">
      {/* Part 1 navigation. */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl h-[8vh] items-center">
        <Link onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        </Link>
      </nav>

      <div className="w-full flex ">
        {/* Part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className=" object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[35vh] mb-5"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <hr className=" h-[2px] bg-zinc-500 mb-5" />

          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-x-5 ">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Info. */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">Deathday</h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Place Of Birth
          </h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Also known as
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.also_known_as.join(",")}
          </h1>
        </div>

        {/* Part 3 right Details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold ">Biography</h1>
          <p className="text-zinc-400 mt-1">{info.detail.biography}</p>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-5">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between ">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className=" list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.5)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer mt-2">
                <Link className=" ">
                  <span>
                    {" "}
                    {c.name || c.title || c.orignal_name || c.orignal_title}
                  </span>
                  <span className="block ml-5 mt-3"> {c.character && `Character Name : ${c.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
