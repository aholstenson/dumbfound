'use strict';

const generator = require('./generator');
const random = require('./random/source');

const pickWeighted = require('./random/pickWeighted');
const randomInt = require('./random/randomInt');
const randomNumber = require('./random/randomNumber');
const randomEvilNumber = require('./random/randomEvilNumber');
const randomBoolean = require('./random/randomBoolean');
const randomString = require('./random/randomString');
const randomArray = require('./random/randomArray');
const randomUUID = require('./random/randomUUID');

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
	 * Generate an undefined value. For API completeness and use via generators.
	 */
	undefined() {
		return undefined;
	}

	/**
	 * Generate a null value. For API completeness and use via generators.
	 */
	null() {
		return null;
	}

	/**
	 * Generate a NaN value. For API completeness and use via generators.
	 */
	nan() {
		return NaN;
	}

	/**
	 * Generate a number. When max is specified the returned number will be
	 * between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the 0 and max (exlusive).
	 */
	number(max) {
		max = resolveValue(max);
		let min = 0;
		if(typeof max === 'undefined') {
			min = Number.MIN_SAFE_INTEGER / 1000000;
			max = Number.MAX_SAFE_INTEGER / 1000000;
		} else if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomNumber(this.random, min, max);
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
		let min = 0;
		if(typeof max === 'undefined') {
			min = Number.MIN_SAFE_INTEGER;
			max = Number.MAX_SAFE_INTEGER;
		} else if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomInt(this.random, min, max);
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
	 * Generate an evil number. When max is specified the returned number will
	 * be between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the 0 and max (exlusive).
	 */
	evilNumber(max) {
		max = resolveValue(max);
		let min = 0;
		if(typeof max === 'undefined') {
			min = Number.MIN_SAFE_INTEGER / 1000000;
			max = Number.MAX_SAFE_INTEGER / 1000000;
		} else if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomEvilNumber(this.random, min, max);
	}

	/**
	 * Generate an evil random number in the given range.
	 *
	 * @param {number} min
	 *   Minimum number to generate (inclusive).
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the given min (inclusive) and max (exlusive).
	 */
	evilNumberBetween(min, max) {
		min = resolveValue(min);
		max = resolveValue(max);

		if(typeof min !== 'number') {
			throw new Error('min is required to be a number');
		}

		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return randomEvilNumber(this.random, min, max);
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

	/**
	 * Generate a string consisting of characters from the entire Unicode
	 * range.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 */
	unicode(length=undefined) {
		return this.string(unicode, length);
	}

	/**
	 * Generate a value, either `null`, `NaN`, `undefined`, a number, a
	 * boolean or a string.
	 */
	primitiveValue() {
		const picked = pickWeighted(this.random, [
			2, // null
			1, // NaN,
			2, // undefined,
			5, // number
			4, // boolean,
			5 // string
		]);

		switch(picked) {
			case 0:
				return null;
			case 1:
				return NaN;
			case 2:
				return undefined;
			case 3:
				return this.number();
			case 4:
				return this.boolean();
			case 5:
				return this.ascii();
		}
	}

	/**
	 * Pick one of the items in the given array using an equally distributed
	 * probability.
	 *
	 * @param {array} items
	 *   Array of items to pick from. Entries in the array may be generators
	 *   in which case they will be invoked.
	 * @returns
	 *   Picked value.
	 */
	pick(items, weights) {
		items = resolveValue(items);
		if(! Array.isArray(items)) {
			throw new Error('items must be an array');
		}

		let idx;

		weights = resolveValue(weights);
		if(Array.isArray(weights)) {
			// This a weighted request
			if(items.length !== weights.length) {
				throw new Error('Number of items and weights must be equal');
			}

			idx = pickWeighted(this.random, weights);
		} else if(typeof weights !== 'undefined') {
			throw new Error('weights must be an array or omitted');
		} else {
			idx = randomInt(this.random, 0, items.length);
		}

		return resolveValue(items[idx]);
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

		return randomArray(length, generator, false);
	}

	/**
	 * Generate an array of the specified length that is only allowed to
	 * contain a value once. Will throw an error if unable to get enough
	 * unique values from the generator.
	 *
	 * @param {number} length
	 * @param {function} generator
	 */
	uniqueArray(length=undefined, generator) {
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

		return randomArray(length, generator, true);
	}

	/**
	 * Generate a Set of the given length. Works the same as `uniqueArray` but
	 * returns a Set-object instead of an array.
	 */
	set(length=undefined, generator) {
		const values = this.uniqueArray(length, generator);
		return new Set(values);
	}

	/**
	 * Generate UUIDv4.
	 */
	uuid() {
		return randomUUID(this.random);
	}
};
