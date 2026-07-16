# 5S Portal

5S Portal is a web application built for Ramco Steels to share the 5S journey in a simple and clear way. It brings together the key parts of the program in one place so teams can understand the message, see leadership structure, track monthly progress, and view improvement stories.

This project was completed as an internship project during an 8-week internship with Ramco Steels Pvt. Ltd., Faridabad.

## What this project does

This app gives users a friendly way to explore the 5S culture across the workplace. The main sections include:

- A home page that explains the 5S message and key ideas
- A team page that shows leadership and zone leader information
- A tracker page for monitoring monthly 5S audit sheets
- A gallery page for showcasing improvement and recognition activities
- A sign-in experience powered by Firebase authentication

## Tech stack

The project is built with a modern front-end setup:

- React for the user interface
- Vite for fast local development and build steps
- React Router for page navigation
- Firebase for authentication, database access, and file storage
- Lucide icons and other small UI helpers for a cleaner experience

## Getting started

Make sure you have Node.js and npm installed on your machine.

1. Open the project folder in your terminal.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in the terminal in your browser.

## Useful scripts

- `npm run dev` starts the app locally
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` checks the code for common issues

## Project structure

A quick look at the main folders:

- `src/pages` contains the main pages such as Home, Team, Tracker, and Gallery
- `src/components` contains the UI sections and reusable parts
- `src/context` contains the authentication context
- `src/data` contains sample data used by the app
- `src/firebase` contains the Firebase configuration
- `src/utils` contains helper functions

## Firebase setup

If you want to connect the app to your own Firebase project, update the configuration in `src/firebase/config.js` with your own project settings. Keep private keys and secret values out of version control.

## Notes

Some parts of the app can still work with sample data if Firebase is not configured yet. This makes it easier to develop and test the interface before full backend connection.
