
import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Moon, Sun, RotateCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { BillState, MascotEmotion } from './types';
import { CURRENCIES } from './constants';
import BillInput from './components/BillInput';
import TipSelector from './components/TipSelector';
import SplitSelector from './components/SplitSelector';
import ResultCard from './components/ResultCard';
import Mascot from './components/Mascot';
import WelcomeScreen from './components/WelcomeScreen';
import Logo from './components/Logo';

type AppView = 'welcome' | 'calculator';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const [currencyCode, setCurrencyCode] = useState('USD');
  
  const [bill, setBill] = useState<BillState>({
    amount: 0,
    tipPercentage: 15,
    splitCount: 1,
  });

  // Get current currency symbol
  const currencySymbol = useMemo(() => {
    return CURRENCIES.find(c => c.code === currencyCode)?.symbol || '$';
  }, [currencyCode]);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived Calculations
  const results = useMemo(() => {
    const tipAmount = bill.amount * (bill.tipPercentage / 100);
    const totalAmount = bill.amount + tipAmount;
    const amountPerPerson = totalAmount / bill.splitCount;

    return { tipAmount, totalAmount, amountPerPerson };
  }, [bill]);

  // Determine Mascot Emotion
  const mascotEmotion = useMemo(() => {
    // Excited logic: 20%+
    if (bill.tipPercentage >= 25) return MascotEmotion.ECSTATIC;
    if (bill.tipPercentage >= 20) return MascotEmotion.EXCITED;
    // Happy logic: 15-19%
    if (bill.tipPercentage >= 15) return MascotEmotion.HAPPY;
    // Neutral: <15%
    return MascotEmotion.NEUTRAL;
  }, [bill.tipPercentage]);

  // Confetti Effect (Debounced)
  useEffect(() => {
    if (currentView === 'calculator' && bill.amount > 0 && bill.tipPercentage >= 20) {
      const isEcstatic = bill.tipPercentage >= 25;
      
      const timer = setTimeout(() => {
        confetti({
          particleCount: isEcstatic ? 120 : 60,
          spread: isEcstatic ? 100 : 60,
          origin: { y: 0.3 }, 
          colors: ['#00B4D8', '#90E0EF', '#FFD93D', '#F9F7F2'],
          disableForReducedMotion: true,
          zIndex: 100,
        });
      }, 800); 

      return () => clearTimeout(timer);
    }
  }, [bill.tipPercentage, bill.amount, currentView]);

  const handleReset = () => {
    setBill({
      amount: 0,
      tipPercentage: 15,
      splitCount: 1,
    });
  };

  const handleStart = () => {
    setDirection(1);
    setCurrentView('calculator');
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentView('welcome');
  };

  // Animation Variants for Smooth Slide
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out pb-12 overflow-x-hidden ${darkMode ? 'bg-[#1A1B2E]' : 'bg-[#FAFBFF]'}`}>
      
      {/* Header / Nav */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center max-w-md mx-auto relative z-50">
        <div className="flex items-center gap-2">
           {currentView === 'calculator' && (
             <button 
               onClick={handleBack}
               className="mr-1 text-gray-500 hover:text-primary-teal transition-colors"
             >
               <ArrowLeft size={20} />
             </button>
           )}
           <Logo className="w-10 h-10 drop-shadow-sm" />
           <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Splyt</h1>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 shadow-sm hover:shadow-md transition-all"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {currentView === 'calculator' && (
              <button 
                  onClick={handleReset}
                  className="p-2 rounded-full bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 shadow-sm hover:shadow-md transition-all"
                  aria-label="Reset Calculator"
              >
                  <RotateCcw size={20} />
              </button>
            )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto w-full relative">
        <AnimatePresence mode="wait" custom={direction}>
          
          {currentView === 'welcome' && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <WelcomeScreen 
                selectedCurrency={currencyCode}
                onCurrencyChange={setCurrencyCode}
                onStart={handleStart}
              />
            </motion.div>
          )}

          {currentView === 'calculator' && (
            <motion.div
              key="calculator"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="px-6 space-y-8 w-full"
            >
              {/* Top Section: Mascot & Bill Input */}
              <div className="flex flex-col items-center pt-2">
                 <motion.div
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                   className="mb-4 z-10"
                 >
                    {/* Cute Mascot WITH Bow for the app view */}
                    <Mascot emotion={mascotEmotion} showBow={true} />
                 </motion.div>
                 
                 <BillInput 
                   amount={bill.amount} 
                   currencySymbol={currencySymbol}
                   onAmountChange={(val) => setBill(prev => ({ ...prev, amount: val }))} 
                 />
              </div>

              {/* Controls Section */}
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
              >
                  <TipSelector 
                      selectedTip={bill.tipPercentage}
                      onTipChange={(val) => setBill(prev => ({ ...prev, tipPercentage: val }))}
                  />
                  
                  <SplitSelector 
                      count={bill.splitCount}
                      onCountChange={(val) => setBill(prev => ({ ...prev, splitCount: val }))}
                  />
              </motion.div>

              {/* Results Section */}
              <div className="grid grid-cols-2 gap-4 pb-8">
                  <div className="col-span-2">
                      <ResultCard 
                          label="Per Person" 
                          amount={results.amountPerPerson} 
                          currencyCode={currencyCode}
                          highlight 
                          delay={0.4}
                      />
                  </div>
                  <ResultCard 
                      label="Tip Amount" 
                      amount={results.tipAmount} 
                      currencyCode={currencyCode}
                      delay={0.5}
                  />
                  <ResultCard 
                      label="Total Bill" 
                      amount={results.totalAmount} 
                      currencyCode={currencyCode}
                      delay={0.6}
                  />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-[#00B4D8] opacity-50" />
    </div>
  );
};

export default App;
