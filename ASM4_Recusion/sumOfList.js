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

function sumWithRank(L) {
    if ( L.isEmpty() ) return null;
    let rank = 0;
    return sumWithRankHelper(L,rank);
}

function sumWithRankHelper(L, rank) {
    if(L.isLast(L.atRank(rank))) return sum = L.elemAtRank(rank);
    return L.elemAtRank(rank) + sumWithRankHelper(L, ++ rank );
}
//L = 2, 4, 1, 5, 6
let myList = new listMD.List();
myList.insertFirst(2);
myList.insertLast(6);
myList.insertAfter(myList.first(), 4);
myList.insertBefore(myList.insertBefore(myList.last(), 5), 1);

console.log("my list is ", myList.toString());
console.log("sum of list is ", sum(myList));
console.log("sum of list with rank is ", sumWithRank(myList));