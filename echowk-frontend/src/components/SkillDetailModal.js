import React from 'react'; // Removed useRef, useScroll, useTransform as they are not needed for simple image or static scroll
import { motion } from 'framer-motion';
import { HiX, HiCode, HiSpeakerphone, HiMusicNote, HiBeaker, HiChartBar, HiPencilAlt, HiBookOpen, HiUserCircle } from 'react-icons/hi';

// --- FIXED: Reliable images (using a stable placeholder/category image strategy) ---
const getSkillImage = (category) => {
  // Using a category-based image strategy for consistent, working images.
  // You can replace these with your own local images or more specific Unsplash links you've verified.
  switch (category) {
    case 'Technology':    return 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Technology+Skill'; // Blue
    case 'Creative Arts': return 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Creative+Art+Skill'; // Pink
    case 'Lifestyle':     return 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Lifestyle+Skill';  // Green
    case 'Business':      return 'https://via.placeholder.com/600x400/4B5563/FFFFFF?text=Business+Skill';   // Gray
    default:              return 'https://via.placeholder.com/600x400/60A5FA/FFFFFF?text=General+Skill';    // Light Blue
  }
};

// Helper function for mock tutor qualifications (remains unchanged)
const getTutorQualifications = (tutorName) => {
  switch (tutorName) {
    case 'Jane Doe': return 'Certified React Specialist, 5+ years teaching experience, published author on web development.';
    case 'John Smith': return 'Award-winning Toastmasters speaker, Leadership coach, MBA.';
    case 'Maria Garcia': return 'Music conservatory graduate, Professional musician, 10+ years teaching all ages.';
    case 'Sam Wilson': return 'Artisan Baker for 15 years, teaches workshops locally, beloved community chef.';
    case 'Chen Wei': return 'Google Certified Digital Marketer, Consultant for Fortune 500 companies.';
    case 'Anna Ivanova': return 'Graphic Design Master, Adobe Certified Expert, runs a successful design studio.';
    default: return 'Experienced in relevant fields with a passion for sharing knowledge.';
  }
};

// Category Icon (remains unchanged)
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Technology': return <HiCode className="w-6 h-6" />;
    case 'Creative Arts': return <HiPencilAlt className="w-6 h-6" />;
    case 'Lifestyle': return <HiBeaker className="w-6 h-6" />;
    case 'Business': return <HiChartBar className="w-6 h-6" />;
    default: return <HiBookOpen className="w-6 h-6" />;
  }
};

const SkillDetailModal = ({ skill, onClose }) => {
  // --- Removed parallax effect hooks to simplify and ensure stable scrolling ---
  // const scrollRef = useRef(null);
  // const { scrollYProgress } = useScroll({ container: scrollRef });
  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  if (!skill) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
  const contentContainerVariants = {
    visible: { transition: { staggerChildren: 0.07 } },
    hidden: {},
  };
  
  const contentItemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  };

  const handleTutorClick = () => {
    alert(`You clicked on ${skill.offeredBy}!\n\n(This would link to their profile page in a full application.)`);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-70 backdrop-blur-sm" />
      
      <motion.div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden flex flex-col max-h-[90vh]"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 sm:h-64 flex-shrink-0 overflow-hidden">
          {/* --- FIXED: Simple <img> tag for reliable image display --- */}
          <img 
            src={getSkillImage(skill.category)} 
            alt={`${skill.name} background`} 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 flex items-center gap-x-3">
            <div className="p-3 rounded-full bg-white/90 text-primary-dark shadow-lg">
              {getCategoryIcon(skill.category)}
            </div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">{skill.name}</h2>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors shadow-md"
          aria-label="Close"
        >
          <HiX className="w-6 h-6" />
        </button>

        <motion.div 
          className="p-6 text-neutral-800 overflow-y-auto" // --- FIXED: This ensures content scrolls if too long ---
          // No 'ref' or 'useScroll' needed here for basic overflow scrolling
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={contentItemVariants}>
            <p className="text-sm uppercase font-semibold text-primary mb-2">Offered by</p>
            <motion.button 
              onClick={handleTutorClick}
              className="group flex items-center gap-x-2 text-lg font-medium text-neutral-800 hover:text-primary transition-colors cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <HiUserCircle className="w-6 h-6 text-neutral-500 group-hover:text-primary transition-colors" />
              <span>{skill.offeredBy}</span>
            </motion.button>
          </motion.div>

          <motion.div variants={contentItemVariants} className="mt-4">
            <p className="text-sm uppercase font-semibold text-primary mb-2">Tutor Qualifications</p>
            <p className="text-md mb-4 leading-relaxed italic text-neutral-600">
              "{getTutorQualifications(skill.offeredBy)}"
            </p>
          </motion.div>

          <motion.div variants={contentItemVariants}>
            <p className="text-sm uppercase font-semibold text-primary mb-2">Skill Description</p>
            <p className="text-md mb-4 leading-relaxed">
              This immersive session will cover fundamental concepts, best practices, and advanced techniques 
              to help you master {skill.name}. Expect interactive exercises, real-world examples, and personalized 
              feedback to accelerate your learning journey.
            </p>
          </motion.div>

          <motion.div variants={contentItemVariants}>
            <p className="text-sm uppercase font-semibold text-primary mb-2">What's covered?</p>
            <ul className="list-disc list-inside text-md space-y-1 mb-4">
              <li>Core principles and essential tools.</li>
              <li>Hands-on projects and practical application.</li>
              <li>Troubleshooting common issues.</li>
            </ul>
          </motion.div>

          <motion.div variants={contentItemVariants}>
            <p className="text-sm uppercase font-semibold text-primary mb-2">Ideal exchange for</p>
            <span className="inline-block bg-primary/10 text-primary-dark rounded-full px-4 py-1 text-sm font-medium">
              {skill.wantsInExchange}
            </span>
          </motion.div>
        </motion.div>

        <div className="bg-neutral-50 p-4 border-t border-neutral-200 flex justify-end mt-auto flex-shrink-0">
          <motion.button
            onClick={onClose}
            className="py-2 px-6 bg-transparent text-neutral-700 font-semibold rounded-lg border-2 border-neutral-300 hover:bg-neutral-100 transition-colors shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillDetailModal;