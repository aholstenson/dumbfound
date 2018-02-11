'use strict';

const randomInt = require('./randomInt');

module.exports = function(random, weights) {

	// First step is to calculate the sum of all weights
	let totalWeight = 0;
	for(const w of weights) {
		totalWeight += w;
	}

	// Pick the weight value to return
	let picked = randomInt(random, 0, totalWeight);

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
