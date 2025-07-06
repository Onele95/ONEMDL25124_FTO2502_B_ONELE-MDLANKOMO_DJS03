import { useState, useEffect } from 'react';

/**
 * A custom React hook for fetching, managing, and transforming podcast data.
 * Handles loading states, errors, and provides refresh capability.
 * 
 * @function
 * @returns {Object} An object containing podcasts data and state information
 * @property {Array} podcasts - Array of transformed podcast objects
 * @property {boolean} loading - Loading state indicator
 * @property {Object|null} error - Error information if request fails
 * @property {Function} refresh - Function to manually refresh the podcast data
 * 
 */
const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches podcast data from the API, transforms it, and updates state.
   * Handles loading states and errors during the fetch operation.
   * 
   * @async
   * @function fetchPodcasts
   * @throws {Error} When network request fails or response is not OK
   */
  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://podcast-api.netlify.app/shows');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      /**
       * Transforms raw podcast data from API into a more useful format
       * @type {Array}
       * @property {string} id - Podcast unique identifier
       * @property {string} title - Podcast title
       * @property {string} description - Podcast description
       * @property {number} seasons - Number of seasons
       * @property {string} image - URL of podcast cover image
       * @property {Array} genres - Array of genre IDs
       * @property {string} updated - Last updated timestamp
       * @property {boolean} isPopular - Flag if podcast has more than 5 seasons
       * @property {boolean} isRecent - Flag if podcast was updated in last 30 days
       */
      const transformedPodcasts = data.map(podcast => ({
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        seasons: podcast.seasons,
        image: podcast.image,
        genres: podcast.genres,
        updated: podcast.updated,
        isPopular: podcast.seasons > 5,
        isRecent: new Date(podcast.updated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }));
      
      setPodcasts(transformedPodcasts);
    } catch (err) {
      setError({
        message: 'Failed to load podcasts',
        details: err.message
      });
      console.error('Error fetching podcasts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch podcasts on initial mount
  useEffect(() => {
    fetchPodcasts();
  }, []);

  return { 
    podcasts, 
    loading, 
    error,
    refresh: fetchPodcasts
  };
};

export default usePodcasts;