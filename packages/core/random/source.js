'use strict';

/**
 * The source of randomness, a Lehmer RNG with the Park-Miller parameters.
 *
 * n = 2^31−1 = 2 147 483 647
 * g = 7^5 = 16 807
 */
module.exports = function(seed) {
	seed = seed % 2147483647;
	return function() {
		// Calculate X_k+1 from X_k
		seed = (seed * 16807) % 2147483647;

		// The rest of the library assumes it'll get a number in range [0, 1)
		return (seed - 1) / 2147483646;
	};
};
