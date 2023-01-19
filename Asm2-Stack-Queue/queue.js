const List = require('./DLinkedList.js');
const Iter = require('./ListIterator.js');

class Queue {
    constructor() {
        this._queue = new List.DLinkedList();
    }
    enqueue(elem) {
        this._queue.insertLast(elem);
    }
    dequeue() {
        return this._queue.remove(this._queue.first());
    }
    isEmpty() {
        return this._queue.isEmpty();
    }
    size() {
        return this._queue.size();
    }
    elements() {
        return new Iter.ListIterator(this._queue, 1);
    }
    toString() {
        let res = "[";
        let iter = this._queue.elements();
        while (iter.hasNext()) {
            res = res + iter.nextObject();
            if (iter.hasNext()) {
                res = res + ", ";
            }
        }
        res = res + "]";
        return res;
    }
}

let Q = new Queue();
console.log(Q.toString());

Q.enqueue("a");
Q.enqueue("b");
Q.enqueue("c");
Q.enqueue("d");
console.log(Q.toString());
console.log("Dequeue=" + Q.dequeue());

Q.enqueue("e");
Q.enqueue("f");
Q.enqueue("g");
console.log("Enqueue e, f, and g");
console.log("Dequeue=" + Q.dequeue());
console.log("Dequeue=" + Q.dequeue());
console.log("Dequeue=" + Q.dequeue());
console.log("Dequeue=" + Q.dequeue());

Q.enqueue("h");
Q.enqueue("i");
Q.enqueue("j");
console.log("Enqueue h, i, and j");
console.log("Dequeue=" + Q.dequeue());
console.log("Dequeue=" + Q.dequeue());
console.log("Dequeue=" + Q.dequeue());
console.log(Q.toString());
