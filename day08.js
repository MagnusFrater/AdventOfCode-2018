const tools = require("./tools");

const data = tools.readLines("8");

// Part 1

const numbers = data[0].split(" ");

function getNode(index) {
	const childCount = parseInt(numbers[index]);
	const metadataCount = parseInt(numbers[index + 1]);
	const children = [];
	const metadata = [];
	let size = 2;

	for (let i=0; i<childCount; i++) {
		const child = getNode(index + size);
		size += child.size;
		children.push(child);
	}

	for (let i=0; i<metadataCount; i++) {
		metadata.push(parseInt(numbers[index + size + i]));
	}
	size += metadataCount;

	return {
		childCount,
		metadataCount,
		children,
		metadata,
		size
	}
}

const root = getNode(0);

function sumNodeMetadata(node) {
	let sum = 0;

	node.metadata.forEach(data => sum += data);
	node.children.forEach(child => sum += sumNodeMetadata(child));

	return sum;
}

console.log(sumNodeMetadata(root));

// Part 2

function getNodeValue(node) {
	if (node.childCount === 0) {
		let sum = 0;
		node.metadata.forEach(data => sum += data);
		return sum;
	}

	let sum = 0;
	node.metadata.forEach(data => {
		if (data < 1 || data - 1 > node.childCount - 1) {
			return;
		}

		sum += getNodeValue(node.children[data - 1]);
	});
	return sum;
}

console.log(getNodeValue(root));

