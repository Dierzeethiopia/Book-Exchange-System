import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Zoom,
  Chip,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { 
  AttachMoney, 
  School, 
  Person, 
  Book as BookIcon,
  Add,
  Cancel,
  CheckCircle,
  PhotoCamera,
} from '@mui/icons-material';
import { Book } from '../App';

interface AddBookProps {
  onBookAdded: (book: Omit<Book, 'id'>) => void;
  onCancel: () => void;
}

export const AddBook: React.FC<AddBookProps> = ({ onBookAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    price: '',
    seller: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Common course codes for suggestions
  const commonCourses = ['CS134', 'MATH141', 'PHYS151', 'CHEM111', 'ENGL101', 'HIST201'];
  const filteredCourses = commonCourses.filter(course => 
    course.toLowerCase().includes(formData.courseCode.toLowerCase())
  );

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.courseCode.trim() || 
        !formData.price.trim() || !formData.seller.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);
    try {
      const bookData = {
        title: formData.title.trim(),
        courseCode: formData.courseCode.trim().toUpperCase(),
        price: price,
        seller: formData.seller.trim()
      };

      console.log('Adding book:', bookData);
      
      // Call the parent function to add the book
      onBookAdded(bookData);
      
      setSuccess('Book added successfully!');
      setFormData({ title: '', courseCode: '', price: '', seller: '' });
      
      // Navigate back to book list after a short delay
      setTimeout(() => {
        onCancel();
      }, 1500);
      
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="fade-in">
      <Typography variant="h3" gutterBottom className="gradient-text" sx={{ 
        textAlign: 'center',
        mb: 4,
        fontWeight: 700
      }}>
        📖 List Your Book
      </Typography>
      
      <Zoom in={true} timeout={600}>
        <Card className="glass-card" sx={{ 
          maxWidth: 600, 
          mx: 'auto',
          overflow: 'visible'
        }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} className="glass-card">
                {error}
              </Alert>
            )}
            {success && (
              <Alert 
                severity="success" 
                sx={{ mb: 3 }} 
                className="glass-card"
                icon={<CheckCircle />}
              >
                {success}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Book Title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange('title')}
                margin="normal"
                className="glass-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BookIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                    }
                  }
                }}
              />
              
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  label="Course Code"
                  variant="outlined"
                  value={formData.courseCode}
                  onChange={handleChange('courseCode')}
                  margin="normal"
                  placeholder="e.g., CS134, MATH141"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                      },
                      '&.Mui-focused': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                      }
                    }
                  }}
                />
                
                {/* Course suggestions */}
                {formData.courseCode && filteredCourses.length > 0 && (
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {filteredCourses.map(course => (
                      <Chip
                        key={course}
                        label={course}
                        size="small"
                        clickable
                        onClick={() => setFormData(prev => ({ ...prev, courseCode: course }))}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              
              <TextField
                fullWidth
                label="Price ($)"
                variant="outlined"
                value={formData.price}
                onChange={handleChange('price')}
                margin="normal"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={formData.seller}
                onChange={handleChange('seller')}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-2px)',
                    }
                  }
                }}
              />
              
              {/* Preview Card */}
              {(formData.title || formData.courseCode || formData.price) && (
                <Zoom in={true}>
                  <Box sx={{ mt: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom className="gradient-text">
                      📋 Preview
                    </Typography>
                    <Card className="glass-card preview-card" sx={{ 
                      p: 2,
                      border: '2px dashed rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Typography variant="h6" className="gradient-text">
                        {formData.title || 'Book Title'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Course: {formData.courseCode || 'Course Code'}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'success.main' }}>
                        ${formData.price || '0.00'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By: {formData.seller || 'Your Name'}
                      </Typography>
                    </Card>
                  </Box>
                </Zoom>
              )}
              
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  className="gradient-button"
                  startIcon={loading ? null : <Add />}
                  sx={{
                    borderRadius: '25px',
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(102, 126, 234, 0.3)',
                    }
                  }}
                >
                  {loading ? 'Adding Book...' : 'List Book'}
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  size="large"
                  disabled={loading}
                  startIcon={<Cancel />}
                  className="glass-button"
                  sx={{
                    borderRadius: '25px',
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    minWidth: '120px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      background: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Zoom>
    </Box>
  );
};