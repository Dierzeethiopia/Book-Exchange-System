import React, { useState, useMemo } from 'react';
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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Grid,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import { 
  AttachMoney, 
  School, 
  Person, 
  Search,
  FilterList,
  Sort,
  Star,
  Favorite,
  FavoriteBorder,
  Share
} from '@mui/icons-material';
import { Book } from '../App';

interface BookListProps {
  books: Book[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
  const [error, setError] = useState<string | null>(null);
  const [requestDialog, setRequestDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [requesterName, setRequesterName] = useState('');
  const [urgency, setUrgency] = useState(5);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'course'>('title');
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Get unique courses for filter
  const availableCourses = useMemo(() => {
    const courses = new Set(books.map(book => book.courseCode));
    return Array.from(courses).sort();
  }, [books]);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesCourse = !selectedCourse || book.courseCode === selectedCourse;
      
      return matchesSearch && matchesPrice && matchesCourse;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'course':
          return a.courseCode.localeCompare(b.courseCode);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [books, searchQuery, sortBy, priceRange, selectedCourse]);

  const toggleFavorite = (bookId: number | undefined) => {
    if (!bookId) return;
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    setFavorites(newFavorites);
  };

  const shareBook = (book: Book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out this book: ${book.title} for ${book.courseCode}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${book.title} - $${book.price} for ${book.courseCode}`);
      alert('Book details copied to clipboard!');
    }
  };

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

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom className="gradient-text">
        📚 Book Marketplace ({filteredBooks.length})
      </Typography>
      
      {/* Search and Filter Section */}
      <Box className="search-container" sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2, 
          alignItems: { md: 'center' },
          mb: 2
        }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <TextField
              fullWidth
              placeholder="Search books, courses, or sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  background: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flex: '0 0 auto' }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value as 'title' | 'price' | 'course')}
                startAdornment={<Sort />}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="course">Course</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
                startAdornment={<FilterList />}
              >
                <MenuItem value="">All Courses</MenuItem>
                {availableCourses.map(course => (
                  <MenuItem key={course} value={course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            max={200}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
              }
            }}
          />
        </Box>
      </Box>
      
      {filteredBooks.length === 0 ? (
        <Alert severity="info" className="glass-card">
          {books.length === 0 
            ? "No books available at the moment. Add some books to get started! 📚" 
            : "No books match your search criteria. Try adjusting your filters. 🔍"
          }
        </Alert>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: 3 
        }}>
          {filteredBooks.map((book, index) => (
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={book.id}>
              <Card className="glass-card hover-lift" sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible'
              }}>
                {/* Favorite Button */}
                <IconButton
                  onClick={() => toggleFavorite(book.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  {book.id && favorites.has(book.id) ? (
                    <Favorite sx={{ color: '#e91e63' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>

                <CardContent sx={{ flexGrow: 1, pt: 6 }}>
                  <Typography variant="h6" gutterBottom className="gradient-text" sx={{ 
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    lineHeight: 1.3
                  }}>
                    {book.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <School sx={{ mr: 1, color: 'primary.main' }} />
                    <Chip 
                      label={book.courseCode} 
                      size="small" 
                      sx={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="h5" className="price-tag" sx={{
                      background: 'linear-gradient(135deg, #4caf50, #45a049)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 700
                    }}>
                      ${book.price.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Seller: <strong>{book.seller}</strong>
                    </Typography>
                  </Box>
                  
                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleRequestBook(book)}
                      className="gradient-button"
                      sx={{
                        flex: 1,
                        borderRadius: '25px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    >
                      Request Book
                    </Button>
                    <IconButton
                      onClick={() => shareBook(book)}
                      className="glass-button"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.3)',
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
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