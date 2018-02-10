'use strict';

const { CharacterAlphabet, RangeAlphabet, CombinedAlphabet } = require('./alphabet');

// Lower-case alphabet in the ASCII table
module.exports.lowercase = new RangeAlphabet(97, 26);

// Upper-case alphabet in the ASCII table
module.exports.uppercase = new RangeAlphabet(65, 26);

// Digits in the ASCII table
module.exports.digits = new RangeAlphabet(48, 10);

// Combined alphabet for lower-case, upper-case and digits
module.exports.withoutSpaces = new CombinedAlphabet(
	module.exports.lowercase,
	module.exports.uppercase,
	module.exports.digits
);

// Combined alphabet including spaces
const space = new CharacterAlphabet(' ');
module.exports.withSpaces = new CombinedAlphabet(
	[ module.exports.withoutSpaces, 6 ],
	[ space, 1 ]
);
