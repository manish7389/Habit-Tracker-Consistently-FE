import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-10">Loading...</div>; 

  return user?.token ? children : <Navigate to="/login" />;
}
