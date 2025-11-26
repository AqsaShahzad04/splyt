
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/formatters';

interface ResultCardProps {
  label: string;
  amount: number;
  currencyCode: string;
  highlight?: boolean;
  delay?: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, amount, currencyCode, highlight = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "backOut" }}
      className={`relative overflow-hidden rounded-2xl p-5 ${
        highlight 
          ? 'bg-primary-teal text-white shadow-lg shadow-teal-200 dark:shadow-none' 
          : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700 shadow-sm'
      }`}
    >
      {/* Background decoration for highlight card */}
      {highlight && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
      )}
      
      <div className="relative z-10 flex flex-col items-center">
        <span className={`text-sm font-medium mb-1 ${highlight ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
          {label}
        </span>
        
        <div className="h-10 flex items-center justify-center">
             <AnimatePresence mode="popLayout">
                <motion.span
                    key={amount}
                    initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                    className={`text-3xl font-bold tracking-tight ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}
                >
                    {formatCurrency(amount, currencyCode)}
                </motion.span>
             </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
