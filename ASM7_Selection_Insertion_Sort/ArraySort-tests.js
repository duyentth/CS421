const Sorts = require('./HW07-ArraySorter.js');
const Util = require('./GenCopyFunctions.js');

let mySorter = new Sorts.ArraySorter();
let HelperFunctions = new Util.GenCopyFunctions();

function Sort(dat, choice, makeCopy) {
    let arr = dat;
    if (makeCopy) {
        arr = HelperFunctions.copyArray(dat);
    }
    if (choice == 0) {
        mySorter.insertionSort(arr);
        console.log("insertionSort key comparisons=" + mySorter.keyComparisons());
        console.log("insertionSort number of shifts=" + mySorter.numShifts());
    } else if (choice == 1) {
        mySorter.heapSort(arr);
        console.log("heapSort key comparisons=" + mySorter.keyComparisons());
        console.log("heapSort number of swaps=" + mySorter.numSwaps());
    } else if (choice == 2) {
        mySorter.ShellSort(arr);
        console.log("ShellSort key comparisons=" + mySorter.keyComparisons());
        console.log("ShellSort number of shifts=" + mySorter.numShifts());
    }
    HelperFunctions.isSortedArray(arr);
    console.log();
    return arr;
}
function testSorts(size) {
    let dat = HelperFunctions.genArrayData(size, 20000);

    console.log("\narray size = " + size);
    // mySorter.print(dat);

    Sort(dat, 0, true);
    Sort(dat, 2, true);
    Sort(dat, 1, false);
    // mySorter.print(dat);
    console.log("\ntest runs on sorted input");
    Sort(dat, 0, false);
    Sort(dat, 2, false);
    Sort(dat, 1, false);
}

testSorts(0);
testSorts(1);
let size = 13;
while (size < 500000) {
    testSorts(size);
    size = size*10;
}
// testSorts(1000000);
