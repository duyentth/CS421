
const BT = require("./BinaryTree");

class Node{
    constructor (value, color,left=null, right = null) {
        this.value = value;
        this.color = color;
        this.left = left;
        this.right = right;
    }
}

class RedBlackTree  {
    constructor () {
        this._root = null;
        this.size = 0;
    }
    blackHeight(node) {
        if( !node ) return 0;
        if ( node.color === 'black')            
            return 1 + Math.max(this.blackHeight(node.left), this.blackHeight(node.right))
        else if (node.color === 'red')
            return  Math.min(this.blackHeight(node.left), this.blackHeight(node.right))
    }
    
}


  
function isValidRBTree(T) {
    //let T = new  RedBlackTree();
    if (!T._root) return false;//empty tree
    if(T._root.color === 'red') return false;
    if (checkBlackDepth( T._root ) === -1 ) return false; 
    let isValidLeft = false;
    let isValidRight = false;
    if ( T._root.left ) {
        isValidLeft = isValidRBTreeHelper((T._root.left)) ;
    }
    if( T._root.right ) {
        isValidRight = isValidRBTreeHelper(T._root.right);
    }
    return isValidLeft && isValidRight ;        
}

function isValidRBTreeHelper(node) {
    if (node.color === 'red' && node.left && node.right) {
        if (node.left.color === 'red' || node.right.color === 'red') return false;
    }
    if (node.left) 
        isValidRBTreeHelper(node.left);
    if (node.right)
        isValidRBTreeHelper(node.right);
    return true;
}

function checkBlackDepth(root) {
    if (!root) return 0;

    let leftBlackDepth = checkBlackDepth(root.left);
    let rightBlackDepth = checkBlackDepth(root.right);

    if (leftBlackDepth === -1 || rightBlackDepth === -1 || leftBlackDepth !== rightBlackDepth) {
        return -1;
    }

    return root.color === "black" ? leftBlackDepth + 1 : leftBlackDepth;
}


let rbTree = new RedBlackTree();
rbTree._root = new Node(16,'black')
rbTree._root.left = new Node(5, 'red');
rbTree._root.right = new Node(30, 'red');
rbTree._root.left.left = new Node(2, 'black');
rbTree._root.left.left.left = new Node(1, 'red');
rbTree._root.left.right = new Node(10, 'black');
rbTree._root.left.right.left = new Node(7, 'red');
rbTree._root.left.right.right = new Node(12, 'red');
rbTree._root.right.left = new Node(22, 'black');
rbTree._root.right.left.left = new Node(18, 'red');
rbTree._root.right.right = new Node(50, 'black');
rbTree._root.right.right.left = new Node(45,'red');
rbTree._root.right.right.right = new Node(55, 'red');
//rbTree._root.right.right.right.right = new Node(60, 'black');
//rbTree._root.right.right.right = new Node(50, 'red');

console.log("The node value: ", rbTree._root.right.value + " the black height: ", rbTree.blackHeight(rbTree._root.right));

console.log("-----------------");
console.log("black depth: ", checkBlackDepth(rbTree._root));
console.log(isValidRBTree(rbTree));
