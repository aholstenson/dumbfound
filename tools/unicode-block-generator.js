'use strict';

const fs = require('fs');

const block = fs.readFileSync('./blocks.txt').toString();

const names = [];
for(const line of block.split('\n')) {
	const m = line.match(/^([0-9A-F]+)\.\.([0-9A-F]+); (.+)/);
	if(! m) continue;

	const lower = m[1];
	const upper = m[2];
	const name = 'unicode' + m[3]
		.replace('-', '')
		.replace(/ [A-Za-z]/g, f => f.trim().toUpperCase());

	console.log('/** Unicode Block: ' + m[3] + ' */');
	console.log('export const ' + name + ' = new CodepointRangeGenerator(0x' + lower + ', 0x' + upper + ');');

	names.push(name);
}

console.log();
console.log('Markdown list of blocks:');
for(const name of names) {
	console.log('* `' + name + '`');
}
