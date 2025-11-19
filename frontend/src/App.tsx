import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fab,
  Zoom,
  Badge,
} from '@mui/material';
import { Add as AddIcon, RequestPage as RequestIcon } from '@mui/icons-material';
import { BookList } from './components/BookList';
import { AddBook } from './components/AddBook';
import { RequestBook } from './components/RequestBook';
import { RequestList } from './components/RequestList';
import { Navigation } from './components/Navigation';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9bb5ff',
      dark: '#3d4ab7',
    },
    secondary: {
      main: '#764ba2',
      light: '#a67bd1',
      dark: '#4a2674',
    },
    background: {
      default: 'transparent',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export type Book = {
  id?: number;
  title: string;
  courseCode: string;
  price: number;
  seller: string;
};

export type BookRequest = {
  id?: number;
  title: string;
  requester: string;
  urgency: number;
};

// Initial mock data
const initialBooks: Book[] = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    courseCode: "CS134",
    price: 49.99,
    seller: "Alice Johnson"
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    courseCode: "CS136",
    price: 39.99,
    seller: "Bob Smith"
  },
  {
    id: 3,
    title: "Calculus I",
    courseCode: "MATH141",
    price: 65.00,
    seller: "Carol Davis"
  },
  {
    id: 4,
    title: "Modern Physics",
    courseCode: "PHYS151",
    price: 72.50,
    seller: "David Chen"
  },
  {
    id: 5,
    title: "Organic Chemistry",
    courseCode: "CHEM111",
    price: 89.99,
    seller: "Emma Rodriguez"
  },
  {
    id: 6,
    title: "English Composition",
    courseCode: "ENGL101",
    price: 35.00,
    seller: "Frank Wilson"
  },
  {
    id: 7,
    title: "World History",
    courseCode: "HIST201",
    price: 42.75,
    seller: "Grace Thompson"
  },
  {
    id: 8,
    title: "Statistics for Engineers",
    courseCode: "MATH241",
    price: 58.99,
    seller: "Henry Kim"
  },
  {
    id: 9,
    title: "Database Systems",
    courseCode: "CS235",
    price: 67.50,
    seller: "Isabella Garcia"
  },
  {
    id: 10,
    title: "Microeconomics",
    courseCode: "ECON201",
    price: 54.99,
    seller: "Jack Martinez"
  },
  {
    id: 11,
    title: "Linear Algebra",
    courseCode: "MATH341",
    price: 61.25,
    seller: "Kate Anderson"
  },
  {
    id: 12,
    title: "Software Engineering",
    courseCode: "CS370",
    price: 75.00,
    seller: "Leo Zhang"
  },
  {
    id: 13,
    title: "General Biology",
    courseCode: "BIOL101",
    price: 78.50,
    seller: "Maya Patel"
  },
  {
    id: 14,
    title: "Introduction to Psychology",
    courseCode: "PSYC101",
    price: 46.99,
    seller: "Noah Brown"
  },
  {
    id: 15,
    title: "Discrete Mathematics",
    courseCode: "MATH231",
    price: 52.75,
    seller: "Olivia Lee"
  },
  {
    id: 16,
    title: "Operating Systems",
    courseCode: "CS340",
    price: 69.99,
    seller: "Peter Johnson"
  },
  {
    id: 17,
    title: "Principles of Accounting",
    courseCode: "ACCT201",
    price: 63.50,
    seller: "Quinn Davis"
  },
  {
    id: 18,
    title: "Human Anatomy & Physiology",
    courseCode: "BIOL241",
    price: 95.00,
    seller: "Rachel Smith"
  },
  {
    id: 19,
    title: "Machine Learning",
    courseCode: "CS481",
    price: 85.75,
    seller: "Sam Wilson"
  },
  {
    id: 20,
    title: "Art History",
    courseCode: "ART201",
    price: 38.99,
    seller: "Tina Rodriguez"
  },
  {
    id: 21,
    title: "Differential Equations",
    courseCode: "MATH242",
    price: 66.50,
    seller: "Ursula Chen"
  },
  {
    id: 22,
    title: "Web Development",
    courseCode: "CS290",
    price: 44.99,
    seller: "Victor Kim"
  },
  {
    id: 23,
    title: "Macroeconomics",
    courseCode: "ECON202",
    price: 57.25,
    seller: "Wendy Garcia"
  },
  {
    id: 24,
    title: "Philosophy of Ethics",
    courseCode: "PHIL201",
    price: 41.50,
    seller: "Xavier Martinez"
  },
  {
    id: 25,
    title: "Electrical Circuits",
    courseCode: "EE201",
    price: 73.99,
    seller: "Yuki Anderson"
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'books' | 'add' | 'request' | 'requests'>('books');
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [requests, setRequests] = useState<BookRequest[]>([]);

  const addBook = (newBook: Omit<Book, 'id'>) => {
    const bookWithId: Book = {
      ...newBook,
      id: Date.now() // Simple ID generation
    };
    setBooks(prevBooks => [...prevBooks, bookWithId]);
  };

  const addRequest = (newRequest: Omit<BookRequest, 'id'>) => {
    const requestWithId: BookRequest = {
      ...newRequest,
      id: Date.now()
    };
    setRequests(prevRequests => [...prevRequests, requestWithId]);
  };

  const removeRequest = (requestId: number | undefined) => {
    if (requestId) {
      setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'books':
        return <BookList books={books} />;
      case 'add':
        return <AddBook onBookAdded={addBook} onCancel={() => setCurrentView('books')} />;
      case 'request':
        return <RequestBook onRequestAdded={addRequest} onCancel={() => setCurrentView('books')} />;
      case 'requests':
        return <RequestList requests={requests} onRequestRemoved={removeRequest} />;
      default:
        return <BookList books={books} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static" elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                📚 Williams bookXchange Hub
              </Typography>
              <Typography variant="body2" sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.7rem',
                fontStyle: 'italic',
                mt: -0.5
              }}>
                Made by @Dires
              </Typography>
            </Box>
            <Badge 
              badgeContent={books.length} 
              color="secondary" 
              sx={{ 
                mr: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => setCurrentView('books')}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: currentView === 'books' ? 'white' : 'rgba(255,255,255,0.7)',
                  fontWeight: currentView === 'books' ? 600 : 400,
                  transition: 'all 0.3s ease'
                }}
              >
                Books Available
              </Typography>
            </Badge>
            <Badge 
              badgeContent={requests.length} 
              color="primary"
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => setCurrentView('requests')}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: currentView === 'requests' ? 'white' : 'rgba(255,255,255,0.7)',
                  fontWeight: currentView === 'requests' ? 600 : 400,
                  transition: 'all 0.3s ease'
                }}
              >
                Pending Requests
              </Typography>
            </Badge>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
          <Box className="navigation-container">
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView}
              bookCount={books.length}
              requestCount={requests.length}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            {renderCurrentView()}
          </Box>
        </Container>

        {/* Floating Action Buttons */}
        <Zoom in={currentView === 'books'}>
          <Fab 
            color="primary" 
            className="fab"
            onClick={() => setCurrentView('add')}
            sx={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
        
        <Zoom in={currentView === 'books'}>
          <Fab 
            color="secondary" 
            className="fab"
            onClick={() => setCurrentView('request')}
            sx={{ 
              bottom: 100,
              background: 'linear-gradient(135deg, #764ba2, #667eea)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6a4190, #5a6fd8)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <RequestIcon />
          </Fab>
        </Zoom>
      </div>
    </ThemeProvider>
  );
}

export default App;
