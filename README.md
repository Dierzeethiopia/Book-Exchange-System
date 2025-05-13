#  Book Exchange System

Access to textbooks and course materials can be a significant time and financial burden for students, and many are left with unused books after completing their courses. On our campus, we noticed that exchanging books among students and faculty is often inefficient and disorganized. So our main goal is to build a Book Exchange System that enables student  to add/post books they want to give away or exchange/sell, and find books they need from fellow students at an affordable price or for free if it's a give away.

Our Java-based Book Exchange System uses Swing and AWT for the graphical user interface (GUI). This project allows users to add, remove, request, and process the exchange of books between sellers and buyers in a college setting.

Our goal was to make it accessible for real-world use across the campus by enhancing the interface and features and deploying the system. However, due to time constraints, we were unable to fully achieve this.

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
3. Compile all `.java` files:
   
               ```javac bookSystem/*.java```
5. Run the GUI:
   
               ```java bookSystem.BookExchangeGUI```
# How to manipulate
1. Click ```Add book``` to add/sell books and enter all the fields with an appropriate type(string, integer...) about the book you want to get.
2. Click ```View Books``` to check if the book is added (ordered alphabetically) or to view all the available books. 
   NB: We've added around 20 books as a sample.
3. Click ```Reques book``` to request/buy a book and then ```Process Requests``` to proceed the transaction.
   Due to the limit of time we had, we couldn't add more feature to process the request/transaction.
