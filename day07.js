const tools = require("./tools");

const data = tools.readLines("7");

// Part 1

class Step {
	constructor(name) {
		this.name = name;
		this.next = [];
		this.prev = [];
	}

	print() {
		console.log(this);
	}
}

const steps = {};
data.forEach(line => {
	const split = line.split(" ");
	const curr = split[1];
	const next = split[7];

	if (!(curr in steps)) {
		steps[curr] = new Step(curr);
	}
	steps[curr].next.push(next);

	if (!(next in steps)) {
		steps[next] = new Step(next);
	}
	steps[next].prev.push(curr);
});

let available = [];
Object.keys(steps).forEach(key => {
	if (steps[key].prev.length === 0) {
		available.push(key);
	}
});

let order = [];
while(available.length > 0) {
	available.sort();

	const curr = available[0];
	available.shift();
	order.push(curr);

	steps[curr].next.forEach(step => {
		// check pre-reqs
		let good = true;
		steps[step].prev.forEach(prev => {
			if (!order.includes(prev)) {
				good = false;
			}
		});

		if (!good) {
			return;
		}

		// make sure step hasn't already been placed somewhere
		if (step !== null && !order.includes(step) && !available.includes(step)) {
			available.push(step);
		}
	});
}
console.log(order.join(""));

// Part 2

class Worker {
	constructor() {
		this.task = null;
		this.time = 0;
	}
}

const workers = [];
const maxWorkers = 5;
for (let i=0; i<maxWorkers; i++) {
	workers.push(new Worker());
}

available = [];
Object.keys(steps).forEach(key => {
	if (steps[key].prev.length === 0) {
		available.push(key);
	}
});

order = [];
const numSteps = Object.keys(steps).length;
const baseTaskTime = 60;
let time = 0;
while(order.length !== numSteps) {
	workers.forEach((worker, index) => {
		if (worker.time > 0) {
			worker.time--;
			return;
		}

		if (worker.task !== null) {
			order.push(worker.task);

			steps[worker.task].next.forEach(step => {
				// check pre-reqs
				let good = true;
				steps[step].prev.forEach(prev => {
					if (!order.includes(prev)) {
						good = false;
					}
				});

				if (!good) {
					return;
				}

				// make sure step hasn't already been placed somewhere
				if (step !== null && !order.includes(step) && !available.includes(step)) {
					available.push(step);
				}
			});

			worker.task = null;
			worker.time = 0;
		}

		if (available.length > 0) {
			available.sort();
			const curr = available[0];
			available.shift();
			worker.task = curr;
			worker.time = baseTaskTime + (worker.task.charCodeAt(0) - 65);
		}
	});
	time++;
}
console.log(time - 2);

