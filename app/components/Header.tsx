'use client';

import React, { useRef, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { scrollToSection } from '@/app/utils/helpers';
import { Language } from '@/app/data/translations';

interface HeaderProps {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  setIsApiTesterOpen: (isOpen: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  footerSectionRef: React.RefObject<HTMLDivElement | null>;
  modelSectionRef: React.RefObject<HTMLDivElement | null>;
  bonusSectionRef: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({
  language,
  t,
  toggleLanguage,
  setIsApiTesterOpen,
  menuOpen,
  setMenuOpen,
  footerSectionRef,
  modelSectionRef,
  bonusSectionRef
}) => {
  // Add useRef for menu and button
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  
  // Add effect for outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click is outside both the menu and the menu button
      if (
        menuOpen && 
        menuRef.current && 
        menuButtonRef.current &&
        !menuRef.current.contains(event.target as Node) && 
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    
    // Add event listener only when menu is open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <header className="p-4 fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/90 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            { t('title') }
          </h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsApiTesterOpen(true)} 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center gap-2 transition-all shadow-md">
              <FaCode className="text-sm" />
              <span>{t('testApiKey')}</span>
            </button>
            <a 
              href="https://api.llm.ai.vn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-md">
              {t('exploreAPILLM')}
            </a>
            <button 
              onClick={() => scrollToSection(bonusSectionRef)} 
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all shadow-md">
              {t('bonusPricing')}
            </button>
            <button 
              onClick={() => scrollToSection(modelSectionRef)} 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-all shadow-md">
              {t('modelsSection')}
            </button>
            <button 
              onClick={() => scrollToSection(footerSectionRef)} 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all shadow-md">
                {t('joinUs')}
            </button>
            <button 
              onClick={toggleLanguage} 
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all">
              {language === 'vi' ? '🇬🇧' : '🇻🇳'}
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          <button
            ref={menuButtonRef}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-lg transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
          
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">API Shared - All in one API</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiTesterOpen(true)}
              className="p-2 rounded-full bg-purple-600 text-white shadow-md"
            >
              <FaCode className="h-5 w-5" />
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              {language === 'vi' ? '🇬🇧' : '🇻🇳'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Redesigned */}
      {menuOpen && (
        <div className="fixed left-0 top-[72px] z-40 md:hidden w-full">
          <div 
            ref={menuRef}
            className="bg-white mx-4 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 animate-slideIn"
          >
            <div className="flex flex-col">
              <a 
                href="https://api.llm.ai.vn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 py-4 px-5 hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">API LLM</span>
              </a>
              
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  setIsApiTesterOpen(true);
                }}
                className="flex items-center gap-4 py-4 px-5 hover:bg-gray-100 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                  <FaCode className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-800 font-medium">{t('testApiKey')}</span>
              </button>
              
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(bonusSectionRef);
                }} 
                className="flex items-center gap-4 py-4 px-5 hover:bg-gray-100 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('bonusPricing')}</span>
              </button>
              
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(modelSectionRef);
                }} 
                className="flex items-center gap-4 py-4 px-5 hover:bg-gray-100 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 2v2m0 16v2M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">{t('modelsSection')}</span>
              </button>
              
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(footerSectionRef);
                }} 
                className="flex items-center gap-4 py-4 px-5 hover:bg-gray-100 transition-all duration-200 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Join Us</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 