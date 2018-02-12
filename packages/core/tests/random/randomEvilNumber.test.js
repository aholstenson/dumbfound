'use strict';

const { expect } = require('chai');
const source = require('./simpleSource');

const randomEvilNumber = require('../../random/randomEvilNumber');

describe('Randomness: randomEvilNumber', () => {

	it('0..1', () => {
		const random = source();

		for(let i=0; i<10000; i++) {
			const v = randomEvilNumber(random, 0, 1);
			expect(v).to.be.below(1.00001);
			expect(v).to.be.above(-0.0000001);
		}
	});

	it('1..5', () => {
		const random = source();

		for(let i=0; i<10000; i++) {
			const v = randomEvilNumber(random, 1, 5);
			expect(v).to.be.below(5.00001);
			expect(v).to.be.above(0.999999);
		}
	});

});
