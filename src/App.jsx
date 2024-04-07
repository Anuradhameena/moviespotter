import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";
import People from "./components/People";
import Popular from "./components/Popular";
import Trending from "./components/Trending";
import Tvshows from "./components/Tvshows";
import MovieDetails from "./components/partials/MovieDetails";
import PersonDetails from "./components/partials/PersonDetails";
import TvDetails from "./components/partials/TvDetails";
import Trailer from "./components/partials/Trailer";
import Notfound from "./components/partials/Notfound";

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<Notfound />} />

      </Routes>
    </div>
  );
};

export default App;
