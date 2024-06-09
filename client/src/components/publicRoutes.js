import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.js';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;