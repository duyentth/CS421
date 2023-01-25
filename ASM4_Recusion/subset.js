//binArr[n]   
//setOfSubsets(0);
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