import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const userProfile = {
  name: 'Alex Ray',
  email: 'alex.ray@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=alexray',
  headline: 'Full-Stack Developer & Lifelong Learner',
  bio: 'Passionate about building beautiful web applications with React and sharing knowledge with the community. In my free time, I enjoy landscape photography and baking.',
  skillsToTeach: ['React', 'Advanced CSS', 'JavaScript ES6+'],
  skillsToLearn: ['UX Design', 'Copywriting', 'Public Speaking'],
};
// --- END MOCK DATA ---

const ProfilePage = () => {
  const [profile, setProfile] = useState(userProfile);

  // This function handles changes for simple text inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };
  
  // --- THIS FUNCTION HAS BEEN CORRECTED ---
  const handleSkillsChange = (e, skillType) => {
      // The 'value' variable is now correctly destructured from e.target
      const { value } = e.target;
      const skillsArray = value.split(',').map(skill => skill.trim());
      setProfile(prev => ({...prev, [skillType]: skillsArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile saved successfully! (Frontend only)');
    console.log('Saving profile:', profile);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-800">Edit My Profile</h1>
            <Link to="/dashboard" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 lg:grid-cols-3">
              {/* --- LEFT COLUMN: AVATAR --- */}
              <div className="lg:col-span-1 text-center">
                <img src={profile.avatarUrl} alt="User Avatar" className="w-40 h-40 rounded-full mx-auto mb-4" />
                <button
                  type="button"
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg shadow-sm hover:bg-gray-50 text-sm"
                >
                  Change Photo
                </button>
              </div>

              {/* --- RIGHT COLUMN: FORM FIELDS --- */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" value={profile.email} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500" />
                </div>
                <div>
                  <label htmlFor="headline" className="block text-sm font-medium text-gray-700">Headline</label>
                  <input type="text" id="headline" value={profile.headline} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                 <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About Me</label>
                  <textarea id="bio" value={profile.bio} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>

            <div className="pt-8 grid grid-cols-1 gap-y-6 gap-x-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Your Skills</h3>
                    <p className="mt-1 text-sm text-gray-500">List the skills you can offer and what you want to learn.</p>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <label htmlFor="skillsToTeach" className="block text-sm font-medium text-gray-700">Skills I Can Teach</label>
                        <input type="text" id="skillsToTeach" value={profile.skillsToTeach.join(', ')} onChange={(e) => handleSkillsChange(e, 'skillsToTeach')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., React, CSS, Guitar" />
                        <p className="mt-2 text-xs text-gray-400">Separate skills with a comma.</p>
                    </div>
                     <div>
                        <label htmlFor="skillsToLearn" className="block text-sm font-medium text-gray-700">Skills I Want to Learn</label>
                        <input type="text" id="skillsToLearn" value={profile.skillsToLearn.join(', ')} onChange={(e) => handleSkillsChange(e, 'skillsToLearn')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., SEO, Video Editing" />
                    </div>
                </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link to="/dashboard" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</Link>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;