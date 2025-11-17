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
} from '@mui/material';
import { BookList } from './components/BookList';
import { AddBook } from './components/AddBook';
import { RequestBook } from './components/RequestBook';
import { Navigation } from './components/Navigation';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
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

function App() {
  const [currentView, setCurrentView] = useState<'books' | 'add' | 'request'>('books');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'books':
        return <BookList />;
      case 'add':
        return <AddBook onBookAdded={() => setCurrentView('books')} />;
      case 'request':
        return <RequestBook onRequestAdded={() => setCurrentView('books')} />;
      default:
        return <BookList />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              📚 Book Exchange System 📚
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Navigation currentView={currentView} onViewChange={setCurrentView} />
          <Box sx={{ mt: 3 }}>
            {renderCurrentView()}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
