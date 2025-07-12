'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../../graphql/queries';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

const genres = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'Technology',
  'History'
];

export default function AddBook() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: new Date().getFullYear(),
    genre: ''
  });
  const [error, setError] = useState('');

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      router.push('/books');
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.title || !formData.author || !formData.genre) {
      setError('Please fill in all required fields');
      return;
    }

    const year = parseInt(formData.publishedYear);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      setError('Please enter a valid published year');
      return;
    }

    try {
      await createBook({
        variables: {
          createBookInput: {
            ...formData,
            publishedYear: parseInt(formData.publishedYear)
          }
        }
      });
    } catch (err) {
      // Error is handled by onError callback
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Book
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Published Year"
                  name="publishedYear"
                  type="number"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  required
                  inputProps={{
                    min: 1000,
                    max: new Date().getFullYear()
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    label="Genre"
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? 'Adding Book...' : 'Add Book'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
} 