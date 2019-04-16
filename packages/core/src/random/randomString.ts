import { Random } from './random-source';
import { CharGenerator } from '../chars';

export function randomString(random: Random, alphabet: CharGenerator, length: number) {
	const result = [];
	for(let i=0; i<length; i++) {
		result.push(alphabet.pick(random));
	}

	return result.join('');
}
