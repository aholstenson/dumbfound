'use strict';

import { simpleSource } from './simpleSource';
import { pickWeighted } from '../../src/random/pickWeighted';

describe('Randomness: pickWeighted', () => {

	it('Pick from one option', () => {
		const random = simpleSource();

		const opt = pickWeighted(random, [ 1 ]);
		expect(opt).toEqual(0);
	});

	it('Pick from several options', () => {
		const random = simpleSource();

		const opt = pickWeighted(random, [ 1, 1, 1 ]);
		expect([ 0, 1, 2 ]).toContain(opt);
	});

	it('Sanity: Pick from several options', () => {
		const random = simpleSource();

		const set = new Set([ 0, 1, 2 ]);

		for(let i=0; i<10000; i++) {
			const opt = pickWeighted(random, [ 1, 4, 10 ]);
			expect([ 0, 1, 2 ]).toContain(opt);
			set.delete(i);
		}

		if(set.size !== 0) {
			throw new Error('Not all options where generated, left: ' + Array.from(set).join(', '));
		}
	});

});
