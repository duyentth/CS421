
class ArraySorter {
    constructor() {
        this._compCount = 0;
        this._swapCount = 0;
        this._shiftCount = 0;
    }
    keyComparisons() {
        return this._compCount;
    }
    numSwaps() {
        return this._swapCount;
    }
    numShifts() {
        return this._shiftCount;
    }
    print(arr) {
        let last = arr.length - 1;
        let res = "[";
        for (let i=0; i<=last; i++) {
            res = res + arr[i];
            if (i<last) {
                res = res + ", ";
            }
        }
        console.log(res + "]");
    }

    _buildHeap(arr) {
        // your code goes here
    }
    _parent(index) {
        return Math.floor((index-1)/2);
    }
    _downheap(arr, index, last) {
        // your code goes here
    }
    _swapElements(arr, j, k) {
        let temp = arr[j];
        arr[j] = arr[k];
        arr[k] = temp;
        this._swapCount++;
    }
    _indexOfMax(arr, index, last) {
        // your code goes here
    }
    heapSort(arr) {
        this._compCount = 0;
        this._swapCount = 0;
        this._buildHeap(arr);
        console.log("key comparisons to build the Heap " + this._compCount);
        // your code goes here
    }

    insertionSort(arr) {
        this._compCount = 0;
        this._shiftCount = 0;
        this._insertionSort(arr);
    }
    _insertionSort(arr) {
        // your code goes here
    }

    ShellSort(arr) {
        this._compCount = 0;
        this._shiftCount = 0;
        let maxGap = Math.floor(arr.length/3);
        let gap = 1;
        while (gap <= maxGap) {
            gap = gap*3 + 1;
        }
        while (gap > 0) {
            this._segmentInsertionSort(arr, gap);
            gap = (gap - 1) / 3;
        }
    }
    _segmentInsertionSort(arr, gap) {
        // your code goes here
    }

}

exports.ArraySorter = ArraySorter;
