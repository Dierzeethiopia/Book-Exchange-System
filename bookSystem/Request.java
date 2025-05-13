
// File: Request.java
package bookSystem;

import java.util.*;

/**
 * Represents a book request in the Book Exchange System.
 * Each request includes the title of the book, the requester,
 * and the urgency level of the request.
 */
public class Request implements Comparable<Request> {
    private String title;      // The title of the requested book
    private String requester;  // The person who made the request
    private int urgency; 
    private long timestamp;      // The urgency level (lower means less urgent)


    //Constructs a new Request with the specified title, requester, and urgency.
    public Request(String title, String requester, int urgency) {
        this.title = title;
        this.requester = requester;
        this.urgency = urgency;
        this.timestamp = System.nanoTime();
    }

    // Returns the title of the requested book.
    public String getTitle() {
        return title;
    }

    // Returns the name of the person who made the request.
    public String getRequester() {
        return requester;
    }

    // Returns the urgency level of the request.
    public int getUrgency() {
        return urgency;
    }

    // Compares this request with another based on urgency.
    @Override
    public int compareTo(Request other) {
        if (this.urgency != other.urgency) {
            return Integer.compare(this.urgency, other.urgency); // lower = higher priority
        } else {
            return Long.compare(this.timestamp, other.timestamp); // earlier request = higher priority
        }
    }

    // Returns a string representation of the request.
    @Override
    public String toString() {
        return title + " (Urgency: " + urgency + ") - Requested by: " + requester;
    }
}
