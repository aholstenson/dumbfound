'use strict';

const Randomizer = module.exports.Randomizer = require('./randomizer');
const generateSeed = module.exports.generateSeed = require('./generateSeed');

module.exports.newRandomizer = function(seed) {
	if(typeof seed === 'undefined') {
		// If no seed, try to pull it from the enviroment variables
		seed = process.env.SEED;
	}

	if(typeof seed === 'undefined') {
		// If still no seed generate one
		seed = generateSeed();
	}

	// Create and return the randomizer
	return new Randomizer(seed);
};
