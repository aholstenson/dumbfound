'use strict';

module.exports = function(random, trueProbability) {
	return random() < trueProbability ? true : false;
};
