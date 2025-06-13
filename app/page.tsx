// pages/index.tsx
'use client';  // Add client directive for client-side components

import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import ApiTester from './components/ApiTester'
import useTranslation from './utils/useTranslation'
import { copyToClipboard } from './utils/helpers'
import Header from './components/Header'
import VideoSection from './components/VideoSection'
import BonusTierSection from './components/BonusTierSection'
import Footer from './components/Footer'
import ModelPricingSection from './components/ModelPricingSection'

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copyNotification, setCopyNotification] = useState({
    message: '',
    visible: false,
    type: 'success' as 'success' | 'error' | 'info'
  })
  const [isApiTesterOpen, setIsApiTesterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // References for scrolling
  const footerSectionRef = useRef<HTMLDivElement | null>(null)
  const modelSectionRef = useRef<HTMLDivElement | null>(null)
  const bonusSectionRef = useRef<HTMLDivElement | null>(null)

  // Get translation utilities
  const { language, t, toggleLanguage } = useTranslation();

  // Enhanced notification system
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setCopyNotification({
      message,
      visible: true,
      type
    });

    setTimeout(() => {
      setCopyNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Handle copy code
  const handleCopyCode = (code: string) => {
    const onSuccess = (text: string) => {
      setCopiedCode(text);
      showNotification(
        language === 'vi' ? 'Đã sao chép thành công!' : 'Successfully copied!',
        'success'
      );
    };

    const onError = (err: any) => {
      console.error('Copy failed: ', err);
      showNotification(
        language === 'vi' ? 'Lỗi khi sao chép!' : 'Copy failed!',
        'error'
      );
    };

    copyToClipboard(code, onSuccess, onError);
  };

  // Add animation styles for mobile menu
  useEffect(() => {
    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .animate-slideIn {
        animation: slideIn 0.3s ease-out forwards;
      }
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fadeInScale {
        animation: fadeInScale 0.3s ease-out forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Helper function for toggling category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className={`min-h-screen bg-[#0A192F] dark:bg-white p-4 overflow-hidden relative`}>
      {/* Enhanced Toast Notification */}
      {copyNotification.visible && (
        <div
          className={`fixed top-24 right-4 px-4 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 max-w-sm
            transition-all duration-300 transform animate-slideIn
            ${copyNotification.type === 'success' ? 'bg-green-500 text-white' : 
              copyNotification.type === 'error' ? 'bg-red-500 text-white' : 
              'bg-blue-500 text-white'}`}
        >
          <div className="flex-shrink-0">
            {copyNotification.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {copyNotification.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {copyNotification.type === 'info' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <span className="font-medium">{copyNotification.message}</span>
        </div>
      )}

      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content="AI API, OpenAI, Anthropic, Claude, GPT-4, Machine Learning, API Integration" />
        <link rel="icon" href="/public/logo.png" />
      </Head>

      <main className="container mx-auto px-4 relative dark:bg-white">
        {/* Header */}
        <Header 
          language={language}
          t={t}
          toggleLanguage={toggleLanguage}
          setIsApiTesterOpen={setIsApiTesterOpen}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          footerSectionRef={footerSectionRef}
          modelSectionRef={modelSectionRef}
          bonusSectionRef={bonusSectionRef}
        />

        {/* Video Section */}
        <VideoSection />

        {/* Bonus Tiers Container */}
        <BonusTierSection 
          t={t}
          footerSectionRef={footerSectionRef}
          bonusSectionRef={bonusSectionRef}
        />

        {/* Pricing Table Section */}
        <ModelPricingSection 
          t={t}
          modelSectionRef={modelSectionRef}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          handleCopyCode={handleCopyCode}
          footerSectionRef={footerSectionRef}
        />

        {/* Footer */}
        <Footer 
          t={t}
          footerSectionRef={footerSectionRef}
        />
      </main>

      {/* Floating Action Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <div className="flex flex-col gap-3">
          {/* Contact/Join Button */}
          <button
            onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse"
            title="Get API Key"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.968 9.313 13.83 9 14.5 9z" />
            </svg>
          </button>

          {/* API Tester Button */}
          <button
            onClick={() => setIsApiTesterOpen(true)}
            className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title="Test API"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          
          {/* Scroll to Models Button */}
          <button
            onClick={() => modelSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title="View Models"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Floating Contact Button */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <button
          onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105 animate-pulse"
          title="Get API Key Now"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.968 9.313 13.83 9 14.5 9z" />
          </svg>
          Get API Key
        </button>
      </div>

      {/* API Tester Modal */}
      <ApiTester 
        isOpen={isApiTesterOpen} 
        onClose={() => setIsApiTesterOpen(false)} 
        language={language} 
      />
    </div>
  )
}