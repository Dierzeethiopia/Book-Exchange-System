package bookSystem;

public interface SetADT<E> {
    public abstract boolean add(E element);  

    public abstract boolean remove(E element);     

    public abstract int size();                     
    
    public abstract boolean isEmpty();                               
    
    public abstract java.util.Iterator<E> iterator(); 
}