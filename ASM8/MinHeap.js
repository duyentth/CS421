const Seq = require('./Sequence.js');

class MinHeap {
    #heap;
    #compare;
    #compCount;
    #swapCount;
    constructor(comparator, heapSize=20) {
        this.#heap = new Seq.Sequence(heapSize);
        this.#heap.insertFirst(null);  // first slot is not used
        this.#compare = comparator;
        this.#compCount = 0;
        this.#swapCount = 0;
    }
    isEmpty() {
        return this.size() == 0;
    }
    size() {
        return this.#heap.size() - 1;
    }
    #less(pos1, pos2) { // bug 1 (type error on elements)
        this.#compCount++;
        return this.#compare(pos1.element(), pos2.element()) < 0;
    }
    #greater(pos1, pos2) {
        this.#compCount++;
        return this.#compare(pos1.element(), pos2.element()) > 0;
    }
    #upHeap(p) {
        while (!this.isRoot(p) && this.#greater(this.parent(p), p)) {
            let parent = this.parent(p);
            this.#heap.swapElements(parent, p);
            this.#swapCount++;
            p = parent;
        }
    }
    #minPosition(p) {
        let smallest = p;
        let left = this.leftChild(p);
        let right = this.rightChild(p);
        if (this.isInternal(left)) {
            if (this.#less(left, smallest)) {
                smallest = left;
            }
        }
        if (this.isInternal(right)) {
            if (this.#less(right, smallest)) {
                smallest = right; // bug 2 (left instead of right)
            }
        }
        return smallest;
    }
    #downHeap(p) {
        let property = false;
        while (!property) {
            let min = this.#minPosition(p);
            if (min != p) {
                this.#heap.swapElements(min, p);
                this.#swapCount++;
                p = min;
            } else {
                property = true;
            }
        }
    }
    minimum() {
        if (this.isEmpty()) {
            throw new Error("Invalid minimum() operation: Heap is empty");
        }
        return this.root().element();
    }
    insert(elem) {
        let newPos = this.#heap.insertLast(elem);
        this.#upHeap(newPos);
        return newPos;
    }
    removeMin() {
        let min = this.minimum();

        let last = this.#heap.last();
        if (this.size() > 1) {
            this.#heap.swapElements(this.root(), last);
            this.#swapCount++;
            this.#heap.remove(last);

            this.#downHeap(this.root());
        } else {
            this.#heap.remove(last);
        }
        return min;
    }
    replaceElem(pos, elem) {
        let oldElem = this.#heap.replaceElement(pos,elem);
        this.#upHeap(pos);
        this.#downHeap(pos);
        return oldElem;
    }
    numComparisons() {
        return this.#compCount;
    }
    numSwaps() {
        return this.#swapCount;
    }
    elements() {
        return this.#heap.elements();
    }
    toString() {
        let res = "[";
        let iter = this.elements();
        while (iter.hasNext()) {
            res = res + iter.nextObject();
            if (iter.hasNext()) {
                res = res.toString() + ", ";
            }
        }
        return res + "]";
    }
    root() {
        return this.#heap.atRank(1);
    }
    isRoot(p) {
        return this.root() == p;
    }
    parent(p) {
        if (this.isRoot(p)) {
            throw new Error("Invalid parent operation: " + p);
        }
        let parent = Math.floor(this.#heap.rankOf(p)/2);
        return this.#heap.atRank(parent);
    }
    leftChild(p) {
        let left = this.#heap.rankOf(p)*2;
        if (left > this.size()) {
            return null;
        }
        return this.#heap.atRank(left);
    }
    rightChild(p) {
        let right = Math.floor(this.#heap.rankOf(p)*2) + 1;
        if (right > this.size()) {
            return null;
        }
        return this.#heap.atRank(right);
    }
    isExternal(p) {
        return p == null;
    }
    isInternal(p) {
        return p != null;
    }
}

exports.MinHeap = MinHeap;