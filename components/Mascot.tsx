
import React from 'react';
import { motion } from 'framer-motion';
import { MascotEmotion } from '../types';

interface MascotProps {
  emotion: MascotEmotion;
  showBow?: boolean; // New prop to toggle the bow
}

const Mascot: React.FC<MascotProps> = ({ emotion, showBow = true }) => {
  const isExcited = emotion === MascotEmotion.EXCITED || emotion === MascotEmotion.ECSTATIC;
  const isHappy = emotion === MascotEmotion.HAPPY;

  // Colors
  const c = {
    body: '#3A9AB3',     // Teal/Blue body
    highlight: '#6ACBD6',
    hands: '#3A9AB3',
    eyes: '#FFFFFF',
    pupil: '#1F2937',
    bow: '#F472B6',      // Cute Pink Bow
    bowKnot: '#EC4899',  // Darker Pink for knot
    blush: '#FDA4AF'     // Soft Pink blush
  };

  // Animation variants
  const floatAnimation = {
    y: [0, -8, 0], 
    rotate: [0, 1.5, -1.5, 0], // Very subtle wobble for cuteness
    transition: {
      duration: isExcited ? 0.5 : 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handAnimation = {
    y: [0, -6, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: isExcited ? 0.5 : 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.2
    }
  };

  return (
    <div className="relative w-40 h-40 flex items-center justify-center mt-2">
      <motion.svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-md"
      >
        {/* --- SHADOW (Ground) --- */}
        <motion.ellipse
          cx="150"
          cy="270"
          rx="50"
          ry="6"
          fill="#000"
          opacity="0.1"
          animate={{
            rx: isExcited ? [45, 55, 45] : [50, 42, 50],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: isExcited ? 0.5 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* --- FLOATING CONTAINER --- */}
        <motion.g animate={floatAnimation}>
          
          {/* --- LEFT HAND --- */}
          <motion.circle
            cx="65"
            cy="180"
            r="18"
            fill={c.hands}
            animate={handAnimation}
          />

          {/* --- RIGHT HAND --- */}
          <motion.circle
            cx="235"
            cy="180"
            r="18"
            fill={c.hands}
            animate={handAnimation}
          />

          {/* --- BODY (Rounder Blob) --- */}
          <path
            d="M 150 60 
               C 210 60 240 110 240 170 
               C 240 230 210 250 150 250 
               C 90 250 60 230 60 170 
               C 60 110 90 60 150 60 Z"
            fill={c.body}
          />
          
          {/* Highlight (Shine) */}
          <path
             d="M 100 90 Q 120 80 140 90"
             fill="none"
             stroke={c.highlight}
             strokeWidth="8"
             strokeLinecap="round"
             opacity="0.6"
          />

          {/* --- PINK BOW (Conditional) --- */}
          {showBow && (
            <g transform="translate(150, 60) rotate(-5)">
              {/* Left loop */}
              <path d="M 0 5 Q -25 -25 -30 5 Q -25 35 0 5" fill={c.bow} />
              {/* Right loop */}
              <path d="M 0 5 Q 25 -25 30 5 Q 25 35 0 5" fill={c.bow} />
              {/* Center knot */}
              <circle cx="0" cy="5" r="8" fill={c.bowKnot} />
            </g>
          )}

          {/* --- FACE --- */}
          <g transform="translate(150, 170)">
            
            {/* CHEEKS (Always blush a little because it's cute) */}
            <ellipse cx="-60" cy="15" rx="12" ry="8" fill={c.blush} opacity={isHappy || isExcited ? 0.8 : 0.5} />
            <ellipse cx="60" cy="15" rx="12" ry="8" fill={c.blush} opacity={isHappy || isExcited ? 0.8 : 0.5} />

            {/* EYES & MOUTH */}
            {isExcited ? (
                // EXCITED: Sparkly Anime Eyes
                <g>
                   <circle cx="-45" cy="-10" r="28" fill="white" />
                   <circle cx="45" cy="-10" r="28" fill="white" />
                   <circle cx="-45" cy="-10" r="14" fill={c.pupil} />
                   <circle cx="45" cy="-10" r="14" fill={c.pupil} />
                   {/* Sparkles in eyes */}
                   <circle cx="-38" cy="-18" r="6" fill="white" />
                   <circle cx="52" cy="-18" r="6" fill="white" />
                   <circle cx="-52" cy="-5" r="3" fill="white" />
                   <circle cx="38" cy="-5" r="3" fill="white" />
                   
                   {/* Big Open Mouth */}
                   <path d="M -20 35 Q 0 60 20 35 Z" fill="#F472B6" stroke={c.pupil} strokeWidth="2" />
                </g>
            ) : isHappy ? (
                // HAPPY: Inverted U eyes (^ ^)
                <g>
                   <path d="M -65 -10 Q -45 -35 -25 -10" fill="none" stroke={c.pupil} strokeWidth="6" strokeLinecap="round" />
                   <path d="M 25 -10 Q 45 -35 65 -10" fill="none" stroke={c.pupil} strokeWidth="6" strokeLinecap="round" />
                   
                   {/* Happy Smile */}
                   <path d="M -15 35 Q 0 45 15 35" fill="none" stroke={c.pupil} strokeWidth="4" strokeLinecap="round" />
                </g>
            ) : (
                // NEUTRAL: Big innocent eyes (Standard Look)
                <g>
                   <circle cx="-45" cy="-15" r="20" fill="white" />
                   <circle cx="45" cy="-15" r="20" fill="white" />
                   {/* Pupils looking slightly up/forward */}
                   <circle cx="-45" cy="-15" r="8" fill={c.pupil} />
                   <circle cx="45" cy="-15" r="8" fill={c.pupil} />
                   {/* Highlighting in eyes */}
                   <circle cx="-40" cy="-20" r="3" fill="white" />
                   <circle cx="50" cy="-20" r="3" fill="white" />

                   {/* Tiny Smile */}
                   <path d="M -8 35 Q 0 40 8 35" fill="none" stroke={c.pupil} strokeWidth="4" strokeLinecap="round" />
                </g>
            )}
          </g>

        </motion.g>
      </motion.svg>
    </div>
  );
};

export default Mascot;
