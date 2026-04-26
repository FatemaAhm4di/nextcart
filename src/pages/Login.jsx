import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, name: email.split('@')[0] }));
      toast.success('Login successful!', {
        icon: <FiCheckCircle className="w-5 h-5 text-green-500" />,
        duration: 2000,
      });
      navigate('/');
    } else {
      toast.error('Please fill all fields', {
        icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#D5E7B5] dark:bg-[#1a1a2e] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8 mx-4 sm:mx-0">
        
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3A2B] dark:text-white">Welcome Back</h2>
          <p className="text-sm sm:text-base text-[#2D3A2B]/60 dark:text-gray-400 mt-1 sm:mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* Email Field */}
          <div>
            <label className="block text-[#2D3A2B] dark:text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#2D3A2B] dark:text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-[#AE2448] focus:ring-2 focus:ring-[#AE2448]/20 outline-none transition text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#AE2448] hover:bg-[#6E1A37] text-white py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 mt-2 sm:mt-3"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-[#2D3A2B]/60 dark:text-gray-400 mt-5 sm:mt-6 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#AE2448] hover:underline transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;