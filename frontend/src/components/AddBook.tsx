import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
} from '@mui/material';
import { AttachMoney, School, Person, Book } from '@mui/icons-material';
import axios from 'axios';

interface AddBookProps {
  onBookAdded: () => void;
}

export const AddBook: React.FC<AddBookProps> = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    price: '',
    seller: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      // TODO: Replace with actual API call to Java backend
      const bookData = {
        title: formData.title.trim(),
        courseCode: formData.courseCode.trim().toUpperCase(),
        price: price,
        seller: formData.seller.trim()
      };

      console.log('Adding book:', bookData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Book added successfully!');
      setFormData({ title: '', courseCode: '', price: '', seller: '' });
      
      // Navigate back to book list after a short delay
      setTimeout(() => {
        onBookAdded();
      }, 2000);
      
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        List a Book for Sale
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Book Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange('title')}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Book />
                </InputAdornment>
              ),
            }}
          />
          
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
                  <School />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={formData.price}
            onChange={handleChange('price')}
            margin="normal"
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
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
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Adding Book...' : 'List Book'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={onBookAdded}
              size="large"
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};