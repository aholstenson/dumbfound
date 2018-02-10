'use strict';

const { CharacterAlphabet, RangeAlphabet, CombinedAlphabet } = require('./alphabet');

// ASCII printable characters
module.exports = new RangeAlphabet(32, 126);

// Lower-case alphabet in the ASCII table
module.exports.lowercase = new RangeAlphabet(97, 123);

// Upper-case alphabet in the ASCII table
module.exports.uppercase = new RangeAlphabet(65, 91);

// Digits in the ASCII table
module.exports.digits = new RangeAlphabet(48, 58);

// Combined alphabet for lower-case, upper-case and digits
module.exports.alphaNumeric = new CombinedAlphabet(
	module.exports.lowercase,
	module.exports.uppercase,
	module.exports.digits
);

// Combined alphabet including spaces
const space = new CharacterAlphabet(' ');
module.exports.alphaNumericWithSpaces = new CombinedAlphabet(
	[ module.exports.alphaNumeric, 6 ],
	[ space, 1 ]
);
