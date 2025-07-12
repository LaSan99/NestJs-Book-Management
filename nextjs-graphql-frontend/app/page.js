'use client';

import { Typography, Paper, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { LibraryBooks, PersonAdd, Login, Search } from '@mui/icons-material';
import Layout from './components/Layout';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Browse Books',
      description: 'Explore our collection of books with detailed information about each title.',
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      link: '/books'
    },
    {
      title: 'Search Functionality',
      description: 'Search books by title, author, or genre to find exactly what you\'re looking for.',
      icon: <Search sx={{ fontSize: 40 }} />,
      link: '/books'
    },
    {
      title: 'User Registration',
      description: 'Create an account to manage books and access additional features.',
      icon: <PersonAdd sx={{ fontSize: 40 }} />,
      link: '/register'
    },
    {
      title: 'User Login',
      description: 'Sign in to your account to manage your book collection.',
      icon: <Login sx={{ fontSize: 40 }} />,
      link: '/login'
    }
  ];

  return (
    <Layout>
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', mb: 4, bgcolor: 'transparent' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Book Management
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Your personal library management system. Browse, search, and manage your book collection with ease.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {feature.icon}
                <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link} 
                  href={feature.link} 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}