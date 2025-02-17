// pages/index.tsx
'use client';  // Add client directive for client-side components

import Head from 'next/head'
import { FaYoutube, FaFacebook, FaTelegram, FaCopy } from 'react-icons/fa'
import React, { useState, useEffect, useRef } from 'react'

// Define translations
const translations = {
  en: {
    title: 'API Shared - All-in-One API Model AI',
    description: 'Access powerful AI APIs at discounted rates. Featuring OpenAI, Anthropic, and more.',
    modelsSection: 'Prices Token Models',
    providersTitle: 'Providers',
    modelCodeCopy: 'Copy Model Code',
    socialConnect: 'Connect With Us',
    tokenInformation: ' Tokens và Tokenization: Nền Tảng Của AI Trong Xử Lý Dữ Liệu',
    whatAreTokens: ' What is Tokens?',
    tokenExamples: ' Example Token',
    tokenLimits: ' Token Limit',
    tokenCorrespondence: ' Token Tương ứng bao nhiêu từ?',
    futureTrends: ' Future Trend',
    bonusPricing: 'Bonus Recharge',
    modelPricing: 'AI Model Pricing',
    footerText: 'Connect with us on social media',
    copyrightText: '2024 API Shared. All rights reserved.',
    bonusCreditTiers: 'Bonus Credit Tiers',
    tenPlusPurchase: '$10+ Purchase',
    fiftyPlusPurchase: '$50+ Purchase',
    getExtraTen: 'Get an extra 100% bonus when you spend over $10',
    receiveExtraSeventyFive: 'Get an extra 150% bonus when you spend over $50',
    spend: 'Spend',
    bonus: 'Bonus',
    bonusPercentage: 'Bonus %',
    tenDollarTier: '10$ Tier: 100% Bonus',
    fiftyDollarTier: '50$ Tier: 150% Bonus',
    fiftyPlus: '$50+',
    seventyFivePlus: '$75+'
  },
  vi: {
    title: 'API Shared - Tất cả AI chỉ trong 1 API',
    description: 'Truy cập các API AI mạnh mẽ với mức ưu đãi cực lớn. Được trang bị các models của OpenAI, Anthropic và nhiều hơn nữa.',
    modelsSection: 'Giá token models AI',
    providersTitle: 'Nhà Cung Cấp',
    modelCodeCopy: 'Sao Chép Mã Mô Hình',
    socialConnect: 'Kết Nối Với Chúng Tôi',
    tokenInformation: ' Tokens và Tokenization: Nền Tảng Của AI Trong Xử Lý Dữ Liệu',
    whatAreTokens: ' Tokens Là Gì?',
    tokenExamples: ' Ví Dụ Cụ Thể Về Token',
    tokenLimits: ' Giới Hạn Token của Các Mô Hình Phổ Biến',
    tokenCorrespondence: ' Token Tương ứng bao nhiêu từ?',
    futureTrends: ' Xu Hướng Tương Lai',
    bonusPricing: 'Ưu đãi nạp tiền',
    modelPricing: 'Giá Các Mô Hình AI',
    footerText: 'Kết nối với chúng tôi trên mạng xã hội',
    copyrightText: '2024 API Shared. All rights reserved.',
    bonusCreditTiers: 'Ưu Đãi Nạp Tiền',
    tenPlusPurchase: 'Mua Trên $10',
    fiftyPlusPurchase: 'Mua Trên $50',
    getExtraTen: 'Nhận thêm ưu đãi 100% khi nạp trên $10',
    receiveExtraSeventyFive: 'Nhận thêm ưu đãi 150% khi nạp trên $50',
    spend: 'Chi Tiêu',
    bonus: 'Ưu Đãi',
    bonusPercentage: '% Ưu Đãi',
    tenDollarTier: 'Mức trên $10: Ưu Đãi 100%',
    fiftyDollarTier: 'Mức trên $50: Ưu Đãi 150%',
    fiftyPlus: '$50+',
    seventyFivePlus: '$75+'
  }
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>('jjAwWP1R8jo')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copyNotification, setCopyNotification] = useState({
    message: '',
    visible: false
  })

  // Use a two-step state approach to avoid hydration issues
  const [language, setLanguage] = useState<'en' | 'vi'>('en')

  // Effect to handle language from localStorage only on client-side
  useEffect(() => {
    // Retrieve language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') as 'en' | 'vi'
    if (savedLanguage && ['en', 'vi'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Translation function
  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key]
  }

  // Language toggle function with localStorage support
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'vi' : 'en'
    setLanguage(newLanguage)

    // Save to localStorage
    localStorage.setItem('appLanguage', newLanguage)
  }

  // Properly type the refs
  const videoSectionRef = useRef<HTMLDivElement | null>(null)
  const modelSectionRef = useRef<HTMLDivElement | null>(null)
  const bonusSectionRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section function
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    if (sectionRef.current) {
      const yOffset = -80; // Adjust this value based on your header height
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const modelPricing = {
    "DeepSeek Models": [
      {
        apiName: 'deepseek:deepseek-v3',
        realName: 'Deepseek v3',
        inputPrice: { original: 0.25, discounted: 0.125 },
        outputPrice: { original: 0.50, discounted: 0.25 },
        rateLimit: '-'
      },
      {
        apiName: 'deepseek:deepseek-reasoner',
        realName: 'Deepseek R1',
        inputPrice: { original: 0.55, discounted: 0.275 },
        outputPrice: { original: 1.11, discounted: 0.55 },
        rateLimit: '-'
      }
    ],
    "xAI Models": [
      {
        apiName: 'grok:grok-2',
        realName: 'Grok v2',
        inputPrice: { original: 2, discounted: 1 },
        outputPrice: { original: 10, discounted: 5 },
        rateLimit: '-'
      },
      {
        apiName: 'grok:grok-2-think-exp',
        realName: 'Grok v2 Deep Think',
        inputPrice: { original: 2, discounted: 1 },
        outputPrice: { original: 10, discounted: 5 },
        rateLimit: '-'
      },
    ],
    "Gemini Models": [
      {
        apiName: 'gemini:gemini-2.0-pro-exp',
        realName: 'Gemini 2.0',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10, discounted: 5 },
        rateLimit: '-'
      },
      {
        apiName: 'gemini:gemini-2.0-pro-exp-think-exp',
        realName: 'Gemini 2.0 Deep Think',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10, discounted: 5 },
        rateLimit: '-'
      },
    ],
    "Anthropic Models": [
      {
        apiName: 'anthropic:3-opus',
        realName: 'claude-3-opus',
        inputPrice: { original: 15.00, discounted: 7.5 },
        outputPrice: { original: 75.00, discounted: 37.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3-opus-think-exp',
        realName: 'claude-3-opus-think-exp',
        inputPrice: { original: 15.00, discounted: 7.5 },
        outputPrice: { original: 75.00, discounted: 37.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-sonnet-20241022',
        realName: 'claude-3.5-sonnet-20241022',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-sonnet-20241022-think-exp',
        realName: 'claude-3.5-sonnet-20241022-think-exp',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-sonnet',
        realName: 'claude-3.5-sonnet',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-sonnet-think-exp',
        realName: 'claude-3.5-sonnet-think-exp',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-haiku',
        realName: 'claude-3.5-haiku',
        inputPrice: { original: 1.00, discounted: 0.5 },
        outputPrice: { original: 5.00, discounted: 2.5 },
        rateLimit: '-'
      },
      {
        apiName: 'anthropic:3.5-haiku-think-exp',
        realName: 'claude-3.5-haiku-think-exp',
        inputPrice: { original: 1.00, discounted: 0.5 },
        outputPrice: { original: 5.00, discounted: 2.5 },
        rateLimit: '-'
      },
    ],
    "OpenAI Models": [
      {
        apiName: 'openai:o1',
        realName: 'gpt-o1',
        inputPrice: { original: 15.00, discounted: 7.50 },
        outputPrice: { original: 60.00, discounted: 30.00 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:o3-mini',
        realName: 'gpt-4o',
        inputPrice: { original: 2.20, discounted: 1.10 },
        outputPrice: { original: 8.80, discounted: 4.40 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:o3-mini-think-exp',
        realName: 'gpt-4o',
        inputPrice: { original: 2.20, discounted: 1.10 },
        outputPrice: { original: 8.80, discounted: 4.40 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:gpt-4o',
        realName: 'gpt-4o',
        inputPrice: { original: 2.50, discounted: 1.75 },
        outputPrice: { original: 10.00, discounted: 5 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:gpt-4o-mini',
        realName: 'gpt-4o-mini',
        inputPrice: { original: 0.15, discounted: 0.25 },
        outputPrice: { original: 0.60, discounted: 0.3 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:gpt-4o-2024-08-06',
        realName: 'gpt-4o-2024-08-06',
        inputPrice: { original: 2.50, discounted: 1.75 },
        outputPrice: { original: 10.00, discounted: 5 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:o1-mini',
        realName: 'o1-mini',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 12.00, discounted: 6 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:gpt-4',
        realName: 'gpt-4',
        inputPrice: { original: 30.00, discounted: 15 },
        outputPrice: { original: 60.00, discounted: 30 },
        rateLimit: '-'
      },
      {
        apiName: 'openai:gpt-4-turbo-2024-04-09',
        realName: 'gpt-4-turbo-2024-04-09',
        inputPrice: { original: 10.00, discounted: 5 },
        outputPrice: { original: 30.00, discounted: 15 },
        rateLimit: '-'
      }
    ]
  }

  const handleCopyCode = (code: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCode(code)
        setCopyNotification({
          message: language === 'vi' ? 'Đã sao chép thành công!' : 'Successfully copied!',
          visible: true
        })

        setTimeout(() => {
          setCopyNotification({
            message: '',
            visible: false
          })
        }, 2000)
      }).catch(err => {
        console.error('Failed to copy: ', err)
      })
    } else {
      // Fallback for browsers without clipboard API
      try {
        const textArea = document.createElement('textarea')
        textArea.value = code
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)

        setCopiedCode(code)
        setCopyNotification({
          message: `Copied ${code} to clipboard!`,
          visible: true
        })

        setTimeout(() => {
          setCopyNotification({
            message: '',
            visible: false
          })
        }, 2000)
      } catch (err) {
        console.error('Fallback copy failed: ', err)
      }
    }
  }

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
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="container mx-auto px-4 relative dark:bg-white">
        {/* Enhanced Header Menu with Action Buttons */}
        <header className="p-4 fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/2 backdrop-blur-md transition-all duration-300">
          <div className="container mx-auto flex justify-between items-center">
            {/* Title displayed only on desktop */}
            <h1 className="text-2xl font-bold text-white hidden md:block">{t('title')}</h1>
            {/* Desktop Menu */}
            <nav className="hidden md:flex md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <button onClick={() => scrollToSection(videoSectionRef)} className="px-4 py-2 bg-blue-500 rounded">
                Watch Video
              </button>
              <a href="https://api.llm.ai.vn/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-500 rounded">
                Explore API LLM
              </a>
              <button onClick={() => scrollToSection(bonusSectionRef)} className="px-4 py-2 bg-green-500 rounded">
                {t('bonusPricing')}
              </button>
              <button onClick={() => scrollToSection(modelSectionRef)} className="px-4 py-2 border border-gray-300 text-white rounded">
                {t('modelsSection')}
              </button>
              <button onClick={toggleLanguage} className="px-3 py-1 bg-white/10 text-white rounded">
                {language === 'vi' ? '🇬🇧' : '🇻🇳'}
              </button>
            </nav>
            {/* Title displayed only on mobile */}
            <h1 className="text-2xl font-bold pl-12 pt-1 text-white md:hidden">API Shared</h1>
            {/* Mobile Menu Button positioned at the top left */}
            <button
              className="md:hidden absolute top-4 left-4 p-2 rounded-lg bg-white text-blue-600 hover:bg-gray-200 transition duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <nav className="flex flex-col space-y-2 mt-4 md:hidden">
              <div className="flex space-x-4">
                <button onClick={() => scrollToSection(videoSectionRef)} className="px-4 py-2 bg-blue-500 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/* YouTube Icon Path */}
                    <path d="M10 15l5-3-5-3v6z" fill="currentColor" />
                    <path d="M21.6 8.4c-.2-1.5-.8-2.8-1.7-3.9C18.4 3.8 17.1 3 15.6 3H8.4C6.9 3 5.6 3.8 4.1 4.5 3.2 5.6 2.6 6.9 2.4 8.4 2.2 10.1 2.2 12 2.2 12s0 1.9.2 4.4c.2 1.5.8 2.8 1.7 3.9C5.6 20.2 6.9 21 8.4 21h7.2c1.5 0 2.8-.8 3.9-1.7 1-1 1.5-2.4 1.7-3.9.2-2.5.2-4.4.2-4.4s0-1.9-.2-4.4z" fill="currentColor" />
                  </svg>
                </button>
                <a href="https://api.llm.ai.vn/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-500 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C10.343 2 9 3.343 9 5c0 .553-.447 1-1 1H6c-1.104 0-2 .896-2 2v2c0 1.104.896 2 2 2h2c.553 0 1 .447 1 1 0 1.657 1.343 3 3 3s3-1.343 3-3c0-.553.447-1 1-1h2c1.104 0 2-.896 2-2v-2c0-1.104-.896-2-2-2h-2c-.553 0-1-.447-1-1 0-1.657-1.343-3-3-3z" />
                  </svg>
                </a>
                <button onClick={() => scrollToSection(bonusSectionRef)} className="px-4 py-2 bg-green-500 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
                <button onClick={() => scrollToSection(modelSectionRef)} className="px-4 py-2 border border-gray-300 text-white rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 2v2m0 16v2M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6" />
                  </svg>
                </button>
                <button onClick={toggleLanguage} className="px-3 py-1 bg-white/10 text-white rounded flex items-center">
                  {language === 'vi' ? '🇬🇧' : '🇻🇳'}
                </button>
              </div>
            </nav>
          )}
        </header>
        {/* Featured Video Section */}
        <section ref={videoSectionRef} className="mt-16 md:mt-20 relative z-10 px-4 dark:bg-white">
          <div className="grid gap-2 md:gap-2 bg-white/5 dark:bg-gray-800 rounded-xl backdrop-blur-lg shadow-xl">
            <div className=" p-4 sm:p-6 rounded-xl 
              transition duration-700 
              max-w-5xl
              mx-auto
              w-full">
              {selectedVideo && (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden w-full max-w-5xl mx-auto">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}`}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Bonus Tiers */}
        <section ref={bonusSectionRef} className="mt-20 relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black text-center mb-12 
            animate-pulse-slow">
            {t('bonusCreditTiers')}
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier 1: $10+ Purchase */}
            <div className="bg-white/10 dark:bg-gray-800 rounded-2xl p-6 transform transition-all 
              duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/20 dark:bg-blue-400/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-green-500 dark:text-green-300">
                  {t('tenDollarTier')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-gray-200 mb-2">
                {t('tenPlusPurchase')}
              </h3>
              <p className="text-gray-300 dark:text-gray-500 mb-4">
                {t('getExtraTen')}
              </p>
              <div className="bg-blue-500/10 dark:bg-blue-400/10 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white dark:text-gray-200">
                    {t('spend')}
                  </span>
                  <span className="font-bold text-blue-500 dark:text-blue-300">$10+</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white dark:text-gray-200">
                    {t('bonusPercentage')}
                  </span>
                  <span className="font-bold text-green-500 dark:text-green-300">100%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white dark:text-gray-200">
                    {t('bonus')}
                  </span>
                  <span className="font-bold text-green-500 dark:text-green-300">x$10</span>
                </div>
              </div>
            </div>

            {/* Tier 2: $50+ Purchase */}
            <div className="bg-white/10 dark:bg-gray-800 rounded-2xl p-6 transform transition-all 
              duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/20 dark:bg-purple-400/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-green-500 dark:text-green-300">
                  {t('fiftyDollarTier')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-gray-200 mb-2">
                {t('fiftyPlusPurchase')}
              </h3>
              <p className="text-gray-300 dark:text-gray-500 mb-4">
                {t('receiveExtraSeventyFive')}
              </p>
              <div className="bg-purple-500/10 dark:bg-purple-400/10 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white dark:text-gray-200">
                    {t('spend')}
                  </span>
                  <span className="font-bold text-purple-500 dark:text-purple-300">$50+</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white dark:text-gray-200">
                    {t('bonusPercentage')}
                  </span>
                  <span className="font-bold text-green-500 dark:text-green-300">150%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white dark:text-gray-200">
                    {t('bonus')}
                  </span>
                  <span className="font-bold text-green-500 dark:text-green-300">x$75</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table Section */}
        <div ref={modelSectionRef} className="mt-12 md:mt-20 relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black text-center mb-8 md:mb-12 
    animate-pulse-slow">
            {t('modelPricing')}
          </h2>

          <div className="overflow-x-auto bg-white/5 dark:bg-gray-800 rounded-xl backdrop-blur-lg shadow-xl -mx-4 sm:mx-0">
            <div className="min-w-[800px]">
              {Object.entries(modelPricing).map(([category, models]) => (
                <div key={category} className="mb-8 pl-4 pt-4">
                  <h3 className="text-2xl font-bold text-red-500 dark:text-red-300 mb-4">{category}</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-white/10 dark:bg-gray-900 text-left">
                        <th className="p-3 md:p-4 text-white dark:text-gray-200 font-semibold rounded-tl-lg text-sm md:text-base">Model Name (API)</th>
                        <th className="p-3 md:p-4 text-white dark:text-gray-200 font-semibold text-sm md:text-base">Real Model Name</th>
                        <th className="p-3 md:p-4 text-white dark:text-gray-200 font-semibold text-sm md:text-base">Input Price ($/1M tokens)</th>
                        <th className="p-3 md:p-4 text-white dark:text-gray-200 font-semibold text-sm md:text-base">Output Price ($/1M tokens)</th>
                        <th className="p-3 md:p-4 text-white dark:text-gray-200 font-semibold rounded-tr-lg text-sm md:text-base">Rate Limit (daily)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((model, index) => (
                        <tr
                          key={index}
                          className="
                    border-b 
                    border-white/10 
                    dark:border-gray-700 
                    hover:bg-white/5 
                    dark:hover:bg-gray-800 
                    transition-colors
                    group
                  "
                        >
                          <td className="p-3 md:p-4">
                            <div className="flex items-center space-x-2">
                              <code className="text-blue-400 dark:text-blue-200 text-xs md:text-sm break-all">{model.apiName}</code>
                              <button
                                onClick={() => handleCopyCode(model.apiName)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Copy API Name"
                              >
                                <FaCopy className="text-blue-400 dark:text-blue-200 hover:text-blue-300 text-sm md:text-base" />
                              </button>
                            </div>
                          </td>
                          <td className="p-3 md:p-4 text-gray-300 dark:text-gray-500 text-sm md:text-base">{model.realName}</td>
                          <td className="p-3 md:p-4">
                            <div className="flex flex-col">
                              <span className="text-gray-400 dark:text-gray-600 line-through text-xs md:text-sm">${model.inputPrice.original.toFixed(2)}</span>
                              <span className="text-green-400 dark:text-green-200 font-bold text-sm md:text-base">${model.inputPrice.discounted.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="p-3 md:p-4">
                            <div className="flex flex-col">
                              <span className="text-gray-400 dark:text-gray-600 line-through text-xs md:text-sm">${model.outputPrice.original.toFixed(2)}</span>
                              <span className="text-green-400 dark:text-green-200 font-bold text-sm md:text-base">${model.outputPrice.discounted.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="p-3 md:p-4 text-gray-300 dark:text-gray-500 text-sm md:text-base">{model.rateLimit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Token Explanation Section */}
        <section className="mt-20 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/5 dark:bg-gray-800 rounded-2xl p-8 backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-white dark:text-gray-200 mb-8 text-center">
              {t('tokenInformation')}
            </h2>

            {/* Introduction */}
            <div className="text-center mb-10 text-gray-300 dark:text-gray-500">
              Hiểu sâu về cách AI xử lý và phân tích ngôn ngữ thông qua tokens.
            </div>

            {/* What are Tokens */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">{t('whatAreTokens')}</h3>
              <p className="text-gray-300 dark:text-gray-500 mb-4">
                Tokens là các đơn vị nhỏ nhất mà mô hình AI sử dụng để hiểu và xử lý dữ liệu.
              </p>
              <ul className="list-none space-y-2 text-gray-300 dark:text-gray-500">
                <li className="flex items-center gap-2">📚 Với văn bản: tokens có thể là từ, phần của từ, hoặc ký tự</li>
                <li className="flex items-center gap-2">🖼️ Với hình ảnh: tokens là các mảnh nhỏ của ảnh, gọi là patches</li>
                <li className="flex items-center gap-2">🎵 Với âm thanh: tokens là các khung thời gian hoặc đặc trưng âm thanh</li>
                <li className="flex items-center gap-2">💻 Với code: tokens có thể là từ khóa, toán tử, biến số</li>
                <li className="flex items-center gap-2">🎥 Với video: tokens có thể là các frame hoặc các phần của frame</li>
              </ul>
            </div>

            {/* Specific Token Examples */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">{t('tokenExamples')}</h3>
              <div className="grid gap-6">
                {/* Vietnamese Text Example */}
                <div className="bg-white/10 dark:bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl text-white dark:text-gray-200 mb-3">🇻🇳 Ví dụ Tiếng Việt:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 dark:text-gray-500 mb-2">Câu ngắn:</p>
                        <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                          <p className="text-white dark:text-gray-200 mb-2">"Xin chào"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">Xin</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">chào</span>
                            <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 2 tokens</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 dark:text-gray-500 mb-2">Câu dài:</p>
                        <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                          <p className="text-white dark:text-gray-200 mb-2">"Trí tuệ nhân tạo đang phát triển"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-500/20 bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">Trí</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">tuệ</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">nhân</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">tạo</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">đang</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">phát</span>
                            <span className="bg-blue-500/20 dark:bg-blue-200/20 px-3 py-1 rounded text-white dark:text-gray-200">triển</span>
                            <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 7 tokens</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* English Text Example */}
                <div className="bg-white/10 dark:bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl text-white dark:text-gray-200 mb-3">🇺🇸 Ví dụ Tiếng Anh:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 dark:text-gray-500 mb-2">Từ ghép:</p>
                        <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                          <p className="text-white dark:text-gray-200 mb-2">"artificial"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">art</span>
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">ific</span>
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">ial</span>
                            <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 3 tokens</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 dark:text-gray-500 mb-2">Số và ký tự đặc biệt:</p>
                        <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                          <p className="text-white dark:text-gray-200 mb-2">"AI-2025!"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">AI</span>
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">-</span>
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">2025</span>
                            <span className="bg-green-500/20 dark:bg-green-200/20 px-3 py-1 rounded text-white dark:text-gray-200">!</span>
                            <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 4 tokens</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Cases */}
                <div className="bg-white/10 dark:bg-gray-900 rounded-lg p-6">
                  <h4 className="text-xl text-white dark:text-gray-200 mb-3">🔍 Trường Hợp Đặc Biệt:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 dark:text-gray-500 mb-2">Emoji:</p>
                      <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                        <p className="text-white dark:text-gray-200 mb-2">"Hello 👋 World 🌍"</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">Hello</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">👋</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">World</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">🌍</span>
                          <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 4-8 tokens</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-300 dark:text-gray-500 mb-2">URL:</p>
                      <div className="bg-gray-800/50 dark:bg-gray-700 p-3 rounded">
                        <p className="text-white dark:text-gray-200 mb-2">"https://example.com"</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">https</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">://</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">example</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">.</span>
                          <span className="bg-purple-500/20 dark:bg-purple-200/20 px-3 py-1 rounded text-white dark:text-gray-200">com</span>
                          <span className="text-gray-400 dark:text-gray-600 ml-2">≈ 5 tokens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Limits */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">{t('tokenLimits')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/20 dark:bg-blue-400/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white dark:text-gray-200">GPT-4 🔵</h4>
                  <p className="text-gray-300 dark:text-gray-500">128K tokens</p>
                </div>
                <div className="bg-green-500/20 dark:bg-green-400/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white dark:text-gray-200">GPT-3.5 🟢</h4>
                  <p className="text-gray-300 dark:text-gray-500">16K tokens</p>
                </div>
                <div className="bg-purple-500/20 dark:bg-purple-400/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white dark:text-gray-200">Claude 🟣</h4>
                  <p className="text-gray-300 dark:text-gray-500">100K tokens</p>
                </div>
              </div>
            </div>

            {/* Token Correspondence */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">{t('tokenCorrespondence')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <p className="text-white dark:text-gray-200">Tiếng Anh</p>
                    <p className="text-gray-300 dark:text-gray-500">1 token ≈ 4-5 ký tự</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇻🇳</span>
                  <div>
                    <p className="text-white dark:text-gray-200">Tiếng Việt</p>
                    <p className="text-gray-300 dark:text-gray-500">1 token ≈ 2-3 ký tự</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Trends */}
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-gray-200 mb-4">{t('futureTrends')}</h3>
              <ul className="list-none space-y-2 text-gray-300 dark:text-gray-500">
                <li className="flex items-center gap-2">🎯 Tokenization đa phương thức</li>
                <li className="flex items-center gap-2">🌏 Tối ưu hóa cho ngôn ngữ đặc biệt</li>
                <li className="flex items-center gap-2">💎 Giảm chi phí xử lý token</li>
                <li className="flex items-center gap-2">⚡ Cải thiện hiệu suất mô hình</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 md:mt-20 relative z-10 px-4 pb-20">
          <p className="text-gray-300 dark:text-gray-500 mb-4 text-sm md:text-base">{t('footerText')}</p>
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-6 md:space-x-8 mb-4">
            <a
              href="https://www.youtube.com/@apishared"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white dark:text-gray-200 
                hover:text-red-500 dark:hover:text-red-400 
                transition-colors 
                duration-300
                flex items-center"
            >
              <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a
              href="https://www.facebook.com/share/g/BGj3PsxCXXVquAmE/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white dark:text-gray-200 
                hover:text-blue-500 dark:hover:text-blue-400 
                transition-colors 
                duration-300
                flex items-center"
            >
              <FaFacebook className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a
              href="https://t.me/rapidapisupporter"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white dark:text-gray-200 
                hover:text-blue-400 dark:hover:text-blue-300 
                transition-colors 
                duration-300
                flex items-center"
            >
              <FaTelegram className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
          <p className="text-gray-400 dark:text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">{t('copyrightText')}</p>
        </footer>
      </main>
    </div>
  )
}