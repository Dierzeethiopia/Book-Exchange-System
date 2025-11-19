import React from 'react';
import { ButtonGroup, Button, Badge, Chip } from '@mui/material';
import { LibraryBooks, Add, RequestPage, List } from '@mui/icons-material';

interface NavigationProps {
  currentView: 'books' | 'add' | 'request' | 'requests';
  onViewChange: (view: 'books' | 'add' | 'request' | 'requests') => void;
  bookCount: number;
  requestCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onViewChange, 
  bookCount, 
  requestCount 
}) => {
  return (
    <ButtonGroup 
      variant="contained" 
      size="large" 
      fullWidth
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        '& .MuiButton-root': {
          border: 'none',
          background: 'transparent',
          color: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
        '& .MuiButton-root.active': {
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
          color: 'white',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
        }
      }}
    >
      <Button
        startIcon={<LibraryBooks />}
        className={currentView === 'books' ? 'active' : ''}
        onClick={() => onViewChange('books')}
        sx={{ position: 'relative' }}
      >
        View Books
        {bookCount > 0 && (
          <Chip 
            label={bookCount} 
            size="small" 
            sx={{ 
              ml: 1, 
              height: 20, 
              fontSize: '0.7rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white'
            }} 
          />
        )}
      </Button>
      <Button
        startIcon={<Add />}
        className={currentView === 'add' ? 'active' : ''}
        onClick={() => onViewChange('add')}
      >
        Add Book
      </Button>
      <Button
        startIcon={<RequestPage />}
        className={currentView === 'request' ? 'active' : ''}
        onClick={() => onViewChange('request')}
      >
        Request Book
      </Button>
      <Button
        startIcon={<List />}
        className={currentView === 'requests' ? 'active' : ''}
        onClick={() => onViewChange('requests')}
        sx={{ position: 'relative' }}
      >
        View Requests
        {requestCount > 0 && (
          <Chip 
            label={requestCount} 
            size="small" 
            sx={{ 
              ml: 1, 
              height: 20, 
              fontSize: '0.7rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white'
            }} 
          />
        )}
      </Button>
    </ButtonGroup>
  );
};