'use strict';

/**
 * Generate a random whole number between the given min and max (exlusive).
 */
module.exports = function(random, min, max) {
	return Math.floor(min + random() * (max - min));
};
