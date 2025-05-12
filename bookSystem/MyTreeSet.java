package bookSystem;
import bookSystem.SetADT;

import java.util.*;

public class MyTreeSet<E extends Comparable<E>> implements Iterable<E> ,SetADT<E> {
	private Node root;
    private int size;

    // node class for each element in the tree
    private class Node{
    	E data;
    	Node left;
    	Node right;
        int height;

    	Node (E data){
    		this.data =data;
    		left = null;
    		right = null;
            this.height = 1;
    	}
    }

    private int height(Node n) {
        if (n == null) return 0;
        return n.height;
    }

    //constractor
    public MyTreeSet(){
    	root = null;
    	size = 0;
    }

    // if tree is empty
    public boolean isEmpty(){
    	return size ==0;
    }

    // number of elemnt in tree
    public int size(){
    	return size;
    }

    public boolean add(E data){
    	return helperAdd(root, data);
    }
    //add an element to the tree
    private boolean helperAdd(Node current, E data){
    	if(root== null){
    		root = new Node(data);
    		size++;
    		return true;
    	}

    	if (data.compareTo(current.data) < 0) {
            // Go left and add if left is null
            if (current.left == null) {
                current.left = new Node(data);
                size++;
                return true;
            } else {
            	// else continue left
                return helperAdd(current.left, data);
            }
        } else if (data.compareTo(current.data) > 0) {
            // Go right and add if right is null
            if (current.right == null) {
                current.right = new Node(data);
                size++;
                return true;

            } else // else continue going right
                return helperAdd(current.right, data);
            }
         else {
            // compare returned 0-- duplicates--do not add
            return false;
        }

    }

    //remove an element
    public boolean remove(E data){
    	Node x = helperRemove(root, data);
        if (x != null) {
            size--;
            return true;
        }
        return false;
    }

    private Node helperRemove(Node current, E data){

        if (current == null) {
            return null;
        }

        if (data.compareTo(current.data) < 0) {
        	// go left till we find node
            current.left = helperRemove(current.left, data);
        } else if (data.compareTo(current.data) > 0) {
        	//go right till we find the node
            current.right = helperRemove(current.right, data);
        } else {
            // Node to be deleted found
            if (current.left == null) {
                return current.right;
            } else if (current.right == null) {
                return current.left;
            }

            // Node with two children: get the inorder successor (smallest in the right subtree)
            current.data = findMin(current.right);

            // Delete the inorder successor
            current.right = helperRemove(current.right, current.data);
        }

        return current;
    }

    private E findMin(Node root) {
        E min = root.data;
        while (root.left != null) {
            min = root.left.data;
            root = root.left;
        }
        return min;
    }

    private Node rotateRight(Node y) {
        Node x = y.left;
        Node T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        return x;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        Node T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        return y;
    }

    // custom iterator 
    public Iterator<E> iterator() {
        return new TreeSetIterator();
    }

    private class TreeSetIterator implements Iterator<E> {
        private Stack<Node> stack = new Stack<>();

        public TreeSetIterator() {
            pushLeft(root);
        }

        private void pushLeft(Node node) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
        }

        
        public boolean hasNext() {
            return !stack.isEmpty();
        }

        public E next() {
            Node node = stack.pop();
            pushLeft(node.right);
            return node.data;
        }
    }

	public static void main(String[] args) {
        MyTreeSet<Integer> tree = new MyTreeSet<>();

        // Add elements
        tree.add(10);
        tree.add(5);
        tree.add(15);
        tree.add(2);
        tree.add(7);
        tree.add(12);
        tree.add(17);

        System.out.println("Initial in-order:");
        for (int val : tree) {
            System.out.print(val + " ");
        }
        System.out.println(); // Output: 2 5 7 10 12 15 17

        // Remove leaf
        tree.remove(2);
        System.out.println("\nAfter removing leaf (2):"); 
       
        for (int val : tree) {
            System.out.print(val + " ");
        }
        System.out.println(); //Output: 5 7 10 12 15 17

        // Remove node with one child
        tree.remove(5);
        System.out.println("\nAfter removing node with one child (5):");
        for (int val : tree) {
            System.out.print(val + " ");
        }
        System.out.println(); // Output: 7 10 12 15 17

        // Remove node with two children
        tree.remove(15);
        System.out.println("\nAfter removing node with two children (15):");
       
        for (int val : tree) {
            System.out.print(val + " ");
        }
        System.out.println(); // Output: 7 10 12 17

        // Remove root
        tree.remove(10);
        System.out.println("\nAfter removing root (10):");
        System.out.println(tree.isEmpty()); // output: false
        System.out.println(tree.size());    // output: 3
       

        
        System.out.println("\nFinal in-order:"); // Expected: 7 12 17
        for (int val : tree) {
            System.out.print(val + " ");
        }
    }
}