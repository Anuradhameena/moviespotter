import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Dropdown from "./partials/Dropdown";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Slidenav from "./partials/Slidenav";
import Topnav from "./partials/Topnav";
import Loading from "./partials/Loading";

const Home = () => {
  document.title = "MovieApp | Homepage.";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log("API Response:", data); // Log the API response
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      // console.log("Random Data:", randomdata); // Log the random data
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error fetching wallpaper:", error); // Log any errors
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error fetching wallpaper:", error); // Log any errors
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Slidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
