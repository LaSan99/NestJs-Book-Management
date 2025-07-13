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
  DialogContentText,
  Chip,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Snackbar
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  BookOutlined,
  PersonOutline,
  CalendarToday,
  Category
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function BookDetail() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
    skip: !id || isNaN(id)
  });

  const [deleteBook, { loading: deleteLoading }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      router.push('/books');
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setIsDeleteDialogOpen(false);
    }
  });

  const handleDelete = async () => {
    try {
      await deleteBook({
        variables: { id }
      });
    } catch (err) {
      setErrorMessage(err.message);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

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
            Loading book details...
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
            Error loading book: {error.message}
          </Alert>
        </Fade>
      </Layout>
    );
  }

  if (!data?.book) {
    return (
      <Layout>
        <Fade in>
          <Box textAlign="center" py={8}>
            <BookOutlined sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="textSecondary">
              Book not found
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              The book you're looking for doesn't exist or has been removed.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<ArrowBack />}
              onClick={() => router.push('/books')}
              sx={{ borderRadius: 3 }}
            >
              Back to Books
            </Button>
          </Box>
        </Fade>
      </Layout>
    );
  }

  const book = data.book;

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
              mb: 3
            }}
          >
            <Box sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box flex={1}>
                  <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    {book.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <PersonOutline sx={{ fontSize: 20 }} />
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      by {book.author}
                    </Typography>
                  </Box>
                  <Chip 
                    label={book.genre} 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>
                
                <Box display="flex" gap={1}>
                  <Tooltip title="Back to Books">
                    <IconButton
                      onClick={() => router.push('/books')}
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                      }}
                    >
                      <ArrowBack />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Book">
                    <IconButton
                      onClick={() => router.push(`/books/edit/${id}`)}
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Book">
                    <IconButton
                      onClick={() => setIsDeleteDialogOpen(true)}
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,100,100,0.3)' }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Content Section */}
          <Grid container spacing={3}>
            {/* Book Information Card */}
            <Grid item xs={12} md={6}>
              <Zoom in timeout={800}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={3}>
                      <BookOutlined color="primary" />
                      <Typography variant="h5" fontWeight="bold">
                        Book Information
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: 'primary.light',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <PersonOutline sx={{ color: 'primary.main' }} />
                        </Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            AUTHOR
                          </Typography>
                          <Typography variant="h6" fontWeight="medium">
                            {book.author}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: 'secondary.light',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Category sx={{ color: 'secondary.main' }} />
                        </Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            GENRE
                          </Typography>
                          <Typography variant="h6" fontWeight="medium">
                            {book.genre}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: 'success.light',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <CalendarToday sx={{ color: 'success.main' }} />
                        </Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary">
                            PUBLISHED YEAR
                          </Typography>
                          <Typography variant="h6" fontWeight="medium">
                            {book.publishedYear}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            {/* Action Buttons Card */}
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1000}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                      Quick Actions
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Edit />}
                        onClick={() => router.push(`/books/edit/${id}`)}
                        sx={{ 
                          borderRadius: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1.1rem'
                        }}
                      >
                        Edit Book Details
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<ArrowBack />}
                        onClick={() => router.push('/books')}
                        sx={{ 
                          borderRadius: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1.1rem'
                        }}
                      >
                        Back to Library
                      </Button>
                      
                      <Button
                        variant="contained"
                        color="error"
                        size="large"
                        startIcon={<Delete />}
                        onClick={() => setIsDeleteDialogOpen(true)}
                        sx={{ 
                          borderRadius: 3,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          mt: 2
                        }}
                      >
                        Delete Book
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Enhanced Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Delete color="error" />
            <Typography variant="h6" fontWeight="bold">
              Delete Book
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            This action cannot be undone!
          </Alert>
          <DialogContentText sx={{ fontSize: '1.1rem' }}>
            Are you sure you want to delete <strong>"{book.title}"</strong> by {book.author}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)}
            disabled={deleteLoading}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            sx={{ borderRadius: 2 }}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Book'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
}