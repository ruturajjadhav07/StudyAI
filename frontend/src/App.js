import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Landing from './pages/static/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/app/Dashboard';
import Upload from './pages/app/Upload';
import Study from './pages/app/Study';
import Quiz from './pages/app/Quiz';
import Results from './pages/app/Results';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PrivacyPolicy from './pages/static/PrivacyPolicy';
import TermsOfService from './pages/static/TermsOfService';
import FAQs from './pages/static/FAQ\'s';

// Route guard

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const HomeRoute = () => {
  const { user } = useAuth();
  return (user && user.token) ? <Navigate to="/dashboard" replace /> : <Landing />;
};

// App
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
          <Route path="/study/:id" element={<PrivateRoute><Study /></PrivateRoute>} />
          <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path='/FAQs' element={< FAQs />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;