const Iter = require('./ListIterator.js');

class APos {
    #elem;
    #index;
    constructor(elem, index) {
        this.#elem = elem;
        this.#index = index;
    }
    element() {
        return this.#elem;
    }
    _index() {
        return this.#index;
    }
    _replaceElement(elem) {
        let oldElem = this.#elem;
        this.#elem = elem;
        return oldElem;
    }
    _setIndex(newIndex) {
        this.#index = newIndex;
    }
}
class Sequence {
    #arr;
    #first;
    #last;
    constructor(size=20) {
        this.#arr = new Array(size);
        this.#first = 0;
        this.#last = 0;
        for (let i = 0; i < size; i++) {
            this.#arr[i] = new APos(null, i);
        }
    }
    // Rank Operations
    isEmpty() {
        return this.#first == this.#last;  // bug 5 missing this
    }
    size() {
        return this.#index2rank(this.#last);
    }
    #index2rank(i) {
        return (this.#arr.length - this.#first + i) % this.#arr.length;
    }
    #rank2index(r) {
        return (this.#first + r) % this.#arr.length;
    }
    #isValidRank(r) {
        return (0 <= r) && (r < this.size());
    }
    rankOf(p) {
        let r = this.#index2rank(p._index());
        return r;
    }
    atRank(r) {
        if (!this.#isValidRank(r)) {
            throw new Error("Invalid Rank r=" + r)
        }
        let i = this.#rank2index(r);
        return this.#arr[i];
    }
    elemAtRank(r) {
        return this.atRank(r).element();
    }
    replaceAtRank(r, elem) {
        let p = this.atRank(r);
    //    let oldElem = p.element();
        return p._replaceElement(elem);
    }
    #movePositionTo(newIndex, pos) {
        this.#arr[newIndex] = pos;
        pos._setIndex(newIndex);
    }
    #shiftLeft(r1, r2) {
        var currIx = this.#rank2index(r1);
        var savedPos = this.#arr[currIx];
        for (let r=r1; r<r2; r++) {
            var nextIx = this.#rank2index(r + 1);
            this.#movePositionTo(currIx, this.#arr[nextIx])
            currIx = nextIx;
        }
        this.#movePositionTo(currIx, savedPos);
    }
    #shiftRight(r1, r2) {
        var currIx = this.#rank2index(r2);
        var savedPos = this.#arr[currIx];
        for (let r=r2; r1<r; r--) {
            var nextIx = this.#rank2index(r - 1);
            this.#movePositionTo(currIx, this.#arr[nextIx])
            currIx = nextIx;
        }
        this.#movePositionTo(currIx, savedPos);
    }
    #prevIndex(i) {
        return (this.#arr.length + i - 1) % this.#arr.length;
    }
    #nextIndex(i) {
        return (i + 1) % this.#arr.length;
    }
    #checkForOverflow() {
        let oldSize = this.size();
        if (oldSize >= this.#arr.length - 1) { // bug 1 (Math.ceil below)
            let newSize = Math.ceil(this.#arr.length * 1.5);
            if (this.#last < this.#first) {  // the wrap around will have to be redone for the larger array
                if (this.#first > oldSize/2) {
                    let i = 1;
                    while (this.#first <= oldSize-i) {
                        this.#movePositionTo(newSize - i, this.#arr[oldSize - i]);
                        this.#arr[oldSize - i] = new APos(null, oldSize - i);
                        i++;
                    }
                    this.#first = newSize - i + 1;
                } else {
                    let i = 0;
                    while (i < this.#last) {
                        this.#movePositionTo(i, this.#arr[oldSize + i]);
                        this.#arr[oldSize + i] = new APos(null, oldSize + i);
                        i++;
                    }
                    this.#last = sz + i;
                }
            } else {
                for (let i = oldSize; i < newSize; i++) {  // add new Positions to the array
                    this.#arr[i] = new APos(null, i);
                }
            }
        }
    }
    insertAtRank(r, elem) {
        let sz = this.size();
        if (r > sz) {  // don't allow empty slots
            throw new Error("Invalid rank in insertAtRank size=" + sz + "  rank=" + r);
        }
        this.#checkForOverflow();
        if (r < sz/2) {
            this.#first = this.#prevIndex(this.#first);
            this.#shiftLeft(0, r);
        } else {
            this.#last = this.#nextIndex(this.#last);
            this.#shiftRight(r, sz);
        }
        let ix = this.#rank2index(r); // bug 2 (after shift)
        let newPos = this.#arr[ix];
        newPos._replaceElement(elem);
        return newPos;
    }
    removeAtRank(r) {
        let deletedElem = this.elemAtRank(r);
        let sz = this.size();
        if (r<sz/2) {
            this.#shiftRight(0, r);
            this.#first = this.#nextIndex(this.#first);
        } else {
            this.#shiftLeft(r, sz-1);
            this.#last = this.#prevIndex(this.#last);
        }
        return deletedElem;
    }
    // List/Position based Operations
    first() {
        return this.atRank(0);
    }
    last() {
        return this.atRank(this.size()-1);
    }
    isFirst(p) {
        return p == this.first();
    }
    isLast(p) {
        return p == this.last();
    }
    before(p) {
        if (this.isFirst(p)) {
            throw new Error("Invalid before(p) operation--Off the front");
        }
        let r = this.rankOf(p);
        return this.atRank(r-1);
    }
    after(p) {
        if (this.isLast(p)) {
            throw new Error("Invalid after(p) operation--Off the end");
        }
        let r = this.rankOf(p);
        return this.atRank(r+1);
    }
    replaceElement(p, elem) {
    //    let oldElem = p.element();
        return p._replaceElement(elem);
    }
    swapElements(p, q) {
        let temp = this.replaceElement(p, q.element());
        this.replaceElement(q, temp);
    }
    insertFirst(elem) {
        let newPos = this.insertAtRank(0, elem);
        return newPos;
    }
    insertLast(elem) {
        let newPos = this.insertAtRank(this.size(), elem);
        return newPos;
    }
    insertAfter(p, elem) {
        let newPos = this.insertAtRank(this.rankOf(p)+1, elem);
        return newPos;
    }
    insertBefore(p, elem) {
        let newPos = this.insertAtRank(this.rankOf(p), elem);
        return newPos;
    }
    remove(p) {
        return this.removeAtRank(this.rankOf(p));
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
        return res + "]";
    }
    print() {
        console.log(this.toString());
        console.log("size =" + this.size() + "  N=" + this.#arr.length
                + " first="+this.#first + " last=" + this.#last + "\n");

    }
    elements() {
        return new Iter.ListIterator(this, 1);
    }
    positions() {
        return new Iter.ListIterator(this, 2);
    }
}

exports.Sequence = Sequence;