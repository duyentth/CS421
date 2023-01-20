const listMD = require("./List.js");

//L = 2, 4, 1, 5, 6
function sum (L) {
    if ( L.isEmpty() ) return null;
    let p = L.first();
    return sumHelper(L, p);
}
function sumHelper(L, p) {
    if ( L.isLast(p) ) return sum = p.element();
    return p.element() + sumHelper(L, L.after(p));
}

let myList = new listMD.List();
myList.insertFirst(2);
myList.insertLast(6);
myList.insertAfter(myList.first(), 4);
myList.insertBefore(myList.insertBefore(myList.last(), 5), 1);

console.log("my list is ", myList.toString());
console.log("sum of list is ", sum(myList));