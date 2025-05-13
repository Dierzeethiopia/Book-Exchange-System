package bookSystem;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.util.List;

public class BookExchangeGUI extends JFrame {
    private BookManager bookManager = new BookManager(); 
    private RequestManager requestManager = new RequestManager(); 

    private JTextArea displayArea;

    // Method to clear the display area
    private void clearDisplay() {
        displayArea.setText("");
    }


    // Constructor for the GUI
    public BookExchangeGUI() {
        setTitle("📚 Textbook Exchange System 📚");
        setSize(700, 550);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center the window
        setLayout(new BorderLayout());

        displayArea = new JTextArea();
        displayArea.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        displayArea.setEditable(false);
        displayArea.setLineWrap(true);
        displayArea.setWrapStyleWord(true);

        JScrollPane scrollPane = new JScrollPane(displayArea);
        scrollPane.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Gradient center panel
        JPanel centerPanel = new JPanel(new BorderLayout()) {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2d = (Graphics2D) g;
                Color top = new Color(245, 250, 255);
                Color bottom = new Color(230, 240, 250);
                GradientPaint gp = new GradientPaint(0, 0, top, 0, getHeight(), bottom);
                g2d.setPaint(gp);
                g2d.fillRect(0, 0, getWidth(), getHeight());
            }
        };
        centerPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createEmptyBorder(20, 20, 20, 20),
            BorderFactory.createLineBorder(new Color(180, 200, 220), 2)
        ));
        centerPanel.setOpaque(false);
        centerPanel.add(scrollPane, BorderLayout.CENTER);

        // Button panel styling
        JPanel buttonPanel = new JPanel(new GridLayout(1, 4, 10, 10));
        buttonPanel.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        buttonPanel.setBackground(new Color(225, 240, 255));

        Color btnColor = new Color(222, 111, 33); // Cornflower Blue
        Color textColor = Color.WHITE;

        buttonPanel.add(createStyledButton("Add Book", btnColor, textColor, e -> listBook()));
        buttonPanel.add(createStyledButton("Request Book", btnColor, textColor, e -> requestBook()));
        buttonPanel.add(createStyledButton("View Books", btnColor, textColor, e -> viewBooks()));
        buttonPanel.add(createStyledButton("Process Requests", btnColor, textColor, e -> processRequests()));

        add(centerPanel, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setVisible(true);
    }

    // Helper to create a styled JButton with better colors and visibility
    private JButton createStyledButton(String text, Color bg, Color fg, java.awt.event.ActionListener action) {
        JButton button = new JButton(text);
        button.setBackground(new Color(72, 133, 237)); // Vibrant blue
        button.setForeground(Color.BLUE);
        button.setFont(new Font("Segoe UI", Font.BOLD, 14));
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(22, 200, 222), 3),
            BorderFactory.createEmptyBorder(10, 15, 10, 15)
        ));

        // Add a hover effect
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(new Color(100, 160, 255));
            }

            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(new Color(72, 133, 237));
            }
        });

        button.addActionListener(action);
        return button;
    }


    // Method to list a book
    private void listBook() {
        String title = JOptionPane.showInputDialog("Enter book title:");
        if (title == null || title.trim().isEmpty()) return;

        String course = JOptionPane.showInputDialog("Enter course code:");
        if (course == null || course.trim().isEmpty()) return;

        String priceStr = JOptionPane.showInputDialog("Enter price:");
        if (priceStr == null || priceStr.trim().isEmpty()) return;

        String seller = JOptionPane.showInputDialog("Enter your name:");
        if (seller == null || seller.trim().isEmpty()) return;

        if (title == null || course == null || priceStr == null || seller == null ||
            title.isEmpty() || course.isEmpty() || priceStr.isEmpty() || seller.isEmpty()) {
            displayError("Please fill in all fields.");
            return;
        }
        // if (title == null || course == null || priceStr == null || seller == null || 
        //     title.isEmpty() || course.isEmpty() || priceStr.isEmpty() || seller.isEmpty()) {
        //     displayError("Please fill in all fields.");
        //     return;
        // }

        try {
            double price = Double.parseDouble(priceStr);
            int option = JOptionPane.showConfirmDialog(this, "Are you sure you want to list this book?");
            if (option == JOptionPane.YES_OPTION) {
                bookManager.addBook(new Book(title, course, price, seller));
                displaySuccess("Book listed successfully!");
            }
        } catch (NumberFormatException e) {
            displayError("Invalid price input.");
        }
    }

    // Method to request a book
    private void requestBook() {
        String title = JOptionPane.showInputDialog("Enter book title to request:");
        if (title == null || title.trim().isEmpty()) return;

        String requester = JOptionPane.showInputDialog("Enter your name:");
        if (requester == null || requester.trim().isEmpty()) return;

        String urgencyStr = JOptionPane.showInputDialog("Enter urgency (1 = high, 10 = low):");
        if (urgencyStr == null || urgencyStr.trim().isEmpty()) return;

        // if (title == null || requester == null || urgencyStr == null || title.isEmpty() || requester.isEmpty() || urgencyStr.isEmpty()) {
        //     displayError("Please fill in all fields.");
        //     return;
        // }

        try {
            int urgency = Integer.parseInt(urgencyStr);
            if (urgency < 1 || urgency > 10) {
                displayError("Urgency must be between 1 and 10.");
                return;
            }

            int option = JOptionPane.showConfirmDialog(this, "Are you sure you want to submit this request?");
            if (option == JOptionPane.YES_OPTION) {
                requestManager.addRequest(new Request(title, requester, urgency));
                displaySuccess("📥 Request submitted.");
            }
        } catch (NumberFormatException e) {
            displayError("Invalid urgency input.");
        }
    }

    // Method to view all books
    private void viewBooks() {
        List<Book> books = bookManager.getAllBooks();
        displayArea.setText(""); // Clear previous content
        if (books.isEmpty()) {
            displayError("No books available.");
            return;
        }
        
        displayArea.append("AVAILABLE BOOKS:   [course title (price) - (course code),  (seller name) ] \n\n");
        for (Book b : books) {
            displayArea.append("=>  [ " + b + " ] \n");
        }
    }

    // Method to process all requests
    // Method to process all requests
    private void processRequests() {
        // Process requests and remove matched books from bookManager inside this method
        List<String> logs = requestManager.processRequests(bookManager);

        if (logs.isEmpty()) {
            displayError("No requests to process.");
            return;
        }

        // Ask user for confirmation before proceeding
        int confirm = JOptionPane.showConfirmDialog(this, "Are you sure you want to proceed?");
        if (confirm == JOptionPane.YES_OPTION) {
            // Save the updated book list to file AFTER removals have happened
            bookManager.saveBooks();

            // Show confirmation message
            displaySuccess("Item is ordered successfully.");
        }

        // Display logs in the GUI
        displayArea.setText("Processing Requests:\n\n");
        for (String log : logs) {
            displayArea.append(log + "\n");
        }
    }


    // Method to display error messages
    private void displayError(String message) {
        displayArea.setText(""); 
        displayArea.setForeground(Color.RED);
        displayArea.append(message + "\n");
        displayArea.setForeground(Color.BLACK);
    }

    // Method to display success messages
    private void displaySuccess(String message) {
        displayArea.setText(""); 
        displayArea.setForeground(new Color(0, 128, 0)); // Dark Green
        displayArea.append(message + "\n");
        displayArea.setForeground(Color.blue);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(BookExchangeGUI::new);
    }
}
