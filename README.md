# Task Management Dashboard

This project is a web application for managing daily work tasks. It allows users to sign up, log in, and manage their tasks (create, edit, and delete) with backend persistence. This project was developed as part of a technical interview, where both functionality and planning/approach were evaluated.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Planning and Approach](#planning-and-approach)
- [Future Improvements](#future-improvements)

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
- **Typescript:** For static typing and increased code safety
- **Sonner:** For implementing notifications within the application.

## Architecture

The Task Management Dashboard follows a Component-Based Architecture (CBA) combined with Modular principles. The architecture is structured to ensure scalability, maintainability, and reusability.

- The application is structured using self-contained, reusable components.
- Each view (Tasks, Login, Register) is a component, allowing for easier development and updates.
- Common UI elements (Navbar, Layout, Modal, Button) are placed in a shared directory (common/) for reusability.

## Installation

1. **Clone the repository:**

   git clone https://github.com/veronisago/taskmanager-ui.git
   cd taskmanager-ui

2. **Install dependencies**:

   npm install

3. **Configure environment variables (if needed)**:

   Create a .env file in the root of the project to set up the backend URL and any other required variables.
   VITE_API_URL=http://localhost:5000/api

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


## Future Improvements

**UI/UX Optimization:**  
Refine the design with animations and improved accessibility practices.

**CI/CD Integration:**  
Set up continuous integration and deployment (CI/CD) using tools like GitHub Actions, GitLab CI, or CircleCI.

**Enhanced Error Handling and Validation:**  
Implement form validations and more robust error handling on both the frontend and backend.

**Additional Functionalities:**  
-Add functionality to search and filter tasks by title, status, date, etc.
-Implement drag-and-drop functionality to change task status

**Automated Testing:**  
Add unit and integration tests to ensure code stability and quality.
