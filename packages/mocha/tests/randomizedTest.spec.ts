import { randomizedTest } from '../src/randomizedTest';

describe('randomizedTest', () => {

	randomizedTest('Without seed, no async', randomizer => {
		if(! randomizer) throw new Error();
	});

	randomizedTest('Without seed, async', (randomizer, done) => {
		if(! randomizer) throw new Error();

		done();
	});

});
