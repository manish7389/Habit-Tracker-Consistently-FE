# React + Vite

# Habit Tracker Frontend
  React frontend for Habit Tracker app built with Vite, React 19, Tailwind CSS, and Axios to interact with the Rails backend API.
# Project Overview
  * This React application provides a user-friendly dashboard for managing habits. Users can:
  * View their existing habits
  * Create new habits
  * Update existing habits
  * Delete habits
  * The app communicates with a backend Rails API (assumed to be running separately).

# System Requirements & Versions
  * Node.js >= 18.x (preferably latest LTS)
  * npm >= 9.x or yarn >= 1.x
  * React 19.1.0
  * Vite 6.3.5
  * TailwindCSS 4.1.8
  * Axios 1.9.0

Setup & Installation
  1. Clone the repository
    git clone <repository-url>
    cd habit-tracker-frontend

  2. Install dependencies
    npm install or yarn install

  Available Scripts
    In the project directory, you can run:
      npm run dev or yarn dev
Runs the app in development mode.
  Open http://localhost:5173 to view it in your browser.

Features
  * Dashboard View: See a list of all your habits fetched from the backend API.
  * Create Habit: Modal form to create new habits (name + description).
  * Update Habit: Edit existing habits in a modal.
  * Delete Habit: Delete habits with confirmation prompt.
  * API Integration: Axios configured to communicate with the Rails API backend.
  * State Management: React useState and useEffect for managing UI state and data fetching.
  * Responsive UI: Layout adapts with Tailwind CSS grid and utility classes.
  * Modal Handling: Show/hide modal for create/update habit with form validation.

Usage
  * Make sure your backend Rails API is running and accessible.
  * Update the API base URL in src/api/axios.js if needed:

      import axios from "axios";
      const instance = axios.create({
        baseURL: "http://localhost:3000/api", // Change to your backend URL
        withCredentials: true,
      });
      export default instance;

  * Start the frontend development server:
    npm run dev
    # or
    yarn dev
  * Open your browser at http://localhost:5173 and start managing your habits!

# Contact
  If you have any questions or issues, please contact:

# Your Name
  Email: manish.ahir071997@gmail.com

