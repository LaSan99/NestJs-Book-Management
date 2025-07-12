import { gql } from '@apollo/client'; //lets you write GraphQL queries and mutations.

export const GET_ALL_BOOKS = gql`
  query Books {
    books {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query Book($id: Int!) {
    book(id: $id) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($searchInput: SearchBooksInput!) {
    searchBooks(searchInput: $searchInput) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id)
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
    }
  }
`;