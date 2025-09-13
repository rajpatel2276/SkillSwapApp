import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLogout } from 'react-icons/hi';

const Header = () => {
  const { user, logout } = useAuth();

  const getNavlinkClass = ({ isActive }) => {
    return isActive
      ? 'text-sm font-semibold text-primary' // Style for the active page link
      : 'text-sm font-semibold text-neutral-800 hover:text-primary transition-colors'; // Style for other links
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-neutral-900">
              SkillSwap
            </NavLink>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={getNavlinkClass}>Home</NavLink>
            <NavLink to="/skills" className={getNavlinkClass}>Explore</NavLink>
            {/* Add more general links here if needed */}
          </div>

          {/* Right: Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Links for LOGGED-IN users
              <>
                <NavLink to="/dashboard" className={getNavlinkClass}>Dashboard</NavLink>
                <button 
                  onClick={logout}
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-neutral-800 hover:text-primary transition-colors"
                >
                  <HiOutlineLogout />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Links for LOGGED-OUT users
              <>
                <NavLink to="/login" className="text-sm font-semibold text-neutral-800 hover:text-primary transition-colors">
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-light text-sm shadow-sm transition-colors"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;