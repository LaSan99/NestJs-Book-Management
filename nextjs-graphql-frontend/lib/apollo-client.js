// lib/apollo-client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Create the base HTTP link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

// Add authentication headers to requests
const authLink = setContext((_, { headers }) => { //modify the request before it's sent.
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; //checks if you're in the browser
  return {
    headers: {
      ...headers, //spread operator to include existing headers
      authorization: token ? `Bearer ${token}` : '', //adds the token to the authorization header if it exists
    }
  };
});

// Handle errors (including auth errors)
const errorLink = onError(({ graphQLErrors }) => { //It catches errors that happen during GraphQL requests.
  if (graphQLErrors?.some(error => error.message.includes('Unauthorized'))) { //This checks if any of the GraphQL errors have a message that says "Unauthorized"
    if (typeof window !== 'undefined') { // checks if the code is running in the browser.
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
});

// Create and configure the Apollo Client
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)), //combines the error link, auth link, and HTTP link
  cache: new InMemoryCache(), //sets up the cache for Apollo Client
  defaultOptions: {
    // Prefer network requests over cache to ensure fresh data
    watchQuery: {
      fetchPolicy: 'network-only', // Ensures that queries always fetch fresh data from the server
    },
    query: {
      fetchPolicy: 'network-only', 
    },
  },
});

export default client;