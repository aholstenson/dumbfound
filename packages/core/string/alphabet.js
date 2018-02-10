'use strict';

const randomInt = require('../random/randomInt');

const Alphabet = module.exports.Alphabet = class Alphabet {
};

/**
 * Alphabet that relies on a string of characters being specified.
 */
module.exports.CharacterAlphabet = class CharacterAlphabet extends Alphabet {

	constructor(characters) {
		super();

		this.characters = characters;
	}

	get length() {
		return this.characters.length;
	}

	get(idx) {
		return this.characters[idx];
	}

	pick(random) {
		const idx = randomInt(random, 0, this.length);
		return this.characters[idx];
	}

};

/**
 * Alphabet that relies on an offset and range to pick characters from Unicode.
 */
module.exports.RangeAlphabet = class RangeAlphabet extends Alphabet {

	constructor(offset, range) {
		super();

		this.offset = offset;
		this.range = range;
	}

	get length() {
		return this.range;
	}

	get(idx) {
		return String.fromCharCode(this.offset + idx);
	}

	pick(random) {
		const idx = this.offset + randomInt(random, 0, this.range);
		return String.fromCharCode(idx);
	}

};

/**
 * Alphabet that is a combination of other alphabets. Supports individual
 * probabilities for contained alphabets.
 */
module.exports.CombinedAlphabet = class CombinedAlphabet extends Alphabet {

	constructor(...alphabets) {
		super();

		let alphabetsWithProbability = [];

		// Handle the case where a few alphabets are simply being combined
		for(const alphabet of alphabets) {

			let data;
			if(alphabet instanceof Alphabet) {
				data = {
					alphabet,
					probability: alphabet.length
				};

				if(alphabet.customProbability) {
					this.customProbability = true;
				}
			} else if(Array.isArray(alphabet)) {
				// If the alphabet is actually an array
				this.customProbability = true;
				data = {
					alphabet: alphabet[0],
					probability: alphabet[1]
				};
			} else if(typeof alphabet === 'object') {
				this.customProbability = true;
				data = {
					alphabet: alphabet.alphabet,
					probability: alphabet.probability
				};
			}

			alphabetsWithProbability.push(data);
		}

		// Go through and calculate weighted probabilities for each alphabet
		this.length = 0;
		let totalProbability = 0;
		for(const a of alphabetsWithProbability) {
			totalProbability += a.probability;
			this.length += a.alphabet.length;
		}

		let current = 0;
		for(const a of alphabetsWithProbability) {
			a.probability = current + (a.probability / totalProbability);
			current += a.probability;
		}

		this.alphabets = alphabetsWithProbability;
	}

	get(idx) {
		let count = 0;
		for(const a of this.alphabets) {
			let subIdx = idx - count;
			if(a.alphabet.length > subIdx) {
				return a.alphabet.get(subIdx);
			}

			count += a.alphabet.length;
		}
	}

	pick(random) {
		if(this.customProbability) {
			let p = random();
			for(const a of this.alphabets) {
				if(p < a.probability) {
					return a.alphabet.pick(random);
				}

				p += a.probability;
			}

			// Assume the value matches the last alphabet
			return this.alphabets[this.alphabets.length - 1].alphabet.pick(random);
		} else {
			let idx = randomInt(random, 0, this.length);
			return this.get(idx);
		}
	}
};
