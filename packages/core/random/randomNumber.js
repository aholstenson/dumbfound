'use strict';

/**
 * Generate a random number between the given range.
 */
module.exports = function(random, min, max) {
	return min + (random() * (max - min));
};
