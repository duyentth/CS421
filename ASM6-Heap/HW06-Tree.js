
const Heap = require('./MinHeap.js');
const Seq = require('./Sequence.js');

function compare(key1, key2) {
    return key1 - key2;
}
function lessOrEqual(key1, key2) {
    return compare(key1, key2) <= 0;
}

var h0 = new Heap.MinHeap(compare);

function findSmallerKeys(T, key) {
    
    if (T.isEmpty()) return null;
    let seq = new Seq.Sequence();
    findSmallerHelper(T, key, T.root(), seq);
   console.log("findSmallerKeys(" + key + ") = " + seq.toString());
    return seq;
}
function findSmallerHelper(T, key, p, seq) {
    // Your code goes here
    if ( p.element() <= key) {
        seq.insertFirst(p.element());
    }     
    if (T.leftChild(p)) {
        findSmallerHelper(T, key, T.leftChild(p), seq);
    }
    if (T.rightChild(p)) {
        findSmallerHelper(T, key, T.rightChild(p), seq);
    } 
}

// Test cases follow here

console.log("\nHeap = " + h0.toString());
findSmallerKeys(h0, 50);
h0.insert(50);
console.log("\nHeap = " + h0.toString());
findSmallerKeys(h0, 25);
findSmallerKeys(h0, 50);

h0.insert(150);
h0.insert(100);
h0.insert(200);
h0.insert(450);
h0.insert(350);
h0.insert(250);
h0.insert(650);
h0.insert(550);
console.log("\nHeap = " + h0.toString());
findSmallerKeys(h0, 225);

h0.insert(500);
h0.insert(500);
console.log("\nHeap = " + h0.toString());
findSmallerKeys(h0, 350);

h0.insert(25);
h0.insert(50);
h0.insert(200);

console.log("\nHeap = " + h0.toString());
//findSmallerKeys(h0, 450);
findSmallerKeys(h0, 350);

