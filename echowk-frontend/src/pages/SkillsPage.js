import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSkills } from '../services/api';
import { HiCode, HiSpeakerphone, HiMusicNote, HiBeaker, HiChartBar, HiPencilAlt, HiBookOpen, HiOutlineSparkles } from 'react-icons/hi';


// Helper function to get relevant icons
const getIconForSkill = (skillName) => {
  const lowerCaseName = skillName.toLowerCase();
  if (lowerCaseName.includes('react') || lowerCaseName.includes('css')) return <HiCode className="w-8 h-8" />;
  if (lowerCaseName.includes('speaking')) return <HiSpeakerphone className="w-8 h-8" />;
  if (lowerCaseName.includes('guitar')) return <HiMusicNote className="w-8 h-8" />;
  if (lowerCaseName.includes('sourdough') || lowerCaseName.includes('bread')) return <HiBeaker className="w-8 h-8" />;
  if (lowerCaseName.includes('marketing')) return <HiChartBar className="w-8 h-8" />;
  if (lowerCaseName.includes('photoshop')) return <HiPencilAlt className="w-8 h-8" />;
  return <HiBookOpen className="w-8 h-8" />; // Default icon
};

// The SkillCard component (Unchanged)
const SkillCard = ({ skill }) => {
  const handleRequestClick = () => {
    alert(`Your request to learn '${skill.name}' has been sent!`);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl ring-1 ring-gray-200 hover:ring-2 hover:ring-emerald-500">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
            {getIconForSkill(skill.name)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
            <p className="mt-1 text-gray-600">Offered by {skill.offeredBy}</p>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Wants in Exchange:</p>
          <span className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-bold mt-2">
            {skill.wantsInExchange}
          </span>
        </div>
        <div className="mt-6">
          <button
            onClick={handleRequestClick}
            className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all text-sm"
          >
            Request Skill
          </button>
        </div>
      </div>
    </div>
  );
};


const SkillsPage = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Technology', 'Creative Arts', 'Lifestyle', 'Business'];

  useEffect(() => {
    // ... useEffect logic to fetch skills (Unchanged) ...
    const fetchSkills = async () => {
      try {
        const mockSkills = [
          { _id: 1, name: 'React Development Basics', category: 'Technology', offeredBy: 'Jane Doe', wantsInExchange: 'SEO Optimization' },
          { _id: 2, name: 'Public Speaking Coaching', category: 'Business', offeredBy: 'John Smith', wantsInExchange: 'Video Editing' },
          { _id: 3, name: 'Beginner Guitar Lessons', category: 'Creative Arts', offeredBy: 'Maria Garcia', wantsInExchange: 'Content Writing' },
          { _id: 4, name: 'Sourdough Bread Making', category: 'Lifestyle', offeredBy: 'Sam Wilson', wantsInExchange: 'Python Scripting' },
          { _id: 5, name: 'Digital Marketing 101', category: 'Business', offeredBy: 'Chen Wei', wantsInExchange: 'Graphic Design' },
          { _id: 6, name: 'Introduction to Photoshop', category: 'Creative Arts', offeredBy: 'Anna Ivanova', wantsInExchange: 'Social Media Mngmt' },
          { _id: 7, name: 'Introduction to Photoshop', category: 'Creative Arts', offeredBy: 'Anna Ivanova', wantsInExchange: 'Social Media Mngmt' },
          { _id: 8, name: 'Introduction to Photoshop', category: 'Creative Arts', offeredBy: 'Anna Ivanova', wantsInExchange: 'Social Media Mngmt' },
          { _id: 9, name: 'Introduction to Photoshop', category: 'Creative Arts', offeredBy: 'Anna Ivanova', wantsInExchange: 'Social Media Mngmt' },
          { _id: 10, name: 'Advanced CSS Grid', category: 'Technology', offeredBy: 'Alex Ray', wantsInExchange: 'UX Design' },
        ];
        setAllSkills(mockSkills);
        setFilteredSkills(mockSkills);
      } catch (err) { setError('Failed to fetch skills. Please try again later.'); } 
      finally { setLoading(false); }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    // ... useEffect logic for filtering (Unchanged) ...
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

  if (loading) return <div className="text-center py-10">Loading skills...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-100">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto pt-10 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* --- ICON ADDED TO TITLE --- */}
            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-x-3">
              <HiOutlineSparkles className="text-emerald-500" />
              Explore Skills
            </h1>
            <p className="mt-2 text-lg text-gray-600">Find your next learning adventure.</p>
          </div>
          
          <div className="mt-6 max-w-xl mx-auto">
            {/* Search Bar (Unchanged) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </div>
              <input 
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                placeholder="Search by skill or tutor..." 
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center flex-wrap gap-2">
            {/* Category Filters (Unchanged) */}
            {categories.map(category => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === category ? 'bg-emerald-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-emerald-100'}`}>
                {category}
              </button>
            ))}
          </div>
          
          {/* --- DYNAMIC RESULT COUNTER (NEW) --- */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-800">{filteredSkills.length}</span> of <span className="font-medium text-gray-800">{allSkills.length}</span> skills
            </p>
          </div>

        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSkills.map(skill => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-semibold">No skills found</h3>
              <p className="mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SkillsPage;