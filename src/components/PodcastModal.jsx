import PropTypes from 'prop-types';
import { DateUtils } from '../utils/DateUtils.js';
import { GenreService } from '../utils/GenreService.js';
import './PodcastModal.css';

/**
 * A modal dialog component that displays detailed information about a podcast.
 * Includes podcast image, title, description, genres, seasons count, and last update time.
 * The modal can be closed by clicking the close button or the overlay background.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.podcast - The podcast data object containing detailed information
 * @param {Function} props.onClose - Callback function to close the modal
 * @returns {JSX.Element} A modal dialog with podcast details
 * 
 */
const PodcastModal = ({ podcast, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <div className="modal-header">
          <h2>{podcast.title}</h2>
        </div>
        
        <div className="modal-body">
          <div className="podcast-image">
            <img src={podcast.image} alt={podcast.title} loading="lazy" />
          </div>
          
          <div className="podcast-details">
            <div className="description">
              <h3>Description</h3>
              <p>{podcast.description}</p>
            </div>
            
            <div className="genres">
              <h3>Genres</h3>
              <div className="genre-tags">
                {GenreService.getNames(podcast.genres).map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
            
            <div className="season-info">
              <h3>Seasons</h3>
              <p>{podcast.seasons} season{podcast.seasons !== 1 ? 's' : ''}</p>
            </div>
            
            <p className="updated">
              Last updated: {DateUtils.timeSince(podcast.updated)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Prop type validation for the PodcastModal component
 * @type {Object}
 * @property {Object} podcast - The podcast data object
 * @property {string} podcast.id - Unique identifier for the podcast
 * @property {string} podcast.title - Title of the podcast
 * @property {string} podcast.description - Detailed description of the podcast
 * @property {string} podcast.image - URL of the podcast cover image
 * @property {number} podcast.seasons - Number of seasons available
 * @property {Array<number>} podcast.genres - Array of genre IDs
 * @property {string} podcast.updated - ISO timestamp of last update
 * @property {Function} onClose - Function to call when closing the modal
 */
PodcastModal.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    updated: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default PodcastModal;