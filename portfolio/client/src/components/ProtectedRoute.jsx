import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap a page with this and only a logged-in admin can see it
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}
