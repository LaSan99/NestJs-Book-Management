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
} from '@mui/material';
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

  const loading = allBooksLoading || searchLoading;
  const error = allBooksError || searchError;
  const books = searchData?.searchBooks || allBooksData?.books || [];

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error">Error loading books: {error.message}</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Book Collection
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search by title"
              variant="outlined"
              value={searchParams.title}
              onChange={handleSearchChange('title')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search by author"
              variant="outlined"
              value={searchParams.author}
              onChange={handleSearchChange('author')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Genre</InputLabel>
              <Select
                value={searchParams.genre}
                label="Filter by Genre"
                onChange={handleSearchChange('genre')}
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
      </Box>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {book.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Published: {book.publishedYear}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Genre: {book.genre}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  component={Link}
                  href={`/books/${book.id}`}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {books.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No books found
          </Typography>
        </Box>
      )}
    </Layout>
  );
} 