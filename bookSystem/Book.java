/**
 * Represents a book in the Book Exchange System.
 * Each book has a title, course code, price, and seller information.
 */
package bookSystem;

import java.util.*;

/**
 * The Book class implements the Comparable interface to allow sorting by title.
 */
public class Book implements Comparable<Book> {

    // Fields
    private String title;       // The title of the book
    private String courseCode;  // The course code associated with the book
    private double price;       // The price of the book
    private String seller;      // The seller of the book

    /**
     * Constructs a new Book object with the specified details.
     *
     * @param title      The title of the book.
     * @param courseCode The course code associated with the book.
     * @param price      The price of the book.
     * @param seller     The seller of the book.
     */
    public Book(String title, String courseCode, double price, String seller) {
        this.title = title;
        this.courseCode = courseCode;
        this.price = price;
        this.seller = seller;
    }

    //Gets the title of the book.
    public String getTitle() {
        return title;
    }

    // Gets the course code associated with the book.
    public String getCourseCode() {
        return courseCode;
    }

    //Gets the price of the book.
    public double getPrice() {
        return price;
    }

    //Gets the seller of the book.
    public String getSeller() {
        return seller;
    }

    //Compares this book to another book based on their titles (case-insensitive).
    public int compareTo(Book other) {
        return this.title.compareToIgnoreCase(other.title);
    }

    // Equals method to compare two Book objects
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Book other = (Book) obj;
        return title.equalsIgnoreCase(other.title) && 
               courseCode.equals(other.courseCode) && 
               seller.equals(other.seller);
    }

    // HashCode method for the Book class
    @Override
    public int hashCode() {
        return Objects.hash(title.toLowerCase(), courseCode, seller);
    }

    //Returns a string representation of the book, including its title, price, course code, and seller.
    public String toString() {
        return title + " ($" + price + ") - Course: " + courseCode + ", Seller: " + seller;
    }

    //Main method for testing the Book class.
    //Includes assertions to verify the correctness of the class methods.
    public static void main(String[] args) {
        // Create sample books for testing
        Book b1 = new Book("Intro to CS", "CS134", 49.99, "Alice");
        Book b2 = new Book("Data Structures", "CS136", 39.99, "Bob");

        // Assertions to make sure our class is functionally correct
        assert b1.getTitle().equals("Intro to CS");
        assert b1.getCourseCode().equals("CS134");
        assert b1.getPrice() == 49.99;
        assert b1.getSeller().equals("Alice");
        assert b1.toString().equals("Intro to CS ($49.99) - Course: CS134, Seller: Alice");
        assert b1.compareTo(b2) < 0;

        // Print a message if all tests pass
        System.out.println("tests passed.");
    }
}








