'use client';

import React from 'react';
import { FaFacebook, FaTelegram } from 'react-icons/fa';

interface FooterProps {
  t: (key: string) => string;
  footerSectionRef: React.RefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = ({ t, footerSectionRef }) => {
  return (
    <footer ref={footerSectionRef} className="text-center mt-12 md:mt-20 relative z-10 px-4 pb-20">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl shadow-xl border border-blue-500/20 p-6 md:p-10 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('footerText')}</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Telegram Group */}
          <a
            href="https://t.me/rapidapisupporter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#27A7E5]/10 hover:bg-[#27A7E5]/20 border border-[#27A7E5]/30 rounded-xl p-5 transition-all duration-300 transform hover:scale-105 flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full bg-[#27A7E5]/20 flex items-center justify-center mb-4">
              <FaTelegram className="w-8 h-8 text-[#27A7E5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Telegram</h3>
            <p className="text-gray-300 text-sm mb-3">Join our Telegram community for instant support</p>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#27A7E5]/30 group-hover:bg-[#27A7E5]/50 rounded-full">
              Join Now
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </a>

          {/* Facebook Group */}
          <a
            href="https://www.facebook.com/share/g/BGj3PsxCXXVquAmE/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 rounded-xl p-5 transition-all duration-300 transform hover:scale-105 flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full bg-[#1877F2]/20 flex items-center justify-center mb-4">
              <FaFacebook className="w-8 h-8 text-[#1877F2]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Facebook</h3>
            <p className="text-gray-300 text-sm mb-3">Connect with our Facebook community</p>
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1877F2]/30 group-hover:bg-[#1877F2]/50 rounded-full">
              Join Now
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </a>
        </div>

        {/* Bonus Badge */}
        <div className="mt-8 inline-block bg-gradient-to-r from-green-500 to-blue-500 p-1 rounded-full animate-pulse">
          <div className="bg-[#0A192F] rounded-full px-4 py-2 flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-bold">
              $2 Credit + 24h Free Trial
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 dark:text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">{t('copyrightText')}</p>
    </footer>
  );
};

export default Footer; 