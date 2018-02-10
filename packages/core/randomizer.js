'use strict';

const random = require('./random/source');

const randomInt = require('./random/randomInt');
const randomNumber = require('./random/randomNumber');
const randomBoolean = require('./random/randomBoolean');

const { Alphabet } = require('./string/alphabet');
const randomString = require('./random/randomString');
const ascii = require('./string/ascii');

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
		this.random = random(seed);
	}

	/**
	 * Generate a positive number between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the 0 and max (exlusive).
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
	 *   Minimum number to generate (inclusive).
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the given min (inclusive) and max (exlusive).
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
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between 0 and max (exlusive).
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
	 *   Minimum number to generate (inclusive).
	 * @param {number} max
	 *   Maximum number to generate (exclusive).
	 * @returns
	 *   Number between the given min (inclusive) and max (exlusive).
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

	/**
	 * Generate a boolean, optionally providing a probability of it being
	 * true.
	 *
	 * @param {number} probability
	 *   Optional probability of the boolean being `true`.
	 * @returns
	 *   `true` or `false`
	 */
	boolean(trueProbability=0.5) {
		if(typeof trueProbability !== 'number' || trueProbability < 0 || trueProbability > 1) {
			throw new Error('probability must be a number between 0 and 1');
		}

		return randomBoolean(this.random, trueProbability);
	}

	/**
	 * Generate a string using the given alphabet and length.
	 *
	 * @param {Alphabet} alphabet
	 *   The alphabet to use for generation.
	 */
	string(alphabet, length) {
		if(typeof alphabet !== 'object' || ! (alphabet instanceof Alphabet)) {
			throw new Error('Alphabet must be provided');
		}

		if(typeof length !== 'number') {
			throw new Error('length is required');
		}

		return randomString(this.random, alphabet, length);
	}

	/**
	 * Generate string with the given length consisting of ASCII digits
	 * (0 to 9).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiDigits(length) {
		return this.string(ascii.digits, length);
	}

	/**
	 * Generate a string with the given length consisting of ASCII lower-case
	 * characters (a to z).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiLowercase(length) {
		return this.string(ascii.lowercase, length);
	}

	/**
	 * Generate a string with the given length consisting of ASCII upper-case
	 * characters (A to Z).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiUppercase(length) {
		return this.string(ascii.uppercase, length);
	}

	/**
	 * Generate a string consisting of ASCII upper-case, lower-case and digits.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	ascii(length) {
		return this.string(ascii.withoutSpaces, length);
	}

	/**
	 * Generate a string consisting of ASCII upper-case, lower-case, digits
	 * and spaces.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiWithSpaces(length) {
		return this.string(ascii.withSpaces, length);
	}
};
