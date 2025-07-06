import { useState } from 'react';
import usePodcasts from './hooks/usePodcasts';
import PodcastCard from './components/PodcastCard';
import PodcastModal from './components/PodcastModal';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

/**
 * The main application component that serves as the entry point for the podcast discovery app.
 * Manages state for search, filtering, and podcast selection, and coordinates all child components.
 * 
 * @component
 * @returns {JSX.Element} The rendered application with header, search, filters, and podcast grid
 * 
 * @example
 * // Rendered automatically when starting the app
 * <App />
 */
function App() {
  // Fetch podcast data and manage loading/error states
  const { podcasts, loading, error, refresh } = usePodcasts();
  
  // State for selected podcast (modal view)
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for filter selection ('all', 'popular', or 'recent')
  const [filter, setFilter] = useState('all');

  /**
   * Filters podcasts based on search term and current filter selection.
   * @type {Array}
   * @property {string} title - Podcast title
   * @property {string} description - Podcast description
   * @property {boolean} isPopular - Flag if podcast has >5 seasons
   * @property {boolean} isRecent - Flag if updated in last 30 days
   */
  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                        (filter === 'popular' && podcast.isPopular) || 
                        (filter === 'recent' && podcast.isRecent);
    
    return matchesSearch && matchesFilter;
  });

  // Display error state if fetching podcasts fails
  if (error) {
    return (
      <div className="error-state">
        <h2>{error.message}</h2>
        <p>{error.details}</p>
        <button onClick={refresh}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Application header with title and search */}
      <header className="app-header">
        <div className="header-container">
          <h1>React Podcast Landing Page</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search podcasts by title or description"
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className="filter-controls">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            aria-label="Show all podcasts"
          >
            All
          </button>
          <button 
            className={filter === 'popular' ? 'active' : ''}
            onClick={() => setFilter('popular')}
            aria-label="Show only popular podcasts"
          >
            Popular
          </button>
          <button 
            className={filter === 'recent' ? 'active' : ''}
            onClick={() => setFilter('recent')}
            aria-label="Show only recently updated podcasts"
          >
            Recent
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="main-content">
        {loading ? (
          // Loading state
          <LoadingSpinner />
        ) : filteredPodcasts.length === 0 ? (
          // Empty results state
          <div className="empty-state">
            <p>No podcasts found matching your criteria</p>
            <button onClick={refresh}>Refresh Podcasts</button>
          </div>
        ) : (
          // Podcast grid display
          <div className="podcast-grid">
            {filteredPodcasts.map(podcast => (
              <PodcastCard 
                key={podcast.id}
                podcast={podcast}
                onClick={() => setSelectedPodcast(podcast)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Podcast detail modal (conditionally rendered) */}
      {selectedPodcast && (
        <PodcastModal 
          podcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  );
}

export default App;