# Task Management Dashboard

This project is a web application for managing daily work tasks. It allows users to sign up, log in, and manage their tasks (create, edit, and delete) with backend persistence. This project was developed as part of a technical interview, where both functionality and planning/approach were evaluated.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture and Project Structure](#architecture-and-project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Planning and Approach](#planning-and-approach)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **User Authentication:** Users can sign up and log in securely.
- **Task Management:** Users can create, edit, and delete tasks. Tasks are grouped by status: "To Do", "In Progress", and "Done".
- **Persistence:** Tasks are stored on the backend, ensuring data persists between sessions.
- **User Interface:** Built with React and styled with Tailwind CSS for a modern and responsive design.
- **Notifications:** Provides user feedback through notifications for actions like task deletion or error handling.

## Technologies Used

- **React:** For building the user interface.
- **React Router:** For navigating between pages (Login, Register, and Home).
- **Redux:** For managing global state (for authenticated user data).
- **Axios:** For handling HTTP requests to the backend.
- **Tailwind CSS:** For rapid and responsive styling.
- **Sonner:** For implementing notifications within the application.

## Architecture and Project Structure

The project is organized as follows:

/src
 ├── components
 │   ├── home
 │   │   └── Home.tsx          // Task management and display
 │   ├── login
 │   │   └── Login.tsx         // Login form
 │   └── register
 │       └── Register.tsx      // Registration form
 ├── common
 │   ├── Navbar.tsx            // Navigation bar component
 │   └── Button.tsx            // Reusable button component
 ├── services
 │   └── axios.ts              // Axios configuration for HTTP requests
 ├── store
 │   ├── authSlice.ts          // Authentication slice for Redux
 │   └── store.ts              // Redux store configuration
 └── utils
     └── ProtectedRoute.tsx    // Protected route component for route guarding

## Installation

1. **Clone the repository:**

   git clone https://github.com/your_username/your_repository.git
   cd your_repository

2. **Install dependencies**:

   npm install

3. **Configure environment variables (if needed)**:

   Create a .env file in the root of the project to set up the backend URL and any other required variables.

4. **Run the application**:

   npm run dev
  The application will run at http://localhost:5173

## Usage

**Sign Up and Login:**  
Users can register or log in from the corresponding pages. Once authenticated, they are redirected to the main task management dashboard.

**Task Management:**  
On the home screen, tasks are displayed grouped by status. Users can:
- Create a new task by clicking the "New Task" button.
- Edit an existing task.
- Delete tasks.

**Persistence:**  
All operations communicate with the backend via HTTP requests, ensuring tasks remain saved between sessions.

## API Endpoints

The application connects to a backend with the following endpoints (example):

**Authentication:**
- `POST /auth/login`: Log in.
- `POST /auth/register`: Register a new user.

**Tasks:**
- `GET /tasks`: Retrieve all tasks for the user.
- `POST /tasks`: Create a new task.
- `PUT /tasks/{id}`: Update an existing task.
- `DELETE /tasks/{id}`: Delete a task.

> **Note:** The backend is expected to handle authentication using tokens, which are stored in `localStorage` to maintain the user session.

## Planning and Approach

The development of the Task Management Dashboard was based on the following steps:

**Requirement Definition:**  
Analyzed the key needs: authentication, task management, and data persistence. This planning phase included defining the necessary backend endpoints and the data structure for tasks.

**Architectural Design:**  
Chose to use React with Redux for global state management, and Axios for HTTP communication with the backend. The routing was clearly structured using React Router, including protected routes for authenticated users.

**Iterative Development:**  
Implemented core functionalities in a modular fashion:
- **Authentication:** Login and registration pages with protected routes.
- **Task Management:** Creating, editing, and deleting tasks with API communication.
- **User Interface:** A responsive design with notifications for better user experience.

**Testing and Validation:**  
Conducted tests to ensure proper backend communication, data integrity, and an optimal user experience across various devices.

## Future Improvements

**UI/UX Optimization:**  
Refine the design with animations and improved accessibility practices.

**Enhanced Error Handling and Validation:**  
Implement form validations and more robust error handling on both the frontend and backend.

**WebSockets Integration:**  
Enable real-time notifications and instant task synchronization across multiple sessions.

**Automated Testing:**  
Add unit and integration tests to ensure code stability and quality.
