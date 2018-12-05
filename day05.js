const tools = require("./tools");

const data = tools.readLines("5");

// Part 1

const polymer = data[0];

function reactPolymer(polymer) {
	const reactedPolymer = [];
	for (let i=0; i<polymer.length; i++) {
		const curr = polymer.charAt(i);
		const prev = reactedPolymer.pop();

		if (!prev) {
			reactedPolymer.push(curr);
			continue;
		}

		if (Math.abs(curr.charCodeAt() - prev.charCodeAt()) !== 32) {
			reactedPolymer.push(prev);
			reactedPolymer.push(curr);
		}
	}
	return reactedPolymer;
}

console.log(reactPolymer(polymer).length)

// Part 2

let shortestRemovedLength = Number.MAX_SAFE_INTEGER;

for (let i=0; i<26; i++) {
	const length = reactPolymer(polymer.split(String.fromCharCode(65 + i)).join("").split(String.fromCharCode(97 + i)).join("")).length;

	if (length < shortestRemovedLength) {
		shortestRemovedLength = length;
	}
}

console.log(shortestRemovedLength);

