import React from 'react';
import './HeroBanner.css';

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="hero-banner">
      {movie.Poster && movie.Poster !== 'N/A' && (
        <div className="hero-background">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}
      <div className="hero-content">
        <div className="hero-overlay" />
        <div className="hero-text">
          <div className="hero-title-container">
            {movie.Poster && movie.Poster !== 'N/A' && (
              <img className="hero-poster" src={movie.Poster} alt={movie.Title} />
            )}
            <h1>{movie.Title}</h1>
          </div>
          <div className="hero-meta">
            <span className="year">{movie.Year}</span>
            {movie.imdbRating && (
              <span className="rating">★ {movie.imdbRating}/10</span>
            )}
            <span className="runtime">{movie.Runtime}</span>
          </div>
          <p className="hero-description">
            {movie.Plot || 'Synopsis not available.'}
          </p>
          <div className="hero-buttons">
            <button className="btn-play">▶ Play</button>
            <button className="btn-more">ⓘ More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;