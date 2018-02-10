'use strict';

const { newRandomizer } = require('dumbfound');

/**
 * Create a function using the given Mocha-definer, such as `it` and
 * `it.only`.
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

module.exports = generate(it);
module.exports.only = generate(it.only);
module.exports.only = generate(it.skip);
