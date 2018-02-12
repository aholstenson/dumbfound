'use strict';

module.exports = function(random, trueProbability) {
	return random.number() < trueProbability ? true : false;
};
