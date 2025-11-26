
import React from 'react';
import { motion } from 'framer-motion';
import { TIP_OPTIONS } from '../constants';
import { Coins } from 'lucide-react';

interface TipSelectorProps {
  selectedTip: number;
  onTipChange: (tip: number) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({ selectedTip, onTipChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
        <Coins size={16} className="text-[#FFD93D]" />
        Tip Percentage
      </div>

      {/* Pill Buttons */}
      <div className="flex justify-between gap-2">
        {TIP_OPTIONS.map((tip) => {
          const isSelected = selectedTip === tip;
          return (
            <motion.button
              key={tip}
              onClick={() => onTipChange(tip)}
              className={`flex-1 py-3 rounded-full text-sm font-bold shadow-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-[#00B4D8] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tip}%
            </motion.button>
          );
        })}
      </div>

      {/* Slider */}
      <div className="relative pt-6 pb-2">
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          {/* Active Track - Solid Teal */}
          <motion.div
            className="absolute h-full rounded-full bg-[#00B4D8]"
            style={{ width: `${Math.min(selectedTip * 2, 100)}%` }}
            initial={false}
            animate={{ width: `${(selectedTip / 50) * 100}%` }} 
          />
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={selectedTip}
            onChange={(e) => onTipChange(Number(e.target.value))}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Custom tip percentage"
          />
          {/* Slider Thumb - Solid White with Teal Border */}
          <motion.div
            className="absolute top-1/2 -mt-3 w-6 h-6 bg-white border-2 border-[#00B4D8] rounded-full shadow-md pointer-events-none flex items-center justify-center"
            style={{ left: `calc(${ (selectedTip / 50) * 100 }% - 12px)` }}
          >
             <div className="w-2 h-2 bg-[#00B4D8] rounded-full" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>0%</span>
            <span className="font-bold text-[#00B4D8]">{selectedTip}%</span>
            <span>50%</span>
        </div>
      </div>
    </div>
  );
};

export default TipSelector;
