
const F64 = new Float64Array(1);
const UI32 = new Uint32Array(F64.buffer);

function toF64(high: number, low: number) {
	UI32[0] = high;
	UI32[1] = low;
	return F64[0];
}

function fromF64(v: number): [ number, number ] {
	F64[0] = v;
	return [ UI32[0], UI32[1] ];
}

const MIN = Math.pow(2, -1074);
const UI32_MAX = Math.pow(2, 32) - 1;

export function nextAfter(x: number, y: number): number {
	// Handle NaN
	if(isNaN(x) || isNaN(y)) return NaN;

	// No need to do anything if the numbers are the same
	if(x === y) return x;

	if(x === 0) {
		return y < 0 ? -MIN : MIN;
	}

	const yLargerThanX = y > 0;
	const xMoreThanZero = x > 0;
	let [ high, low ] = fromF64(x);

	if(yLargerThanX === xMoreThanZero) {
		if(low === UI32_MAX) {
			// If low is the maximum overflow it into high
			high++;
			low = 0;
		} else {
			low++;
		}
	} else {
		if(low === 0) {
			low = UI32_MAX;
			high--;
		} else {
			low--;
		}
	}

	return toF64(high, low);
}
