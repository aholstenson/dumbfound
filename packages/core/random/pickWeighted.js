'use strict';

module.exports = function(random, weights) {

	// First step is to calculate the sum of all weights
	let totalWeight = 0;
	for(const w of weights) {
		totalWeight += w;
	}

	// Pick the weight value to return
	let picked = random.intBetween(0, totalWeight - 1);

	// Find the actual item for this weight
	let current = 0;
	for(let i=0, n=weights.length; i<n; i++) {
		const w = weights[i];

		if(current + w > picked) {
			return i;
		}

		current += w;
	}

	return undefined;
};
