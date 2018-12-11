const tools = require("./tools");

const data = tools.readLines("9");

// Part 1

class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	add(value) {
		const newNode = new Node(value);

		if (!this.head) {
			newNode.next = newNode;
			newNode.prev = newNode;

			this.head = newNode;
			this.tail = newNode;

			this.length++;
			return newNode;
		}

		newNode.prev = this.tail;
		newNode.next = this.head;

		this.head.prev = newNode;
		this.tail.next = newNode;
		this.tail = newNode;

		this.length++;
		return newNode;
	}

	getNodeByIndex(goalIndex) {
		if (goalIndex < 0 || goalIndex >= this.length) {
			return null;
		}

		let iNode = this.head;
		let index;
		for (index=0; index<goalIndex; index++) {
			iNode = iNode.next;
		}

		if (index === goalIndex) {
			return iNode;
		}

		return null;
	}

	getNodeByOffset(node, offset) {
		if (offset > 0) {
			for (let i=0; i<offset; i++) {
				node = node.next;
			}
		} else if (offset < 0) {
			for (let i=0; i>offset; i--) {
				node = node.prev;
			}
		}

		return node;
	}

	insertAfter(node, value) {
		if (!node || !node.prev || !node.next) {
			return null;
		}

		const newNode = new Node(value);
		newNode.next = node.next;
		newNode.prev = node;

		node.next.prev = newNode;
		node.next = newNode;

		if (node.value === this.tail.value) {
			this.tail = newNode;
		}

		this.length++;
		return newNode;
	}

	removeBefore(node) {
		if (!node || !node.prev || !node.next) {
			return null;
		}

		const nodeToRemove = node.prev;
		const value = nodeToRemove.value;

		nodeToRemove.prev.next = node;
		nodeToRemove.next.prev = nodeToRemove.prev;

		if (nodeToRemove.value === this.head.value) {
			this.head = node;
		}

		if (nodeToRemove.value === this.tail.value) {
			this.tail = nodeToRemove.prev;
		}
		
		nodeToRemove.next = null;
		nodeToRemove.prev = null;
		nodeToRemove.value = null;

		return value;
	}

	toString() {
		let s = "[";
		
		let iNode = this.head;
		for (let i=0; i<this.length - 1; i++) {
			s += "" + iNode.value + ", ";
			iNode = iNode.next;
		}
		if (this.tail) s += "" + this.tail.value;

		return s + "]";
	}
}

const split = data[0].split(" ");
const numPlayers = parseInt(split[0]);
const numMarbles = parseInt(split[6]);

function getHighestMarblesScore_old(numPlayers, numMarbles) {
	const scores = [];
	scores.length = numPlayers;
	scores.fill(0);

	const circle = [0,1];

	let currIndex = 1;
	for (let marble=2; marble<=numMarbles; marble++) {
		if (marble % 23 !== 0) {
			let rightIndex = (currIndex + 2) % circle.length;
			if (rightIndex === 0) rightIndex = circle.length;

			circle.splice(rightIndex, 0, marble);
			currIndex = rightIndex;
		} else {
			scores[marble % numPlayers] += marble;

			const indexToSplice = (currIndex + circle.length - 7) % circle.length;
			scores[marble % numPlayers] += circle[indexToSplice];
			circle.splice(indexToSplice, 1);

			currIndex = indexToSplice;
		}
	}

	return Math.max.apply(Math, scores);
}

function getHighestMarblesScore(numPlayers, numMarbles) {
	const scores = [];
	scores.length = numPlayers;
	scores.fill(0);

	const circle = new DoublyLinkedList();
	circle.add(0);
	circle.add(1);

	let node = circle.getNodeByIndex(1);
	for (let marble=2; marble<=numMarbles; marble++) {
		if (marble % 23 !== 0) {
			node = circle.getNodeByOffset(node, 1);
			node = circle.insertAfter(node, marble);
		} else {
			scores[marble % numPlayers] += marble;

			node = circle.getNodeByOffset(node, -6);
			scores[marble % numPlayers] += circle.removeBefore(node);
		}
	}

	return Math.max.apply(Math, scores);
}

console.log(getHighestMarblesScore(numPlayers, numMarbles));

// Part 2

console.log(getHighestMarblesScore(numPlayers, numMarbles * 100));

