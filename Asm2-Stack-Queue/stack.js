const List = require('./DLinkedList.js');

class Stack {
    constructor() {
        this._stack = new List.DLinkedList();
    }
    push(elem) {
        this._stack.insertLast(elem);
    }
    pop() {
        var last = this._stack.last();
        return this._stack.remove(last);
    }
    isEmpty() {
        return this._stack.isEmpty();
    }
    size() {
        return this._stack.size();
    }
    elements() {
        return this._stack.elements();
    }
    toString() {
        return this._stack.toString();
    }
}

let St = new Stack();
St.push("a");
St.push("b");
St.push("c");
St.push("d");
console.log(St.toString());
console.log("pop= " + St.pop());

St.push("e");
St.push("f");
St.push("g");
console.log("push e, f, and g");
console.log("pop=" + St.pop());
console.log("pop=" + St.pop());
console.log("pop=" + St.pop());
console.log("pop=" + St.pop());

St.push("h");
St.push("i");
St.push("j");
console.log("push h, i, and j");
console.log("pop=" + St.pop());
console.log("pop=" + St.pop());
console.log("pop=" + St.pop());
console.log(St.toString());
