import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  HiPlus, HiPencil, HiTrash, HiOutlineClock, HiOutlineCheckCircle, 
  HiBookOpen, HiAnnotation, HiCurrencyDollar, HiArrowRight, HiLogout, HiXCircle
} from 'react-icons/hi';
import Header from '../components/Header';

// --- MOCK DATA ---
const user = {
  name: 'Alex Ray',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexray',
  profileCompletion: 75,
};
const offeredSkills = [
  { _id: 's1', name: 'Advanced CSS Grid', wantsInExchange: 'UX Design', requests: 3 },
  { _id: 's2', name: 'React State Management', wantsInExchange: 'Copywriting', requests: 1 },
];
const requestedSkills = [
  { _id: 'r1', skillName: 'Public Speaking Coaching', offeredBy: 'John Smith', status: 'Pending' },
  { _id: 'r2', skillName: 'Beginner Guitar Lessons', offeredBy: 'Maria Garcia', status: 'Accepted' },
  { _id: 'r3', name: 'Sourdough Bread Making', offeredBy: 'Sam Wilson', status: 'Declined' },
];
const recentActivity = [
    { _id: 'a1', text: 'Your request for "Beginner Guitar Lessons" was accepted.', time: '2h ago' },
    { _id: 'a2', text: 'You received a new request for "Advanced CSS Grid".', time: '1d ago' },
    { _id: 'a3', text: 'You sent a request for "Sourdough Bread Making".', time: '2d ago' },
];
// --- END MOCK DATA ---


const DashboardPage = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statusPill = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><HiOutlineClock className="w-4 h-4" />{status}</span>;
      case 'Accepted':
        return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><HiOutlineCheckCircle className="w-4 h-4" />{status}</span>;
      case 'Declined':
        return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><HiXCircle className="w-4 h-4" />{status}</span>;
      default:
        return null;
    }
  }

  // A reusable class string for the main content cards
  const cardClasses = "bg-white p-6 rounded-lg shadow-md border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-neutral-900">Welcome back, {authUser?.name || user.name}!</h1>
            <p className="mt-1 text-lg text-neutral-600">Here's a summary of your SkillSwap activity.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`${cardClasses} flex items-center gap-x-4`}>
              <div className="bg-gradient-to-br from-primary/80 to-primary-light/60 text-white p-3 rounded-lg shadow-md"><HiBookOpen className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Skills Offered</p>
                <p className="text-2xl font-bold text-neutral-900">{offeredSkills.length}</p>
              </div>
            </div>
            <div className={`${cardClasses} flex items-center gap-x-4`}>
              <div className="bg-gradient-to-br from-primary/80 to-primary-light/60 text-white p-3 rounded-lg shadow-md"><HiAnnotation className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Requests Made</p>
                <p className="text-2xl font-bold text-neutral-900">{requestedSkills.length}</p>
              </div>
            </div>
            <div className={`${cardClasses} flex items-center gap-x-4`}>
              <div className="bg-gradient-to-br from-primary/80 to-primary-light/60 text-white p-3 rounded-lg shadow-md"><HiCurrencyDollar className="h-6 w-6" /></div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Credits Earned</p>
                <p className="text-2xl font-bold text-neutral-900">12</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-neutral-900">My Offered Skills</h3>
                  <motion.button 
                    className="inline-flex items-center gap-x-2 py-2 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md hover:shadow-lg"
                    whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.98 }}
                  >
                    <HiPlus /> Offer Skill
                  </motion.button>
                </div>
                <ul role="list" className="divide-y divide-neutral-200">
                  {offeredSkills.map(skill => (
                    <li key={skill._id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="text-md font-medium text-neutral-900">{skill.name}</p>
                        <p className="text-sm text-neutral-500">Wants: {skill.wantsInExchange}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="text-sm font-medium text-primary">{skill.requests} new requests</span>
                        <button className="p-2 rounded-md text-neutral-400 hover:text-primary hover:bg-neutral-100"><HiPencil className="w-5 h-5" /></button>
                        <button className="p-2 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50"><HiTrash className="w-5 h-5" /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">My Skill Requests</h3>
                <ul role="list" className="divide-y divide-neutral-200">
                  {requestedSkills.map(request => (
                    <li key={request._id} className="py-4 flex items-center justify-between">
                      <div>
                        <p className="text-md font-medium text-neutral-900">{request.skillName}</p>
                        <p className="text-sm text-neutral-500">Tutor: {request.offeredBy}</p>
                      </div>
                      <div>{statusPill(request.status)}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <motion.div className={`${cardClasses} text-center`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <img src={user.avatarUrl} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-primary/20" />
                <h4 className="text-lg font-semibold text-neutral-900">{user.name}</h4>
                <p className="text-sm text-neutral-500 mt-2 mb-4">Your profile is {user.profileCompletion}% complete.</p>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${user.profileCompletion}%` }}></div>
                </div>
                <Link to="/profile" className="mt-4 text-sm font-medium text-primary hover:text-primary-dark w-full flex items-center justify-center gap-x-1">
                  View Full Profile <HiArrowRight />
                </Link>
              </motion.div>

              <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Recent Activity</h3>
                <ul role="list" className="divide-y divide-neutral-200">
                  {recentActivity.map(activity => (
                    <li key={activity._id} className="py-3">
                      <p className="text-sm text-neutral-700">{activity.text}</p>
                      <p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;