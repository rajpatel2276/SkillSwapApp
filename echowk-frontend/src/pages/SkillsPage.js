import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { HiCode, HiSpeakerphone, HiMusicNote, HiBeaker, HiChartBar, HiPencilAlt, HiBookOpen, HiOutlineSparkles, HiX, HiSearch } from 'react-icons/hi';
import Header from '../components/Header';
import SkillDetailModal from '../components/SkillDetailModal'; // Import the new modal component

const SkillsPage = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null); // State for the selected skill for modal
  const categories = ['All', 'Technology', 'Creative Arts', 'Lifestyle', 'Business'];

  useEffect(() => {
    const mockSkills = [
      { _id: 1, name: 'React Development Basics', category: 'Technology', offeredBy: 'Jane Doe', wantsInExchange: 'SEO Optimization' },
      { _id: 2, name: 'Public Speaking Coaching', category: 'Business', offeredBy: 'John Smith', wantsInExchange: 'Video Editing' },
      { _id: 3, name: 'Beginner Guitar Lessons', category: 'Creative Arts', offeredBy: 'Maria Garcia', wantsInExchange: 'Content Writing' },
      { _id: 4, name: 'Sourdough Bread Making', category: 'Lifestyle', offeredBy: 'Sam Wilson', wantsInExchange: 'Python Scripting' },
      { _id: 5, name: 'Digital Marketing 101', category: 'Business', offeredBy: 'Chen Wei', wantsInExchange: 'Graphic Design' },
      { _id: 6, name: 'Introduction to Photoshop', category: 'Creative Arts', offeredBy: 'Anna Ivanova', wantsInExchange: 'Social Media Mngmt' },
    ];
    setAllSkills(mockSkills);
    setFilteredSkills(mockSkills);
  }, []);

  useEffect(() => {
    let skills = [...allSkills];
    if (activeCategory !== 'All') {
      skills = skills.filter(skill => skill.category === activeCategory);
    }
    if (searchTerm) {
      skills = skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.offeredBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSkills(skills);
  }, [searchTerm, activeCategory, allSkills]);

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
  };

  const openModal = (skill) => {
    setSelectedSkill(skill);
  };

  const closeModal = () => {
    setSelectedSkill(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <div className="bg-neutral-100 min-h-screen">
      <Header />

      <motion.header 
        className="bg-white border-b border-neutral-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-neutral-900 flex items-center justify-center gap-x-3">
              <HiOutlineSparkles className="text-primary" />
              Explore Skills
            </h1>
            <p className="mt-2 text-lg text-neutral-600">Find your next learning adventure in our community marketplace.</p>
          </div>
          <div className="mt-8 max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><HiSearch className="h-5 w-5 text-neutral-400" /></div>
              <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary shadow-sm" placeholder="Search by skill or tutor..." />
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center flex-wrap gap-3">
            {categories.map(category => ( <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${ activeCategory === category ? 'bg-primary text-white shadow' : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100' }`}>{category}</button>))}
            {(searchTerm || activeCategory !== 'All') && ( <button onClick={handleResetFilters} className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-neutral-600 hover:text-primary"><HiX className="w-4 h-4" /> Reset</button>)}
          </div>
        </div>
      </motion.header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-sm text-neutral-500">
              Showing <span className="font-medium text-neutral-800">{filteredSkills.length}</span> of <span className="font-medium text-neutral-800">{allSkills.length}</span> skills
            </p>
          </motion.div>

          {filteredSkills.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredSkills.map(skill => (
                <motion.div variants={itemVariants} key={skill._id}>
                  <SkillCard skill={skill} onKnowMoreClick={openModal} /> {/* Pass openModal */}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center bg-white p-12 rounded-lg border border-neutral-200">
              <h3 className="text-2xl font-semibold text-neutral-900">No Skills Found</h3>
              <p className="mt-2 text-neutral-600">Try adjusting your search or filter criteria to find what you're looking for.</p>
            </div>
          )}
        </div>
      </main>

      {/* --- Skill Detail Modal --- */}
      <AnimatePresence>
        {selectedSkill && <SkillDetailModal skill={selectedSkill} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};


const getIconForSkill = (skillName) => {
  const lowerCaseName = skillName.toLowerCase();
  if (lowerCaseName.includes('react') || lowerCaseName.includes('css')) return <HiCode className="w-7 h-7" />;
  if (lowerCaseName.includes('speaking')) return <HiSpeakerphone className="w-7 h-7" />;
  if (lowerCaseName.includes('guitar')) return <HiMusicNote className="w-7 h-7" />;
  if (lowerCaseName.includes('sourdough') || lowerCaseName.includes('bread')) return <HiBeaker className="w-7 h-7" />;
  if (lowerCaseName.includes('marketing')) return <HiChartBar className="w-7 h-7" />;
  if (lowerCaseName.includes('photoshop')) return <HiPencilAlt className="w-7 h-7" />;
  return <HiBookOpen className="w-7 h-7" />;
};

// Modified SkillCard to include "Know More" button and pass handler
const SkillCard = ({ skill, onKnowMoreClick }) => {
  const handleRequestClick = () => {
    alert(`Your request to learn '${skill.name}' has been sent!`);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 bg-primary-light/10 text-primary p-3 rounded-lg">
            {getIconForSkill(skill.name)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-neutral-900">{skill.name}</h3>
            <p className="mt-1 text-sm text-neutral-600">Offered by <span className="font-semibold">{skill.offeredBy}</span></p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Wants in Exchange</p>
          <span className="inline-block bg-neutral-100 text-neutral-800 rounded-md px-3 py-1 text-sm font-medium mt-2">
            {skill.wantsInExchange}
          </span>
        </div>
      </div>
      <div className="bg-neutral-50 p-4 mt-auto flex justify-between gap-3"> {/* Use flex to space buttons */}
        <motion.button
          onClick={() => onKnowMoreClick(skill)} // New "Know More" button
          className="flex-1 py-2 px-4 bg-gradient-to-r from-neutral-300 to-neutral-400 text-neutral-800 font-semibold rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Know More
        </motion.button>
        <motion.button
          onClick={handleRequestClick}
          className="flex-1 py-2 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Request Skill
        </motion.button>
      </div>
    </div>
  );
};

export default SkillsPage;