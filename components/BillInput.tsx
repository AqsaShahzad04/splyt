
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt } from 'lucide-react';

interface BillInputProps {
  amount: number;
  currencySymbol: string;
  onAmountChange: (amount: number) => void;
}

const BillInput: React.FC<BillInputProps> = ({ amount, currencySymbol, onAmountChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow empty string to clear input
    if (value === '') {
      onAmountChange(0);
      return;
    }

    // Check for valid decimal format
    if (/^\d*\.?\d{0,2}$/.test(value)) {
       // Prevent leading zeros unless it's just "0" or "0."
       if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
           value = value.substring(1);
       }
       onAmountChange(parseFloat(value));
    }
  };

  return (
    <motion.div
      className={`relative w-full rounded-2xl p-6 transition-all duration-300 ${
        isFocused 
          ? 'bg-white dark:bg-slate-800 shadow-[0_0_20px_rgba(0,180,216,0.15)] ring-2 ring-primary-teal' 
          : 'bg-white dark:bg-slate-800 shadow-sm'
      }`}
      onClick={handleContainerClick}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Receipt size={16} className="text-primary-teal" />
          Bill Amount
        </label>
        
        <div className="flex items-center">
          <span className={`text-4xl font-bold mr-2 ${amount > 0 ? 'text-gray-800 dark:text-white' : 'text-gray-300 dark:text-gray-600'}`}>
            {currencySymbol}
          </span>
          <input
            ref={inputRef}
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            className="w-full bg-transparent text-4xl font-bold text-gray-800 dark:text-white outline-none placeholder-gray-200 dark:placeholder-gray-700 caret-primary-teal"
            value={amount > 0 ? amount : ''}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BillInput;
