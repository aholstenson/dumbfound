import { randomizedTest } from '../src/randomizedTest';
import { randomizedRuns } from '../src/randomizedRuns';

describe('randomizedRuns', () => {

	randomizedRuns('1..1 runs, with test', 1, 1, () => {
		test('Test', () => {});
	});

	randomizedRuns('1..5 runs, with test', 1, 5, () => {
		test('Test', () => {});
	});

	randomizedRuns('5..10 runs, with randomizedTest', 5, 10, () => {
		randomizedTest('Test', () => {});
	});

});
