import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import HabitDetail from '../pages/HabitDetail';
import ProtectedRoute from '../auth/ProtectedRoute';
import { AuthProvider } from '../auth/AuthContext';

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/detail" element={<ProtectedRoute><HabitDetail /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
