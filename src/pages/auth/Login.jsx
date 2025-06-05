import { useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('/users/login', { email, password });
    console.log('res',res);

    if(res?.status == 200){
        login(res?.data?.access_token);
        navigate('/');
    } 
    } catch (error) {
        console.log('error',error);
        if(error?.response?.data?.error){
            return alert(error?.response?.data?.error);
        }   
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Sign In
        </button>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-indigo-600">Register</a>
        </p>
      </form>
    </div>
  );
}
