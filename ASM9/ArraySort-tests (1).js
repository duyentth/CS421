const Sorts = require('./HW07-ArraySorter.js');
const Util = require('./GenCopyFunctions.js');
const ADT = require('./PriorityQueue.js');

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
    } else if (choice == 3) {
        mySorter.PQSort(arr);
        console.log("PQSort key comparisons=" + mySorter.keyComparisons());
        console.log("PQSort number of swaps=" + mySorter.numSwaps());
    } else if (choice == 4) {
        mySorter.mergeSort(arr);
        console.log("mergeSort key comparisons=" + mySorter.keyComparisons());
        console.log("mergeSort number of assignments=" + mySorter.numShifts());
    } else if (choice == 5) {
        mySorter.quickSort(arr);
        console.log("quickSort key comparisons=" + mySorter.keyComparisons());
        console.log("quickSort number of swaps=" + mySorter.numSwaps());
        console.log("quickSort number of shifts=" + mySorter.numShifts());
    }
    HelperFunctions.isSortedArray(arr);
    console.log();
    return arr;
}

function testSorts(size) {
    let dat = HelperFunctions.genArrayData(size, 2000);

    console.log("\narray size = " + size + "\n");
    // mySorter.print(dat);

//    Sort(dat, 0, true);
    Sort(dat, 2, true);
    Sort(dat, 3, true);
    Sort(dat, 1, true);
    Sort(dat, 4, true);
    Sort(dat, 5, true);
    // mySorter.print(dat);
    console.log("\ntest runs on sorted input size=" + size + "\n");
    Sort(dat, 0, false);
    Sort(dat, 2, false);
    Sort(dat, 3, false);
    Sort(dat, 1, false);
    Sort(dat, 4, false);
    Sort(dat, 5, false);
}

testSorts(0);
testSorts(1);
let size = 13;
while (size < 500) {
    testSorts(size);
    size = size*10;
}
testSorts(50000);
