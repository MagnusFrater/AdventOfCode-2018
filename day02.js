const tools = require("./tools");

const data = tools.readLines("2");

// Part 1

let doubles = 0;
let triples = 0;

data.forEach(string => {
	const occurrences = {};

	for (let i=0; i<string.length; i++) {
		const c = string.charAt(i);
		if (c in occurrences) {
			occurrences[c]++;
		} else {
			occurrences[c] = 1;
		}
	}

	let foundDouble = false
	let foundTriple = false

	Object.keys(occurrences).forEach(c => {
		if (occurrences[c] == 2) {
			foundDouble = true;
		}

		if (occurrences[c] == 3) {
			foundTriple = true;
		}
	});

	if (foundDouble) {
		doubles++;
	}

	if (foundTriple) {
		triples++;
	}
});

console.log(doubles * triples);

// Part 2

let finished = false;
data.forEach(s1 => {
	if (finished) {
		return;
	}

	data.forEach(s2 => {
		differenceIndices = [];
		for (let i=0; i<s1.length && i<s2.length; i++) {
			if (s1.charAt(i) != s2.charAt(i)) {
				differenceIndices.push(i);
			}
		}

		if (differenceIndices.length == 1) {
			console.log(s1.slice(0, differenceIndices[0]) + s1.slice(differenceIndices[0] + 1));
			finished = true;
		}
	});
});

