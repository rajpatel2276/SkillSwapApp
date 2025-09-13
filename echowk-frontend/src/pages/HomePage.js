import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineUsers, HiOutlineSwitchHorizontal, HiCheckCircle } from 'react-icons/hi';
import Header from '../components/Header'; // Ensure Header is imported

const HomePage = () => {
  // Animation settings for sections that fade in on scroll
  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeInOut" },
    viewport: { once: true, amount: 0.2 }, // amount: 0.2 means 20% of element must be visible
  };

  const featureImage1 = "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop";
  const featureImage2 = "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop";
  const featureImage3 = "https://images.unsplash.com/photo-1507925921958-81fcd9abdc68?q=80&w=2670&auto=format&fit=crop";


  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <main className="relative bg-neutral-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop" 
          alt="People collaborating and sharing skills" 
          className="absolute inset-0 h-full w-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-neutral-900 opacity-60 mix-blend-multiply" aria-hidden="true" />
        
        <motion.div
          className="relative z-10 max-w-7xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Exchange Skills, <br />
            Unlock Potential
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-neutral-200">
            Join a vibrant community. Offer what you know, and learn what you don't—all through genuine skill exchange.
          </p>
          <div className="mt-10 flex justify-center items-center gap-x-4">
            <Link 
              to="/signup" 
              className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-light shadow-lg transition-all transform hover:scale-105"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/skills" 
              className="bg-white text-primary-dark font-semibold px-6 py-3 rounded-lg border border-neutral-200 hover:bg-neutral-100 shadow-md transition-colors"
            >
              Browse Skills
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Features Section - Revamped with alternating image/text layout */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-900">How SkillSwap Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600">
              Our platform connects you with a world of knowledge through a simple, fair exchange system.
            </p>
          </div>
          
          <div className="space-y-20 lg:space-y-32">
            {/* Feature 1: Teach & Earn */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...sectionAnimation}>
              <div className="md:order-1"> {/* Order for desktop: text first */}
                <span className="inline-block bg-primary-light/10 text-primary-dark px-3 py-1 rounded-full text-sm font-semibold mb-4">Teach & Earn</span>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">Share Your Unique Expertise</h3>
                <p className="text-lg text-neutral-600 mb-6">Easily create a profile and list the skills you're eager to teach. Our intuitive tools help you define your offerings and connect with students globally.</p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Simple, guided listing creation</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Set your own exchange terms and schedule</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Earn credits for every successful lesson</li>
                </ul>
              </div>
              <div className="md:order-2"> {/* Order for desktop: image second */}
                <img className="rounded-2xl shadow-xl w-full" src={featureImage1} alt="Person teaching online" />
              </div>
            </motion.div>

            {/* Feature 2: Discover & Grow */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...sectionAnimation}>
              <div className="md:order-2"> {/* Order for desktop: image first */}
                <span className="inline-block bg-primary-light/10 text-primary-dark px-3 py-1 rounded-full text-sm font-semibold mb-4">Discover & Grow</span>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">Learn From Global Mentors</h3>
                <p className="text-lg text-neutral-600 mb-6">Explore a vast marketplace of skills. From coding to cooking, find experienced tutors and request lessons using the credits you've earned.</p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Powerful search filters to find ideal tutors</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Connect via secure in-platform messaging</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Track your learning progress and goals</li>
                </ul>
              </div>
              <div className="md:order-1"> {/* Order for desktop: text second */}
                <img className="rounded-2xl shadow-xl w-full" src={featureImage2} alt="Diverse group of people learning" />
              </div>
            </motion.div>

            {/* Feature 3: Fair Exchange */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...sectionAnimation}>
              <div className="md:order-1"> {/* Order for desktop: text first */}
                <span className="inline-block bg-primary-light/10 text-primary-dark px-3 py-1 rounded-full text-sm font-semibold mb-4">Fair Exchange</span>
                <h3 className="text-3xl font-bold text-neutral-900 mb-4">A Seamless Credit Economy</h3>
                <p className="text-lg text-neutral-600 mb-6">SkillSwap operates on a transparent credit system. Teach a skill, earn credits. Learn a skill, spend credits. It's that simple and equitable.</p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Transparent credit transactions</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />No real money needed for skill exchanges</li>
                  <li className="flex items-center text-md"><HiCheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />Easy to manage your credit balance</li>
                </ul>
              </div>
              <div className="md:order-2"> {/* Order for desktop: image second */}
                <img className="rounded-2xl shadow-xl w-full" src={featureImage3} alt="Abstract digital tokens or currency" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-24 bg-neutral-100" // Changed from bg-white for subtle contrast
        {...sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-900">Loved by Learners Worldwide</h2>
            <p className="mt-3 text-lg text-neutral-600">See what our vibrant community is saying about their experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-neutral-700 italic text-base">"I taught a basic Python class and used the credits to finally learn how to make sourdough bread. This platform is revolutionary for lifelong learners!"</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/150?img=1" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-neutral-900">Sarah L.</p>
                  <p className="text-neutral-500 text-sm">Web Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-neutral-700 italic text-base">"As a graphic designer, I was able to trade logo design services for professional guitar lessons. It's an incredible value proposition."</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/150?img=2" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-neutral-900">Mike R.</p>
                  <p className="text-neutral-500 text-sm">Freelance Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-neutral-700 italic text-base">"The community is so supportive. I was nervous about teaching, but everyone was encouraging. I've already learned two new skills."</p>
              <div className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="Avatar"/>
                <div className="ml-4">
                  <p className="font-semibold text-neutral-900">Jessica P.</p>
                  <p className="text-neutral-500 text-sm">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final Call to Action Section */}
      <motion.section 
        id="join" 
        className="bg-primary-dark" // Used a darker primary for better contrast
        {...sectionAnimation}
      >
         <div className="max-w-5xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Start Swapping?</h2>
            <p className="mt-4 text-lg text-primary-light/80">Create your free account today and post your first skill. Your next learning adventure awaits.</p>
            <div className="mt-8">
              <Link to="/signup" className="bg-white text-primary-dark font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-neutral-100 transform hover:scale-105 transition-all">
                Sign Up Now
              </Link>
            </div>
          </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-neutral-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/about" className="text-neutral-400 hover:text-white text-sm">About</Link>
            <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm">Privacy</Link>
            <Link to="/terms" className="text-neutral-400 hover:text-white text-sm">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;