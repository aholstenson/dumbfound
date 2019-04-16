import { Randomizer } from './randomizer';

/**
 * Generator that creates random values by accessing a randomizer.
 */
export type Generator<V> = (randomizer: Randomizer) => V;

/**
 * Get if a function was created by a generator.
 *
 * @param {function} fn
 */
export function isGenerator<C>(fn: any): fn is Generator<C> {
	return typeof fn === 'function';
}

export type Source<V> = V | Generator<V>;
