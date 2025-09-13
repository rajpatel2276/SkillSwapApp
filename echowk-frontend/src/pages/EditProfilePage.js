import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUser, HiOutlineSparkles, HiOutlineCog, HiOutlineBell, 
  HiOutlineCamera, HiX, HiPlus, HiOutlinePhotograph, HiOutlineTrash 
} from 'react-icons/hi';
import Header from '../components/Header';

// --- Sub-Component: Photo Upload Modal ---
const PhotoUploadModal = ({ isOpen, onClose, currentAvatar }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Update Profile Picture</h3>
            <img src={currentAvatar} alt="Current Avatar" className="w-32 h-32 rounded-full mx-auto mb-6 ring-4 ring-primary/20" />
            <div className="space-y-4">
              <button className="w-full flex justify-center items-center gap-x-3 py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-light transition-all">
                <HiOutlinePhotograph className="w-5 h-5" /> Upload a new photo
              </button>
              <button className="w-full flex justify-center items-center gap-x-3 py-3 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-300 transition-all">
                <HiOutlineTrash className="w-5 h-5" /> Remove photo
              </button>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors"><HiX className="w-6 h-6" /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Sub-Component: Toggle Switch ---
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button
    type="button"
    className={`${enabled ? 'bg-primary' : 'bg-neutral-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
    onClick={() => setEnabled(!enabled)}
  >
    <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
  </button>
);

const EditProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isPhotoModalOpen, setPhotoModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', username: '', bio: '', location: '', website: '', avatar: '',
    skillsToTeach: [], skillsToLearn: [],
    isLocationPublic: true, isWebsitePublic: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'User Name',
        username: user.name?.toLowerCase().replace(' ', '') || 'username',
        bio: "Full-stack developer and lifelong learner passionate about sharing knowledge.",
        location: 'New Delhi, India',
        website: 'https://skillswap.dev',
        avatar: `https://i.pravatar.cc/150?u=${user.email}`,
        skillsToTeach: ['React Development', 'Public Speaking', 'Guitar'],
        skillsToLearn: ['SEO Optimization', 'Video Editing'],
        isLocationPublic: true,
        isWebsitePublic: false,
      });
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSkillsChange = (skillType, newSkills) => setFormData({ ...formData, [skillType]: newSkills });
  const handleToggle = (field) => setFormData({ ...formData, [field]: !formData[field] });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving updated profile data:', formData);
    alert('Profile saved successfully!');
    navigate('/profile');
  };
  
  const tabItemClass = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out";
  const activeTabClass = "bg-primary text-white shadow-md";
  const inactiveTabClass = "text-neutral-700 hover:bg-primary/10 hover:text-primary";

  return (
    <>
      <div className="relative min-h-screen bg-neutral-100 overflow-hidden">
        <div className="absolute w-72 h-72 bg-emerald-200 rounded-full -top-10 left-1/4 filter blur-3xl opacity-30 animate-blob mix-blend-multiply animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-teal-200 rounded-full -bottom-20 right-1/3 filter blur-3xl opacity-30 animate-blob animation-delay-4000 mix-blend-multiply"></div>
        <div className="absolute w-80 h-80 bg-blue-200 rounded-full top-1/2 -left-20 transform -translate-y-1/2 filter blur-3xl opacity-30 animate-blob mix-blend-multiply"></div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <header className="bg-white/80 backdrop-blur-sm shadow-md border-b border-neutral-200 flex-shrink-0">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-extrabold text-neutral-900">Account Settings</h1>
            </div>
          </header>
          <main className="flex-grow py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                <aside className="lg:col-span-3 mb-8 lg:mb-0">
                  <nav className="p-2 bg-white rounded-xl shadow-lg border border-neutral-100 space-y-1">
                    <motion.button onClick={() => setActiveTab('profile')} className={`${tabItemClass} ${activeTab === 'profile' ? activeTabClass : inactiveTabClass} w-full flex items-center`} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}><HiOutlineUser className="mr-3 w-5 h-5"/> Public Profile</motion.button>
                    <motion.button onClick={() => setActiveTab('skills')} className={`${tabItemClass} ${activeTab === 'skills' ? activeTabClass : inactiveTabClass} w-full flex items-center`} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}><HiOutlineSparkles className="mr-3 w-5 h-5"/> My Skills</motion.button>
                    <motion.button onClick={() => setActiveTab('account')} className={`${tabItemClass} ${activeTab === 'account' ? activeTabClass : inactiveTabClass} w-full flex items-center`} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}><HiOutlineCog className="mr-3 w-5 h-5"/> Account</motion.button>
                    <motion.button onClick={() => setActiveTab('notifications')} className={`${tabItemClass} ${activeTab === 'notifications' ? activeTabClass : inactiveTabClass} w-full flex items-center`} whileHover={{ scale: 1.02, x: 5 }} whileTap={{ scale: 0.98 }}><HiOutlineBell className="mr-3 w-5 h-5"/> Notifications</motion.button>
                  </nav>
                </aside>
                <div className="lg:col-span-9">
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-neutral-200 shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                        {activeTab === 'profile' && <ProfileSettings formData={formData} handleChange={handleChange} onToggle={handleToggle} onPhotoClick={() => setPhotoModalOpen(true)} />}
                        {activeTab === 'skills' && <SkillsSettings skillsToTeach={formData.skillsToTeach} skillsToLearn={formData.skillsToLearn} onSkillsChange={handleSkillsChange} />}
                        {activeTab === 'account' && <AccountSettings userEmail={user?.email} />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end gap-x-4">
                      <Link to="/profile" className="bg-white text-neutral-800 font-semibold px-8 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 transition-all shadow-sm hover:shadow-md">Cancel</Link>
                      <motion.button type="submit" className="py-3 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ y: 0, scale: 0.98 }}>Save Changes</motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <PhotoUploadModal isOpen={isPhotoModalOpen} onClose={() => setPhotoModalOpen(false)} currentAvatar={formData.avatar} />
    </>
  );
};

// --- FIX: All sub-components are now fully coded and present in the file ---

const ProfileSettings = ({ formData, handleChange, onToggle, onPhotoClick }) => (
  <div className="bg-neutral-50/50 shadow-inner rounded-xl p-8 ring-1 ring-black/[.05]">
    <h3 className="text-2xl font-bold text-neutral-900">Public Profile</h3>
    <p className="text-sm text-neutral-500 mt-1 mb-8">This information will be displayed publicly.</p>
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-200">
        <label className="text-sm font-medium text-neutral-700 block">Profile Picture</label>
        <div className="mt-2 flex items-center gap-x-5"><img className="h-24 w-24 rounded-full object-cover ring-2 ring-primary ring-offset-2" src={formData.avatar} alt="Avatar"/><motion.button type="button" onClick={onPhotoClick} className="text-sm font-bold text-primary hover:text-primary-dark" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Change</motion.button></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-neutral-700 block mb-2">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
        <div>
          <label htmlFor="username" className="text-sm font-medium text-neutral-700 block mb-2">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"/>
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="text-sm font-medium text-neutral-700 block mb-2">Bio</label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
      </div>
      <div className="pt-6 border-t border-neutral-200 space-y-6">
        <div>
          <label htmlFor="location" className="text-sm font-medium text-neutral-700 block mb-2">Location</label>
          <div className="flex items-center gap-x-4">
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="flex-grow px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"/>
            <ToggleSwitch enabled={formData.isLocationPublic} setEnabled={() => onToggle('isLocationPublic')} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkillsSettings = ({ skillsToTeach, skillsToLearn, onSkillsChange }) => {
  const [teachInput, setTeachInput] = useState('');
  const [learnInput, setLearnInput] = useState('');
  const addSkill = (skillType, skill, setter) => {
    if (skill.trim() === '' || (skillType === 'teach' ? skillsToTeach : skillsToLearn).includes(skill.trim())) { setter(''); return; }
    onSkillsChange(skillType === 'teach' ? 'skillsToTeach' : 'skillsToLearn', [...(skillType === 'teach' ? skillsToTeach : skillsToLearn), skill.trim()]);
    setter('');
  };
  const removeSkill = (skillType, index) => { onSkillsChange(skillType === 'teach' ? 'skillsToTeach' : 'skillsToLearn', (skillType === 'teach' ? skillsToTeach : skillsToLearn).filter((_, i) => i !== index)); };
  const SkillTag = ({ skill, onClick, type }) => (
    <motion.span layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className={`flex items-center gap-x-2 font-medium px-3 py-1 rounded-full text-sm shadow-sm ${type === 'teach' ? 'bg-primary/15 text-primary-dark' : 'bg-neutral-200 text-neutral-800'}`}>
      {skill} <motion.button type="button" onClick={onClick} className="text-current hover:text-red-500" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><HiX className="h-4 w-4"/></motion.button>
    </motion.span>
  );
  return (
    <div className="bg-neutral-50/50 shadow-inner rounded-xl p-8 ring-1 ring-black/[.05]">
      <h3 className="text-2xl font-bold text-neutral-900 mb-8">My Skills</h3>
      <div className="space-y-8">
        <div>
          <label className="text-lg font-semibold text-neutral-800 block mb-4">Skills I Can Teach</label>
          <div className="flex flex-wrap gap-3 mb-4 min-h-[40px] p-3 bg-neutral-50 rounded-lg border">
            <AnimatePresence>{skillsToTeach.map((skill, index) => <SkillTag key={skill} skill={skill} onClick={() => removeSkill('teach', index)} type="teach"/>)}</AnimatePresence>
          </div>
          <div className="relative"><input type="text" value={teachInput} onChange={e => setTeachInput(e.target.value)} onKeyDown={e => {if (e.key === 'Enter') { e.preventDefault(); addSkill('teach', teachInput, setTeachInput); }}} placeholder="Add a skill and press Enter" className="w-full pl-4 pr-12 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"/><motion.button type="button" onClick={() => addSkill('teach', teachInput, setTeachInput)} className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"  whileTap={{ scale: 0.9 }}><HiPlus className="h-5 w-5"/></motion.button></div>
        </div>
        <div className="border-t border-neutral-200 pt-8">
          <label className="text-lg font-semibold text-neutral-800 block mb-4">Skills I Want to Learn</label>
          <div className="flex flex-wrap gap-3 mb-4 min-h-[40px] p-3 bg-neutral-50 rounded-lg border">
            <AnimatePresence>{skillsToLearn.map((skill, index) => <SkillTag key={skill} skill={skill} onClick={() => removeSkill('learn', index)} type="learn"/>)}</AnimatePresence>
          </div>
          <div className="relative"><input type="text" value={learnInput} onChange={e => setLearnInput(e.target.value)} onKeyDown={e => {if (e.key === 'Enter') { e.preventDefault(); addSkill('learn', learnInput, setLearnInput); }}} placeholder="Add a skill and press Enter" className="w-full pl-4 pr-12 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary"/><motion.button type="button" onClick={() => addSkill('learn', learnInput, setLearnInput)} className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark"  whileTap={{ scale: 0.9 }}><HiPlus className="h-5 w-5"/></motion.button></div>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = ({ userEmail }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      return setError('Please fill out all new password fields.');
    }
    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match.');
    }
    
    console.log('Changing password...');
    setSuccess('Your password has been updated successfully!');
    // Clear fields after a few seconds
    setTimeout(() => {
      setSuccess('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 3000);
  };

  return (
    <div className="bg-neutral-50/50 shadow-inner rounded-xl p-8 ring-1 ring-black/[.05]">
      <h3 className="text-2xl font-bold text-neutral-900 mb-8">Account Settings</h3>
      <div className="space-y-10">

        {/* --- Email Address Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-neutral-800">Email Address</h4>
            <p className="mt-1 text-sm text-neutral-500">Your email is used for logging in and notifications.</p>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700 block mb-2">Email</label>
              <input type="email" id="email" value={userEmail || ''} disabled className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-500 cursor-not-allowed"/>
            </div>
          </div>
        </div>

        {/* --- Change Password Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-neutral-800">Change Password</h4>
            <p className="mt-1 text-sm text-neutral-500">Update your password. Ensure it's at least 6 characters long.</p>
          </div>
          <div className="md:col-span-3">
            <form onSubmit={handlePasswordChange} className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" cla ssName="text-sm font-medium text-neutral-700 block mb-2">Current Password</label>
                  <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="new-password" cla ssName="text-sm font-medium text-neutral-700 block mb-2">New Password</label>
                  <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="confirm-password" cla ssName="text-sm font-medium text-neutral-700 block mb-2">Confirm New Password</label>
                  <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-200">
                {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-sm text-green-600 text-center mb-4">{success}</p>}
                <div className="flex justify-end">
                  <motion.button type="submit" className="py-2 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md hover:shadow-lg" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    Update Password
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- Danger Zone Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-red-600">Danger Zone</h4>
            <p className="mt-1 text-sm text-neutral-500">These actions are permanent and cannot be undone.</p>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-lg border border-red-500/30 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-800">Deactivate Account</p>
                  <p className="text-sm text-neutral-600 mt-1">Permanently remove your profile.</p>
                </div>
                <motion.button type="button" className="font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors py-2 px-4 rounded-lg shadow-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Deactivate
                </motion.button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const NotificationSettings = () => (
   <div className="bg-neutral-50/50 shadow-inner rounded-xl p-8 ring-1 ring-black/[.05]">
    <h3 className="text-2xl font-bold text-neutral-900 mb-8">Notification Settings</h3>
    <fieldset className="space-y-6">
      <div className="relative flex items-start">
        <div className="flex items-center h-6"><input id="requests" type="checkbox" defaultChecked className="h-5 w-5 text-primary rounded border-neutral-300 focus:ring-primary"/></div>
        <div className="ml-4 text-sm"><label htmlFor="requests" className="font-bold text-neutral-800">New Skill Requests</label><p className="text-neutral-600 mt-1">Get notified when someone requests a skill you offer via email.</p></div>
      </div>
      <div className="relative flex items-start">
        <div className="flex items-center h-6"><input id="messages" type="checkbox" defaultChecked className="h-5 w-5 text-primary rounded border-neutral-300 focus:ring-primary"/></div>
        <div className="ml-4 text-sm"><label htmlFor="messages" className="font-bold text-neutral-800">New Messages</label><p className="text-neutral-600 mt-1">Receive alerts for new direct messages and chat activity.</p></div>
      </div>
      <div className="relative flex items-start">
        <div className="flex items-center h-6"><input id="newsletter" type="checkbox" className="h-5 w-5 text-primary rounded border-neutral-300 focus:ring-primary"/></div>
        <div className="ml-4 text-sm"><label htmlFor="newsletter" className="font-bold text-neutral-800">Newsletter & Promotions</label><p className="text-neutral-600 mt-1">Opt-in to our weekly newsletter and special offers.</p></div>
      </div>
    </fieldset>
  </div>
);

export default EditProfilePage;