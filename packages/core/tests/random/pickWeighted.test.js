'use strict';

const { expect } = require('chai');
const source = require('./simpleSource');

const pickWeighted = require('../../random/pickWeighted');

describe('Randomness: pickWeighted', () => {

	it('Pick from one option', () => {
		const random = source();

		const opt = pickWeighted(random, [ 1 ]);
		expect(opt).to.equal(0);
	});

	it('Pick from several options', () => {
		const random = source();

		const opt = pickWeighted(random, [ 1, 1, 1 ]);
		expect(opt).to.be.oneOf([ 0, 1, 2 ]);
	});

	it('Sanity: Pick from several options', () => {
		const random = source();

		const set = new Set([ 0, 1, 2 ]);

		for(let i=0; i<10000; i++) {
			const opt = pickWeighted(random, [ 1, 4, 10 ]);
			expect(opt).to.be.oneOf([ 0, 1, 2 ]);
			set.delete(i);
		}

		if(set.size !== 0) {
			throw new Error('Not all options where generated, left: ' + Array.from(set).join(', '));
		}
	});

});
