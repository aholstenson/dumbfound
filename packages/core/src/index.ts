'use strict';

import { Randomizer } from './randomizer';
import { generateSeed } from './generateSeed';
import { RandomizerImpl } from './randomizer-impl';

export * from './randomizer';
export * from './generator';

export * from './generateSeed';
export * from './chars';

export function resolveSeed(): string {
	// Pull it from the enviroment variables
	const seed = process.env.SEED;

	if(typeof seed !== 'undefined') {
		return seed;
	}

	// If still no seed generate one
	return generateSeed();
}

export function newRandomizer(seed?: string | number): Randomizer {
	if(typeof seed === 'undefined') {
		seed = resolveSeed();
	}

	// Create and return the randomizer
	return new RandomizerImpl(seed);
}

export function hasSeed() {
	return !! process.env.SEED;
}
