'use strict';

const { newRandomizer } = require('dumbfound');

/**
 * Create a function using the given Jest-definer, such as `test` and
 * `test.only`.
 */
function generate(testDefiner) {
	return function(name, seed, runner, timeout) {
		if(typeof runner === 'undefined') {
			// No seed specified, move the value around
			runner = seed;
			seed = undefined;
		}

		// Create the randomizer
		const randomizer = newRandomizer(seed);

		// Resolve a callback to support asynchronous calls
		const callback = runner.length > 1
			? done => runner(randomizer, done)
			: () => runner(randomizer);

		// Define the test
		testDefiner(name + ' [seed=' + randomizer.seed + ']', callback, timeout);
	};
}

module.exports = generate(test);
module.exports.only = generate(test.only);
module.exports.skip = generate(test.skip);
