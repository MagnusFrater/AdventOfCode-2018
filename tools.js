const fs = require('fs');

function readLines(fileName) {
	return fs.readFileSync("PuzzleInputs/" + fileName + ".txt").toString().split("\n").slice(0, -1);
}

function convertToInts(data) {
	let ints = [];

	for (let i in data) {
		ints.push(parseInt(data[i]));
	}

	return ints;
}

module.exports = {
	readLines,
	convertToInts
}

