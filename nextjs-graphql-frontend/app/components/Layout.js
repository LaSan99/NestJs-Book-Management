'use client';

import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); //Lets you get the current URL path
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert token to boolean (true if exists, false if not)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  // Don't show navigation on login and register pages
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <Container sx={{ mt: 4 }}>{children}</Container>;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Book Management
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="/books">
            Books
          </Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} href="/books/add">
                Add Book
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
} 