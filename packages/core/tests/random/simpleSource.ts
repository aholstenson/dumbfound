import { createRandom } from '../../src/random/random-source';

export function simpleSource() {
	return createRandom(Date.now());
};
