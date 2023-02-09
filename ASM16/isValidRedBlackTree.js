function checkRedBlackTree(root) {
    // Check if the root is black
    if (root.color !== "BLACK") {
        return false;
    }
    
    // Initialize variables to store information about the tree
    let blackHeight = -1;
    let currentHeight = 0;

    // Perform a breadth-first search of the tree
    let queue = [root];
    while (queue.length > 0) {
        let currentNode = queue.shift();
        // If the current node is black, increment the current height
        if (currentNode.color === "BLACK") {
            currentHeight += 1;
        }
        
        // If the current node is red, check if its children are both black
        if (currentNode.color === "RED") {
            if (currentNode.left.color !== "BLACK" || currentNode.right.color !== "BLACK") {
                return false;
            }
        }
        
        // Add the children of the current node to the queue
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
    
    // Check if the black height is consistent throughout the tree
    if (blackHeight === -1) {
        blackHeight = currentHeight;
    } else if (blackHeight !== currentHeight) {
        return false;
    }
    
    // If the tree passes all checks, it is properly formed
    return true;
}
