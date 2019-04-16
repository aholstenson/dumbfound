import { Random } from './random-source';

/**
 * Generate a random boolean.
 */
export function randomBoolean(random: Random, trueProbability: number = 0.5) {
	return random.number() < trueProbability ? true : false;
}
