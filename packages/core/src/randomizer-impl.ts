'use strict';

import { Random, createRandom } from './random/random-source';
import { randomEvilNumber } from './random/randomEvilNumber';
import { randomBoolean } from './random/randomBoolean';
import { CharGenerator, ascii, asciiDigits, asciiLowercase, asciiUppercase, asciiAlphaNumeric, asciiAlphaNumericWithSpaces, allOfUnicode } from './chars';
import { randomString } from './random/randomString';
import { pickWeighted } from './random/pickWeighted';
import { Randomizer } from './randomizer';
import { randomUUID } from './random/randomUUID';
import { Source, isGenerator, Generator } from './source';
import { RandomizerGenerator, createGenerator } from './generator';

/**
 * Resolve a value, invoking a generator function as needed.
 */
function resolveValue<V>(randomizer: Randomizer, v: Source<V>): V {
	if(isGenerator(v)) {
		return v(randomizer);
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
export class RandomizerImpl implements Randomizer {
	public readonly seed: string;
	public readonly gen: RandomizerGenerator;

	private random: Random;

	/**
	 * Create a new randomizer with the given seed. The seed is an integer
	 * and can be specified either as a number or using a string.
	 */
	constructor(seed: string | number) {
		if(typeof seed === 'string') {
			seed = parseInt(seed, 16);
		}
		else if(typeof seed !== 'number') {
			throw new Error('Seed must be specified as a number');
		}

		this.seed = seed.toString(16);
		this.random = createRandom(seed);

		this.gen = createGenerator(this);
	}

	/**
	 * Generate an undefined value. For API completeness and use via generators.
	 */
	public undefined() {
		return undefined;
	}

	/**
	 * Generate a null value. For API completeness and use via generators.
	 */
	public null() {
		return null;
	}

	/**
	 * Generate a NaN value. For API completeness and use via generators.
	 */
	public nan() {
		return NaN;
	}

	/**
	 * Generate a number. When max is specified the returned number will be
	 * between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between the 0 (inclusive) and max (inclusive).
	 */
	public number(max?: Source<number>): number {
		max = typeof max === 'undefined' ? undefined : resolveValue(this, max);
		let min = 0;
		if(typeof max === 'undefined') {
			min = Number.MIN_SAFE_INTEGER / 1000000;
			max = Number.MAX_SAFE_INTEGER / 1000000;
		} else if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return this.random.numberBetween(min, max);
	}

	/**
	 * Generate a random number in the given range.
	 *
	 * @param {number} min
	 *   Minimum number to generate (inclusive).
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between the given min (inclusive) and max (inclusive).
	 */
	public numberBetween(min: Source<number>, max: Source<number>): number {
		min = resolveValue(this, min);
		max = resolveValue(this, max);

		if(typeof min !== 'number') {
			throw new Error('min is required to be a number');
		}

		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return this.random.numberBetween(min, max);
	}

	/**
	 * Generate a positive integer between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between 0 and max (inclusive).
	 */
	public int(max?: Source<number>): number {
		max = typeof max === 'undefined' ? undefined : resolveValue(this, max);
		let min = 0;
		if(typeof max === 'undefined') {
			min = Number.MIN_SAFE_INTEGER;
			max = Number.MAX_SAFE_INTEGER;
		} else if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return this.random.intBetween(min, max);
	}

	/**
	 * Generate an integer (whole number) in the given range.
	 *
	 * @param {number} min
	 *   Minimum number to generate (inclusive).
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between the given min (inclusive) and max (inclusive).
	 */
	public intBetween(min: Source<number>, max: Source<number>): number {
		min = resolveValue(this, min);
		max = resolveValue(this, max);

		if(typeof min !== 'number') {
			throw new Error('min is required to be a number');
		}

		if(typeof max !== 'number') {
			throw new Error('max is required to be a number');
		}

		return this.random.intBetween(min, max);
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
	public evilNumber(max?: Source<number>): number {
		max = typeof max === 'undefined' ? undefined : resolveValue(this, max);
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
	public evilNumberBetween(min: Source<number>, max: Source<number>): number {
		min = resolveValue(this, min);
		max = resolveValue(this, max);

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
	public boolean(trueProbability=0.5): boolean {
		trueProbability = resolveValue(this, trueProbability);

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
	public string(generator: CharGenerator, length?: Source<number>): string {
		generator = resolveValue(this, generator);
		if(! isGenerator(generator)) {
			throw new Error('Generator must be provided');
		}

		length = typeof length === 'undefined' ? undefined : resolveValue(this, length);
		if(typeof length !== 'number') {
			if(typeof length === 'undefined') {
				length = this.random.intBetween(0, 20);
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
	public ascii(length?: Source<number>): string {
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
	public asciiDigits(length?: Source<number>): string {
		return this.string(asciiDigits, length);
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
	public asciiLowercase(length?: Source<number>): string {
		return this.string(asciiLowercase, length);
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
	public asciiUppercase(length?: Source<number>): string {
		return this.string(asciiUppercase, length);
	}

	/**
	 * Generate a string consisting of ASCII upper-case, lower-case and digits.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	public asciiAlphaNumeric(length?: Source<number>): string {
		return this.string(asciiAlphaNumeric, length);
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
	public asciiAlphaNumericWithSpaces(length?: Source<number>): string {
		return this.string(asciiAlphaNumericWithSpaces, length);
	}

	/**
	 * Generate a string consisting of characters from the entire Unicode
	 * range.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 */
	public unicode(length?: Source<number>): string {
		return this.string(allOfUnicode, length);
	}

	/**
	 * Generate a value, either `null`, `NaN`, `undefined`, a number, a
	 * boolean or a string.
	 */
	public primitiveValue() {
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
	 * Generate a truthy value. Will generate values that would be true when
	 * put into an `if`-statement.
	 *
	 * @returns
	 *   Truthy value.
	 */
	public truthy() {
		const picked = pickWeighted(this.random, [
			20, // Boolean
			5, // Object
			5, // Array
			5, // String
			5, // Number
			1, // Negative number,
			3, // Infinity,
			3 // Negative Infinity
		]);

		switch(picked) {
			case 0:
				return true;
			case 1:
				return {};
			case 2:
				return [];
			case 3:
				return this.ascii(this.intBetween(1, 25));
			case 4:
				return this.intBetween(1, 25);
			case 5:
				return this.intBetween(-25, -1);
			case 6:
				return Number.POSITIVE_INFINITY;
			case 7:
				return Number.NEGATIVE_INFINITY;
		}
	}

	/**
	 * Generate a falsy value. Will generate values that would be false when
	 * put into an `if`-statement.
	 *
	 * @returns
	 *   Falsy value.
	 */
	public falsy() {
		const picked = pickWeighted(this.random, [
			20, // Boolean
			10, // Null
			5, // Undefined
			5, // Zero
			5, // NaN
			10, // Empty string
		]);

		switch(picked) {
			case 0:
				return false;
			case 1:
				return null;
			case 2:
				return undefined;
			case 3:
				return 0;
			case 4:
				return Number.NaN;
			case 5:
				return '';
		}
	}

	/**
	 * Return `true` frequently (90% of the time).
	 */
	public frequently() {
		return this.random.number() < 0.9;
	}

	/**
	 * Return `false` frequently (90% of the time).
	 */
	public rarely() {
		return ! this.frequently();
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
	public pick<V>(items: Source<V[]>, weights: Source<Source<number>[]>): V {
		items = resolveValue(this, items);
		if(! Array.isArray(items)) {
			throw new Error('items must be an array');
		}

		let idx;

		weights = resolveValue(this, weights);
		if(Array.isArray(weights)) {
			// This a weighted request
			if(items.length !== weights.length) {
				throw new Error('Number of items and weights must be equal');
			}

			const resolvedWeights: number[] = [];
			for(const w of weights) {
				resolvedWeights.push(resolveValue(this, w));
			}

			idx = pickWeighted(this.random, resolvedWeights);
		} else if(typeof weights !== 'undefined') {
			throw new Error('weights must be an array or omitted');
		} else {
			idx = this.random.intBetween(0, items.length - 1);
		}

		return items[idx];
	}

	/**
	 * Generate an array of the specified length.
	 *
	 * @param {number} length
	 *   The length of the array.
	 * @param {function} generator
	 *   Function used to generate values.
	 */
	public array<V>(length: Source<number>, generator: Generator<V>): V[] {
		length = resolveValue(this, length);

		if(typeof length !== 'number') {
			throw new Error('A length must be specified');
		}

		if(typeof generator !== 'function') {
			throw new Error('A generator function must be provided');
		}

		return randomArray(this, length, generator, false);
	}

	/**
	 * Generate an array of the specified length that is only allowed to
	 * contain a value once. Will throw an error if unable to get enough
	 * unique values from the generator.
	 *
	 * @param {number} length
	 * @param {function} generator
	 */
	public uniqueArray<V>(length: Source<number>, generator: Generator<V>): V[] {
		length = resolveValue(this, length);

		if(typeof length !== 'number') {
			throw new Error('A length must be specified');
		}

		if(typeof generator !== 'function') {
			throw new Error('A generator function must be provided');
		}

		return randomArray(this, length, generator, true);
	}

	/**
	 * Generate a Set of the given length. Works the same as `uniqueArray` but
	 * returns a Set-object instead of an array.
	 */
	public set<V>(length: Source<number>, generator: Generator<V>) {
		const values = this.uniqueArray(length, generator);
		return new Set(values);
	}

	/**
	 * Generate UUIDv4.
	 */
	public uuid(): string {
		return randomUUID(this.random);
	}
}


/**
 * Helper for creating arrays and to support generating arrays with unique
 * values.
 *
 * @param {number} length
 * @param {function} generator
 * @param {boolean} unique
 */
function randomArray<C>(randomizer: Randomizer, length: number, generator: Generator<C>, unique?: boolean): C[] {
	// Generate the array
	const result = [];

	if(unique) {
		// Try to fill up the array until correct number of items
		const maxCount = length * 100;
		let count = 0;

		while(result.length < length) {
			const value = generator(randomizer);

			// TODO: Support for deep-equal?
			if(result.indexOf(value) === -1) {
				result.push(value);
			}

			// Keep track of how many items have been generated
			count++;
			if(count > maxCount) {
				throw new Error('Unable to generate enough unique values, generator returning to few unique values');
			}
		}
	} else {
		// Non-unique values, just run the generator
		for(let i=0; i<length; i++) {
			result.push(generator(randomizer));
		}
	}

	return result;
}
