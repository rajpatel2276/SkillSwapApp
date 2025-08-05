import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiPlusCircle, HiPencil, HiTrash, HiOutlineClock, HiOutlineCheckCircle, 
  HiBookOpen, HiAnnotation, HiCurrencyDollar, HiUserCircle, HiArrowRight
} from 'react-icons/hi';

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
  { _id: 'r3', skillName: 'Sourdough Bread Making', offeredBy: 'Sam Wilson', status: 'Declined' },
];

const recentActivity = [
    { _id: 'a1', text: 'Your request for "Beginner Guitar Lessons" was accepted.', time: '2h ago' },
    { _id: 'a2', text: 'You received a new request for "Advanced CSS Grid".', time: '1d ago' },
    { _id: 'a3', text: 'You sent a request for "Sourdough Bread Making".', time: '2d ago' },
];
// --- END MOCK DATA ---


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="mt-2 text-lg text-gray-600">Here's a summary of your SkillSwap activity.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow-lg rounded-xl p-6 flex items-center gap-x-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full"><HiBookOpen className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Skills Offered</p>
              <p className="text-2xl font-semibold text-gray-900">{offeredSkills.length}</p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-lg rounded-xl p-6 flex items-center gap-x-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><HiAnnotation className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Requests Made</p>
              <p className="text-2xl font-semibold text-gray-900">{requestedSkills.length}</p>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-lg rounded-xl p-6 flex items-center gap-x-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full"><HiCurrencyDollar className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Credits Earned</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        {/* --- MAIN TWO-COLUMN LAYOUT --- */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* --- LEFT (MAIN) COLUMN --- */}
          <div className="lg:col-span-2 space-y-10">
            {/* My Offered Skills Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">My Offered Skills</h3>
                <button className="inline-flex items-center gap-x-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 text-sm">
                  <HiPlusCircle className="w-5 h-5" />
                  Offer New Skill
                </button>
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                {offeredSkills.map(skill => (
                  <li key={skill._id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-md font-medium text-gray-900">{skill.name}</p>
                      <p className="text-sm text-gray-500">Wants: {skill.wantsInExchange}</p>
                    </div>
                    <div className="flex items-center gap-x-4">
                      <span className="text-sm font-medium text-emerald-600">{skill.requests} new requests</span>
                      <button onClick={() => alert(`Editing ${skill.name}`)} className="text-gray-400 hover:text-emerald-600"><HiPencil className="w-5 h-5" /></button>
                      <button onClick={() => alert(`Deleting ${skill.name}`)} className="text-gray-400 hover:text-red-600"><HiTrash className="w-5 h-5" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Skill Requests Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">My Skill Requests</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {requestedSkills.map(request => (
                  <li key={request._id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-md font-medium text-gray-900">{request.skillName}</p>
                      <p className="text-sm text-gray-500">Tutor: {request.offeredBy}</p>
                    </div>
                    <div>
                      {request.status === 'Pending' && <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><HiOutlineClock className="w-4 h-4" />{request.status}</span>}
                      {request.status === 'Accepted' && <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><HiOutlineCheckCircle className="w-4 h-4" />{request.status}</span>}
                      {request.status === 'Declined' && <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Declined</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- RIGHT (SIDEBAR) COLUMN --- */}
          <div className="lg:col-span-1 space-y-10">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
              <p className="text-sm text-gray-500 mt-2 mb-4">Your profile is {user.profileCompletion}% complete.</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${user.profileCompletion}%` }}></div>
              </div>
              <Link to="/profile" className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-500 w-full flex items-center justify-center gap-x-1">
                Complete Profile <HiArrowRight />
              </Link>
            </div>
            {/* Recent Activity Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {recentActivity.map(activity => (
                  <li key={activity._id} className="py-3">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;