import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

import SearchIcon from './search.svg';
import WishlistIcon from './Wishlist_icon.png';

const API_URL = process.env.REACT_APP_MOVIES_API_URL;
const DEFAULT_KEYWORDS = ['Batman', 'Avengers', 'Harry Potter', 'Marvel'];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Load wishlist */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist'));
    if (saved) setWishlist(saved);
  }, []);

  /* Save wishlist */
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const buildUrl = (query) => {
    if (API_URL.includes('&s=')) {
      return `${API_URL}${encodeURIComponent(query)}`;
    }
    return `${API_URL}&s=${encodeURIComponent(query)}`;
  };

  /* Load default movies (idle state) */
  useEffect(() => {
    const loadDefaultMovies = async () => {
      setLoading(true);
      try {
        const random =
          DEFAULT_KEYWORDS[
            Math.floor(Math.random() * DEFAULT_KEYWORDS.length)
          ];

        const response = await fetch(buildUrl(random));
        const data = await response.json();

        if (data.Response === 'True') {
          const unique = Array.from(
            new Map(data.Search.map((m) => [m.imdbID, m])).values()
          );
          setMovies(unique);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultMovies();
  }, []);

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setMovies([]);

    try {
      const response = await fetch(buildUrl(searchTerm));
      const data = await response.json();

      if (data.Response === 'True') {
        const unique = Array.from(
          new Map(data.Search.map((m) => [m.imdbID, m])).values()
        );
        setMovies(unique);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = (movie) => {
    if (!wishlist.some((m) => m.imdbID === movie.imdbID)) {
      setWishlist([...wishlist, movie]);
    }
    setDrawerOpen(true);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((m) => m.imdbID !== id));
  };

  return (
    <div className="app">
      <h1>SaiFlix</h1>

      {/* SEARCH + WISHLIST ICON */}
      <div className="search-bar">
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
          />
          <img src={SearchIcon} alt="search" onClick={searchMovies} />
        </div>

        {/* WISHLIST ICON BUTTON */}
        <button
          className="wishlist-icon-btn"
          onClick={() => setDrawerOpen(true)}
        >
          <img src={WishlistIcon} alt="wishlist" />
          {wishlist.length > 0 && (
            <span className="wishlist-count">{wishlist.length}</span>
          )}
        </button>
      </div>

      <h2 className="section-title">
        {hasSearched ? 'Search Results' : 'Trending Movies'}
      </h2>

      <div className="container">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}></div>
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onAdd={addToWishlist}
            />
          ))
        )}
      </div>

      {/* RIGHT SIDE WISHLIST DRAWER */}
      <div className={`wishlist-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Your Wishlist</h3>
          <button onClick={() => setDrawerOpen(false)}>← Back</button>
        </div>

        {wishlist.length === 0 ? (
          <p className="empty-wish">No movies added</p>
        ) : (
          wishlist.map((movie) => (
            <div className="wish-item" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <p>{movie.Title}</p>
                <button onClick={() => removeFromWishlist(movie.imdbID)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {drawerOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
