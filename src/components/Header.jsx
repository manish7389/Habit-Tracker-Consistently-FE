import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom'; 

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-700 hover:underline">
          Consistently
        </Link>
        <button
          onClick={logout}
          className="bg-red-500  px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
