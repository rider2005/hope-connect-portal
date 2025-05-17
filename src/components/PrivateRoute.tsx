
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

interface PrivateRouteProps {
  allowedRoles?: ('donor' | 'hospital')[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are specified, check if user has the required role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = currentUser?.type;
    if (!userRole || !allowedRoles.includes(userRole as 'donor' | 'hospital')) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
