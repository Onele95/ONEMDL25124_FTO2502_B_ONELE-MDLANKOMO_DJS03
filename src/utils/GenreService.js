/**
 * A service for working with podcast genres, including genre ID-to-name conversion
 * and genre listing functionality. Maintains a centralized genre mapping.
 * @namespace GenreService
 */
export const GenreService = {
  /**
   * Mapping of genre IDs to their corresponding names
   * @type {Object.<number, string>}
   * @property {string} 1 - Personal Growth
   * @property {string} 2 - Investigative Journalism
   * @property {string} 3 - History
   * @property {string} 4 - Comedy
   * @property {string} 5 - Entertainment
   * @property {string} 6 - Business
   * @property {string} 7 - Fiction
   * @property {string} 8 - News
   * @property {string} 9 - Kids and Family
   */
  genreMap: {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family"
  },

  /**
   * Converts an array of genre IDs to their corresponding names.
   * Returns "Unknown" for any invalid genre IDs.
   * 
   * @function getNames
   * @memberof GenreService
   * @param {Array<number>} genreIds - Array of genre IDs to convert
   * @returns {Array<string>} Array of genre names (or "Unknown" for invalid IDs)
   * 
   */
  getNames(genreIds) {
    if (!Array.isArray(genreIds)) return [];
    return genreIds.map(id => this.genreMap[id] || "Unknown");
  },

  /**
   * Retrieves all available genres as an array of objects with id and name properties.
   * Useful for displaying a complete list of selectable genres.
   * 
   * @function getAllGenres
   * @memberof GenreService
   * @returns {Array<Object>} Array of all genres in format {id: number, name: string}
   * 
   */
  getAllGenres() {
    return Object.entries(this.genreMap).map(([id, name]) => ({
      id: Number(id),
      name
    }));
  }
};