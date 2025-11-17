import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { LibraryBooks, Add, RequestPage } from '@mui/icons-material';

interface NavigationProps {
  currentView: 'books' | 'add' | 'request';
  onViewChange: (view: 'books' | 'add' | 'request') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <ButtonGroup variant="contained" size="large" fullWidth>
      <Button
        startIcon={<LibraryBooks />}
        variant={currentView === 'books' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('books')}
      >
        View Books
      </Button>
      <Button
        startIcon={<Add />}
        variant={currentView === 'add' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('add')}
      >
        Add Book
      </Button>
      <Button
        startIcon={<RequestPage />}
        variant={currentView === 'request' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('request')}
      >
        Request Book
      </Button>
    </ButtonGroup>
  );
};