package bookSystem;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

public class BookManager {
   private Map<String, List<Book>> books = new HashMap();
   private TreeSet<Book> sortedBooks = new TreeSet();

   public BookManager() {
   }

   public void addBook(Book var1) {
      String var2 = var1.getTitle().toLowerCase();
      ((List)this.books.computeIfAbsent(var2, (var0) -> {
         return new ArrayList();
      })).add(var1);
      this.sortedBooks.add(var1);
   }

   public Book getBook(String var1) {
      String var2 = var1.toLowerCase();
      List var3 = (List)this.books.get(var2);
      if (var3 != null && !var3.isEmpty()) {
         Book var4 = (Book)var3.remove(0);
         this.sortedBooks.remove(var4);
         return var4;
      } else {
         return null;
      }
   }

   public void removeBook(Book var1) {
      String var2 = var1.getTitle().toLowerCase();
      ((List)this.books.getOrDefault(var2, new ArrayList())).remove(var1);
      this.sortedBooks.remove(var1);
   }

   public List<Book> getAllBooks() {
      return new ArrayList(this.sortedBooks);
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
}
