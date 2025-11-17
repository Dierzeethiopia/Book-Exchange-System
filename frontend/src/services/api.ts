import axios from 'axios';
import { Book, BookRequest } from '../App';

// Configure base URL for your Java backend
// Update this URL when you create your REST API endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Add a new book
  addBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
      const response = await api.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  // Get a book by ID
  getBookById: async (id: number): Promise<Book> => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  },

  // Search books by title or course code
  searchBooks: async (query: string): Promise<Book[]> => {
    try {
      const response = await api.get(`/books/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  // Delete a book
  deleteBook: async (id: number): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },
};

export const requestService = {
  // Get all requests
  getAllRequests: async (): Promise<BookRequest[]> => {
    try {
      const response = await api.get('/requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
  },

  // Add a new request
  addRequest: async (request: Omit<BookRequest, 'id'>): Promise<BookRequest> => {
    try {
      const response = await api.post('/requests', request);
      return response.data;
    } catch (error) {
      console.error('Error adding request:', error);
      throw error;
    }
  },

  // Process all requests (match with available books)
  processRequests: async (): Promise<string[]> => {
    try {
      const response = await api.post('/requests/process');
      return response.data;
    } catch (error) {
      console.error('Error processing requests:', error);
      throw error;
    }
  },

  // Delete a request
  deleteRequest: async (id: number): Promise<void> => {
    try {
      await api.delete(`/requests/${id}`);
    } catch (error) {
      console.error('Error deleting request:', error);
      throw error;
    }
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data || 'Server error occurred';
    return typeof message === 'string' ? message : 'An error occurred';
  } else if (error.request) {
    // Network error
    return 'Unable to connect to server. Please check your connection.';
  } else {
    // Other error
    return 'An unexpected error occurred';
  }
};

export default { bookService, requestService, handleApiError };