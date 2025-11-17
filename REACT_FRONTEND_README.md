# Book Exchange System - React Frontend

This is the React TypeScript frontend for the Book Exchange System, designed to work with the Java backend.

## Features

### 📚 View Books
- Display all available books in a responsive grid layout
- Show book details including title, course code, price, and seller
- Request books directly from the listing

### ➕ Add Books  
- User-friendly form to list books for sale
- Input validation for all fields
- Material-UI components for professional appearance

### 📝 Request Books
- Submit requests for books you need
- Priority system with visual slider (1-10 scale)
- Real-time urgency level feedback

### 🎨 Modern UI/UX
- Material-UI design system
- Responsive layout that works on mobile and desktop
- Smooth animations and transitions
- Professional color scheme and typography

## Technology Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Axios** for API communication
- **CSS Grid** for responsive layouts

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm start
```
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```
Builds the app for production to the `build` folder.

## API Integration

The frontend is configured to work with a Java REST API backend. Update the API base URL in `/src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

### Expected Backend Endpoints

The frontend expects these REST endpoints from your Java backend:

#### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/books/{id}` - Get book by ID
- `GET /api/books/search?q={query}` - Search books
- `DELETE /api/books/{id}` - Delete a book

#### Requests
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Add a new request
- `POST /api/requests/process` - Process requests
- `DELETE /api/requests/{id}` - Delete a request

### Sample JSON Structures

**Book Object:**
```json
{
  "id": 1,
  "title": "Introduction to Computer Science",
  "courseCode": "CS134",
  "price": 49.99,
  "seller": "Alice Johnson"
}
```

**Request Object:**
```json
{
  "id": 1,
  "title": "Data Structures",
  "requester": "Bob Smith",
  "urgency": 3
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AddBook.tsx     # Form to add new books
│   ├── BookList.tsx    # Display available books
│   ├── Navigation.tsx  # Navigation buttons
│   └── RequestBook.tsx # Form to request books
├── services/
│   └── api.ts          # API service functions
├── App.tsx             # Main application component
├── App.css             # Global styles
└── index.tsx           # Application entry point
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## Integration with Java Backend

Currently using mock data. To connect with your Java backend:

1. Create REST controllers in your Java application
2. Add CORS configuration to allow frontend requests
3. Update the API service calls to match your endpoint structure
4. Handle authentication if required

The frontend is designed to be easily integrated with your existing Java Book Exchange System!