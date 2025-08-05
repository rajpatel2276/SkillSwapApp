import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

// --- Icon components are included directly in the file ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.4c0-13.4 1-26.5 2.8-39.3h241.2v72.5H145.4c11.8 47.7 55.2 82.3 104.1 82.3 62.3 0 112.5-43.2 128.5-101.4h74.2c-20.9 66.8-89.8 115.7-168.3 115.7-94.2 0-170.9-76.7-170.9-170.9S150.7 94.5 244.9 94.5c49.1 0 91.8 19.4 123.4 49.9l62.2-62.2C387.2 29.8 322.8 0 244.9 0 109.8 0 0 120.2 0 261.8c0 8.3.4 16.5 1.2 24.5h243.7c.3-8.8.5-17.5.5-26.5z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const credentials = { email, password };
      // This is the call to your backend
      const response = await loginUser(credentials);
      
      // --- THIS IS THE NEW PART ---
      // After a successful API call, call the context login function.
      // In a real app, response.data would have user info and a token.
      // We will mock it for now.
      login({ name: 'Alex Ray', email: email, token: response.data.token }); 
      
      navigate('/dashboard'); // Redirect to the dashboard

    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };
  

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-center items-center overflow-hidden">
      
      {/* --- BACKGROUND SHAPES --- */}
      <div className="absolute w-96 h-96 bg-emerald-200 rounded-full -top-20 -left-20 filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-200 rounded-full -bottom-20 -right-10 filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-gray-300 rounded-full -bottom-40 left-20 filter blur-3xl opacity-30 animate-pulse"></div>

      {/* --- LOGIN FORM CONTAINER --- */}
      <div className="relative z-10 max-w-md w-full mx-auto">
        <div className="text-center font-bold text-3xl text-gray-800">
          Sign in to SkillSwap
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-8 mt-6 mb-4 rounded-2xl shadow-lg w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input with Icon */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="you@example.com" />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">Password</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                  </div>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="••••••••" />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button type="submit" className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all">
                Sign In
            </button>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <GoogleIcon />
                    <span className="ml-2">Google</span>
                </button>
                <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <GithubIcon />
                     <span className="ml-2">GitHub</span>
                </button>
            </div>
          </form>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;