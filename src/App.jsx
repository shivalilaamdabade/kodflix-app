import { useState, useEffect } from 'react';
import { omdbApi } from './services/omdbApi';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import './App.css';

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [scifiMovies, setScifiMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured movie for hero banner
        const featured = await omdbApi.getFeaturedMovie();
        setFeaturedMovie(featured);
        
        // Fetch various movie categories
        const topRatedResult = await omdbApi.getTopRatedMovies();
        setTopMovies(topRatedResult.Search || []);
        
        const actionResult = await omdbApi.searchMovies('action');
        setActionMovies(actionResult.Search || []);
        
        const dramaResult = await omdbApi.searchMovies('drama');
        setDramaMovies(dramaResult.Search || []);
        
        const comedyResult = await omdbApi.searchMovies('comedy');
        setComedyMovies(comedyResult.Search || []);
        
        const horrorResult = await omdbApi.searchMovies('horror');
        setHorrorMovies(horrorResult.Search || []);
        
        const scifiResult = await omdbApi.searchMovies('sci-fi');
        setScifiMovies(scifiResult.Search || []);
        
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error Loading Movies</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <h1 className="logo">KODFLIX</h1>
        </div>
        <div className="nav-right">
          <button className="nav-profile">Profile</button>
        </div>
      </header>
      <HeroBanner movie={featuredMovie} />
      <main>
        <MovieRow title="Trending Now" movies={topMovies} />
        <MovieRow title="Action & Adventure" movies={actionMovies} />
        <MovieRow title="Dramas" movies={dramaMovies} />
        <MovieRow title="Comedies" movies={comedyMovies} />
        <MovieRow title="Horror" movies={horrorMovies} />
        <MovieRow title="Sci-Fi & Fantasy" movies={scifiMovies} />
      </main>
    </div>
  );
}

export default App
