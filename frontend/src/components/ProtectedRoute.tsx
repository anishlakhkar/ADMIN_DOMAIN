import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // if (!authService.isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }
  return <>{children}</>;
}

