'use strict';

const randomizedTest = require('../randomizedTest');

describe('randomizedTest', () => {

	randomizedTest('Without seed, no async', randomizer => {
		if(! randomizer) throw new Error();
	});

	randomizedTest('Without seed, async', (randomizer, done) => {
		if(! randomizer) throw new Error();

		done();
	});

	randomizedTest('With seed, no async', 123456, randomizer => {
		if(! randomizer) throw new Error();
	});

	randomizedTest('With seed, async', 123456, (randomizer, done) => {
		if(! randomizer) throw new Error();

		done();
	});

});
