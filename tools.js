const fs = require('fs');

function readLines(fileName) {
	return fs.readFileSync("PuzzleInputs/" + fileName + ".txt").toString().split("\n").slice(0, -1);
}

function writeLines(fileName, data) {
	fs.writeFile("PuzzleOutputs/" + fileName, data, (err) => {
		if (err) {
			return console.log(err);
		}
	}); 
}

function convertToInts(data) {
	let ints = [];

	for (let i in data) {
		ints.push(parseInt(data[i]));
	}

	return ints;
}

function getManhattanDistance(x1, y1, x2, y2) {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

module.exports = {
	readLines, writeLines,
	convertToInts,
	getManhattanDistance
}

