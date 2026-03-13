# Eventrix Project Overview

Eventrix is a comprehensive **Event Management System** designed to streamline the creation, management, and tracking of events for organizations and educational institutions.

## Technology Stack (MERN)

The project is built using the **MERN Stack**, a powerful combination of technologies for building modern web applications:

-   **M**ongoDB: A NoSQL database used to store event data, user profiles, and logs.
-   **E**xpress.js: A web application framework for Node.js that handles the backend API routes and logic.
-   **R**eact: A JavaScript library for building the dynamic and interactive user interface.
-   **N**ode.js: The JavaScript runtime environment that powers the backend server.

### Key Tools & Libraries
-   **Vite**: A fast build tool for the frontend development experience.
-   **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
-   **Axios**: For making HTTP requests from the React frontend to the Express backend.
-   **Cloudinary**: For cloud-based image management (event posters, user avatars).
-   **QR Code Integration**: `html5-qrcode` and `qrcode.react` for generating and scanning event entry codes.
-   **Data Export**: `xlsx` and `jspdf` for exporting event reports and attendee lists.

## Project Structure & Development

The project follows a clean separation of concerns between the frontend and the backend:

### 📁 Root Directory (Frontend/Client)
-   Built with **React 19** and **Vite**.
-   **`src/`**: Contains the React components, pages, contexts, and services.
-   **`package.json`**: Manages frontend dependencies and scripts.

### 📁 `server/` Directory (Backend/API)
-   Built with **Node.js** and **Express**.
-   **`index.js`**: The entry point for the backend server.
-   **`routes/`**: Defines the API endpoints for events, users, and authentication.
-   **`models/`**: Defines the Mongoose schemas for MongoDB.

## How We Develop

1.  **Environment Setup**: We use `.env` files in both the root and `server/` directories to manage configuration keys (MongoDB URI, JWT Secret, API URLs).
2.  **Running Locally**:
    -   **Backend**: Navigate to `server/` and run `npm run dev` (uses `nodemon` for auto-restart).
    -   **Frontend**: Run `npm run dev` in the root directory (uses `vite` for fast hot module replacement).
3.  **API Interaction**: The frontend communicates with the backend via a centralized API service using Axios, typically targeting `http://localhost:5001/api`.
4.  **Deployment**: Configured for deployment on platforms like Vercel (frontend) and Render (backend).

## Core Features
-   **User Roles**: Admin, Faculty, and Student roles with specific permissions.
-   **Secure Login**: Email/Password and Google OAuth integration.
-   **Event Management**: Create, edit, and delete events with rich details (title, date, venue, posters).
-   **Real-time Analytics**: Dashboard with event statistics and attendee tracking.
-   **Certification & Reports**: Automated certificate generation and data export for event organizers.
