'use strict';

const marker = Symbol('generatorFunction');

/**
 * Create a generator proxy over the given randomizer.
 *
 */
module.exports = function(randomizer) {
	const cached = {};
	const handler = {
		get(instance, name) {
			if(cached[name]) return cached[name];

			// Only allow calls to functions on the randomizer
			if(typeof instance[name] !== 'function') return undefined;

			// Create and cache the function
			return cached[name] = function(...args) {
				const fn = function() {
					return instance[name](...args);
				};

				// Mark the function as a generator
				fn[marker] = true;
				return fn;
			};
		}
	};

	return new Proxy(randomizer, handler);
};

/**
 * Get if a function was created by a generator.
 *
 * @param {function} fn
 */
module.exports.isGenerator = function(fn) {
	return typeof fn === 'function' && !! fn[marker];
};
