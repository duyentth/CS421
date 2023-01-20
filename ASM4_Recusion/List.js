const Iter = require('./ListIterator.js');

class NPos {
    #elem;
    #prev;
    #next;
    constructor (elem, prev, next) {
        // inserts this new node between prev and next
        this.#elem = elem;
        this.#prev = prev;
        this.#next = next;
        if (prev != null) {
            prev.#next = this;
        }
        if (next != null) {
            next.#prev = this;
        }
    }
    element() {
        return this.#elem;
    }
    _prev() {
        return this.#prev;
    }
    _next() {
        return this.#next;
    }
    _connectTo(next) {
        this.#next = next;
        if (next != null) {
            next.#prev = this;
        }
    }
    _replaceElement(elem) {
        let oldElem = this.#elem;
        this.#elem = elem;
        return oldElem;
    }
}
class MemoryMgr {
    #emptyNodes;
    constructor() {
        this.#emptyNodes = [];
    }
    newPosition(elem, prev, next) {
        let newNode = null;
        if (this.#emptyNodes.length > 0) {
            newNode = this.#emptyNodes.pop(); // reuse a node that was previously removed
            newNode._replaceElement(elem);
            prev._connectTo(newNode);
            newNode._connectTo(next);
        } else {
            newNode = new NPos(elem, prev, next);
        }
        return newNode;
    }
    removePosition(p) {
        let oldElem = p._replaceElement(null);
        p._connectTo(null);  // should no longer reference a Position in the List
        this.#emptyNodes.push(p);  // save p for later re-use
        return oldElem;
    }
}
class List {
    #header;
    #trailer;
    #size;
    #memoryMgr;
    constructor() {
        this.#header = new NPos(null, null, null);
        this.#trailer = new NPos(null, null, null);
        this.#header._connectTo(this.#trailer);
        this.#size = 0;
        this.#memoryMgr = new MemoryMgr();
    }
    isFirst(p) {
        return (this.#header == p._prev());
    }
    isLast(p) {
        return (this.#trailer == p._next());
    }
    size() {
        return this.#size;
    }
    isEmpty() {
        return this.#size == 0;
    }
    first() {
        if (this.isEmpty()) {
            throw new Error("Invalid first() on an empty List");
        } else {
            return this.#header._next();
        }
    }
    last() {
        if (this.isEmpty()) {
            throw new Error("Invalid last() on an empty List");
        } else {
            return this.#trailer._prev();
        }
    }
    after(p) {
        if (p._next() == this.#trailer) {
            throw new Error("Invalid after(p)--off the end");
        }
        return p._next();
    }
    before(p) {
        if (p._prev() == this.#header) {
            throw new Error("Invalid before(p)--off the front");
        }
        return p._prev();
    }
    replaceElement(p, elem) {
        return p._replaceElement(elem);
    }
    swapElements(p, q) {
        let temp = p._replaceElement(q.element());
        q._replaceElement(temp);
    }
    insertAfter(p, elem) {
        let newNode = this.#memoryMgr.newPosition(elem, p, p._next());
        this.#size++;
        return newNode;
    }
    insertBefore(p, elem) {
        return this.insertAfter(p._prev(), elem);
    }
    insertFirst(elem) {
        return this.insertAfter(this.#header, elem);
    }
    insertLast(elem) {
        return this.insertBefore(this.#trailer, elem);
    }
    remove(p) {
        let oldElem = p.element();
        p._prev()._connectTo(p._next());
        this.#memoryMgr.removePosition(p);
        this.#size--;
        return oldElem;
    }
    rankOf(p) {
        if (this.isEmpty()) {
            throw new Error("Position p is not a member of this Empty List " + p);
        }
        let rank = 0;
        let curr = this.first();
        while (curr != p && rank < this.size()) {
            rank++;
            curr = this.after(curr);
        }
        if (p != curr) {
            throw new Error("Position p is not a member of this List " + p);
        }
        return rank;
    }
    #isValidRank(r) {
        return (0 <= r) && (r < this.size());
    }
    atRank(r) {
        if (!this.#isValidRank(r)) {
            throw new Error("Invalid Rank r=" + r);
        }
        let rank = 0;
        let curr = this.first();
        while (rank < r) {
            rank++;
            curr = this.after(curr);
        }
        return curr;
    }
    elemAtRank(r) {
        return this.atRank(r).element();
    }
    replaceAtRank(r, elem) {
        let p = this.atRank(r);
        return this.replaceElement(p, elem);
    }
    insertAtRank(r, elem) {
        if (r == this.size()) {
            return this.insertLast(elem);
        }
        let p = this.atRank(r);
        let newP = this.insertBefore(p, elem);
        return newP;
    }
    removeAtRank(r) {
        let p = this.atRank(r);
        let oldElem = p.element();
        this.remove(p);
        return oldElem;
    }
    toString() {
        let res = "[";
        let iter = this.elements();
        while (iter.hasNext()) {
            res = res + iter.nextObject();
            if (iter.hasNext()) {
                res = res + ", ";
            }
        }
        res = res + "]";
        return res;
    }
    print() {
        console.log(this.toString());
    }
    elements() {
        return new Iter.ListIterator(this, 1);
    }
    positions() {
        return new Iter.ListIterator(this, 2);
    }
}

exports.List = List;
