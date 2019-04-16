'use strict';

import { randomizedTest } from '../src/randomizedTest';

describe('randomizedTest', () => {

	randomizedTest('Without seed, no async', randomizer => {
		expect(randomizer).toBeTruthy();
	});

	randomizedTest('Without seed, async', (randomizer, done) => {
		expect(randomizer).toBeTruthy();

		done();
	});

	randomizedTest.skip('Skipped', randomizer => {
	});

});
