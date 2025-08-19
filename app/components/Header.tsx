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

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0A192F]/95 via-[#112240]/95 to-[#0A192F]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaCode className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              { t('title') }
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsApiTesterOpen(true)}
              className="group px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
              <FaCode className="text-sm group-hover:rotate-12 transition-transform" />
              <span className="font-medium">{t('testApiKey')}</span>
            </button>

            <a
              href="https://api.llm.ai.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105 font-medium">
              {t('exploreAPILLM')}
            </a>

            <button
              onClick={() => scrollToSection(bonusSectionRef)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-105 font-medium">
              {t('bonusPricing')}
            </button>

            <button
              onClick={() => scrollToSection(modelSectionRef)}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/25 hover:scale-105 font-medium">
              {t('modelsSection')}
            </button>

            <button
              onClick={() => scrollToSection(footerSectionRef)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 font-medium">
              {t('joinUs')}
            </button>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 shadow-lg hover:scale-105 font-medium text-lg">
              {language === 'vi' ? '🇬🇧' : '🇻🇳'}
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          <button
            ref={menuButtonRef}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <FaCode className="text-white text-sm" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('title')}
            </h1>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiTesterOpen(true)}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FaCode className="h-4 w-4" />
            </button>
            <button
              onClick={toggleLanguage}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white shadow-lg hover:scale-105 transition-all duration-300 text-sm"
            >
              {language === 'vi' ? '🇬🇧' : '🇻🇳'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#0A192F]/98 to-[#112240]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="container mx-auto p-6">
            <div className="flex flex-col space-y-4">
              {/* API Explorer Link */}
              <a
                href="https://api.llm.ai.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border border-red-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <span className="text-white font-semibold">{t('exploreAPILLM')}</span>
              </a>

              {/* Bonus Pricing */}
              <button
                onClick={() => {
                  scrollToSection(bonusSectionRef);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20 border border-green-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">{t('bonusPricing')}</span>
              </button>

              {/* Models Section */}
              <button
                onClick={() => {
                  scrollToSection(modelSectionRef);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="text-white font-semibold">{t('modelsSection')}</span>
              </button>

              {/* Join Us */}
              <button
                onClick={() => {
                  scrollToSection(footerSectionRef);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border border-purple-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">{t('joinUs')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;