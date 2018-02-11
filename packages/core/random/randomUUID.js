'use strict';

function toHex(f) {
	if(f < 16) {
		return '0' + f.toString(16);
	} else {
		return f.toString(16);
	}
}

/**
 * Generate a rubbish UUIDv4. This uses four random calls and a then does a
 * lot of shifting and masking to create a UUIDv4 that conforms to the
 * standard.
 */
module.exports = function(random) {
	const r0 = random() * 0xffffffff | 0;
	const r1 = random() * 0xffffffff | 0;
	const r2 = random() * 0xffffffff | 0;
	const r3 = random() * 0xffffffff | 0;

	return toHex(r0 & 0xff)
		+ toHex(r0 >> 8 & 0xff)
		+ toHex(r0 >> 16 & 0xff)
		+ toHex(r0 >> 24 & 0xff)
		+ '-'
		+ toHex(r1 & 0xff)
		+ toHex(r1 >> 8 & 0xff)
		+ '-'
		+ toHex(r1 >> 16 & 0x0f | 0x40)
		+ toHex(r1 >> 24 & 0xff)
		+ '-'
		+ toHex(r2 & 0x3f | 0x80)
		+ toHex(r2 >> 8 & 0xff)
		+ '-'
		+ toHex(r2 >> 16 & 0xff)
		+ toHex(r2 >> 24 & 0xff)
		+ toHex(r3 & 0xff)
		+ toHex(r3 >> 8 & 0xff)
		+ toHex(r3 >> 16 & 0xff)
		+ toHex(r3 >> 24 & 0xff);
};
