'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS, SEARCH_BOOKS } from '../graphql/queries';
import Layout from '../components/Layout';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Button,
  Chip,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  Zoom,
  Tooltip,
  CardActions,
  Divider
} from '@mui/material';
import {
  Search,
  Clear,
  LibraryBooks,
  Person,
  Category,
  CalendarToday,
  Visibility,
  Add,
  FilterList
} from '@mui/icons-material';
import Link from 'next/link';

export default function Books() {
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    genre: ''
  });

  // Use search query if any search params are set, otherwise use getAllBooks
  const useSearchQuery = searchParams.title || searchParams.author || searchParams.genre;

  const { data: allBooksData, loading: allBooksLoading, error: allBooksError } = useQuery(
    GET_ALL_BOOKS,
    { skip: useSearchQuery }
  );

  const { data: searchData, loading: searchLoading, error: searchError } = useQuery(
    SEARCH_BOOKS,
    {
      variables: {
        searchInput: {
          title: searchParams.title || undefined,
          author: searchParams.author || undefined,
          genre: searchParams.genre || undefined
        }
      },
      skip: !useSearchQuery
    }
  );

  const handleSearchChange = (field) => (event) => {
    const value = event.target.value;
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearSearch = () => {
    setSearchParams({
      title: '',
      author: '',
      genre: ''
    });
  };

  const hasActiveFilters = useSearchQuery;

  const loading = allBooksLoading || searchLoading;
  const error = allBooksError || searchError;
  const books = searchData?.searchBooks || allBooksData?.books || [];

  if (loading) {
    return (
      <Layout>
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="60vh"
          gap={2}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="textSecondary">
            Loading your library...
          </Typography>
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Fade in>
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            Error loading books: {error.message}
          </Alert>
        </Fade>
      </Layout>
    );
  }

  return (
    <Layout>
      <Fade in timeout={600}>
        <Box>
          {/* Header Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
              overflow: 'hidden',
              mb: 4
            }}
          >
            <Box sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    <LibraryBooks sx={{ mr: 2, fontSize: 'inherit' }} />
                    Book Collection
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Discover and explore {books.length} books in your library
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  component={Link}
                  href="/books/add"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  Add New Book
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Search and Filter Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3,
              background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)'
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <FilterList color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Search & Filter
              </Typography>
              {hasActiveFilters && (
                <Chip
                  label="Active Filters"
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search by title"
                  variant="outlined"
                  value={searchParams.title}
                  onChange={handleSearchChange('title')}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2,
                      backgroundColor: 'white'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search by author"
                  variant="outlined"
                  value={searchParams.author}
                  onChange={handleSearchChange('author')}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2,
                      backgroundColor: 'white'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl 
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2,
                      backgroundColor: 'white'
                    }
                  }}
                >
                  <InputLabel>Filter by Genre</InputLabel>
                  <Select
                    value={searchParams.genre}
                    label="Filter by Genre"
                    onChange={handleSearchChange('genre')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Category color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">All Genres</MenuItem>
                    <MenuItem value="Fiction">Fiction</MenuItem>
                    <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {hasActiveFilters && (
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={clearSearch}
                  sx={{ borderRadius: 2 }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Paper>

          {/* Books Grid */}
          <Grid container spacing={3}>
            {books.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Zoom in timeout={600 + index * 100}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                        <Box 
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            backgroundColor: 'primary.light',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <LibraryBooks sx={{ color: 'primary.main' }} />
                        </Box>
                        <Box flex={1}>
                          <Typography 
                            variant="h6" 
                            component="h2" 
                            gutterBottom
                            fontWeight="bold"
                            sx={{ 
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {book.title}
                          </Typography>
                          <Chip 
                            label={book.genre} 
                            size="small" 
                            color="primary"
                            sx={{ borderRadius: 1 }}
                          />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="textSecondary">
                            {book.author}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="textSecondary">
                            Published in {book.publishedYear}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        component={Link}
                        href={`/books/${book.id}`}
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<Visibility />}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {books.length === 0 && (
            <Fade in timeout={800}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <LibraryBooks sx={{ fontSize: 100, color: 'text.secondary', mb: 3 }} />
                <Typography variant="h4" gutterBottom color="textSecondary">
                  {hasActiveFilters ? 'No books match your search' : 'No books found'}
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={4}>
                  {hasActiveFilters 
                    ? 'Try adjusting your search criteria or clear the filters'
                    : 'Your library is empty. Add some books to get started!'
                  }
                </Typography>
                {hasActiveFilters ? (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Clear />}
                    onClick={clearSearch}
                    sx={{ borderRadius: 3 }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Add />}
                    component={Link}
                    href="/books/add"
                    sx={{ borderRadius: 3 }}
                  >
                    Add Your First Book
                  </Button>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Fade>
    </Layout>
  );
}