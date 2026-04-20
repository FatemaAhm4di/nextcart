import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // داخل handleSubmit
const handleSubmit = (e) => {
  e.preventDefault();
  if (name && email && password) {
    dispatch(register({ name, email }));
    toast.success('Registration successful!', { icon: '🎉' });
    navigate('/');
  } else {
    toast.error('Please fill all fields', { icon: '❌' });
  }
};

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2D3A2B] dark:text-white">Create Account</h2>
          <p className="text-[#2D3A2B]/60 dark:text-gray-400 mt-2">Join NexCart today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#2D3A2B] dark:text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#2D3A2B] dark:text-gray-300 mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#2D3A2B] dark:text-gray-300 mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#AE2448] hover:bg-[#6E1A37] text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-[#2D3A2B]/60 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#AE2448] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;