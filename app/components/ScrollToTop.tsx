'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!mounted || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110"
      title="Scroll to top"
    >
      {/* Progress Ring */}
      <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          className="transition-all duration-300"
        />
      </svg>
      
      {/* Arrow Icon */}
      <FaArrowUp className="relative z-10 group-hover:animate-bounce" />
    </button>
  );
};

export default ScrollToTop;
