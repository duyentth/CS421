const Tree = require('./MinHeap.js');
const Pair = require('./Item.js');

class PriorityQueue {
    #heap;
    constructor(initSize=20, compare=Pair.compareItems ) {
        this.#heap = new Tree.MinHeap(compare, initSize);
    }
    insertItem(key, value) { // returns the Position containing new Item
        let newItem = new Pair.Item(key, value);
        return this.#heap.insert(newItem);
    }
    removeMin() {
        let item = this.#heap.removeMin();
        return item.value();
    }
    minKey() {
        let item = this.#heap.minimum();
        return item.key();
    }
    minElement() {
        let item = this.#heap.minimum();
        return item.value();
    }
    size() {
        return this.#heap.size();
    }
    isEmpty() {
        return this.#heap.isEmpty();
    }
    numComparisons() {
        return this.#heap.numComparisons();
    }
    numSwaps() {
        return this.#heap.numSwaps();
    }
    toString() {
        return this.#heap.toString();
    }
}

exports.PriorityQueue = PriorityQueue;