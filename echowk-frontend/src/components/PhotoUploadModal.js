import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';

const PhotoUploadModal = ({ isOpen, onClose, currentAvatar }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-70 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto p-6 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-bold text-neutral-900 mb-4">Update Profile Picture</h3>
          <img src={currentAvatar} alt="Current Avatar" className="w-32 h-32 rounded-full mx-auto mb-6 ring-4 ring-primary/20" />
          
          <div className="space-y-4">
            <button className="w-full flex justify-center items-center gap-x-3 py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-light transition-all">
              <HiOutlinePhotograph className="w-5 h-5" />
              Upload a new photo
            </button>
            <button className="w-full flex justify-center items-center gap-x-3 py-3 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-300 transition-all">
              <HiOutlineTrash className="w-5 h-5" />
              Remove photo
            </button>
          </div>

          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors">
            <HiX className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoUploadModal;