import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, useInView, useSpring } from 'framer-motion';
import { HiOutlineMail, HiOutlinePencil, HiPlus, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineStar, HiOutlineBookOpen, HiOutlineClock, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import Header from '../components/Header';
import { useEffect, useRef } from 'react';

// Animated Counter for Stats
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, {
    damping: 20,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
    return () => unsubscribe();
  }, [spring]);

  return <span ref={ref}>0</span>;
};

const ProfilePage = () => {
  const { user } = useAuth();

  const userProfile = {
    username: user?.name?.toLowerCase().replace(' ', '') || 'username',
    joinDate: 'September 2025',
    location: 'New Delhi, India',
    bio: "Full-stack developer and lifelong learner passionate about sharing knowledge in React and exploring new technologies in 3D and design.",
    stats: {
      skillsOffered: 5,
      swapsCompleted: 12,
      reviews: 8,
    },
    skillsToTeach: ['React Development', 'Public Speaking', 'Guitar', 'Tailwind CSS', 'Node.js'],
    recentActivity: [
      { id: 1, text: 'Completed a lesson in "React Development" with Jane Doe.', time: '2 days ago' },
      { id: 2, text: 'Added a new skill to teach: "Tailwind CSS".', time: '5 days ago' },
      { id: 3, text: 'Received a 5-star review from John Smith.', time: '1 week ago' },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const listContainerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
    hidden: {},
  };
  
  const listItemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  };


  return (
    <div className="bg-neutral-100 min-h-screen">
      <Header />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
        </div>
      </header>

      <main className="py-10">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-md">
              <div className="flex flex-col items-center text-center">
                <img className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20" src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="User Avatar" />
                <h2 className="mt-4 text-2xl font-bold text-neutral-900">{user?.name || 'User Name'}</h2>
                <p className="text-sm text-neutral-500">@{userProfile.username}</p>
              </div>
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <p className="text-sm text-neutral-600 text-center">{userProfile.bio}</p>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-center text-sm"><HiOutlineMail className="flex-shrink-0 h-5 w-5 text-neutral-400" /><span className="ml-3 text-neutral-600">{user?.email}</span></div>
                  <div className="flex items-center text-sm"><HiOutlineLocationMarker className="flex-shrink-0 h-5 w-5 text-neutral-400" /><span className="ml-3 text-neutral-600">{userProfile.location}</span></div>
                  <div className="flex items-center text-sm"><HiOutlineCalendar className="flex-shrink-0 h-5 w-5 text-neutral-400" /><span className="ml-3 text-neutral-600">Member since {userProfile.joinDate}</span></div>
                </dl>
              </div>
              <div className="mt-6">
                <Link to="/profile/edit" className="w-full flex justify-center items-center gap-x-2 bg-transparent text-neutral-800 font-semibold px-4 py-2 rounded-lg border-2 border-neutral-300 hover:bg-neutral-100 transition-colors">
                  <HiOutlinePencil className="w-4 h-4" /> Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-neutral-900">My Stats</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <HiOutlineBookOpen className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-2xl font-bold text-neutral-900 mt-1"><AnimatedCounter value={userProfile.stats.skillsOffered} /></p>
                  <p className="text-sm text-neutral-500">Skills Offered</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <HiOutlineSwitchHorizontal className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-2xl font-bold text-neutral-900 mt-1"><AnimatedCounter value={userProfile.stats.swapsCompleted} /></p>
                  <p className="text-sm text-neutral-500">Swaps Completed</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <HiOutlineStar className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-2xl font-bold text-neutral-900 mt-1"><AnimatedCounter value={userProfile.stats.reviews} /></p>
                  <p className="text-sm text-neutral-500">Positive Reviews</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-neutral-900">Skills I Can Teach</h3>
                <motion.button className="inline-flex items-center gap-x-2 py-2 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}><HiPlus /> Add Skill</motion.button>
              </div>
              <motion.div className="mt-4 flex flex-wrap gap-2" variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {userProfile.skillsToTeach.map(skill => (
                  <motion.span key={skill} variants={listItemVariants} className="bg-primary/10 text-primary-dark font-medium px-3 py-1 rounded-full text-sm">{skill}</motion.span>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Recent Activity</h3>
              <motion.ul className="space-y-4" variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {userProfile.recentActivity.map(activity => (
                  <motion.li key={activity.id} variants={listItemVariants} className="flex items-start">
                    <HiOutlineClock className="flex-shrink-0 h-5 w-5 text-neutral-400 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-neutral-700">{activity.text}</p>
                      <p className="text-xs text-neutral-500">{activity.time}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;