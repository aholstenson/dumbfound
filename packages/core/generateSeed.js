'use strict';

/**
 * Generate a seed by using the time and Math.random().
 */
module.exports = function() {
	return (Date.now() / 100 * Math.random()).toString(16);
};
