import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = process.env.REACT_APP_MOVIES_API_URL;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMovies = async (title) => {
    if (!title) return;

    setLoading(true);
    setMovies([]); // clear old data

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True') {
        // remove duplicates
        const uniqueMovies = Array.from(
          new Map(data.Search.map((m) => [m.imdbID, m])).values()
        );
        setMovies(uniqueMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
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
    <div className="app">
      <h1>SaiFlix</h1>

      <div className="search">
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

      <div className="container">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}></div>
          ))
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))
        ) : (
          <div className="empty">
            <h2>No Movies Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
