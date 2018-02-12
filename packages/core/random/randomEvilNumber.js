'use strict';

const nextAfter = require('nextafter');

const pickWeighted = require('./pickWeighted');

/**
 * Generate a random number within the given range, biasing towards more evil
 * numbers that commonly cause issues.
 */
module.exports = function(random, min, max) {

	if(min === max) return min;

	const options = [
		1, // Return minimum value
		1, // Return maximum value adjusted down
		10, // Near minimum value
		10, // Near maximum value
		20, // Normal random number
	];

	if(min <= 0 && max >= 0) {
		// Add a chance for a number around zero to be generated
		options.push(5);
	}

	const picked = pickWeighted(random, options);
	switch(picked) {
		case 0: // Return minimum value
			return min;
		case 1: // Return maximum value adjusted down
			return max;
		case 2: // Near minimum value
			return adjustUp(random, min, max);
		case 3: // Near maximum value
			return adjustDown(random, max, min);
		case 4: // Normal random number
			return random.numberBetween(min, max);
		case 5: // Near zero
			return nearZero(random, min, max);
	}
};

/**
 * Adjust the given value downwards a random number of steps.
 */
function adjustDown(random, value, min) {
	const steps = random.intBetween(random, 1, 10);
	for(let i=0; i<steps; i++) {
		value = nextAfter(value, Number.NEGATIVE_INFINITY);
		if(value === min) break;
	}
	return value;
}

/**
 * Adjust the given value upwards a random number of steps.
 */
function adjustUp(random, value, max) {
	const steps = random.intBetween(1, 10);
	for(let i=0; i<steps; i++) {
		value = nextAfter(value, Number.POSITIVE_INFINITY);
		if(value === max) break;
	}
	return value;
}

/**
 * Generate a number near or equal to zer.
 */
function nearZero(random, min, max) {
	const pick = random.intBetween(0, 3);
	switch(pick) {
		case 0:
			// Normal zero
			return 0;
		case 1:
			// Negative zero
			return -0;
		case 2:
			// A bit below zero
			return adjustDown(random, 0, min);
		case 3:
			// A bit above zero
			return adjustUp(random, 0, max);
	}
}
