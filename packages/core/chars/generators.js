'use strict';

const Generator = module.exports.CharGenerator = class CharGenerator {
};

/**
 * Generator that relies on a string of characters being specified.
 */
module.exports.StringCharGenerator = class StringCharGenerator extends Generator {

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
		const idx = random.intBetween(0, this.length - 1);
		return this.characters[idx];
	}

};

/**
 * Generator that relies on an offset and range to pick characters from Unicode.
 */
module.exports.CodepointRangeGenerator = class CodepointRangeGenerator extends Generator {

	constructor(start, end) {
		super();

		this.start = start;
		this.end = end;
	}

	get length() {
		return this.end - this.start;
	}

	get(idx) {
		return String.fromCodePoint(this.start + idx);
	}

	pick(random) {
		const idx = random.intBetween(this.start, this.end);
		return String.fromCodePoint(idx);
	}

};

/**
 * Generator that is a combination of other Generators. Supports individual
 * probabilities for contained Generators.
 */
module.exports.CombinedGenerator = class CombinedGenerator extends Generator {

	constructor(...generators) {
		super();

		let generatorsWithProbability = [];

		// Handle the case where a few Generators are simply being combined
		for(const generator of generators) {

			let data;
			if(generator instanceof Generator) {
				data = {
					generator,
					probability: generator.length
				};

				if(generator.customProbability) {
					this.customProbability = true;
				}
			} else if(Array.isArray(generator)) {
				// If the Generator is actually an array
				this.customProbability = true;
				data = {
					generator: generator[0],
					probability: generator[1]
				};
			} else if(typeof generator === 'object') {
				this.customProbability = true;
				data = {
					generator: generator.Generator,
					probability: generator.probability
				};
			}

			generatorsWithProbability.push(data);
		}

		// Go through and calculate weighted probabilities for each Generator
		this.length = 0;
		let totalProbability = 0;
		for(const a of generatorsWithProbability) {
			totalProbability += a.probability;
			this.length += a.generator.length;
		}

		let current = 0;
		for(const a of generatorsWithProbability) {
			a.probability = current + (a.probability / totalProbability);
			current += a.probability;
		}

		this.generators = generatorsWithProbability;
	}

	get(idx) {
		let count = 0;
		for(const a of this.generators) {
			let subIdx = idx - count;
			if(a.generator.length > subIdx) {
				return a.generator.get(subIdx);
			}

			count += a.generator.length;
		}
	}

	pick(random) {
		if(this.customProbability) {
			let p = random();
			for(const a of this.generators) {
				if(p < a.probability) {
					return a.generator.pick(random);
				}

				p += a.probability;
			}

			// Assume the value matches the last Generator
			return this.generators[this.generators.length - 1].generator.pick(random);
		} else {
			let idx = random.intBetween(0, this.length - 1);
			return this.get(idx);
		}
	}
};
