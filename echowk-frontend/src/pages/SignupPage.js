import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const { name, email, password } = formData;
      const response = await signupUser({ name, email, password });
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Failed to create account. The email might already be in use.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center items-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* --- BACKGROUND SHAPES --- */}
      <div className="absolute w-96 h-96 bg-emerald-200 rounded-full -top-20 -left-20 filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-200 rounded-full -bottom-20 -right-10 filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-gray-300 rounded-full -bottom-40 left-20 filter blur-3xl opacity-30 animate-pulse"></div>

      {/* --- SIGNUP FORM CONTAINER --- */}
      <div className="relative z-10 max-w-md w-full mx-auto">
        <div className="text-center font-bold text-3xl text-gray-800">
          Create Your Account
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 mt-6 mb-4 rounded-2xl shadow-lg w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name Input with Icon */}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="John Doe" />
              </div>
            </div>

            {/* Email Input with Icon */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="password" id="password" value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
              </div>
            </div>

            {/* Confirm Password Input with Icon */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <button type="submit" className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all">
              Create Account
            </button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;