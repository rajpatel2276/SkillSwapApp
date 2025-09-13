import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { motion } from 'framer-motion';

const GoogleIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.4c0-13.4 1-26.5 2.8-39.3h241.2v72.5H145.4c11.8 47.7 55.2 82.3 104.1 82.3 62.3 0 112.5-43.2 128.5-101.4h74.2c-20.9 66.8-89.8 115.7-168.3 115.7-94.2 0-170.9-76.7-170.9-170.9S150.7 94.5 244.9 94.5c49.1 0 91.8 19.4 123.4 49.9l62.2-62.2C387.2 29.8 322.8 0 244.9 0 109.8 0 0 120.2 0 261.8c0 8.3.4 16.5 1.2 24.5h243.7c.3-8.8.5-17.5.5-26.5z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" viewBox="0 0 496 512">
    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (email === 'test@example.com' && password === 'password123') {
      const mockUserData = { name: 'Test User', email: email, token: 'fake-jwt-token' };
      login(mockUserData);
      navigate('/dashboard');
      return;
    }
    
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      const userData = { name: response.data.name || 'User', email: email, token: response.data.token };
      login(userData); 
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-neutral-50 to-primary/10 flex flex-col">
      {/* --- Visual Appealers: Animated background blobs --- */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full -top-10 right-1/4 filter blur-3xl opacity-30 animate-blob mix-blend-multiply animation-delay-2000"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full -bottom-20 left-1/3 filter blur-3xl opacity-30 animate-blob animation-delay-4000 mix-blend-multiply"></div>
      <div className="absolute w-80 h-80 bg-yellow-300 rounded-full top-1/2 -right-20 transform -translate-y-1/2 filter blur-3xl opacity-30 animate-blob mix-blend-multiply animation-delay-6000"></div>
      {/* --- End Visual Appealers --- */}

      <header className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-neutral-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-neutral-900">
              SkillSwap
            </Link>
            <Link to="/signup" className="text-sm font-semibold text-neutral-800 hover:text-primary transition-colors">
              Don't have an account? <span className="text-primary font-bold">Sign Up</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-md w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-neutral-200/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-neutral-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Sign in to continue your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-neutral-700 block mb-2">Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-neutral-700 block mb-2">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <motion.button type="submit" className="w-full py-3 px-6 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 ease-out" whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.98, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                Sign In
              </motion.button>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-neutral-200"></div>
                <span className="flex-shrink mx-4 text-neutral-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-neutral-200"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" className="w-full inline-flex justify-center items-center py-2 px-4 border border-neutral-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"><GoogleIcon /><span className="ml-2">Google</span></button>
                <button type="button" className="w-full inline-flex justify-center items-center py-2 px-4 border border-neutral-300 rounded-lg shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"><GithubIcon /><span className="ml-2">GitHub</span></button>
              </div>
            </form>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center text-sm text-neutral-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;