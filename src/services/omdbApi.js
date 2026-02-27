const API_KEY = 'a547ffa8';
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Service to interact with OMDB API
 */
export const omdbApi = {
  /**
   * Fetch movies by search term
   */
  async searchMovies(searchTerm, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  /**
   * Fetch movie details by IMDB ID
   */
  async getMovieById(imdbId) {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  /**
   * Fetch popular/highest rated movies
   */
  async getTopRatedMovies() {
    try {
      // Since OMDB doesn't have a direct "top rated" endpoint, we'll search for popular categories
      // We'll search for some popular genres to simulate trending content
      const genres = ['action', 'drama', 'comedy', 'sci-fi'];
      const results = [];
      
      for (const genre of genres) {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&s=${genre}&type=movie&r=json&page=1`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.Search && data.Search.length > 0) {
            results.push(...data.Search.slice(0, 3)); // Take top 3 from each genre
          }
        }
      }
      
      // Remove duplicates based on imdbID
      const uniqueResults = results.filter((movie, index, self) =>
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      );
      
      return { Search: uniqueResults.slice(0, 20) }; // Return top 20 unique movies
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  /**
   * Fetch featured movie for hero section (using a specific popular movie)
   */
  async getFeaturedMovie() {
    try {
      // Fetch a popular recent movie for the hero section
      const popularMovies = ['tt0111161', 'tt0068646', 'tt0468569', 'tt0076759']; // IDs for popular movies
      const randomId = popularMovies[Math.floor(Math.random() * popularMovies.length)];
      
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${randomId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured movie:', error);
      throw error;
    }
  }
};