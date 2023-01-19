const List = require('./DLinkedList.js');
const { ListIterator } = require('./ListIterator.js');

var findMiddle = function(L) {
    //return null if L is empty
    //your code goes here
    if (L.isEmpty()) {
        return null;
    }
    var position = Math.floor(L.size() / 2);
    
    if (position === 0 ) {
        return L.first().element();
    } 
    var index = 0;   
    var middleElement ; 
    var listIter = new ListIterator(L, 1);
    do {
        if(listIter.hasNext()) {
            middleElement = listIter.nextObject();
        }
        index ++;
    } while (index <= position);
    return middleElement;
}

var tst0 = new List.DLinkedList();
tst0.print();
let res = findMiddle(tst0);
console.log("middle = " + res + "\n\n");

var tst1 = new List.DLinkedList();
tst1.insertFirst(5);
tst1.print();
res = findMiddle(tst1);

console.log("middle = " + res + "\n\n");
var tst2 = new List.DLinkedList();
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");
tst2.insertFirst(1);
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");

tst2.insertLast(3);
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");

tst2.insertAfter(tst2.before(tst2.after(tst2.first())), 2);
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");
tst2.remove(tst2.after(tst2.first()));
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");
tst2.insertFirst(0);
tst2.insertLast(4);
tst2.insertAfter(tst2.after(tst2.first()), 2);
tst2.print();
res = findMiddle(tst2);
console.log("middle = " + res + "\n\n");

console.log(tst2.after(tst2.after(tst2.after(tst2.first()))).element());
console.log("first = " + tst2.first().element());
console.log("last  = " + tst2.last().element());