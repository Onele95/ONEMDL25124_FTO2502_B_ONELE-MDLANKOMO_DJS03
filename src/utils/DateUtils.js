/**
 * A collection of date utility functions for formatting and calculating time differences.
 * @namespace DateUtils
 */
export const DateUtils = {
  /**
   * Calculates the time elapsed between a given date and now, returning a human-readable string.
   * Automatically selects the most appropriate time unit (years, months, weeks, etc.).
   * 
   * @function timeSince
   * @memberof DateUtils
   * @param {string|Date} dateStr - ISO date string or Date object
   * @returns {string} Human-readable time difference (e.g., "3 days ago", "1 hour ago")
   * 
   */
  timeSince(dateStr) {
    const date = new Date(dateStr);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    /**
     * Time intervals in seconds for different units
     * @type {Object}
     * @property {number} year - Seconds in a year (365 days)
     * @property {number} month - Seconds in a month (30 days)
     * @property {number} week - Seconds in a week
     * @property {number} day - Seconds in a day
     * @property {number} hour - Seconds in an hour
     * @property {number} minute - Seconds in a minute
     */
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    
    return "Just now";
  },

  /**
   * Formats a date string into a full, human-readable date (e.g., "May 15, 2023").
   * Uses the browser's locale settings for formatting.
   * 
   * @function formatFull
   * @memberof DateUtils
   * @param {string|Date} dateStr - ISO date string or Date object
   * @returns {string} Formatted date string (e.g., "May 15, 2023")
   * 
   */
  formatFull(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
};