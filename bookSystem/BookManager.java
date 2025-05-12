package bookSystem;

import java.io.*;
import java.util.*;

public class BookManager {
    private Map<String, List<Book>> books = new HashMap<>();
    private MyTreeSet<Book> sortedBooks = new MyTreeSet<>();
    private static final String FILE_NAME = "books.txt"; // File to store books data

    public BookManager() {
        loadBooks();
    }

    // Load books from the file
    private void loadBooks() {
        try (BufferedReader br = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 4) {
                    String title = parts[0].trim();
                    String course = parts[1].trim();
                    double price = Double.parseDouble(parts[2].trim());
                    String seller = parts[3].trim();
                    Book book = new Book(title, course, price, seller);
                    addBook(book);  // Add to the internal structure
                }
            }
        } catch (IOException e) {
            // File not found, ignore and proceed with an empty list
        }
    }

    // Save books to the file
    private void saveBooks() {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Book book : sortedBooks) {
                bw.write(book.getTitle() + "," + book.getCourseCode() + "," + book.getPrice() + "," + book.getSeller());
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Add a new book
    public void addBook(Book book) {
        String title = book.getTitle().toLowerCase();
        books.computeIfAbsent(title, k -> new ArrayList<>()).add(book);
        sortedBooks.add(book);
        saveBooks();  // Save books to file after adding a new one
    }

    // Get and remove a book by title
    public Book getBook(String title) {
        String key = title.toLowerCase();
        List<Book> bookList = books.get(key);
        if (bookList != null && !bookList.isEmpty()) {
            Book book = bookList.remove(0);
            sortedBooks.remove(book);
            saveBooks();  // Save after removing
            return book;
        }
        return null;
    }

    // Remove a specific book
    public void removeBook(Book book) {
        String title = book.getTitle().toLowerCase();
        books.getOrDefault(title, new ArrayList<>()).remove(book);
        sortedBooks.remove(book);
        saveBooks();  // Save after removal
    }

    // List all books
    public List<Book> getAllBooks() {
        List<Book> list = new ArrayList<>();
        for (Book book : sortedBooks) {
            list.add(book);
        }
        return list;
    }

    // List all books (for debug or console output)
    public void listAllBooks() {
        if (sortedBooks.isEmpty()) {
            System.out.println("No books available.");
        } else {
            System.out.println("\nAvailable Books:");
            for (Book book : sortedBooks) {
                System.out.println(book);
            }
        }
    }

    // Main method to test the BookManager functionality
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
