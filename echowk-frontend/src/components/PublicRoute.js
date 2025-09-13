import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // If the user is authenticated, redirect them from the login/signup page
    // to their dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;