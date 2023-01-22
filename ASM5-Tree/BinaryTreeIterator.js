class BinaryTreeIterator {
    constructor(T, type) {
        this._type = type;
        this._nodes = [];
        this._index = 0;
        this._tree = T;
        this.reset();
    }
    _getPositions(T) {
        this._nodes = [];
        this._visitInOrder(T, T.root());
    }
    _visitInOrder(T, p) {
        let result = new Array(3);
        if (T.isExternal(p)) {
            return;
        } else {
            this._visitInOrder(T, T.leftChild(p));
            this._nodes.push(p);  // store the positions in the array in order by key
            this._visitInOrder(T, T.rightChild(p));
        }
        return result[1];
    }
    hasNext() {
        return this._index < this._nodes.length;
    }
    nextObject() {
        let item = this._nodes[this._index].element(); // get item from the position
        this._index++;
        if (this._type == 0) { // items iterator
            return item;
        } else if (this._type = 1) { // keys() iterator
            return item.key();
        } else {                    // elements() iterator
            return item.value();
        }
    }
    reset() {
        this._getPositions(this._tree);  // build the iterator
        this._index = 0;
    }
}

exports.BinaryTreeIterator = BinaryTreeIterator;
