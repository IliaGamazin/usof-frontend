# Mangoflow API Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Routing](#routing)
- [Key Features & Functionality](#key-features--functionality)
- [State Management](#state-management)
- [API Communication](#api-communication)
- [Key Component Breakdown](#key-component-breakdown)
- [Error Handling & Validation](#error-handling--validation)

## Overview

Mangoflow is a responsive RESTful frontend client for the USOF (User Stack Overflow-like Forum) API. It provides a complete, user-friendly interface for all platform features, including user registration, post creation, nested commenting, and a user rating system.

The application is built entirely with **React**, using modern hooks and patterns for state management and side effects. It consumes the `usof_backend` API to display and manage all data.

### Core Technologies
-   **Library**: React (v18+)
-   **State Management**: React Hooks (`useState`, `useReducer`, `useContext`)
-   **Routing**: React Router (`react-router-dom`)
-   **API Client**: Axios or a custom `fetch` wrapper
-   **Styling**: CSS Modules, Styled-Components, or utility-first CSS.
-   **Build Tool**: Vite

## Architecture & Folder Structure

The frontend follows a component-based architecture, organized for scalability and separation of concerns.

-   `/src`
    -   `/pages`: Top-level components that correspond to a route (e.g., `HomePage.jsx`, `ProfilePage.jsx`, `PostDetailPage.jsx`). These components are responsible for fetching page-level data and arranging layout.
    -   `/components`: Reusable, "dumb" UI elements (e.g., `Button.jsx`, `PostPreview.jsx`, `Header.jsx`). They receive data and functions as props.
    -   `/contexts`: Holds all React Context providers (e.g., `AuthContext.jsx`). This is the primary mechanism for sharing global state.
    -   `/hooks`: Contains custom hooks that encapsulate reusable logic (e.g., `useAuth.js` to consume `AuthContext`, `useApi.js` for data fetching).
    -   `/services`: Contains all API communication logic. This layer abstracts all `fetch` or `axios` calls (e.g., `authService.js`, `postService.js`).
    -   `/styles`: Global styles, CSS variables, and resets.
    -   `/utils`: Helper functions (e.g., date formatting).
    -   `App.jsx`: Main application component, sets up the Router and global Context providers.
    -   `main.jsx`: The application entry point (Vite).

## Routing

Client-side routing is managed by `react-router-dom`.

-   **`BrowserRouter`**: Wraps the entire `App` component.
-   **`Routes` / `Route`**: Defined in `App.jsx` to map URL paths to their corresponding page components.
-   **Protected Routes**: A custom component (e.g., `<ProtectedRoute>`) is used to wrap routes that require authentication. This component checks the `AuthContext` and redirects to `/login` if the user is not authenticated.
-   **Dynamic Routes**: Paths like `/post/:postId` and `/user/:userId` are used to render detailed pages based on a URL parameter. The `useParams()` hook is used within these page components to retrieve the ID.

## Key Features & Functionality

### 1. Authentication Flow
-   A user fills the `/login` form. On submit, the `AuthService.login(email, password)` function is called.
-   This service sends a `POST` request to the `/api/auth/login` endpoint.
-   On success (200), the API returns a JWT.
-   The token is stored in `localStorage`.
-   The global `AuthContext` state is updated with the user's data and `isAuthenticated: true`.
-   The user is programmatically redirected (using `useNavigate`) to their profile or the main page.
-   Logout clears `localStorage` and the `AuthContext` state.

### 2. Post & Comment System
-   **Nested Comments**: The `CommentList.jsx` component maps over the root comments. Each comment then renders a `Comment.jsx` component. [cite_start]The `Comment.jsx` component *recursively* renders another `<CommentList>` for its own replies (`comment.children`), allowing for infinite nesting depth[cite: 147, 148].
-   [cite_start]**Post Creation/Editing**: Uses a rich text editor like **TinyMCE** for the `content` field[cite: 169].
-   [cite_start]**Sorting**: Comment sorting by likes is handled by the API (default)[cite: 149]. [cite_start]Post sorting on the main page is handled by passing query parameters (e.g., `?sort=date&order=desc`) to the API via the `postService`[cite: 133].

### 3. Responsiveness
-   [cite_start]The application is fully responsive and displays correctly on mobile, tablet, and desktop screens[cite: 84]. [cite_start]This is achieved using CSS media queries and a flexible layout (e.g., Flexbox, CSS Grid)[cite: 168].

### 4. Admin Panel
-   The **AdminJS** panel is not part of the React application's codebase. It is a separate interface served by the **backend** on `localhost:8080`, providing a GUI for direct database manipulation.

## State Management

State is managed using React's built-in hooks, avoiding external libraries.

-   **Local State (`useState`)**: Used for component-level state, such as form inputs, toggles (e.g., "is sidebar open"), and loading status within a component.
-   **Global State (`useContext`)**: Used for data that needs to be shared across the entire application.
    -   `AuthContext`: Stores the current user, authentication status (`isAuthenticated`), and the JWT. This allows any component (like the `Header`) to read the user's state and any service file to read the token for API calls.
-   **Complex State (`useReducer`)**: Used for complex state logic within a single page, such as managing the multiple filters and sorting parameters on the main feed. This provides a more robust alternative to `useState` for state that has many dependent fields.

## API Communication

A dedicated service layer handles all HTTP requests.

-   **Centralized Client**: A single `api.js` file configures a `fetch` wrapper or an `axios` instance.
-   **Base URL**: The instance is configured with `baseURL: import.meta.env.VITE_API_URL`.
-   **Auth Interceptor**: The client is configured to automatically add the `Authorization` header to all outgoing requests. It does this by reading the token from `localStorage` *before* the request is sent.
-   **Service Files**: Logic is split by resource.
    -   `postService.js`: Exports functions like `getAllPosts(params)`, `getPostById(id)`, `createPost(formData)`.
    -   `authService.js`: Exports `login(creds)`, `register(data)`, `logout()`.
    -   `commentService.js`: Exports `postComment(postId, content)`.

## Key Component Breakdown

-   **`Header.jsx`**
    -   **State**: `isMenuOpen` (for mobile).
    -   **Context**: Consumes `AuthContext` to display user info or "Login" button.
    -   **Props**: None.
    -   [cite_start]**Logic**: Renders user's login, avatar, and role[cite: 123]. [cite_start]Avatar links to profile[cite: 127]. [cite_start]Includes search bar [cite: 122] [cite_start]and logout button[cite: 128].

-   **`HomePage.jsx`**
    -   **State**: `posts`, `loading`, `error`, `pagination` (current page), `filters` (sort, category).
    -   **Logic**: Uses `useEffect` to call `postService.getAllPosts(filters)` on mount and when `filters` or `pagination` state changes. Renders `<PostPreview>` components for each post.

-   **`PostPreview.jsx`**
    -   **Props**: `post` (object containing post data: title, author, date, etc.).
    -   [cite_start]**Logic**: A "dumb" component that renders the data it's given[cite: 145, 146]. Links to `/post/:post.id`.

-   **`PostDetailPage.jsx`**
    -   **State**: `post`, `comments`, `loading`, `error`.
    -   **Logic**: Uses `useParams` to get `postId`. `useEffect` fetches both `postService.getPostById(postId)` and `commentService.getCommentsForPost(postId)`. Renders the full post and the `<CommentList>` component.

-   **`Comment.jsx`**
    -   **Props**: `comment` (object).
    -   **Logic**: Renders the comment's content, author, and likes. [cite_start]**Crucially, it renders a `<CommentList>` component, passing `comment.replies` as a prop**, enabling recursive nesting[cite: 148].

## Error Handling & Validation

-   **Client-Side Validation**: Forms use `useState` to control inputs. On submit, validation functions are run *before* the API call. [cite_start]Errors are stored in state and displayed as messages next to the input fields[cite: 83].
-   **API Error Handling**: All `service` functions use `try...catch` blocks. If an API call fails, the `catch` block processes the error. The custom `useApi` hook or page-level component will store this error in its `error` state, which is then rendered to the user (e.g., "A network error occurred" or "Invalid login").