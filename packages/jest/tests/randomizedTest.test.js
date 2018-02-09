'use strict';

const randomizedTest = require('../randomizedTest');

describe('randomizedTest', () => {

	randomizedTest('Without seed, no async', randomizer => {
		expect(randomizer).toBeTruthy();
	});

	randomizedTest('Without seed, async', (randomizer, done) => {
		expect(randomizer).toBeTruthy();

		done();
	});

	randomizedTest('With seed, no async', 123456, randomizer => {
		expect(randomizer).toBeTruthy();
	});

	randomizedTest('With seed, async', 123456, (randomizer, done) => {
		expect(randomizer).toBeTruthy();

		done();
	});

});
