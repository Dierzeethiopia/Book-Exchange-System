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
  Card,
  CardContent,
  Zoom,
  Chip,
} from '@mui/material';
import { 
  Search, 
  Person, 
  Send,
  Cancel,
  CheckCircle,
  PriorityHigh,
  Schedule,
  HourglassEmpty,
} from '@mui/icons-material';
import axios from 'axios';

interface RequestBookProps {
  onRequestAdded: (request: { title: string; requester: string; urgency: number }) => void;
  onCancel: () => void;
}

export const RequestBook: React.FC<RequestBookProps> = ({ onRequestAdded, onCancel }) => {
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
      const requestData = {
        title: formData.title.trim(),
        requester: formData.requester.trim(),
        urgency: formData.urgency
      };

      console.log('Adding request:', requestData);
      
      // Call the parent function to add the request
      onRequestAdded(requestData);
      
      setSuccess('Book request submitted successfully!');
      setFormData({ title: '', requester: '', urgency: 5 });
      
      // Navigate back to book list after a short delay
      setTimeout(() => {
        onCancel();
      }, 1500);
      
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

  const getUrgencyIcon = (value: number) => {
    if (value <= 3) return <PriorityHigh />;
    if (value <= 7) return <Schedule />;
    return <HourglassEmpty />;
  };

  const getUrgencyGradient = (value: number) => {
    if (value <= 3) return 'linear-gradient(135deg, #f093fb, #f5576c)';
    if (value <= 7) return 'linear-gradient(135deg, #ffecd2, #fcb69f)';
    return 'linear-gradient(135deg, #a8edea, #fed6e3)';
  };

  return (
    <Box className="fade-in">
      <Typography variant="h3" gutterBottom className="gradient-text" sx={{ 
        textAlign: 'center',
        mb: 4,
        fontWeight: 700
      }}>
        🔍 Request a Book
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
                placeholder="Enter the title of the book you're looking for..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
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
                value={formData.requester}
                onChange={handleChange('requester')}
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
              
              <FormControl fullWidth sx={{ mt: 4 }}>
                <FormLabel component="legend">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography className="gradient-text" sx={{ fontWeight: 600 }}>
                      Request Priority
                    </Typography>
                    <Chip
                      icon={getUrgencyIcon(formData.urgency)}
                      label={`${getUrgencyLabel(formData.urgency)} (${formData.urgency})`}
                      sx={{
                        background: getUrgencyGradient(formData.urgency),
                        color: 'white',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                  </Box>
                </FormLabel>
                <Box className="glass-card" sx={{ p: 3, borderRadius: '15px' }}>
                  <Slider
                    value={formData.urgency}
                    onChange={handleUrgencyChange}
                    min={1}
                    max={10}
                    step={1}
                    marks={[
                      { value: 1, label: '🚨 Urgent' },
                      { value: 5, label: '⏰ Normal' },
                      { value: 10, label: '😌 Can Wait' }
                    ]}
                    sx={{
                      '& .MuiSlider-thumb': {
                        background: getUrgencyGradient(formData.urgency),
                        width: 24,
                        height: 24,
                        '&:hover': {
                          boxShadow: `0 0 0 8px ${getUrgencyColor(formData.urgency)}33`,
                          transform: 'scale(1.2)',
                        }
                      },
                      '& .MuiSlider-track': {
                        background: getUrgencyGradient(formData.urgency),
                        height: 8,
                        borderRadius: '4px'
                      },
                      '& .MuiSlider-rail': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        height: 8,
                        borderRadius: '4px'
                      },
                      '& .MuiSlider-mark': {
                        background: 'rgba(255, 255, 255, 0.8)',
                        height: 12,
                        width: 3,
                        borderRadius: '2px'
                      },
                      '& .MuiSlider-markLabel': {
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: 'text.secondary'
                      }
                    }}
                  />
                  
                  <Box sx={{ mt: 2, p: 2, borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="body2" color="text.secondary">
                      💡 <strong>Tip:</strong> Higher priority requests are more likely to get quick responses!
                    </Typography>
                  </Box>
                </Box>
              </FormControl>
              
              {/* Preview Card */}
              {(formData.title || formData.requester) && (
                <Zoom in={true}>
                  <Box sx={{ mt: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom className="gradient-text">
                      📋 Request Preview
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
                        Looking for: "{formData.title || 'Book Title'}"
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Requested by: {formData.requester || 'Your Name'}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          icon={getUrgencyIcon(formData.urgency)}
                          label={getUrgencyLabel(formData.urgency)}
                          size="small"
                          sx={{
                            background: getUrgencyGradient(formData.urgency),
                            color: 'white',
                            '& .MuiChip-icon': {
                              color: 'white'
                            }
                          }}
                        />
                      </Box>
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
                  startIcon={loading ? null : <Send />}
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
                  {loading ? 'Submitting Request...' : 'Submit Request'}
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