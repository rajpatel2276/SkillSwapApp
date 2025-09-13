import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!agreedToTerms) {
      return setError('You must agree to the Terms of Service and Privacy Policy.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    try {
      const userData = { name, username, email };
      signup(userData); 
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-neutral-50 to-primary/10 flex flex-col">
      {/* --- Visual Appealers: Animated background blobs --- */}
      <div className="absolute w-72 h-72 bg-emerald-300 rounded-full -top-10 left-1/4 filter blur-3xl opacity-30 animate-blob mix-blend-multiply animation-delay-2000"></div>
      <div className="absolute w-96 h-96 bg-teal-200 rounded-full -bottom-20 right-1/3 filter blur-3xl opacity-30 animate-blob animation-delay-4000 mix-blend-multiply"></div>
      <div className="absolute w-80 h-80 bg-blue-300 rounded-full top-1/2 -left-20 transform -translate-y-1/2 filter blur-3xl opacity-30 animate-blob mix-blend-multiply animation-delay-6000"></div>
      {/* --- End Visual Appealers --- */}

      {/* Simplified Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-neutral-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-neutral-900">
              SkillSwap
            </Link>
            <Link to="/login" className="text-sm font-semibold text-neutral-800 hover:text-primary transition-colors">
              Already have an account? <span className="text-primary font-bold">Login</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
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
                Create your account
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Start your skill-sharing journey today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="text-sm font-medium text-neutral-700 block mb-2">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="Jane Doe" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="username" className="text-sm font-medium text-neutral-700 block mb-2">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="janedoe" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="text-sm font-medium text-neutral-700 block mb-2">Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="you@example.com" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="text-sm font-medium text-neutral-700 block mb-2">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="••••••••" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="confirm-password" className="text-sm font-medium text-neutral-700 block mb-2">Confirm Password</label>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow" placeholder="••••••••" />
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-neutral-600">
                    I agree to the{' '}
                    <Link to="/terms" className="font-medium text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </motion.div>

              {error && <p className="text-sm text-red-600 text-center pt-2">{error}</p>}
              
              <motion.div variants={itemVariants} className="pt-2">
                <motion.button 
                  type="submit" 
                  disabled={!agreedToTerms}
                  className="w-full py-3 px-6 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ y: agreedToTerms ? -2 : 0 }}
                  whileTap={{ y: 0, scale: agreedToTerms ? 0.98 : 1, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                >
                  Create Account
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default SignupPage;