// include this code inside of your HW07-ArraySorter.js file

    quickSort(arr) {
        this._compCount = 0;
        this._swapCount = 0;
        this._shiftCount = 0;
        this._quickSort(arr, 0, arr.length-1);
    }
    _quickSort(arr, lo, hi) {
        if (lo < hi) {
            let pivots = this._inPlacePartition(arr, lo, hi);
            //  console.log(pivots);  
            // pivots is an array containing two elements, an index range where all elements are equal to the random pivot
            this._quickSort(arr, lo, pivots[0]-1);
            this._quickSort(arr, pivots[1]+1, hi);
        }
    }
    _inPlacePartition(arr, lo, hi) {
        let size = hi - lo + 1;
        let rand = Math.floor(Math.random()*100)%size;
        let pivot = arr[lo + rand];  // bug needed to add lo to rand so pivot is between lo and hi
        let pivots = [];
        let j = lo;
        let k = hi;
        while (j <= k) {
            this._compCount++;
            while (j <= k && arr[j] < pivot) {
                this._compCount++;
                j++;
            }
            this._compCount++;
            while (j <= k && pivot <= arr[k]) {
                this._compCount++;
                k--;
            }
            if (j <= k) {
                this._swapElements(arr, j, k);
                j++;
                k--;
             }
        }
        pivots.push(j);
        
        k = hi;
        while (j <= k) {
            this._compCount++;
            while (j <= k && arr[j] == pivot) {
                this._compCount++;
                j++;
            }
            this._compCount++;
            while (j <= k && pivot < arr[k]) {
                this._compCount++;
                k--;
            }
            if (j <= k) {
                this._swapElements(arr, j, k);
                j++;
                k--;
             }
        }
        
        pivots.push(k);
        return pivots;
    }

