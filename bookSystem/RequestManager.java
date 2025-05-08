// File: Book.java
package bookSystem;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

/**
 * RequestManager manages book requests made by users, prioritizing them by urgency.
 */
public class RequestManager {

    // List to store all user-submitted requests
    private List<Request> requests;

    public RequestManager() {
        this.requests = new ArrayList<>();
    }

    /**
     * Adds a new request to the system.
     * @param request The request to add.
     */
    public void addRequest(Request request) {
        requests.add(request);
    }

    /**
     * Returns the list of all requests.
     * @return list of current requests
     */
    public List<Request> getRequests() {
        return new ArrayList<>(requests); // defensive copy
    }

    /**
     * Processes all pending requests based on urgency and book availability.
     * @param bookManager the BookManager to interact with available books
     * @return a list of log messages describing the processing outcome
     */
    public List<String> processRequests(BookManager bookManager) {
        PriorityQueue<Request> queue = new PriorityQueue<>(requests);
        List<String> log = new ArrayList<>();

        while (!queue.isEmpty()) {
            Request request = queue.poll();
            Book book = bookManager.getBook(request.getTitle());
            if (book != null) {
                bookManager.removeBook(book);
                log.add("✅ Matched: " + request + " <-> " + book);
            } else {
                log.add("❌ No available book for: " + request.getTitle());
            }
        }

        requests.clear(); // clear after processing
        return log;
    }

    /**
     * Displays current requests in the console.
     */
    public void displayRequests() {
        if (requests.isEmpty()) {
            System.out.println("No requests available.");
        } else {
            for (Request request : requests) {
                System.out.println(request);
            }
        }
    }
}




