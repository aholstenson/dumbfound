import { Random } from '../random/random-source';

export interface CharGenerator {
	/**
	 * Get the number of characters the generator supports.
	 */
	readonly length: number;

	/**
	 * Get the character at the given index.
	 *
	 * @param idx
	 */
	get(idx: number): string;

	/**
	 * Get if this generator uses customized probability when pick(random)
	 * is called.
	 */
	readonly customProbability: boolean;

	/**
	 * Pick a random character from this generator using the given random
	 * instance.
	 *
	 * @param random
	 */
	pick(random: Random): string;
}

/**
 * Guard to check if an object is a CharGenerator.
 *
 * @param object
 */
export function isCharGenerator(object: any): object is CharGenerator {
	return typeof object === 'object'
		&& typeof object.length === 'number'
		&& typeof object.get === 'function'
		&& typeof object.pick === 'function';
}

/**
 * Generator that relies on a string of characters being specified.
 */
export class StringCharGenerator implements CharGenerator {
	public customProbability = false;
	private characters: string;

	constructor(characters: string) {
		this.characters = characters;
	}

	get length() {
		return this.characters.length;
	}

	public get(idx: number) {
		return this.characters[idx];
	}

	public pick(random: Random) {
		const idx = random.intBetween(0, this.length - 1);
		return this.characters[idx];
	}

}

/**
 * Generator that relies on an offset and range to pick characters from Unicode.
 */
export class CodepointRangeGenerator implements CharGenerator {
	public customProbability = false;

	private start: number;
	private end: number;

	constructor(start: number, end: number) {
		this.start = start;
		this.end = end;
	}

	get length() {
		return this.end - this.start;
	}

	public get(idx: number) {
		return String.fromCodePoint(this.start + idx);
	}

	public pick(random: Random) {
		const idx = random.intBetween(this.start, this.end);
		return String.fromCodePoint(idx);
	}

}

export interface CharGeneratorWithProbability {
	generator: CharGenerator;

	probability: number;
}

export type CharGeneratorWithOptionalProbability = CharGenerator | CharGeneratorWithProbability | [ CharGenerator, number ];

/**
 * Generator that is a combination of other Generators. Supports individual
 * probabilities for contained Generators.
 */
export class CombinedGenerator implements CharGenerator {
	public readonly customProbability: boolean;
	public readonly length: number;

	private generators: CharGeneratorWithProbability[];

	constructor(...generators: CharGeneratorWithOptionalProbability[]) {
		const generatorsWithProbability: CharGeneratorWithProbability[] = [];

		// Handle the case where a few Generators are simply being combined
		let customProbability = false;
		for(const generator of generators) {

			let data: CharGeneratorWithProbability;
			if(isCharGenerator(generator)) {
				data = {
					generator,
					probability: generator.length
				};

				if(generator.customProbability) {
					customProbability = true;
				}
			} else if(Array.isArray(generator)) {
				// If the Generator is actually an array
				customProbability = true;
				data = {
					generator: generator[0],
					probability: generator[1]
				};
			} else if(typeof generator === 'object') {
				customProbability = true;
				data = {
					generator: generator.generator,
					probability: generator.probability
				};
			} else {
				throw new Error('Received unknown char generator: ' + String(generator));
			}

			generatorsWithProbability.push(data);
		}

		this.customProbability = customProbability;

		// Go through and calculate weighted probabilities for each Generator
		let length = 0;
		let totalProbability = 0;
		for(const a of generatorsWithProbability) {
			totalProbability += a.probability;
			length += a.generator.length;
		}

		this.length = length;

		let current = 0;
		for(const a of generatorsWithProbability) {
			a.probability = current + (a.probability / totalProbability);
			current += a.probability;
		}

		this.generators = generatorsWithProbability;
	}

	public get(idx: number): string {
		let count = 0;
		for(const a of this.generators) {
			const subIdx = idx - count;
			if(a.generator.length > subIdx) {
				return a.generator.get(subIdx);
			}

			count += a.generator.length;
		}

		throw new Error('No generator matched');
	}

	public pick(random: Random): string {
		if(this.customProbability) {
			let p = random.number();
			for(const a of this.generators) {
				if(p < a.probability) {
					return a.generator.pick(random);
				}

				p += a.probability;
			}

			// Assume the value matches the last Generator
			return this.generators[this.generators.length - 1].generator.pick(random);
		} else {
			const idx = random.intBetween(0, this.length - 1);
			return this.get(idx);
		}
	}
}
