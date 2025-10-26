# Mangoflow Frontend

A responsive frontend for the **Mangoflow (USOF)** forum, a StackOverflow-like website. Built with **React** and utilizes **React Hooks** and the **Context API** for state management. It connects to the Usof Backend API.

This project was built as part of the Innovation Campus "Usof frontend" challenge.

---

## Features

-   **Full User Authentication**: Registration, Login, and Logout forms with validation.
-   **Responsive Design**: Adapts to mobile, tablet, and desktop screens.
-   [cite_start]**Main Page**: View all recent posts with advanced sorting and filtering[cite: 132, 133].
-   **Post Management**: Create, update, and delete posts (for authorized users).
-   [cite_start]**User Profiles**: View a user's posts and edit personal data[cite: 131, 134, 137].
-   [cite_start]**Interactive Comments**: Supports nested comments (commenting on comments) and sorts comments by likes[cite: 148, 149].
-   [cite_start]**Pagination**: Efficiently browse posts through pagination or endless scrolling[cite: 142].
-   [cite_start]**Creative Features**: Includes a social media "Share" button, a site statistics page, and a global footer[cite: 178, 179].
-   [cite_start]**Global Search**: A header search bar for fast navigation[cite: 122].
-   **Admin Panel**: Uses **AdminJS** for full administrative control over users, posts, and comments.

---

## Requirements

-   [Node.js](https://nodejs.org/) v20+
-   `npm` (comes with Node.js)
-   A running instance of the **Usof Backend API**.

---

## Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/mangoflow-frontend.git](https://github.com/your-username/mangoflow-frontend.git)
    cd mangoflow-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create an environment file. This file tells your React app where to find the backend API.
    ```bash
    # This creates a .env file and adds the API URL
    # Assumes the admin/API is running on http://localhost:8080
    echo "VITE_API_URL=http://localhost:8080/api" > .env
    ```
    *Note: The `VITE_` prefix is required by Vite. If your backend API is on a different port, update the `.env` file.*

---

## How to Run

1.  **Start the React App (Development Mode)**:
    ```bash
    npm run dev
    ```
    The frontend will be available at:
    `http://localhost:5173`

2.  **Access the Admin Panel**:
    The AdminJS panel is served by your **backend** server.
    It will be available at:
    `http://localhost:8080` (or your configured admin URL)
