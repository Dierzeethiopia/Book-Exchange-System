#  Book Exchange System

Access to textbooks and course materials can be a significant time and financial burden for students, and many are left with unused books after completing their courses. On our campus, we noticed that exchanging books among students and faculty is often inefficient and disorganized. So our main goal is to build a Book Exchange System that enables student  to list/add/post books they want to give away or exchange/sell, and find books they need from fellow students at an affordable price or for free if it's a give away.

A Java-based Book Exchange System with a graphical user interface (GUI) built using Swing. This project allows users to add, remove, request, and process the exchange of books between sellers and buyers in a college setting.

######  Features
- Add and remove books from the exchange system
- View all books sorted by title
- Request books and manage pending requests
- Process requests and update the system accordingly
- User-friendly GUI built with Java Swing
- Custom `TreeSet`-like data structure (`MyTreeSet`) for sorted book storage

#  Technologies Used
- Java
- Java Swing (for GUI)
- Custom-built data structures (binary search tree implementation)

#  Project Structure
BookExchangeSystem/

|-| **Book.java** # Represents a book with title, author, and seller

|-| **BookManager.java** # Manages books using HashMap and MyTreeSet

|-| **Request.java** # Represents a book request

|-| **RequestManager.java** # Manages book requests

|-| **MyTreeSet.java** # Custom generic binary search tree to store books in sorted order

|-| **BookExchangeGUI.java** # Main GUI class built using Swing

|-| **README.md** # Project documentation


#  How to Run
1. **Clone the repository** or copy the source code to your local machine.
2. Open the project in any Java IDE (e.g., IntelliJ, Eclipse) or use the terminal.
3. Compile all `.java` files:   ```javac *.java ```
4. Run the GUI:                 ```java BookExchangeGUI```
