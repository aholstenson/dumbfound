'use strict';

const crypto = require('crypto');

/**
 * Generate a seed by getting a few random bytes from the crypto module of
 * Node and using that to create a 32-bit seed.
 */
module.exports = function() {
	const buffer = crypto.randomBytes(6);
	return buffer.readUInt32BE(0).toString(16);
};
