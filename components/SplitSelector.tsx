import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minus, Plus } from 'lucide-react';
import { MIN_SPLIT, MAX_SPLIT } from '../constants';

interface SplitSelectorProps {
  count: number;
  onCountChange: (count: number) => void;
}

const SplitSelector: React.FC<SplitSelectorProps> = ({ count, onCountChange }) => {
  const handleDecrement = () => {
    if (count > MIN_SPLIT) onCountChange(count - 1);
  };

  const handleIncrement = () => {
    if (count < MAX_SPLIT) onCountChange(count + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
        <Users size={16} className="text-primary-teal" />
        Split Between
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm">
        <motion.button
          onClick={handleDecrement}
          className={`p-4 rounded-xl ${
            count <= MIN_SPLIT 
            ? 'text-gray-300 dark:text-slate-600 cursor-not-allowed' 
            : 'text-primary-teal bg-cyan-50 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-slate-600'
          }`}
          whileTap={count > MIN_SPLIT ? { scale: 0.9 } : {}}
          disabled={count <= MIN_SPLIT}
        >
          <Minus size={20} strokeWidth={3} />
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="flex space-x-[-8px]">
             {/* Dynamic Person Icons visual */}
             <AnimatePresence mode='popLayout'>
                 {[...Array(Math.min(count, 5))].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-sm
                            ${i === 0 ? 'bg-primary-teal z-10' : 'bg-primary-lightTeal z-0'}
                        `}
                        style={{ backgroundColor: i > 0 ? undefined : undefined }}
                    >
                        <Users size={12} fill="currentColor" />
                    </motion.div>
                 ))}
             </AnimatePresence>
             {count > 5 && (
                 <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-300 z-20">
                     +{count - 5}
                 </div>
             )}
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-white w-8 text-center">
            {count}
          </span>
        </div>

        <motion.button
          onClick={handleIncrement}
          className={`p-4 rounded-xl ${
            count >= MAX_SPLIT
            ? 'text-gray-300 dark:text-slate-600 cursor-not-allowed'
            : 'text-primary-darkTeal bg-cyan-50 dark:bg-slate-700 hover:bg-cyan-100 dark:hover:bg-slate-600'
          }`}
          whileTap={count < MAX_SPLIT ? { scale: 0.9 } : {}}
          disabled={count >= MAX_SPLIT}
        >
          <Plus size={20} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
};

export default SplitSelector;