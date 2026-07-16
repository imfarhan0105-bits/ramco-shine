import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './components/auth/LoginPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import TrackerPage from './pages/TrackerPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Route>
          
          {/* Default redirect to /home, which will redirect to /login if not authenticated */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
