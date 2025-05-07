package bookSystem;

import java.util.*;
// Book.java
public class Book implements Comparable<Book> {
    private String title;
    private String courseCode;
    private double price;
    private String seller;

    public Book(String title, String courseCode, double price, String seller) {
        this.title = title;
        this.courseCode = courseCode;
        this.price = price;
        this.seller = seller;
    }

    public String getTitle() {
        return title;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public double getPrice() {
        return price;
    }

    public String getSeller() {
        return seller;
    }

    //compares titles
    public int compareTo(Book other) {
        return this.title.compareToIgnoreCase(other.title);
    }

    public String toString() {
        return title + " ($" + price + ") - Course: " + courseCode + ", Seller: " + seller;
    }

    public static void main(String[] args) {
        Book b1 = new Book("Algorithms", "CS101", 49.99, "Alice");
        Book b2 = new Book("Data Structures", "CS102", 39.99, "Bob");

        assert b1.getTitle().equals("Algorithms");
        assert b1.getCourseCode().equals("CS101");
        assert b1.getPrice() == 49.99;
        assert b1.getSeller().equals("Alice");
        assert b1.toString().equals("Algorithms ($49.99) - Course: CS101, Seller: Alice");
        assert b1.compareTo(b2) < 0;

        System.out.println("tests passed.");
    }
} 
