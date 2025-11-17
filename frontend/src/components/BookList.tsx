import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Stack,
} from '@mui/material';
import { AttachMoney, School, Person } from '@mui/icons-material';
import { Book } from '../App';
import axios from 'axios';

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestDialog, setRequestDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [requesterName, setRequesterName] = useState('');
  const [urgency, setUrgency] = useState(5);

  // Mock data for demonstration (replace with actual API calls)
  useEffect(() => {
    // Simulating API call
    const fetchBooks = async () => {
      try {
        // For now, using mock data since Java backend API isn't set up yet
        const mockBooks: Book[] = [
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
          }
        ];
        setBooks(mockBooks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRequestBook = (book: Book) => {
    setSelectedBook(book);
    setRequestDialog(true);
  };

  const submitRequest = async () => {
    if (!selectedBook || !requesterName.trim()) {
      return;
    }

    try {
      // TODO: Replace with actual API call to Java backend
      console.log('Requesting book:', {
        bookTitle: selectedBook.title,
        requester: requesterName,
        urgency: urgency
      });
      
      setRequestDialog(false);
      setRequesterName('');
      setUrgency(5);
      setSelectedBook(null);
      
      // Show success message (you might want to add a snackbar)
      alert('Book request submitted successfully!');
    } catch (err) {
      setError('Failed to submit request');
    }
  };

  if (loading) {
    return <Typography>Loading books...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Available Books
      </Typography>
      
      {books.length === 0 ? (
        <Alert severity="info">No books available at the moment.</Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
          {books.map((book) => (
            <Box key={book.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <School sx={{ mr: 1, color: 'text.secondary' }} />
                    <Chip label={book.courseCode} size="small" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="h6" color="success.main">
                      ${book.price.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Seller: {book.seller}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleRequestBook(book)}
                  >
                    Request This Book
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Request Dialog */}
      <Dialog open={requestDialog} onClose={() => setRequestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Book: {selectedBook?.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            fullWidth
            variant="outlined"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Urgency (1 = High, 10 = Low)"
            type="number"
            fullWidth
            variant="outlined"
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
            inputProps={{ min: 1, max: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialog(false)}>Cancel</Button>
          <Button 
            onClick={submitRequest} 
            variant="contained"
            disabled={!requesterName.trim()}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};