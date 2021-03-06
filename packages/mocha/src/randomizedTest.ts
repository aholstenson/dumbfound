import { Randomizer, newRandomizer, resolveSeed } from 'dumbfound';

export type Runner = (random: Randomizer) => any;
export type AsyncRunner = (random: Randomizer, cb: Mocha.Done) => any;

export interface RandomizedTest {
	(name: string, runner: Runner | AsyncRunner, timeout?: number): void;

	only: RandomizedTest;

	skip: RandomizedTest;
}

function isAsyncRunner(obj: any): obj is AsyncRunner {
	return typeof obj === 'function' && obj.length > 1;
}

function isRunner(obj: any): obj is Runner {
	return typeof obj === 'function';
}

/**
 * Create a function using the given Jest-definer, such as `test` and
 * `test.only`.
 */
function generate(testDefiner: any): RandomizedTest {
	const result = function(name: string, runner: Runner | AsyncRunner, timeout?: number): void {
		const seed = resolveSeed();

		// Resolve a callback to support asynchronous calls
		let callback: Mocha.Func | Mocha.AsyncFunc;
		if(runner.length > 1) {
			callback = (done: Mocha.Done) => {
				const randomizer = newRandomizer(seed);
				return runner(randomizer, done);
			};
		} else {
			callback = () => {
				const randomizer = newRandomizer(seed);
				return (runner as Runner)(randomizer);
			};
		}

		// Define the test
		testDefiner(name + ' [seed=' + seed + ']', callback);
	};

	Object.defineProperty(result, 'only', {
		get() {
			return generate(it.only);
		}
	});

	Object.defineProperty(result, 'skip', {
		get() {
			return generate(it.skip);
		}
	});

	return result as RandomizedTest;
}

export const randomizedTest = generate(it);
