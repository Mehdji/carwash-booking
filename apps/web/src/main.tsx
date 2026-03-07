
/**
 * Main entry point for the React application.
 * 
 * Sets up the root React application with:
 * - StrictMode for development error highlighting
 * - React Router for client-side navigation and routing
 * 
 * Mounts the application to the DOM element with id "root".
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { RouterProvider, } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

