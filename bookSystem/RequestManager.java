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

    //Returns the list of all requests.
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

    // Displays current requests in the console.
    public void displayRequests() {
        if (requests.isEmpty()) {
            System.out.println("No requests available.");
        } else {
            for (Request request : requests) {
                System.out.println(request);
            }
        }
    }

    public static void main(String[] args) {
        BookManager bookManager = new BookManager();
        bookManager.addBook(new Book("Intro to Java", "123", 49.99, "Author A"));
        bookManager.addBook(new Book("Data Structures", "456", 59.99, "Author B"));
        bookManager.addBook(new Book("Algorithms", "789", 69.99, "Author C"));


        RequestManager requestManager = new RequestManager();
        requestManager.addRequest(new Request("Data Structures", "Alice", 5));
        requestManager.addRequest(new Request("Intro to Java", "Bob", 1));
        requestManager.addRequest(new Request("Data Structures", "Charlie", 3));
        requestManager.addRequest(new Request("Data Structures", "ken", 1));
        requestManager.addRequest(new Request("Data Structures", "matthew", 1));
        System.out.println("Current Requests:");
        requestManager.displayRequests();

        System.out.println("\nProcessing Requests:");
        for (String logEntry : requestManager.processRequests(bookManager)) {
            System.out.println(logEntry);
        }

        System.out.println("\nRequests after processing:");
        requestManager.displayRequests();
    }
}




