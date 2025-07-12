'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK_BY_ID, DELETE_BOOK } from '../../graphql/queries';
import Layout from '../../components/Layout';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
    skip: !id || isNaN(id)
  });

  const [deleteBook, { loading: deleteLoading }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      router.push('/books');
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
    }
  });

  const handleDelete = async () => {
    try {
      await deleteBook({
        variables: { id }
      });
    } catch (err) {
      // Error is handled by onError callback
    }
  };

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
        <Alert severity="error">Error loading book: {error.message}</Alert>
      </Layout>
    );
  }

  if (!data?.book) {
    return (
      <Layout>
        <Alert severity="info">Book not found</Alert>
        <Box mt={2}>
          <Button variant="contained" onClick={() => router.push('/books')}>
            Back to Books
          </Button>
        </Box>
      </Layout>
    );
  }

  const book = data.book;

  return (
    <Layout>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" component="h1" gutterBottom>
                {book.title}
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/books')}
                >
                  Back to Books
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/books/edit/${id}`)}
                >
                  Edit Book
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete Book
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              by {book.author}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Book Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Genre:</strong> {book.genre}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Published Year:</strong> {book.publishedYear}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{book.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)}
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 