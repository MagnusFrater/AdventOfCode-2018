const tools = require("./tools");

const data = tools.readLines("3");

class Claim {
	constructor(line) {
		const split = line.split(" ");
		this.id = parseInt(split[0].substring(1));
		this.x = parseInt(split[2].substring(0, split[2].indexOf(",")));
		this.y = parseInt(split[2].substring(split[2].indexOf(",") + 1, split[2].indexOf(":")));
		this.width = parseInt(split[3].substring(0, split[3].indexOf("x")));
		this.height = parseInt(split[3].substring(split[3].indexOf("x") + 1));
	}

	print() {
		console.log("id: " + this.id +
			"\tx: " + this.x +
			"\ty: " + this.y +
			"\twidth: " + this.width +
			"\theight: " + this.height
		);
	}
}

const claims = [];
data.forEach(line => {
	claims.push(new Claim(line));
});

// Part 1

const fabric = {};

// adds claim count to given piece of fabric
Claim.prototype.add = function(fabric) {
	for (let x=0; x<this.width; x++) {
		for (let y=0; y<this.height; y++) {
			const key = (this.x + x) + ":" + (this.y + y);
			
			if (key in fabric) {
				fabric[key].push(this.id);
			} else {
				fabric[key] = [this.id];
			}
		}
	}
}

claims.forEach(claim => {
	claim.add(fabric);
});

let twoOrMoreClaimsCount = 0;
Object.keys(fabric).forEach(key => {
	if (fabric[key].length >= 2) {
		twoOrMoreClaimsCount++;
	}
});
console.log(twoOrMoreClaimsCount);

// Part 2

const idsWithOverlap = {};

Object.keys(fabric).forEach(key => {
	if (fabric[key].length === 1) {
		const id = fabric[key][0];

		if (!(id in idsWithOverlap)) {
			idsWithOverlap[id] = 1;
		}

		return;
	}

	fabric[key].forEach(id => {
		idsWithOverlap[id] = fabric[key].length;
	});
});

Object.keys(idsWithOverlap).forEach(id => {
	// console.log(id + ": " + halp[id]);
	if (idsWithOverlap[id] === 1) {
		console.log(id);
	}
});

