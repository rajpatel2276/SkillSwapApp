import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

const OfferSkillModal = ({ isOpen, onClose }) => {
  const [skillName, setSkillName] = useState('');
  const [exchangeFor, setExchangeFor] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend API
    console.log({ skillName, exchangeFor, description });
    alert(`New skill "${skillName}" has been offered!`);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">Offer a New Skill</h3>
              <button onClick={onClose} className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100">
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-neutral-500 mt-1">Share your expertise with the community.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="skillName" className="text-sm font-medium text-neutral-700 block mb-2">Skill Name</label>
                <input type="text" id="skillName" value={skillName} onChange={(e) => setSkillName(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" placeholder="e.g., Advanced CSS Grid" />
              </div>
              <div>
                <label htmlFor="exchangeFor" className="text-sm font-medium text-neutral-700 block mb-2">What you want in exchange</label>
                <input type="text" id="exchangeFor" value={exchangeFor} onChange={(e) => setExchangeFor(e.target.value)} required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" placeholder="e.g., UX Design Principles" />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium text-neutral-700 block mb-2">Brief Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary" placeholder="Describe what you'll teach..."></textarea>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 flex justify-end gap-x-4 rounded-b-xl">
              <button type="button" onClick={onClose} className="bg-white text-neutral-800 font-semibold px-6 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-100 shadow-sm">Cancel</button>
              <motion.button type="submit" className="py-2 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                Add Skill
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OfferSkillModal;