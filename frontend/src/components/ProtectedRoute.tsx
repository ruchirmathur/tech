import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = useSelector((s: RootState) => s.auth);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
