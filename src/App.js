import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = process.env.REACT_APP_MOVIES_API_URL;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const searchMovies = async (title) => {
    setLoading(true);

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search || []);
    setTimeout(() => setLoading(false), 600); // smooth feel
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className="app fade-in">
      <h1>SaiFlix</h1>

      <div className="search slide-down">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {loading ? (
        <div className="container">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}></div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="container fade-up">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty fade-up">
          <h2>No Movies Found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
