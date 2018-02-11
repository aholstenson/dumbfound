'use strict';

const generator = require('./generator');
const random = require('./random/source');

const randomInt = require('./random/randomInt');
const randomNumber = require('./random/randomNumber');
const randomBoolean = require('./random/randomBoolean');
const randomString = require('./random/randomString');

const { CharGenerator } = require('./chars/generators');
const ascii = require('./chars/ascii');
const unicode = require('./chars/unicode');

/**
 * Resolve a value, invoking a generator function as needed.
 */
function resolveValue(v) {
	if(generator.isGenerator(v)) {
		return v();
	}

	return v;
}

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

		// Create a generator that wraps this randomizer
		this.gen = generator(this);
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
		max = resolveValue(max);

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
		min = resolveValue(min);
		max = resolveValue(max);

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
		max = resolveValue(max);

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
		min = resolveValue(min);
		max = resolveValue(max);

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
		trueProbability = resolveValue(trueProbability);

		if(typeof trueProbability !== 'number' || trueProbability < 0 || trueProbability > 1) {
			throw new Error('probability must be a number between 0 and 1');
		}

		return randomBoolean(this.random, trueProbability);
	}

	/**
	 * Generate a string using the given generator and length.
	 *
	 * @param {Generator} generator
	 *   The generator to use for creating the string.
	 */
	string(generator, length=undefined) {
		generator = resolveValue(generator);
		if(typeof generator !== 'object' || ! (generator instanceof CharGenerator)) {
			throw new Error('Generator must be provided');
		}

		length = resolveValue(length);
		if(typeof length !== 'number') {
			if(typeof length === 'undefined') {
				length = randomInt(this.random, 0, 20);
			} else {
				throw new Error('length should be a number');
			}
		}

		return randomString(this.random, generator, length);
	}

	/**
	 * Generate string with the given length consisting of printable ASCII
	 * characters.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	ascii(length=undefined) {
		return this.string(ascii, length);
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
	asciiDigits(length=undefined) {
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
	asciiLowercase(length=undefined) {
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
	asciiUppercase(length=undefined) {
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
	asciiAlphaNumeric(length=undefined) {
		return this.string(ascii.alphaNumeric, length);
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
	asciiAlphaNumericWithSpaces(length=undefined) {
		return this.string(ascii.alphaNumericWithSpaces, length);
	}

	unicode(length=undefined) {
		return this.string(unicode, length);
	}

	/**
	 * Generate an array of the specified length.
	 *
	 * @param {number} length
	 *   The length of the array.
	 * @param {function} generator
	 *   Function used to generate values.
	 */
	array(length=undefined, generator) {

		if(typeof generator === 'undefined') {
			// No generator specified, so assuming that length is a generator
			generator = length;
			length = undefined;
		}

		if(typeof length === 'undefined') {
			length = randomInt(this.random, 0, 10);
		} else {
			length = resolveValue(length);
		}

		if(typeof generator !== 'function') {
			throw new Error('A generator function must be provided');
		}

		// Generate the array
		const result = [];
		for(let i=0; i<length; i++) {
			result.push(generator(i));
		}
		return result;
	}
};
