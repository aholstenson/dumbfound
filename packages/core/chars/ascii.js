'use strict';

const { StringCharGenerator, CodepointRangeGenerator, CombinedGenerator } = require('./generators');

// ASCII printable characters
module.exports = new CodepointRangeGenerator(32, 125);

// Lower-case Generator in the ASCII table
module.exports.lowercase = new CodepointRangeGenerator(97, 122);

// Upper-case Generator in the ASCII table
module.exports.uppercase = new CodepointRangeGenerator(65, 90);

// Digits in the ASCII table
module.exports.digits = new CodepointRangeGenerator(48, 57);

// Combined Generator for lower-case, upper-case and digits
module.exports.alphaNumeric = new CombinedGenerator(
	module.exports.lowercase,
	module.exports.uppercase,
	module.exports.digits
);

// Combined Generator including spaces
const space = new StringCharGenerator(' ');
module.exports.alphaNumericWithSpaces = new CombinedGenerator(
	[ module.exports.alphaNumeric, 6 ],
	[ space, 1 ]
);
