import { StringCharGenerator, CodepointRangeGenerator, CombinedGenerator } from './generators';

// ASCII printable characters
export const ascii = new CodepointRangeGenerator(32, 125);

// Lower-case Generator in the ASCII table
export const asciiLowercase = new CodepointRangeGenerator(97, 122);

// Upper-case Generator in the ASCII table
export const asciiUppercase = new CodepointRangeGenerator(65, 90);

// Digits in the ASCII table
export const asciiDigits = new CodepointRangeGenerator(48, 57);

// Combined Generator for lower-case, upper-case and digits
export const asciiAlphaNumeric = new CombinedGenerator(
	asciiLowercase,
	asciiUppercase,
	asciiDigits
);

// Combined Generator including spaces
const space = new StringCharGenerator(' ');
export const asciiAlphaNumericWithSpaces = new CombinedGenerator(
	[ asciiAlphaNumeric, 6 ],
	[ space, 1 ]
);
