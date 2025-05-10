package bookSystem;

/*  A generic interface representing a basic Tree Set Abstract Data Type (ADT).
 *  This interface defines standard operations for a tree set, which stores unique elements.
 */
public interface SetADT<E> {

    // Adds the specified element to the set if it is not already present.
    public abstract boolean add(E element);  

    // Removes the specified element from the set if it exists.
    public abstract boolean remove(E element); 

    // Returns the number of elements in the set.
    public abstract int size();           

    // Checks whether the set is empty.
    public abstract boolean isEmpty();  

    // Returns an iterator over the elements in the set.
    public abstract java.util.Iterator<E> iterator(); 
}