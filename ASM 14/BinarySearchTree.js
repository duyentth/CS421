const Pair = require('./Item.js');
const Tree = require('./BinaryTree.js');
const Iter = require('./BinaryTreeIterator.js');

class BinarySearchTree extends Tree.BinaryTree {
    constructor() {
        super();
    }
    compareKeys(key1, key2) {
        return key1 - key2;
    }
    replaceItem(p, item) {
        return super.replaceElement(p, item);
    }
    swapItems(p, q) {
        super.swapElements(p, q);
    }
    _findPosition(k, p) {
        let diff = this.compareKeys(k, p.element().key());
        if (diff < 0) {
            if (this.isExternal(p._left)) {
                return p;
            } else {
                return this._findPosition(k, p._left);
            }
        } else if (diff > 0) {
            if (this.isExternal(p._right)) {
                return p;
            } else {
                return this._findPosition(k, p._right);
            }
        } else {  // key k is in position p
            return p;  
        }
    }
    insertItem(k, e) {
        if (this.isEmpty()) {
            return this.insertRoot(new Pair.Item(k, e));
        } else {
            let p = this._findPosition(k, this.root());
            let diff = this.compareKeys(k, p.element().key());
            if (diff == 0) { // k is already in the tree
                p.element()._value = e; // update/replace the value
                return p;
            } else {
                let newItem = new Pair.Item(k, e);
                if (diff < 0) {
                    return this.insertLeft(p, newItem);
                } else { 
                    return this.insertRight(p, newItem);
                }
            }
        }
    }
    _findPos2Remove(k) {
        let v = this._findPosition(k, this.root());
        let r = v;
        if (this.isInternal(v._left) && this.isInternal(v._right)) {
            r = this._findPosition(k, v._left);
            this.swapItems(v, r);
        }
        return r;
    }
    removeElement(k) {
        if (this.isEmpty()) { // key k is not in the BST
            return null;
        }
        let r = this._findPos2Remove(k);
        if (r.element().key() != k) { // key k is not in the BST
            return null;
        } else {
            this.remove(r);
        }
        return r.element().value();
    }
    findElement (k) {
        if (this.isEmpty()) { // key k is not in the BST
            return null;
        }
        let p = this._findPosition(k, this.root());
        if (p.element().key() != k) { // key not found
            return null;
        } else {
            return p.element().value();
        }
    }
    items() {
        return new Iter.BinaryTreeIterator(this, 0);
    }
    keys() {
        return new Iter.BinaryTreeIterator(this, 1);
    }
    elements() {
        return new Iter.BinaryTreeIterator(this, 2);
    }
}

exports.BinarySearchTree = BinarySearchTree;