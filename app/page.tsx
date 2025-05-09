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
    visible: false
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

  // Handle copy code
  const handleCopyCode = (code: string) => {
    const onSuccess = (text: string) => {
      setCopiedCode(text);
      setCopyNotification({
        message: language === 'vi' ? 'Đã sao chép thành công!' : 'Successfully copied!',
        visible: true
      });

      setTimeout(() => {
        setCopyNotification({
          message: '',
          visible: false
        });
      }, 2000);
    };

    const onError = (err: any) => {
      console.error('Copy failed: ', err);
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
      {copyNotification.visible && (
        <div
          className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg 
          animate-bounce z-50"
        >
          {copyNotification.message}
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
        />

        {/* Footer */}
        <Footer 
          t={t}
          footerSectionRef={footerSectionRef}
        />
      </main>

      {/* API Tester Modal */}
      <ApiTester 
        isOpen={isApiTesterOpen} 
        onClose={() => setIsApiTesterOpen(false)} 
        language={language} 
      />
    </div>
  )
}