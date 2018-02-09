'use strict';

const seedRandom = require('seed-random');
const randomInt = require('./randomInt');
const randomNumber = require('./randomNumber');

/**
 * Randomizer that provides helper methods to generate random values of
 * different types.
 *
 * Delegates the work to `seed-random` that provides the seeded random
 * function and to generators such as `randomInt` and `randomNumber`.
 */
module.exports = class Randomizer {

	/**
	 * Create a new randomizer with the given seed. The seed is an integer
	 * and can be specified either as a number or using a string.
	 */
	constructor(seed) {
		if(typeof seed === 'string') {
			seed = parseInt(seed, 16);
		}
		else if(typeof seed !== 'number') {
			throw new Error('Seed must be specified as a number');
		}

		this.seed = seed.toString(16);
		this.random = seedRandom(seed);
	}

	/**
	 * Generate a positive number between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate.
	 */
	number(max) {
		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomNumber(this.random, 0, max);
	}

	/**
	 * Generate a random number in the given range.
	 *
	 * @param {number} min
	 *   Minimum number to generate.
	 * @param {number} max
	 *   Maximum number to generate.
	 */
	numberBetween(min, max) {
		if(typeof min !== 'number') {
			throw new Error('min is required to be a number');
		}

		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomNumber(this.random, min, max);
	}

	/**
	 * Generate a positive integer between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate.
	 */
	int(max) {
		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomInt(this.random, 0, max);
	}

	/**
	 * Generate an integer (whole number) in the given range.
	 *
	 * @param {number} min
	 *   Minimum number to generate.
	 * @param {number} max
	 *   Maximum number to generate.
	 */
	intBetween(min, max) {
		if(typeof min !== 'number') {
			throw new Error('min is required to be a number');
		}

		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomInt(this.random, min, max);
	}
};
