# Book Management System

A full-stack book management application built with NestJS (GraphQL API) and Next.js (Frontend).

## Project Overview

This project consists of two main parts:
- A backend API built with NestJS and GraphQL
- A frontend application built with Next.js and Material-UI

### Features

- User authentication (register/login)
- Book management (CRUD operations)
- Book search and filtering
- Protected routes with JWT authentication
- Modern and responsive UI with Material-UI
- GraphQL API with type safety

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Project Structure

```
NestJs-Book-Management/
├── nestjs-graphql-js-app/    # Backend API
└── nextjs-graphql-frontend/  # Frontend Application
```

### Backend Setup (NestJS GraphQL API)

1. Navigate to the backend directory:
```bash
cd nestjs-graphql-js-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001/graphql`

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
```bash
cd nextjs-graphql-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Backend API (NestJS)

### Key Features

- GraphQL API with code-first approach
- JWT-based authentication
- Book management operations
- Input validation
- Error handling
- Unit and E2E tests

### Available Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:cov    # Test coverage
```

## Frontend Application (Next.js)

### Key Features

- Modern UI with Material-UI components
- Responsive design
- Apollo Client for GraphQL integration
- JWT authentication
- Protected routes
- Book search and filtering
- Form validation

### Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header.

### User Flow

1. Register a new account
2. Login to receive a JWT token
3. Token is automatically included in subsequent API requests
4. Protected routes/operations require valid token

## API Endpoints

The GraphQL API provides the following operations:

### Queries
- `books`: Get all books
- `book(id: Int!)`: Get a specific book
- `searchBooks(searchInput: SearchBooksInput!)`: Search books by title, author, or genre

### Mutations
- `createBook(createBookInput: CreateBookInput!)`: Create a new book
- `updateBook(updateBookInput: UpdateBookInput!)`: Update an existing book
- `removeBook(id: Int!)`: Delete a book
- `register(username: String!, password: String!)`: Register a new user
- `login(username: String!, password: String!)`: Login and receive JWT token

## Technologies Used

### Backend
- NestJS
- GraphQL
- Apollo Server
- JWT Authentication
- Jest (Testing)

### Frontend
- Next.js
- Apollo Client
- Material-UI
- TailwindCSS
- React Hooks

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. Run linting:

```bash
# Backend
cd nestjs-graphql-js-app
npm run lint

# Frontend
cd nextjs-graphql-frontend
npm run lint
```

### Testing

The backend includes both unit and E2E tests:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License.
