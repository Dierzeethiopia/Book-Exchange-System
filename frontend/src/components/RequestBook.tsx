import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  Slider,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Search, Person } from '@mui/icons-material';
import axios from 'axios';

interface RequestBookProps {
  onRequestAdded: () => void;
}

export const RequestBook: React.FC<RequestBookProps> = ({ onRequestAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    requester: '',
    urgency: 5,
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

  const handleUrgencyChange = (_: Event, newValue: number | number[]) => {
    setFormData(prev => ({
      ...prev,
      urgency: newValue as number
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.requester.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call to Java backend
      const requestData = {
        title: formData.title.trim(),
        requester: formData.requester.trim(),
        urgency: formData.urgency
      };

      console.log('Adding request:', requestData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Book request submitted successfully!');
      setFormData({ title: '', requester: '', urgency: 5 });
      
      // Navigate back to book list after a short delay
      setTimeout(() => {
        onRequestAdded();
      }, 2000);
      
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyLabel = (value: number) => {
    if (value <= 3) return 'High Priority';
    if (value <= 7) return 'Medium Priority';
    return 'Low Priority';
  };

  const getUrgencyColor = (value: number) => {
    if (value <= 3) return 'error.main';
    if (value <= 7) return 'warning.main';
    return 'success.main';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Request a Book
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
            placeholder="Enter the title of the book you're looking for"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={formData.requester}
            onChange={handleChange('requester')}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl fullWidth sx={{ mt: 3 }}>
            <FormLabel component="legend">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Request Urgency</Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: getUrgencyColor(formData.urgency), fontWeight: 'bold' }}
                >
                  {getUrgencyLabel(formData.urgency)} ({formData.urgency})
                </Typography>
              </Box>
            </FormLabel>
            <Box sx={{ px: 1, mt: 2 }}>
              <Slider
                value={formData.urgency}
                onChange={handleUrgencyChange}
                min={1}
                max={10}
                step={1}
                marks={[
                  { value: 1, label: 'Urgent' },
                  { value: 5, label: 'Normal' },
                  { value: 10, label: 'Can Wait' }
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: getUrgencyColor(formData.urgency),
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: getUrgencyColor(formData.urgency),
                  },
                }}
              />
            </Box>
          </FormControl>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Submitting Request...' : 'Submit Request'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={onRequestAdded}
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