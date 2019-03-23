class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left && this.right) return;
		if (this.left) {
			this.right = node;
		} else {
			this.left = node;
		}
		node.parent = this;
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
		} else if (node === this.right) {
			this.right = null;
		} else {
			throw new Error;
		}
		node.parent = null;
	}

	remove() {
		if (!this.parent) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;
		const swap = this.parent;
		
		const nodeChildLeft = this.left;
		const nodeChildRight = this.right;
		const parentChildLeft = this.parent.left;
		const parentChildRight = this.parent.right;

		if (this === swap.left) {
			this.left = this.parent;
			
			if (this.parent.parent) {
				if (this.parent.parent.left === this.left) {
					this.parent.parent.left = this;
				}
	 
				if (this.parent.parent.right === this.right) {
					this.parent.parent.right = this;
				}
				if (this.parent.parent.right === this.left) {
					this.parent.parent.right = this;
				}
				this.parent = this.parent.parent;
			}  else {
				this.parent = null;
			}
			this.left.parent = this;
			this.right = parentChildRight;
			if (this.right) {this.right.parent = this;}
			this.left.left = nodeChildLeft;
			if (this.left.left) {
				this.left.left.parent = this.left;
			}
			
			this.left.right = nodeChildRight; 
			if(this.left.right) {
				this.left.right.parent = this.right;
			}	
		}

		if (this === swap.right) {
			this.right = this.parent;


			if (this.parent.parent) {
				if (this.parent.parent.left === this.left) {
					this.parent.parent.left = this;
				}
	 
				if (this.parent.parent.right === this.right) {
					this.parent.parent.right = this;
				}
				this.parent = this.parent.parent;
			}  else {
				this.parent = null;
			}
			this.right.parent = this;
			this.left = parentChildLeft;
			if (this.left) {this.left.parent = this;}
			this.right.left = nodeChildLeft;
			if (this.right.left) {
				this.right.left.parent = this.right;
			}
			this.right.right = nodeChildRight;
			if(this.right.right) {
				this.right.right.parent = this.right;
			}	
		}

	}
}

module.exports = Node;
