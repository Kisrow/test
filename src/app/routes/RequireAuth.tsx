import { Navigate } from 'react-router-dom';
import { getToken } from '../../shared/auth/storage';
import type { PropsWithChildren } from 'react';

export function RequireAuth({ children }: PropsWithChildren) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}