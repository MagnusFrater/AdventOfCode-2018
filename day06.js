const tools = require("./tools");

const data = tools.readLines("6");

// Part 1

class Civ {
	constructor(id, line) {
		this.id = id;

		const split = line.split(", ");
		this.x = parseInt(split[0]);
		this.y = parseInt(split[1]);

		this.size = 0;
		this.infinite = false;
	}

	print() {
		console.log("id: " + this.id +
			"\tx: " + this.x +
			"\ty: " + this.y +
			"\tsize: " + this.size +
			"\tinfinite: " + this.infinite
		);
	}
}

const civs = data
	.map((line, i) => new Civ(String.fromCharCode(65 + i), line))
	.sort((p1, p2) => {
		if (p1.x != p2.x) return p1.x - p2.x;
		return p1.y - p2.y;
	});

let minX = Number.POSITIVE_INFINITY;
let maxX = Number.NEGATIVE_INFINITY;
let minY = minX;
let maxY = maxX;

civs.forEach(civ => {
	if (civ.x < minX) minX = civ.x;
	if (civ.x > maxX) maxX = civ.x;
	if (civ.y < minY) minY = civ.y;
	if (civ.y > maxY) maxY = civ.y;
});

class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.map = [];
		for (let y=0; y<this.height; y++) {
			const row = [];
			for (let x=0; x<this.width; x++) {
				row.push(".");
			}
			this.map.push(row);
		}
	}

	claim(civ) {
		this.map[civ.y - minY][civ.x - minX] = civ.id;
	}

	toString() {
		let string = "";
		this.map.forEach(row => {
			let builder = "";
			row.forEach(territory => {
				builder += territory;
			});
			string += builder + "\n";
		});
		return string;
	}

	print() {
		console.log(this.toString());
	}
}

const world = new World(maxX - minX + 1, maxY - minY + 1);
civs.forEach(civ => {
	world.claim(civ);
});

World.prototype.getClosestCiv = function(civs, x, y) {
	const r1 = civs.reduce((c1, c2) => {
		return (tools.getManhattanDistance(c1.x - minX, c1.y - minY, x, y) < tools.getManhattanDistance(c2.x - minX, c2.y - minY, x, y))? c1 : c2;
	});

	const r2 = civs.reduce((c1, c2) => {
		return (tools.getManhattanDistance(c1.x - minX, c1.y - minY, x, y) <= tools.getManhattanDistance(c2.x - minX, c2.y - minY, x, y))? c1 : c2;
	});

	return (r1 === r2)? r1 : null;
}

World.prototype.calculateTerritories = function(civs) {
	for (let y=0; y<this.height; y++) {
		for (let x=0; x<this.width; x++) {
			const closestCiv = this.getClosestCiv(civs, x, y);

			if (closestCiv !== null) {
				this.map[y][x] = closestCiv.id;
				closestCiv.size++;

				if (x === 0 || x === this.width-1 || y === 0 || y === this.height-1) {
					closestCiv.infinite = true;
				}
			}
		}
	}
}

world.calculateTerritories(civs);

const biggestCiv = civs
	.filter(civ => !civ.infinite)
	.reduce((c1, c2) => {
		return (c1.size > c2.size)? c1 : c2;
	});
console.log(biggestCiv.size);

// Part 2

const boundary = 10000;
let regionSize = 0;
for (let y=0; y<world.height; y++) {
	for (let x=0; x<world.width; x++) {
		let sum = 0;

		civs.forEach(civ => {
			sum += tools.getManhattanDistance(civ.x - minX, civ.y - minY, x, y);
		});

		if (sum < boundary) {
			regionSize++;
		}
	}
}
console.log(regionSize);

