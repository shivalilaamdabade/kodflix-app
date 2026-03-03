import React, { useState } from 'react';
import './MovieRow.css';

const MovieRow = ({ title, movies = [] }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  // Scroll horizontally with mouse wheel
  const handleWheel = (e) => {
    e.currentTarget.scrollBy({
      left: e.deltaY < 0 ? -50 : 50,
      behavior: 'smooth'
    });
    e.preventDefault();
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row-posters" onWheel={handleWheel}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID || Math.random()}
            className={`movie-poster ${hoveredMovie === movie.imdbID ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredMovie(movie.imdbID)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                loading="lazy"
              />
            ) : (
              <div className="poster-placeholder">
                <span>No Image</span>
              </div>
            )}
            <div className="movie-info-overlay permanent">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>Rating: {movie.imdbRating || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;