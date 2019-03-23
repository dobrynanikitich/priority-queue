const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
		this.count = 0;
	}

	push(data, priority) {
		
		if (this.size() === this.maxSize) throw new Error();
		this.count++;
		this.heap.push(data, priority);
	}

	shift() {
		if (this.isEmpty()) throw new Error();
		this.count--;
		return this.heap.pop();
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.count === 0;
	}
}

module.exports = PriorityQueue;
