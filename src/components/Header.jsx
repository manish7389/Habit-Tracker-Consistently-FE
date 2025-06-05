import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Consistently</h1>
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
