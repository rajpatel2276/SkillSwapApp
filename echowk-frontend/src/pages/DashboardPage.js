import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { 
  HiPlus, HiPencil, HiTrash, HiOutlineClock, HiOutlineCheckCircle, 
  HiBookOpen, HiAnnotation, HiCurrencyDollar, HiArrowRight, HiXCircle, HiArrowSmUp, HiX, HiExclamation 
} from 'react-icons/hi';
import Header from '../components/Header';

// --- MOCK DATA ---
let offeredSkillsData = [
  { _id: 's1', name: 'Advanced CSS Grid', wantsInExchange: 'UX Design', requests: 3, category: 'Technology', level: 'Advanced', duration: '60 mins' },
  { _id: 's2', name: 'React State Management', wantsInExchange: 'Copywriting', requests: 1, category: 'Technology', level: 'Intermediate', duration: '90 mins' },
];
const requestedSkills = [
  { _id: 'r1', skillName: 'Public Speaking Coaching', offeredBy: 'John Smith', status: 'Pending' },
  { _id: 'r2', skillName: 'Beginner Guitar Lessons', offeredBy: 'Maria Garcia', status: 'Accepted' },
];
const recentActivity = [
    { _id: 'a1', text: 'Your request for "Beginner Guitar Lessons" was accepted.', time: '2h ago' },
    { _id: 'a2', text: 'You received a new request for "Advanced CSS Grid".', time: '1d ago' },
];
// --- END MOCK DATA ---

// --- SELF-CONTAINED SUB-COMPONENTS ---

const OfferSkillModal = ({ isOpen, onClose, skillToEdit, onSave }) => {
  const [formData, setFormData] = useState({ name: '', wantsInExchange: '', category: 'Technology', level: 'Beginner', duration: '60 mins' });

  useEffect(() => {
    if (isOpen) {
      if (skillToEdit) {
        setFormData({
          name: skillToEdit.name || '',
          wantsInExchange: skillToEdit.wantsInExchange || '',
          category: skillToEdit.category || 'Technology',
          level: skillToEdit.level || 'Beginner',
          duration: skillToEdit.duration || '60 mins',
        });
      } else {
        setFormData({ name: '', wantsInExchange: '', category: 'Technology', level: 'Beginner', duration: '60 mins' });
      }
    }
  }, [skillToEdit, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...skillToEdit, ...formData }); onClose(); };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute w-72 h-72 bg-emerald-300 rounded-full -top-10 -left-20 filter blur-3xl opacity-20 animate-blob mix-blend-multiply"></div>
          <div className="absolute w-96 h-96 bg-teal-200 rounded-full -bottom-20 -right-10 filter blur-3xl opacity-20 animate-blob animation-delay-2000 mix-blend-multiply"></div>
          
          <motion.div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-neutral-900">{skillToEdit ? 'Edit Your Skill' : 'Offer a New Skill'}</h3>
              <p className="text-sm text-neutral-500 mt-1">Share your expertise with the community.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div><label htmlFor="name" className="text-sm font-medium text-neutral-700 block mb-2">Skill Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg" /></div>
                <div>
                  <label htmlFor="category" className="text-sm font-medium text-neutral-700 block mb-2">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-white">
                    <option>Technology</option><option>Creative Arts</option><option>Lifestyle</option><option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 block mb-2">Skill Level</label>
                  <div className="flex space-x-4">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (<label key={level} className="flex items-center space-x-2 text-sm"><input type="radio" name="level" value={level} checked={formData.level === level} onChange={handleChange} className="text-primary focus:ring-primary"/><span>{level}</span></label>))}
                  </div>
                </div>
                <div><label htmlFor="duration" className="text-sm font-medium text-neutral-700 block mb-2">Typical Lesson Duration</label><input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg" /></div>
                <div><label htmlFor="wantsInExchange" className="text-sm font-medium text-neutral-700 block mb-2">What you want in exchange</label><input type="text" id="wantsInExchange" name="wantsInExchange" value={formData.wantsInExchange} onChange={handleChange} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg" /></div>
              </div>
              <div className="bg-neutral-50 p-4 flex justify-end gap-x-4 rounded-b-xl"><button type="button" onClick={onClose} className="bg-white text-neutral-800 font-semibold px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 shadow-sm">Cancel</button><motion.button type="submit" className="py-2 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>Save Skill</motion.button></div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, skillName }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute w-72 h-72 bg-red-300 rounded-full -top-10 -left-20 filter blur-3xl opacity-20 animate-blob mix-blend-multiply"></div>
          <div className="absolute w-96 h-96 bg-yellow-200 rounded-full -bottom-20 -right-10 filter blur-3xl opacity-20 animate-blob animation-delay-2000 mix-blend-multiply"></div>
          <motion.div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"><HiExclamation className="h-6 w-6 text-red-600" /></div>
            <h3 className="text-lg font-medium text-neutral-900 mt-5">Delete Skill</h3>
            <p className="mt-2 text-sm text-neutral-500">Are you sure you want to delete "{skillName}"? This action is permanent.</p>
            <div className="mt-6 flex justify-center gap-x-4">
              <button type="button" onClick={onClose} className="bg-white text-neutral-800 font-semibold px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 shadow-sm">Cancel</button>
              <motion.button type="button" onClick={onConfirm} className="py-2 px-6 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>Delete</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 15 });
  useEffect(() => { if (isInView) { spring.set(value); } }, [isInView, value, spring]);
  useEffect(() => { const unsubscribe = spring.on("change", (latest) => { if (ref.current) { ref.current.textContent = Math.round(latest).toLocaleString(); } }); return () => unsubscribe(); }, [spring]);
  return <span ref={ref}>0</span>;
};

const StatCard = ({ icon, title, value, trend }) => (
  <motion.div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex items-center gap-x-4 transition-all" whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}>
    <div className="bg-gradient-to-br from-primary/80 to-primary-light/60 text-white p-3 rounded-lg shadow-md">{icon}</div>
    <div className="flex-grow"><p className="text-sm font-medium text-neutral-600">{title}</p><p className="text-2xl font-bold text-neutral-900"><AnimatedCounter value={value} /></p></div>
    <div className="flex items-center text-xs font-medium text-green-600"><HiArrowSmUp /><span>{trend}</span></div>
  </motion.div>
);
// --- END SUB-COMPONENTS ---

const DashboardPage = () => {
  const { user: authUser } = useAuth();
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [myOfferedSkills, setMyOfferedSkills] = useState(offeredSkillsData);

  const handleOpenOfferModal = (skill = null) => { setSkillToEdit(skill); setOfferModalOpen(true); };
  const handleOpenDeleteModal = (skill) => { setSkillToDelete(skill); setDeleteModalOpen(true); };
  const handleSaveSkill = (savedSkill) => {
    const skillData = { ...savedSkill, wantsInExchange: savedSkill.wantsInExchange || '' };
    if (skillData._id) {
      setMyOfferedSkills(myOfferedSkills.map(s => s._id === skillData._id ? { ...s, ...skillData } : s));
    } else {
      const newSkill = { ...savedSkill, _id: `s${Date.now()}`, requests: 0 };
      setMyOfferedSkills([...myOfferedSkills, newSkill]);
    }
  };
  const handleConfirmDelete = () => { setMyOfferedSkills(myOfferedSkills.filter(s => s._id !== skillToDelete._id)); setDeleteModalOpen(false); setSkillToDelete(null); };

  const user = { name: authUser?.name || 'Alex Ray', avatarUrl: `https://i.pravatar.cc/150?u=${authUser?.email}`, profileCompletion: 75 };
  const statsData = [
    { title: 'Skills Offered', value: myOfferedSkills.length, icon: <HiBookOpen className="h-6 w-6" />, trend: '+2' },
    { title: 'Requests Made', value: requestedSkills.length, icon: <HiAnnotation className="h-6 w-6" />, trend: '+1' },
    { title: 'Credits Earned', value: 12, icon: <HiCurrencyDollar className="h-6 w-6" />, trend: '+8%' }
  ];
  
  const statusPill = (status) => {
    switch (status) {
      case 'Pending': return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><HiOutlineClock className="w-4 h-4" />{status}</span>;
      case 'Accepted': return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><HiOutlineCheckCircle className="w-4 h-4" />{status}</span>;
      case 'Declined': return <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><HiXCircle className="w-4 h-4" />{status}</span>;
      default: return null;
    }
  };
  const cardClasses = "bg-white p-6 rounded-lg shadow-md border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    <>
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold text-neutral-900">Welcome back, {user.name}!</h1>
              <p className="mt-1 text-lg text-neutral-600">Here's a summary of your SkillSwap activity.</p>
            </motion.div>
            <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
              {statsData.map((stat) => (
                <motion.div key={stat.title} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <StatCard title={stat.title} value={stat.value} icon={stat.icon} trend={stat.trend} />
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-neutral-900">My Offered Skills</h3>
                    <motion.button onClick={() => handleOpenOfferModal()} className="inline-flex items-center gap-x-2 py-2 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}><HiPlus /> Offer Skill</motion.button>
                  </div>
                  <ul role="list" className="divide-y divide-neutral-200">
                    {myOfferedSkills.map(skill => (
                      <li key={skill._id} className="py-4 flex items-center justify-between">
                        <div>
                          <p className="text-md font-medium text-neutral-900">{skill.name}</p>
                          <p className="text-sm text-neutral-500">Wants: {skill.wantsInExchange}</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-medium text-primary">{skill.requests} new requests</span>
                          <button onClick={() => handleOpenOfferModal(skill)} className="p-2 rounded-md text-neutral-400 hover:text-primary hover:bg-neutral-100"><HiPencil className="w-5 h-5" /></button>
                          <button onClick={() => handleOpenDeleteModal(skill)} className="p-2 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50"><HiTrash className="w-5 h-5" /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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
                <motion.div className={`${cardClasses} text-center`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <img src={user.avatarUrl} alt="User Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-primary/20" />
                  <h4 className="text-lg font-semibold text-neutral-900">{user.name}</h4>
                  <p className="text-sm text-neutral-500 mt-2 mb-4">Your profile is {user.profileCompletion}% complete.</p>
                  <div className="w-full bg-neutral-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${user.profileCompletion}%` }}></div></div>
                  <Link to={`/user/${user.name.toLowerCase().replace(' ', '')}`} className="mt-4 text-sm font-medium text-primary hover:text-primary-dark w-full flex items-center justify-center gap-x-1">View Full Profile <HiArrowRight /></Link>
                </motion.div>
                <motion.div className={cardClasses} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
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
      <OfferSkillModal isOpen={isOfferModalOpen} onClose={() => setOfferModalOpen(false)} skillToEdit={skillToEdit} onSave={handleSaveSkill} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} skillName={skillToDelete?.name} />
    </>
  );
};

export default DashboardPage;