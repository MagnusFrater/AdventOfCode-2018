const tools = require("./tools");

const data = tools.readLines("10-t1");

// Part 1

class Particle {
	constructor(line) {
		const split = line.split(" ");
		this.x = split[1].substring(0, split[1].indexOf(","));
		this.y = split[2].substring(0, split[2].indexOf(">"));
		this.vX = split[4].substring(0, split[4].indexOf(","));
		this.vY = split[5].substring(0, split[5].indexOf(">"));
	}

	print() {
		console.log("x: " + this.x +
			"\ty: " + this.y +
			"\tvX: " + this.vX +
			"\tvY: " + this.vY
		);
	}
}


const particles = data.map(line => new Particle(line.split("<").join("< ").split("  ").join(" ")));

function getVisualBounds(particles) {
	let minX = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;

	particles.forEach(particle => {
		if (particle.x < minX) minX = particle.x;
		if (particle.x > maxX) maxX = particle.x;
		if (particle.y < minY) minY = particle.y;
		if (particle.y > maxY) maxY = particle.y;
	});

	return { minX, maxX, minY, maxY };
}

function createVisual(bounds, particles) {
	const visual = [];

	for (let y=bounds.minY; y<=bounds.maxY; y++) {
		const row = [];
		row.length = bounds.maxX - bounds.minX + 2;
		row.fill(0);
		visual.push(row);
	}

	console.log(bounds.minX, bounds.maxX, bounds.minY, bounds.maxY);
	console.log(visual.length, visual[0].length);

	particles.forEach(particle => {
		particle.print();
		console.log(particle.y - bounds.minY, particle.x - bounds.minX);
		visual[particle.y - bounds.minY][particle.x - bounds.minX] = 1;
		console.log();
	});

	return visual;
}

function drawVisual(particles) {
	const bounds = getVisualBounds(particles);
	const visual = createVisual(bounds, particles);

	for (let y=bounds.miny; y<=bounds.maxY; y++) {
		let row = "";
		for (let x=bounds.minX; x<=bounds.maxX; x++) {
			row += (!visual[y][x])? "." : "#";
		}
		console.log(row);
	}
}

drawVisual(particles);

// Part 2

