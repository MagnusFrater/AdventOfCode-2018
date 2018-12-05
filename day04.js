const tools = require("./tools");

const data = tools.readLines("4");

class Observation {
	constructor(line) {
		const split = line.split(" ");

		this.year = parseInt(split[0].substring(1, split[0].indexOf("-")));
		this.month = parseInt(split[0].substring(split[0].indexOf("-") + 1, split[0].lastIndexOf("-")));
		this.day = parseInt(split[0].substring(split[0].lastIndexOf("-") + 1));
		this.hour = parseInt(split[1].substring(0, split[1].indexOf(":")));
		this.minute = parseInt(split[1].substring(split[1].indexOf(":") + 1, split[1].indexOf("]")));

		switch(split[2]) {
			case "Guard":  // guard begins shift
				this.state = parseInt(split[3].substring(1));
				break;
			case "falls":  // guard falls asleep
				this.state = 0;
				break;
			case "wakes":  // guard wakes up
				this.state = -1;
				break;
			default:
				console.log("Unknown state:", split[2]);
		}
	}

	print() {
		console.log("year: " + this.year +
				"\tmonth: " + this.month +
				"\tday: " + this.day +
				"\thour: " + this.hour +
				"\tminute: " + this.minute +
				"\tstate: " + this.state
			   );
	}
}

// connvert all input lines to observations, sort them by date/time
const observations = data.map(line => new Observation(line));
observations.sort((o1, o2) => {
	if (o1.year !== o2.year) return o1.year - o2.year;
	if (o1.month !== o2.month) return o1.month - o2.month;
	if (o1.day !== o2.day) return o1.day - o2.day;
	if (o1.hour !== o2.hour) return o1.hour - o2.hour;
	return o1.minute - o2.minute;
});

// Part 1

class Guard {
	constructor() {
		this.asleep = {};  // minute : number of times guard was asleep during this minute
		this.start = -1;  // the minute they last fell asleep
	}

	sleep(minute) {
		if (minute in this.asleep) {
			this.asleep[minute]++;
		} else {
			this.asleep[minute] = 1;
		}
	}

	totalSleepTime() {
		let total = 0;
		Object.keys(this.asleep).forEach(minute => {
			total += this.asleep[minute];
		});
		return total;
	}

	getSleepiestMinute() {
		let sleepiestMinute = -1;
		Object.keys(this.asleep).forEach(minute => {
			if (sleepiestMinute === -1) {
				sleepiestMinute = minute;
				return;
			}

			if (this.asleep[minute] > this.asleep[sleepiestMinute]) {
				sleepiestMinute = minute;
			}
		});
		return sleepiestMinute;
	}

}

const guards = {};
let currentGuard = -1;
observations.forEach(o => {
	if (o.state > 0) {  // guard begins shift
		currentGuard = o.state;
		if (!(currentGuard in guards)) {
			guards[currentGuard] = new Guard();
		}
		return;
	}

	if (o.state === 0) {  // guard falls asleep
		guards[currentGuard].start = o.minute;
		return;
	}

	if (o.state === -1) {  // guard wakes up
		const end = o.minute;
		for (let i=0; i<end-guards[currentGuard].start; i++) {
			guards[currentGuard].sleep(guards[currentGuard].start + i);
		}
		return;
	}

	console.log("Unknown observation state:", o.state);
});

function getSleepiestGuard() {
	let sleepiestGuard = -1;
	Object.keys(guards).forEach(guard => {
		if (sleepiestGuard === -1) {
			sleepiestGuard = guard;
			return;
		}

		if (guards[guard].totalSleepTime() > guards[sleepiestGuard].totalSleepTime()) {
			sleepiestGuard = guard;
		}
	});
	return sleepiestGuard;
}

const sleepiestGuard = getSleepiestGuard();
console.log(sleepiestGuard * guards[sleepiestGuard].getSleepiestMinute());

// Part 2

let consistentSleeper = -1;
let consistentMinute = -1;

Object.keys(guards).forEach(guard => {
	if (consistentSleeper === -1) {
		consistentSleeper = guard;
		consistentMinute = guards[guard].getSleepiestMinute();
		return;
	}

	const sleepiestMinute = guards[guard].getSleepiestMinute();
	if (guards[guard].asleep[sleepiestMinute] > guards[consistentSleeper].asleep[consistentMinute]) {
		consistentSleeper = guard;
		consistentMinute = sleepiestMinute;
	}
});

console.log(consistentSleeper * consistentMinute);

