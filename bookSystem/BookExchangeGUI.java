package bookSystem;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class BookExchangeGUI extends JFrame {
    private BookManager bookManager = new BookManager(); // Ensure this class exists
    private RequestManager requestManager = new RequestManager(); // Ensure this class exists

    private JTextArea displayArea;

    // Method to clear the display area
    private void clearDisplay() {
        displayArea.setText("");
    }

    // Constructor for the GUI
    public BookExchangeGUI() {
        setTitle("📚 Textbook Exchange System");
        setSize(600, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        displayArea = new JTextArea();
        displayArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(displayArea);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(1, 4));

        JButton listButton = new JButton("List Book");
        JButton requestButton = new JButton("Request Book");
        JButton viewButton = new JButton("View Books");
        JButton processButton = new JButton("Process Requests");

        listButton.addActionListener(e -> listBook());
        requestButton.addActionListener(e -> requestBook());
        viewButton.addActionListener(e -> viewBooks());
        processButton.addActionListener(e -> processRequests());

        buttonPanel.add(listButton);
        buttonPanel.add(requestButton);
        buttonPanel.add(viewButton);
        buttonPanel.add(processButton);

        add(scrollPane, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setVisible(true);
    }

    // Method to list a book
    private void listBook() {
        String title = JOptionPane.showInputDialog("Enter book title:");
        String course = JOptionPane.showInputDialog("Enter course code:");
        String priceStr = JOptionPane.showInputDialog("Enter price:");
        String seller = JOptionPane.showInputDialog("Enter your name:");

        if (title == null || course == null || priceStr == null || seller == null || 
            title.isEmpty() || course.isEmpty() || priceStr.isEmpty() || seller.isEmpty()) {
            displayError("❌ Please fill in all fields.");
            return;
        }

        try {
            double price = Double.parseDouble(priceStr);
            int option = JOptionPane.showConfirmDialog(this, "Are you sure you want to list this book?");
            if (option == JOptionPane.YES_OPTION) {
                bookManager.addBook(new Book(title, course, price, seller));
                displaySuccess("✅ Book listed successfully!");
            }
        } catch (NumberFormatException e) {
            displayError("❌ Invalid price input.");
        }
    }

    // Method to request a book
    private void requestBook() {
        String title = JOptionPane.showInputDialog("Enter book title to request:");
        String requester = JOptionPane.showInputDialog("Enter your name:");
        String urgencyStr = JOptionPane.showInputDialog("Enter urgency (1 = high, 10 = low):");

        if (title == null || requester == null || urgencyStr == null || title.isEmpty() || requester.isEmpty() || urgencyStr.isEmpty()) {
            displayError("❌ Please fill in all fields.");
            return;
        }

        try {
            int urgency = Integer.parseInt(urgencyStr);
            if (urgency < 1 || urgency > 10) {
                displayError("❌ Urgency must be between 1 and 10.");
                return;
            }

            int option = JOptionPane.showConfirmDialog(this, "Are you sure you want to submit this request?");
            if (option == JOptionPane.YES_OPTION) {
                requestManager.addRequest(new Request(title, requester, urgency));
                displaySuccess("📥 Request submitted.");
            }
        } catch (NumberFormatException e) {
            displayError("❌ Invalid urgency input.");
        }
    }

    // Method to view all books
    private void viewBooks() {
        List<Book> books = bookManager.getAllBooks();
        displayArea.setText(""); // Clear previous content
        if (books.isEmpty()) {
            displayError("❌ No books available.");
            return;
        }

        displayArea.append("📚 Available Books:\n");
        for (Book b : books) {
            displayArea.append("- " + b + "\n");
        }
    }

    // Method to process all requests
    private void processRequests() {
        List<String> logs = requestManager.processRequests(bookManager);
        if (logs.isEmpty()) {
            displayError("❌ No requests to process.");
            return;
        }

        displayArea.setText("🔄 Processing Requests:\n");
        for (String log : logs) {
            displayArea.append(log + "\n");
        }
    }

    // Method to display error messages
    private void displayError(String message) {
        displayArea.setText(""); // Clear previous content
        displayArea.setForeground(Color.RED);
        displayArea.append(message + "\n");
        displayArea.setForeground(Color.BLACK);
    }

    // Method to display success messages
    private void displaySuccess(String message) {
        displayArea.setText(""); // Clear previous content
        displayArea.setForeground(Color.GREEN);
        displayArea.append(message + "\n");
        displayArea.setForeground(Color.BLACK);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(BookExchangeGUI::new);
    }
}


