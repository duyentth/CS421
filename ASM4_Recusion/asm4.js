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

function findMax(L) {
    if (L.isEmpty() ) return null;
    return findMaxHelper(L);
}

function findMaxHelper(L) {
    let p1 = L.first();
    let max = p1.element();
    if ( L.isLast(p1) ) return max;
    let p2 = L.after(p1);
    if ( max <= p2.element() ) L.remove(p1);
    if ( max > p2.element() ) L.remove(p2);
    return findMaxHelper(L);
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
console.log("max of list is ", findMax(myList) );



function setOfSubsets(n){
    var binArr = new Array(n);
    function gen(k,n) {
        if (k == n){
            var subSet = [];
            for(var j=0;j<binArr.length;j++){
                if (binArr[j] == 1)
                    subSet.push(j+1);
            }
            console.log(subSet);
        }
        else {
            binArr[k] = 0;
            gen(k+1, n);
            binArr[k] = 1;
            gen(k+1, n);
        }
    }
    gen(0,n);
}



setOfSubsets(4);