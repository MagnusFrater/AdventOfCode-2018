const tools = require("./tools");

const data = tools.convertToInts(tools.readLines("1"));

// Part 1

let sum = 0;
for (let i in data) {
	sum += data[i];
}
console.log(sum);


// Part 2

let sums = [];
sum = 0;
let index = 0;
while (!sums.includes(sum)) {
	sums.push(sum);
	sum += data[index];
	index = ++index % data.length;
}
console.log(sum);

