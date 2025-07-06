import PropTypes from 'prop-types';
import { GenreService } from '../utils/GenreService.js';
import { DateUtils } from '../utils/DateUtils.js';
import './PodcastCard.css';

/**
 * A card component that displays podcast information including image, title, 
 * seasons count, genres, and last update time.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.podcast - The podcast data object
 * @param {Function} props.onClick - Click handler for the card
 * @returns {JSX.Element} A styled podcast card element
 * 
 */
const PodcastCard = ({ podcast, onClick }) => {
  return (
    <article className="podcast-card" onClick={onClick}>
      <div className="card-image">
        <img 
          src={podcast.image} 
          alt={`Cover for ${podcast.title}`}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3>{podcast.title}</h3>
        <p className="seasons">{podcast.seasons} season{podcast.seasons !== 1 ? 's' : ''}</p>
        
        <div className="genres">
          {GenreService.getNames(podcast.genres).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
        
        <p className="updated">{DateUtils.timeSince(podcast.updated)}</p>
      </div>
    </article>
  );
};

/**
 * Prop type validation for the PodcastCard component
 * @type {Object}
 * @property {Object} podcast - The podcast data object
 * @property {string} podcast.id - Unique identifier for the podcast
 * @property {string} podcast.title - Title of the podcast
 * @property {string} podcast.image - URL of the podcast cover image
 * @property {number} podcast.seasons - Number of seasons available
 * @property {Array<number>} podcast.genres - Array of genre IDs
 * @property {string} podcast.updated - ISO timestamp of last update
 * @property {Function} onClick - Click handler function
 */
PodcastCard.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    seasons: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    updated: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default PodcastCard;