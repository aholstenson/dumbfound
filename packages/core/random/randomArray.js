'use strict';

/**
 * Helper for creating arrays and to support generating arrays with unique
 * values.
 *
 * @param {number} length
 * @param {function} generator
 * @param {boolean} unique
 */
module.exports = function(length, generator, unique) {
	// Generate the array
	const result = [];

	if(unique) {
		// Try to fill up the array until correct number of items
		let maxCount = length * 100;
		let count = 0;

		while(result.length < length) {
			const value = generator(result.length);

			// TODO: Support for deep-equal?
			if(result.indexOf(value) === -1) {
				result.push(value);
			}

			// Keep track of how many items have been generated
			count++;
			if(count > maxCount) {
				throw new Error('Unable to generate enough unique values, generator returning to few unique values');
			}
		}
	} else {
		// Non-unique values, just run the generator
		for(let i=0; i<length; i++) {
			result.push(generator(i));
		}
	}

	return result;
};
