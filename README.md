# 📚 Book Exchange System

A Java-based Book Exchange System with a graphical user interface (GUI) built using Swing. This project allows users to add, remove, request, and process the exchange of books between sellers and buyers in a college setting.

## 💡 Features

- Add and remove books from the exchange system
- View all books sorted by title
- Request books and manage pending requests
- Process requests and update the system accordingly
- User-friendly GUI built with Java Swing
- Custom `TreeSet`-like data structure (`MyTreeSet`) for sorted book storage

## 🧰 Technologies Used

- Java
- Java Swing (for GUI)
- Custom-built data structures (binary search tree implementation)

## 🗂️ Project Structure

BookExchangeSystem/
│
├── Book.java # Represents a book with title, author, and seller
├── BookManager.java # Manages books using HashMap and MyTreeSet
├── Request.java # (To be implemented) Represents a book request
├── RequestManager.java # Manages book requests
├── MyTreeSet.java # Custom generic binary search tree to store books in sorted order
├── BookExchangeGUI.java # Main GUI class built using Swing
└── README.md # Project documentation



## 🚀 How to Run

1. **Clone the repository** or copy the source code to your local machine.
2. Open the project in any Java IDE (e.g., IntelliJ, Eclipse) or use the terminal.
3. Compile all `.java` files:
```bash
   javac *.java
   ```
4. Run the GUI:
	```bash
	java BookExchangeGUI
	```
