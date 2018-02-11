'use strict';

// Export the basic generators
const {
	CharGenerator,
	StringCharGenerator,
	CodepointRangeGenerator,
	CombinedGenerator
} = require('./chars/generators');

module.exports.CharGenerator = CharGenerator;
module.exports.StringCharGenerator = StringCharGenerator;
module.exports.CodepointRangeGenerator = CodepointRangeGenerator;
module.exports.CombinedGenerator = CombinedGenerator;

// Export ASCII and Unicode standards
module.exports.ascii = require('./chars/ascii');
module.exports.unicode = require('./chars/unicode');
