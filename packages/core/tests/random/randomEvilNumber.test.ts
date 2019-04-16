import { simpleSource } from './simpleSource';
import { randomEvilNumber } from '../../src/random/randomEvilNumber';

describe('Randomness: randomEvilNumber', () => {

	it('0..1', () => {
		const random = simpleSource();

		for(let i=0; i<10000; i++) {
			const v = randomEvilNumber(random, 0, 1);
			expect(v).toBeLessThan(1.00001);
			expect(v).toBeGreaterThan(-0.0000001);
		}
	});

	it('1..5', () => {
		const random = simpleSource();

		for(let i=0; i<10000; i++) {
			const v = randomEvilNumber(random, 1, 5);
			expect(v).toBeLessThan(5.00001);
			expect(v).toBeGreaterThan(0.999999);
		}
	});

});
