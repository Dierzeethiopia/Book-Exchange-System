// File: Book.java
package bookSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
// import java.util.TreeSet;

public class BookManager {
   private Map<String, List<Book>> books = new HashMap<>();
   private MyTreeSet<Book> sortedBooks = new MyTreeSet<>();

   public BookManager() {
   }

   public void addBook(Book book) {
      // get the title of book
      String booktitle = book.getTitle().toLowerCase();

      // 
      List<Book> list = books.get(booktitle);
      //string does not excist in the map, creat it with an empty list
      if (list == null) {
          list = new ArrayList<>();
          books.put(booktitle, list);
      }

      // otherwise add the book to the list and also add it to the sorted books
      list.add(book);

      sortedBooks.add(book);
   }


   public Book getBook(String title) {
      List titleList = (List)this.books.get(title.toLowerCase());
      if (titleList != null && !titleList.isEmpty()) {
         Book book = (Book)titleList.remove(0);
         this.sortedBooks.remove(book);
         return book;
      } else {
         return null;
      }
   }

   public void removeBook(Book book) {
      String bookTitle = book.getTitle().toLowerCase();
      List<Book> list = books.get(bookTitle);  
      if (list != null) {
          list.remove(book); 
      }

      sortedBooks.remove(book); 
   }

   public List<Book> getAllBooks() {
       List<Book> list = new ArrayList<>();
       for (Book b : this.sortedBooks) {
           list.add(b);
       }
       return list;
   }

   public void listAllBooks() {
      if (this.sortedBooks.isEmpty()) {
         System.out.println("No books available.");
      } else {
         System.out.println("\nAvailable Books:");
         Iterator var1 = this.sortedBooks.iterator();

         while(var1.hasNext()) {
            Book var2 = (Book)var1.next();
            System.out.println(var2);
         }

      }
   }

    public static void main(String[] args) {
        BookManager manager = new BookManager();

        // Creating Book instances
        Book book1 = new Book("Algorithms", "CS101", 49.99, "Alice");
        Book book2 = new Book("Data Structures", "CS102", 39.99, "Bob");
        Book book3 = new Book("Java Programming", "CS103", 59.99, "Charlie");
        Book book4 = new Book("Algorithms", "CS101", 49.99, "Alice");  // Duplicate of book1 (same title)

        // Adding books
        manager.addBook(book1);
        manager.addBook(book2);
        manager.addBook(book3);
        manager.addBook(book4);

        // Listing all books
        System.out.println("=== All Books After Adding ===");
        manager.listAllBooks();  // Expecting 4 books

        // Get one book and remove it
        Book retrieved = manager.getBook("Algorithms");
        System.out.println("\nRetrieved: " + retrieved);
        System.out.println("\n=== All Books After Retrieval ===");
        manager.listAllBooks();  // Expecting 3 books, one removed

        // Remove a specific book
        manager.removeBook(book2);
        System.out.println("\n=== All Books After Removal ===");
        manager.listAllBooks();  // Expecting 2 books remaining

        // Get Java Programming (case insensitive)
        Book retrieved2 = manager.getBook("java programming");
        System.out.println("\nRetrieved: " + retrieved2);

        // Try to retrieve again (should be null as it's already removed)
        Book retrieved3 = manager.getBook("Java Programming");
        System.out.println("\nRetrieved (should be null): " + retrieved3);
    }
}
