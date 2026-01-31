import React from 'react';

const MovieCard = ({ movie, onAdd }) => {
  return (
    <div className="movie">
      <div className="movie-meta">
        <p>{movie.Year}</p>
      </div>

      <div className="movie-poster">
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/400'
          }
          alt={movie.Title}
        />
      </div>

      <div className="movie-info">
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>

        <button className="wish-btn" onClick={() => onAdd(movie)}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
