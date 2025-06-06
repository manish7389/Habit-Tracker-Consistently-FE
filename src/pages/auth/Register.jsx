import { useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fisrtName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user: {
        first_name: fisrtName,
        last_name: lastName,
        email: email,
        password: password
      }
    }
    try {
      const res = await axios.post('/users/signup', payload);
      if (res?.status == 200 || 201) {
        login(res?.data?.access_token);
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
      if (error?.response?.data?.error || error?.response?.data?.errors) {
        return alert(error?.response?.data?.error ? error?.response?.data?.error : error?.response?.data?.errors[0]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Register</h2>
        <input
          type="text"
          placeholder="First name"
          className="input text-black"
          value={fisrtName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          className="input text-black"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password text-black"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-purple-600">Login</a>
        </p>
      </form>
    </div>
  );
}
