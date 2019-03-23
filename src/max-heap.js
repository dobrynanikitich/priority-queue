const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.count = 0;
	}

	push(data, priority) {
		this.count ++;
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.isEmpty()) return;
		this.count--;
		let detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		
		this.shiftNodeDown(this.root);
		return detachedRoot.data;

	}

	detachRoot() {
		if (this.parentNodes.includes(this.root)) {
			this.parentNodes.shift();
		}
		let detachedRoot = this.root;
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length !== 0){
			let lastInsertedNode =  this.parentNodes[this.parentNodes.length - 1];
			
			if (lastInsertedNode.parent && lastInsertedNode.parent !== detached && lastInsertedNode.parent.right === lastInsertedNode) {
				this.parentNodes.unshift(lastInsertedNode.parent);
			}
			this.root = lastInsertedNode;
			this.parentNodes[this.parentNodes.length - 1].remove();
			this.parentNodes.pop();
			
			if (detached.left && lastInsertedNode !== detached.left) {
				this.root.left = detached.left;
				this.root.left.parent = this.root; 
			}

			if (detached.right && lastInsertedNode !== detached.right) {
				this.root.right = detached.right;
				this.root.right.parent = this.root;
			}

			if (!this.root.left || !this.root.right) {
				this.parentNodes.unshift(lastInsertedNode);
			}
			
		}
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.count = 0;
		this.root = null;
		this.parentNodes = [];	
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left && this.parentNodes[0].right) {
				this.parentNodes.splice(0, 1);
			}
		}		
	}

	shiftNodeUp(node) {
		if (!node.parent) {
			this.root = node;
			return;
		}
		if (node.priority > node.parent.priority) {
			
			let nodeIndex = this.parentNodes.indexOf(node);
			let nodeParentIndex = this.parentNodes.indexOf(node.parent);

			if (nodeIndex !== -1 && nodeParentIndex !== -1) {
				this.parentNodes[nodeIndex] = node.parent;
				this.parentNodes[nodeParentIndex] = node;
			}

			if (nodeIndex !== -1 && nodeParentIndex === -1) {
				this.parentNodes.splice(nodeIndex, 1, node.parent)
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}

	}

	shiftNodeDown(node) {
		if (!node || (!node.left && !node.right)) return;

		if ((node.left && node.priority < node.left.priority) || (node.right && node.priority < node.right.priority)) {	
			if (node.right && node.right.priority > node.left.priority) {
				if (node === this.root) {
					this.root = node.right;
				}

				let nodeIndex = this.parentNodes.indexOf(node);
				let nodeRightChildIndex = this.parentNodes.indexOf(node.right);
				
				if (nodeRightChildIndex !== -1 && nodeIndex === -1) {
					this.parentNodes.splice(nodeRightChildIndex, 1, node);
				}

				if (nodeRightChildIndex !== -1 && nodeIndex !==-1) {
					this.parentNodes[nodeIndex] = node.right;
					this.parentNodes[nodeRightChildIndex] = node;
				}
				node.right.swapWithParent();
			}

			else {
				if (node === this.root) {
					this.root = node.left;
				}

				let nodeIndex = this.parentNodes.indexOf(node);
				let nodeLeftChildIndex = this.parentNodes.indexOf(node.left);
				
				if (nodeLeftChildIndex !== -1 && nodeIndex === -1) {
					this.parentNodes.splice(nodeLeftChildIndex, 1, node);
				}

				if (nodeLeftChildIndex !== -1 && nodeIndex !==-1) {
					this.parentNodes[nodeIndex] = node.left;
					this.parentNodes[nodeLeftChildIndex] = node;
				}
				node.left.swapWithParent();
			}
			this.shiftNodeDown(node);
		}
		
	}
}

module.exports = MaxHeap;
