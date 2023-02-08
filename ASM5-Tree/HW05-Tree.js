const Tree = require('./BinarySearchTree.js');

class EulerTour {  // the Euler Tour Template class
    visitExternal(T, p, result) { }
    visitPreOrder(T, p, result) { }
    visitInOrder(T, p, result) { }
    visitPostOrder(T, p, result) { }
    eulerTour(T, p) {
        let result = new Array(3);
        if (T.isExternal(p)) {
            this.visitExternal(T, p, result);
        } else {
            this.visitPreOrder(T, p, result);
            result[0] = this.eulerTour(T, T.leftChild(p));
            this.visitInOrder(T, p, result);
            result[2] = this.eulerTour(T, T.rightChild(p));
            this.visitPostOrder(T, p, result);
        }
        return result[1];
    }
}
class PrintInOrder {  // print the items in a Tree T using an iterator
    constructor(T) {
        this._iter = T.keys();
    }
    print() {
        this._iter.reset();
        let res = "[";
        while (this._iter.hasNext()) {
            let next = this._iter.nextObject();
            res = res + next;
            if (this._iter.hasNext()) {
                res = res + " ";
            }
        }
        console.log(res + "]");
    }
}
class Print extends EulerTour {  // Print the items in a Binary Search Tree using the Euler Tour Template
    visitExternal(T, v, result) {
        result[1] = "";
    }
    visitPostOrder(T, v, result) {
        result[1] = "(" + result[0] + "L, " + v.element().key() + " ,R" + result[2] +")";
    }
    print(T) {
        if (T.size() > 0) {
            console.log("Root="+T.root().element().key());
        }
        let res = this.eulerTour(T, T.root());
        console.log("[" + res + "]\n");
    }
}
function height(T) {
    return heightHelper(T, T.root());
}
function heightHelper(T, p) {
    // your code goes here Hint: you need to define this helper function
    if ( T.isExternal(p) ) return 0;
    let lHeight = heightHelper(T, T.leftChild(p) );
    let rHeight = heightHelper(T, T.rightChild(p) );
    return ( lHeight > rHeight ? lHeight : rHeight ) + 1;    
}

class Height extends EulerTour {
        // add your code here, i.e., override methods from EulerTour class
    visitExternal(T, p, result) {
        result[1] = 0;
    }
    visitPostOrder(T, p, result) {
        result[1] = 1 + Math.max(result[0], result[2]);
    }
    height(T) {
        return this.eulerTour(T, T.root());  // this is your helper from the EulerTour Template class 
    }
}
// Test cases follow here
var t0 = new Tree.BinarySearchTree();

var printer = new Print();

printer.print(t0);
var h = new Height();

var t1 = new Tree.BinarySearchTree();

printer.print(t0);
var h = new Height();

console.log("height should be 0");
console.log("height="+ height(t0));
console.log("height="+ h.height(t0)+"\n"); // should be 0
t0.insertItem(400, 400);
printer.print(t0);
console.log("height should be 1");
console.log("height="+ height(t0));
console.log("height="+ h.height(t0)+"\n");

// t0.insertItem(150, 150);
// t0.insertItem(100, 100);
// console.log("insert 150, 100");
// printer.print(t0);
// console.log("height should be 3");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");

// t0.insertItem(200, 200);
// t0.insertItem(450, 450);
// t0.insertItem(350, 350);
// t0.insertItem(250, 250);
// t0.insertItem(650, 650);
// t0.insertItem(550, 550);
// console.log("insert 200, 450, 350, 250. 650, 550");
// printer.print(t0);
// let inOrderPrinter = new PrintInOrder(t0);
// inOrderPrinter.print();
// console.log("height should be 5");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");

// console.log("insert 500");
// t0.insertItem(500, 130);
// console.log("find key= 200, element="+ t0.findElement(200));
// console.log("find key= 450, element="+ t0.findElement(450));
// console.log("find key= 500, element="+ t0.findElement(500));
// t0.insertItem(500, 500);
// console.log("find key= 500, element="+ t0.findElement(500));
// console.log("height should be 5");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// inOrderPrinter.print();
// printer.print(t0);

// console.log("remove=650 elem="+ t0.removeElement(650) +"\n");
// console.log("height should be 5");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// console.log("remove=400 elem="+ t0.removeElement(400) +"\n");
// console.log("height should be 4");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// printer.print(t0);
// console.log("remove=350 elem="+ t0.removeElement(350) +"\n");

// console.log("height should be 4");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// console.log("remove=150 elem="+ t0.removeElement(150) +"\n");
// printer.print(t0);

// console.log("height should be 4");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// console.log("test of adjustment next");
// console.log("remove=250 elem="+ t0.removeElement(250) +"\n");
// printer.print(t0);

// console.log("height should be 4");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// t0.insertItem(25, 25);
// t0.insertItem(50, 50); 
// t0.insertItem(75, 75); 
// t0.insertItem(80, 80); 
// console.log("insert 25, 50, 75, 80");
// console.log("height should be 6");
// console.log("height="+ height(t0));
// console.log("height="+ h.height(t0)+"\n");
// inOrderPrinter.print();
// printer.print(t0);
