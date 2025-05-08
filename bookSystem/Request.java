// File: Book.java
package bookSystem;

import java.util.*;

// Request.java
public class Request implements Comparable<Request> {
    private String title;
    private String requester;
    private int urgency;

    public Request(String title, String requester, int urgency) {
        this.title = title;
        this.requester = requester;
        this.urgency = urgency;
    }

    public String getTitle() {
        return title;
    }

    public String getRequester() {
        return requester;
    }

    public int getUrgency() {
        return urgency;
    }

    @Override
    public int compareTo(Request other) {
        return Integer.compare(this.urgency, other.urgency);
    }

    @Override
    public String toString() {
        return title + " (Urgency: " + urgency + ") - Requested by: " + requester;
    }
}