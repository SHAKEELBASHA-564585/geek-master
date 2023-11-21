import React, { useEffect, useState } from "react";
import "./MovieListPage.css";
import CompanyInfoPage from "./CompanyInfoPage";

const MovieListPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  useEffect(() => {
    fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
      }),
    })
      .then((response) => response.json())
      .then((data) => setMovieList(data.result))
      .catch((error) => console.error("Error fetching movie list:", error));
  }, []);

  const toggleCompanyDetails = () => {
    setShowCompanyInfo((prev) => !prev);
  };

  return (
    <div className="movie-list-container">
      <div className="dd">
        <h2 className="basha">Movie List</h2>
        <button onClick={toggleCompanyDetails}>Company Details</button>
      </div>

      {showCompanyInfo && <CompanyInfoPage />}

      <ul className="unorder">
        {movieList.map((movie) => (
          <li className="listitem" key={movie.id}>
            <div className="md">
              <h1>Votes {movie.totalVoted}</h1>
              <div>
                <img className="img1" src={movie.poster} alt="image" />
              </div>
              <div className="det">
                <h2 className="title">{movie.title}</h2>
                <p className="nn">Genre: {movie.genre}</p>
                <p className="nn">Director: {movie.director}</p>
                <p className="nn">Starred: {movie.stars}</p>
                <p className="nn">
                  Voted by {movie.totalVoted} People | {movie.pageViews} views
                </p>
              </div>
            </div>
            <button className="btn">Watch Trailer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListPage
