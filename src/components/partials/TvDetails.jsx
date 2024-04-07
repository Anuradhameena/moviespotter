import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../../store/action/tvActions";
import HorizontalCards from "./HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 5%",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[200vh] px-[10%]"
    >
      {/* Part 1 navigation. */}
      <nav className="w-full text-zinc-100 flex gap-10 text-xl h-[8vh] items-center">
        <Link onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        </Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full flex">
        <img
          className=" object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[55vh]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-xl font-black ">
            {" "}
            {info.detail.name ||
              info.detail.title ||
              info.detail.orignal_name ||
              info.detail.orignal_title}
            <small className="text-2xl font-bold text-zinc-200  ">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex  items-center gap-x-5  ">
            <span className=" rounded-full text-xl font-semibold bg-yellow-600 w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[60px]">User Scores</h1>
            <h1 className="">({info.detail.first_air_date})</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min.</h1>
          </div>
          <h1 className="text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mt-2 mb-3">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-xl mt-3 mb-3">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(" ")}</p>

          <Link
            className="px-5 py-5 bg-[#6556CD] rounded-lg  "
            to={`${pathname}/trailer`}
          >
            <i className="m-2 ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on platform */}
      <div className="w-[55vh] flex flex-col gap-y-3 m-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-5 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-5 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-5 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Seasons*/}
      {/* <div className="mt-10"> */}
        <hr className=" h-[2px] bg-zinc-500" />
        <h1 className="mt-10 text-3xl font-bold text-white">Seasons</h1>
        <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
          {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
            <div className="w-[15vh] mr-[8%]">
              <img
                className="h-[30vh] min-w-[12vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />

              <h1 className="text-xl w-[200px] text-zinc-200 mt-3 font-semibold">
                { s.name }
              </h1>
            </div>
          )):(<h1 className="text-3xl text-white font-black text-center">Nothing to Show</h1>)}
        </div>
      {/* </div> */}

      {/* Part 5 Recomendations and similar stuff */}
      <div className="mt-10">
        <hr className=" h-[2px] bg-zinc-500" />
        <h1 className="mt-10 text-3xl font-bold text-white">
          Recommendations & Similar Stuff
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
