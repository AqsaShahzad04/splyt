
import React from 'react';
import { motion } from 'framer-motion';
import { CURRENCIES } from '../constants';
import { MascotEmotion } from '../types';
import { ArrowRight, Globe, ChevronDown } from 'lucide-react';
import Mascot from './Mascot';

interface WelcomeScreenProps {
  selectedCurrency: string;
  onCurrencyChange: (code: string) => void;
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ selectedCurrency, onCurrencyChange, onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      
      {/* Mascot (Happy & Bow) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Mascot emotion={MascotEmotion.HAPPY} showBow={true} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Splyt
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          The fun way to calculate your tips
        </p>
      </motion.div>

      {/* Currency Selector Dropdown */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs space-y-3 mb-12"
      >
        <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
           <Globe size={16} />
           What's your currency?
        </label>
        
        <div className="relative">
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 hover:border-[#00B4D8] rounded-xl py-4 px-4 pr-10 text-gray-800 dark:text-white font-bold text-lg outline-none focus:border-[#00B4D8] focus:ring-4 focus:ring-[#00B4D8]/10 transition-all cursor-pointer shadow-sm"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.symbol} &nbsp; {curr.code} - {curr.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
            <ChevronDown size={24} />
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onStart}
        className="w-full max-w-xs bg-[#00B4D8] hover:bg-[#0096C7] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-200 dark:shadow-none flex items-center justify-center gap-2 group transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>

    </div>
  );
};

export default WelcomeScreen;
