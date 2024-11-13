import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store' // Ensure the correct path to your RootState

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.authorization);
  

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.authorization);

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
