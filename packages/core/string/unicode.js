'use strict';

const { Alphabet, RangeAlphabet } = require('./alphabet');
const randomInt = require('../random/randomInt');

const MIN_SURROGATE = 0xD800;
const MAX_SURROGATE = 0xDFFF;
const SURROGATE_RANGE = MAX_SURROGATE - MIN_SURROGATE;

const MAX_CODEPOINT = 0x10FFFF;

const CODEPOINT_LENGTH = MAX_CODEPOINT - SURROGATE_RANGE;

class UnicodeAlphabet extends Alphabet {

	get length() {
		return CODEPOINT_LENGTH;
	}

	get(idx) {
		const codepoint = idx >= MIN_SURROGATE
			? idx + SURROGATE_RANGE
			: idx;

		return String.fromCodePoint(codepoint);
	}

	pick(random) {
		const idx = randomInt(random, 0, this.length);
		return this.get(idx);
	}
}

// Any Unicode character outside the surrogate range
module.exports = new UnicodeAlphabet();
