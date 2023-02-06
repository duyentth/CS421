

// JavaScript program to check if a tree is height-balanced
// A binary tree Node

class Node{
	// Constructor to create a new Node
	constructor(data){
		this.data = data
		this.left = null
		this.right = null
	}
}

// function to find height of binary tree
function height(root){
	
	// base condition when binary tree is empty
	if(root == null)
		return 0
	return Math.max(height(root.left), height(root.right)) + 1
}

// function to check if tree is height-balanced or not
function isBalanced(root){
	
	// Base condition
	if(root == null)
		return true

	// for left and right subtree height
	let lh = height(root.left)
	let rh = height(root.right)

	// allowed values for (lh - rh) are 1, -1, 0
	if (Math.abs(lh - rh) <= 1 && isBalanced(
	root.left)== true && isBalanced( root.right) == true)
		return true

	// if we reach here means tree is not
	// height-balanced tree
	return false
}

// Driver function to test the above function
let root = new Node(1)
root.left = new Node(2)
root.right = new Node(3)
root.right.right = new Node(7);
root.left.left = new Node(4)
root.left.right = new Node(5)
root.left.left.left = new Node(8)
if(isBalanced(root))
	console.log("Tree is balanced","</br>")
else
	console.log("Tree is not balanced","</br>")

// This code is contributed by ShinjanPatra

/**
 * Time Complexity: O(n^2) in case of full binary tree.
Auxiliary Space: O(n) space for call stack since using recursion

Efficient implementation: Above implementation can be optimized by Calculating the height in the same recursion rather than calling a height() function separately. 

For each node make two recursion calls – one for left subtree and the other for the right subtree. 
Based on the heights returned from the recursion calls, decide if the subtree whose root is the current node is height-balanced or not. 
If it is balanced then return the height of that subtree. Otherwise, return -1 to denote that the subtree is not height-balanced.
Below is the implementation of the above approach.
 */




// JavaScript program to check if Binary tree is height-balanced

// Class to define a binary tree node
// class Node{

// 	// Constructor to create node of
// 	// binary tree
// 	constructor(data){
// 		this.data = data
// 		this.left = this.right = null
// 	}
// }

// Function to check if the tree is height balanced
function isBalanced2(root)
{
	if (root == null)
			return 0;
    let lh = isBalanced2(root.left);
    if (lh == -1)
        return -1;
    let rh = isBalanced2(root.right);
    if (rh == -1)
        return -1;

    if (Math.abs(lh - rh) > 1)
        return -1;
    else
        return Math.max(lh, rh) + 1;
}

// Driver code
let root2 = new Node(10)
root2.left = new Node(5)
root2.right = new Node(30)
root2.right.left = new Node(15)
root2.right.right = new Node(20)

if(isBalanced2(root2) > 0)
	console.log('Balanced',"</br>")
else
	console.log('Not Balanced',"</br>")

// This code is contributed by shinjanpatra

