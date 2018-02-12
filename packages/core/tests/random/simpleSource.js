'use strict';

const random = require('../../random/source');

module.exports = function() {
	return random(Date.now());
};
