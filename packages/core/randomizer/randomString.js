'use strict';

module.exports = function(random, alphabet, length) {
	let result = [];
	for(let i=0; i<length; i++) {
		result.push(alphabet.pick(random));
	}

	return result.join('');
};
