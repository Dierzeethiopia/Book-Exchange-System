import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Alert,
  Zoom,
  IconButton,
} from '@mui/material';
import { 
  Person, 
  PriorityHigh,
  Schedule,
  HourglassEmpty,
  ContactMail,
  Delete,
} from '@mui/icons-material';
import { BookRequest } from '../App';

interface RequestListProps {
  requests: BookRequest[];
  onRequestRemoved?: (requestId: number | undefined) => void;
}

export const RequestList: React.FC<RequestListProps> = ({ requests, onRequestRemoved }) => {
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

  const getUrgencyLabel = (value: number) => {
    if (value <= 3) return 'High Priority';
    if (value <= 7) return 'Medium Priority';
    return 'Low Priority';
  };

  const handleRemoveRequest = (requestId: number | undefined) => {
    if (onRequestRemoved && requestId) {
      onRequestRemoved(requestId);
    }
  };

  if (requests.length === 0) {
    return (
      <Box className="fade-in">
        <Typography variant="h4" gutterBottom className="gradient-text" sx={{ 
          textAlign: 'center',
          mb: 4,
          fontWeight: 700
        }}>
          📋 Book Requests ({requests.length})
        </Typography>
        <Alert severity="info" className="glass-card" sx={{ textAlign: 'center' }}>
          No book requests at the moment. Users can request books they need! 📚
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="fade-in">
      <Typography variant="h4" gutterBottom className="gradient-text" sx={{ 
        textAlign: 'center',
        mb: 4,
        fontWeight: 700
      }}>
        📋 Book Requests ({requests.length})
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: 3 
      }}>
        {requests.map((request, index) => (
          <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={request.id}>
            <Card className="glass-card hover-lift" sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'visible'
            }}>
              {/* Remove Button */}
              {onRequestRemoved && (
                <IconButton
                  onClick={() => handleRemoveRequest(request.id)}
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
                  <Delete sx={{ color: '#e91e63' }} />
                </IconButton>
              )}

              <CardContent sx={{ flexGrow: 1, pt: onRequestRemoved ? 6 : 3 }}>
                <Typography variant="h6" gutterBottom className="gradient-text" sx={{ 
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  lineHeight: 1.3
                }}>
                  🔍 "{request.title}"
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Requested by: <strong>{request.requester}</strong>
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Chip
                    icon={getUrgencyIcon(request.urgency)}
                    label={`${getUrgencyLabel(request.urgency)} (${request.urgency})`}
                    sx={{
                      background: getUrgencyGradient(request.urgency),
                      color: 'white',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'white'
                      }
                    }}
                  />
                </Box>
                
                {/* Contact Button */}
                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Card className="glass-card" sx={{ 
                    p: 2, 
                    flex: 1,
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ContactMail color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        💡 <strong>Tip:</strong> Contact {request.requester} if you have this book!
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        ))}
      </Box>
    </Box>
  );
};