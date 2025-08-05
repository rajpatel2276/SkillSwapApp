import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the auth hook

// Self-contained SVG Icons for this page
const HandshakeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.5a4.5 4.5 0 01-6.364 0 4.5 4.5 0 010-6.364l7.928-7.928A4.5 4.5 0 0116.862 4.487zM5.25 12.75a3.75 3.75 0 000 5.25m3.75-5.25a3.75 3.75 0 005.25 0m-5.25 0l-3.75-3.75" /></svg>;
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.451 0-2.733-.81-3.465-2.035a7.5 7.5 0 0114.43-2.186 7.5 7.5 0 01-3.465 2.035z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;

const HomePage = () => {
  // Get authentication status and logout function from the context
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logging out
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-2xl text-gray-800">SkillSwap</Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#testimonials" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
                
                {/* --- DYNAMIC NAVIGATION LOGIC --- */}
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gray-800">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop" alt="People collaborating and sharing skills" />
          <div className="absolute inset-0 bg-gray-700 opacity-60 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Your Skill is Your Currency.</span>
            <span className="block text-emerald-400 mt-2">Invest in Yourself.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
            Unlock a world of knowledge by sharing what you do best. Learn, grow, and connect with a global community of experts.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Link to="/signup" className="inline-block bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-700 transform hover:-translate-y-1 transition-all duration-300">Join for Free</Link>
            <Link to="/skills" className="inline-block bg-white text-emerald-800 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300">Browse Skills</Link>
          </div>
        </div>
      </header>

      {/* "How It Works" Section with Icons */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900">A Platform Built for Sharing</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to learn and teach, all in one place.</p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: Offer a Skill (Unchanged) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">Teach & Earn</span>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Showcase Your Expertise</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Easily create a listing for any skill you're passionate about. From programming to painting, our simple tools help you define what you'll teach and what skills you're looking for in return.
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Simple Listing Creation</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Set Your Own Exchange Terms</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Reach a Global Community</li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img className="rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop" alt="Person teaching online" />
              </div>
            </div>

            {/* Feature 2: Learn Anything (Unchanged) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">Discover & Grow</span>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Unlock New Possibilities</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Browse thousands of skills offered by passionate experts. Our platform makes it easy to find what you want to learn and connect with tutors who are ready to share their knowledge.
                </p>
                 <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Powerful Search & Filtering</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Verified Tutor Profiles</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Secure Messaging System</li>
                </ul>
              </div>
              <div className="order-1">
                <img className="rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop" alt="Diverse group of people learning" />
              </div>
            </div>

            {/* --- FEATURE 3: TOKEN SYSTEM (NEW) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">Fair Exchange</span>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">A Seamless Credit System</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our platform runs on a simple credit system. Earn credits by teaching others, and spend them to learn new skills. It's a cashless economy that rewards sharing and learning.
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Transparent Transactions</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>No Real Money Involved</li>
                  <li className="flex items-center"><svg className="h-6 w-6 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Track Your Balance Easily</li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img className="rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop" alt="Abstract digital tokens or currency" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Loved by Learners Worldwide</h2>
             <p className="mt-3 text-lg text-gray-600">See what our community is saying about their experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"I taught a basic Python class and used the credits to finally learn how to make sourdough bread. This platform is revolutionary for lifelong learners!"</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Sarah L.</p>
                  <p className="text-gray-500 text-sm">Web Developer</p>
                </div>
              </div>
            </div>
             <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"As a graphic designer, I was able to trade logo design services for professional guitar lessons. It's an incredible value proposition."</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?img=2" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Mike R.</p>
                  <p className="text-gray-500 text-sm">Freelance Designer</p>
                </div>
              </div>
            </div>
             <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"The community is so supportive. I was nervous about teaching, but everyone was encouraging. I've already learned two new skills."</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?img=3" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Jessica P.</p>
                  <p className="text-gray-500 text-sm">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="join" className="bg-emerald-600">
         <div className="max-w-5xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Start Swapping?</h2>
            <p className="mt-4 text-lg text-emerald-100">Create your free account today and post your first skill. Your next learning adventure awaits.</p>
            <Link to="/signup" className="mt-8 inline-block bg-white text-emerald-800 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all">
              Sign Up Now
            </Link>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;