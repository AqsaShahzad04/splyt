
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Splyt Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#48CAE4" />
          <stop offset="1" stopColor="#0077B6" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Background Container */}
      <rect 
        x="10" 
        y="10" 
        width="180" 
        height="180" 
        rx="45" 
        fill="url(#logoGradient)" 
        filter="url(#softShadow)"
      />
      
      {/* Abstract S / Split Shape */}
      {/* Top curve */}
      <path 
        d="M 130 65 C 130 65 70 65 70 65 C 50 65 50 95 70 95 C 90 95 120 95 130 95 C 150 95 150 135 130 135 H 70" 
        stroke="white" 
        strokeWidth="20" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none" 
      />
      
      {/* Gold Coin Accents representing the 'money' being split */}
      <circle cx="145" cy="55" r="14" fill="#FFD93D" />
      <circle cx="55" cy="145" r="14" fill="#FFD93D" />
      
      {/* Shine on coins */}
      <circle cx="149" cy="51" r="4" fill="white" fillOpacity="0.6" />
      <circle cx="59" cy="141" r="4" fill="white" fillOpacity="0.6" />
    </svg>
  );
};

export default Logo;
