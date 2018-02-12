'use strict';

const r = require('../../random/source');

describe('Randomness Source', () => {

	it('Generates int32', () => {
		const random = r(Date.now());
		for(let i=0; i<100000; i++) {
			const v = random.int32();
			if(! Number.isInteger(v)) {
				throw new Error('Number generated is not an int');
			}

			if(v < 0 || v >= 2147483647) {
				throw new Error('Number is outside range');
			}
		}
	});

	it('Generates intBetween', () => {
		const random = r(Date.now());
		for(let i=0; i<100000; i++) {
			const v = random.intBetween(-5, 5);
			if(! Number.isInteger(v)) {
				throw new Error('Number generated is not an int');
			}

			if(v < -5 || v > 5) {
				throw new Error('Number is outside range');
			}
		}
	});

	it('Generates number', () => {
		const random = r(Date.now());
		for(let i=0; i<100000; i++) {
			const v = random.number();
			if(typeof v !== 'number' || Number.isNaN(v)) {
				throw new Error('Number generated is not a float');
			}

			if(v < 0 || v >= 1) {
				throw new Error('Number is outside range');
			}
		}
	});

	it('Generates numberBetween', () => {
		const random = r(Date.now());
		for(let i=0; i<100000; i++) {
			const v = random.numberBetween(-5, 5);
			if(typeof v !== 'number') {
				throw new Error('Number generated is not a float');
			}

			if(v < -5 || v > 5) {
				throw new Error('Number is outside range');
			}
		}
	});

	it('Generates gaussian', () => {
		const random = r(Date.now());
		for(let i=0; i<100000; i++) {
			const v = random.gaussian();
			if(typeof v !== 'number') {
				throw new Error('Number generated is not a float');
			}
		}
	});
});
