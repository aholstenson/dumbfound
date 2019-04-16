import { Generator, Source } from './source';
import { CharGenerator } from './chars';
import { RandomizerGenerator } from './generator';

export interface Randomizer {
	readonly seed: string;
	readonly gen: RandomizerGenerator;

	/**
	 * Generate an undefined value. For API completeness and use via generators.
	 */
	undefined(): undefined;

	/**
	 * Generate a null value. For API completeness and use via generators.
	 */
	null(): null;

	/**
	 * Generate a NaN value. For API completeness and use via generators.
	 */
	nan(): number;

	/**
	 * Generate a number. When max is specified the returned number will be
	 * between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between the 0 (inclusive) and max (inclusive).
	 */
	number(max?: Source<number>): number;

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
	numberBetween(min: Source<number>, max: Source<number>): number;

	/**
	 * Generate a positive integer between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (inclusive).
	 * @returns
	 *   Number between 0 and max (inclusive).
	 */
	int(max?: Source<number>): number;

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
	intBetween(min: Source<number>, max: Source<number>): number;

	/**
	 * Generate an evil number. When max is specified the returned number will
	 * be between 0 and max.
	 *
	 * @param {number} max
	 *   Maximum number to generate (exlusive).
	 * @returns
	 *   Number between the 0 and max (exlusive).
	 */
	evilNumber(max?: Source<number>): number;

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
	evilNumberBetween(min : Source<number>, max: Source<number>): number;

	/**
	 * Generate a boolean, optionally providing a probability of it being
	 * true.
	 *
	 * @param {number} probability
	 *   Optional probability of the boolean being `true`.
	 * @returns
	 *   `true` or `false`
	 */
	boolean(trueProbability?: Source<number>): boolean;

	/**
	 * Generate a string using the given generator and length.
	 *
	 * @param {Generator} generator
	 *   The generator to use for creating the string.
	 */
	string(generator: Source<CharGenerator>, length?: Source<number>): string;

	/**
	 * Generate string with the given length consisting of printable ASCII
	 * characters.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	ascii(length?: Source<number>): string;

	/**
	 * Generate string with the given length consisting of ASCII digits
	 * (0 to 9).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiDigits(length?: Source<number>): string;

	/**
	 * Generate a string with the given length consisting of ASCII lower-case
	 * characters (a to z).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiLowercase(length?: Source<number>): string;

	/**
	 * Generate a string with the given length consisting of ASCII upper-case
	 * characters (A to Z).
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiUppercase(length?: Source<number>): string;

	/**
	 * Generate a string consisting of ASCII upper-case, lower-case and digits.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiAlphaNumeric(length?: Source<number>): string;

	/**
	 * Generate a string consisting of ASCII upper-case, lower-case, digits
	 * and spaces.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 * @returns
	 *   Generated string of the given length.
	 */
	asciiAlphaNumericWithSpaces(length?: Source<number>): string;

	/**
	 * Generate a string consisting of characters from the entire Unicode
	 * range.
	 *
	 * @param {number} length
	 *   Length of the returned string.
	 */
	unicode(length?: Source<number>): string;

	/**
	 * Generate a value, either `null`, `NaN`, `undefined`, a number, a
	 * boolean or a string.
	 */
	primitiveValue(): null | number | boolean | string | undefined;

	/**
	 * Generate a truthy value. Will generate values that would be true when
	 * put into an `if`-statement.
	 *
	 * @returns
	 *   Truthy value.
	 */
	truthy(): any;

	/**
	 * Generate a falsy value. Will generate values that would be false when
	 * put into an `if`-statement.
	 *
	 * @returns
	 *   Falsy value.
	 */
	falsy(): any;

	/**
	 * Return `true` frequently (90% of the time).
	 */
	frequently(): boolean;

	/**
	 * Return `false` frequently (90% of the time).
	 */
	rarely(): boolean;

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
	pick<V>(items: Source<V[]>, weights: Source<Source<number>[]>): V;

	/**
	 * Generate an array of the specified length.
	 *
	 * @param {number} length
	 *   The length of the array.
	 * @param {function} generator
	 *   Function used to generate values.
	 */
	array<C>(length: Source<number>, generator: Generator<C>): C[];

	/**
	 * Generate an array of the specified length that is only allowed to
	 * contain a value once. Will throw an error if unable to get enough
	 * unique values from the generator.
	 *
	 * @param {number} length
	 * @param {function} generator
	 */
	uniqueArray<C>(length: Source<number>, generator: Generator<C>): C[];

	/**
	 * Generate a Set of the given length. Works the same as `uniqueArray` but
	 * returns a Set-object instead of an array.
	 */
	set<C>(length: Source<number>, generator: Generator<C>): Set<C>;

	/**
	 * Generate UUIDv4.
	 */
	uuid(): string;
}
