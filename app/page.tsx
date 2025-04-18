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
    bonusPricing: 'Bonus Recharge',
    modelPricing: 'AI Model Pricing',
    footerText: 'Join our community groups to get $2 credit and 24h free trial access! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    bonusCreditTiers: 'Bonus Credit Tiers',
    tenPlusPurchase: '$10+ Purchase',
    fiftyPlusPurchase: '$50+ Purchase',
    getExtraTen: 'Get an extra 100% bonus when you spend over $10',
    receiveExtraSeventyFive: 'Get an extra 150% bonus when you spend over $50',
    spend: 'Spend',
    bonus: 'Bonus',
    bonusPercentage: 'Bonus %',
    tenDollarTier: 'Buy 10$: 100% Bonus',
    fiftyDollarTier: 'Buy 50$: 150% Bonus',
    fiftyPlus: '$50+',
    seventyFivePlus: '$75+'
  },
  vi: {
    title: 'API Shared - Tất cả AI chỉ trong 1 API',
    description: 'Truy cập các API AI mạnh mẽ với mức ưu đãi cực lớn. Được trang bị các models của OpenAI, Anthropic và nhiều hơn nữa.',
    modelsSection: 'Giá token models AI',
    providersTitle: 'Nhà Cung Cấp',
    modelCodeCopy: 'Sao Chép Mã Mô Hình',
    bonusPricing: 'Ưu đãi nạp tiền',
    modelPricing: 'Giá Các Mô Hình AI',
    footerText: 'Tham gia nhóm cộng đồng của chúng tôi để nhận $2 credit và 24h miễn phí dùng thử! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    bonusCreditTiers: 'Ưu Đãi Nạp Tiền',
    tenPlusPurchase: 'Mua Trên $10',
    fiftyPlusPurchase: 'Mua Trên $50',
    getExtraTen: 'Nhận thêm ưu đãi 100% khi nạp trên $10',
    receiveExtraSeventyFive: 'Nhận thêm ưu đãi 150% khi nạp trên $50',
    spend: 'Chi Tiêu',
    bonus: 'Ưu Đãi',
    bonusPercentage: '% Ưu Đãi',
    tenDollarTier: 'Mua trên $10: Ưu Đãi 100%',
    fiftyDollarTier: 'Mua trên $50: Ưu Đãi 150%',
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

  const [filterText, setFilterText] = useState('');

  // Add this helper function
  const filterModels = (models: any[], filter: string) => {
    if (!filter) return models;
    return models.filter(model =>
      model.apiName.toLowerCase().includes(filter.toLowerCase()) ||
      model.realName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // Properly type the refs
  const footerSectionRef = useRef<HTMLDivElement | null>(null)
  const modelSectionRef = useRef<HTMLDivElement | null>(null)
  const bonusSectionRef = useRef<HTMLDivElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section function
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    setMenuOpen(false); // Close menu when navigating
    if (sectionRef.current) {
      const yOffset = -80; // Adjust this value based on your header height
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const modelPricing = {
    "Anthropic Models": [
      {
        apiName: 'anthropic:3.7-sonnet-search',
        realName: 'Claude 3.7 Search',
        inputPrice: { original: 3.75, discounted: 1.88 },
        outputPrice: { original: 18.75, discounted: 9.38 }
      },
      {
        apiName: 'anthropic:3.7-sonnet-thinking-search',
        realName: 'Claude 3.7 Thinking Search',
        inputPrice: { original: 5.00, discounted: 2.50 },
        outputPrice: { original: 25.00, discounted: 12.5 }
      },
      {
        apiName: 'anthropic:3.7-sonnet',
        realName: 'Claude 3.7 Sonnet',
        inputPrice: { original: 3.75, discounted: 1.88 },
        outputPrice: { original: 18.75, discounted: 9.38 }
      },
      {
        apiName: 'anthropic:3.7-sonnet-thinking',
        realName: 'Claude 3.7 Thinking Mode Extended',
        inputPrice: { original: 5.00, discounted: 2.50 },
        outputPrice: { original: 25.00, discounted: 12.5 }
      },
      {
        apiName: 'anthropic:3.5-sonnet-search',
        realName: 'claude-3.5-sonnet-20241022',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 }
      },
      {
        apiName: 'anthropic:3.5-sonnet-20241022',
        realName: 'claude-3.5-sonnet-20241022',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 }
      },
      {
        apiName: 'anthropic:3.5-sonnet-20241022-think-exp',
        realName: 'claude-3.5-sonnet-20241022-think-exp',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 }
      },
      {
        apiName: 'anthropic:3-opus',
        realName: 'Claude-3-opus',
        inputPrice: { original: 15.00, discounted: 7.5 },
        outputPrice: { original: 75.00, discounted: 37.5 }
      },
      {
        apiName: 'anthropic:3-opus-think-exp',
        realName: 'Claude-3-opus-think-exp',
        inputPrice: { original: 15.00, discounted: 7.5 },
        outputPrice: { original: 75.00, discounted: 37.5 }
      },
      {
        apiName: 'anthropic:3.5-sonnet',
        realName: 'claude-3.5-sonnet',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 }
      },
      {
        apiName: 'anthropic:3.5-sonnet-think-exp',
        realName: 'claude-3.5-sonnet-think-exp',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 15.00, discounted: 7.5 }
      },
      {
        apiName: 'anthropic:3.5-haiku',
        realName: 'claude-3.5-haiku',
        inputPrice: { original: 1.00, discounted: 0.5 },
        outputPrice: { original: 5.00, discounted: 2.5 }
      },
    ],
    "OpenAI Models": [
      {
        apiName: 'openai:o4-mini',
        realName: 'OpenAI o4 mini',
        inputPrice: { original: 0, discounted: 0 },
        outputPrice: { original: 0, discounted: 0 }
      },
      {
        apiName: 'openai:gpt-4.1',
        realName: 'OpenAI 4.1',
        inputPrice: { original: 2.00, discounted: 1.00 },
        outputPrice: { original: 8.00, discounted: 8.00 }
      },
      {
        apiName: 'openai:o1',
        realName: 'OpenAI o1',
        inputPrice: { original: 15.00, discounted: 7.50 },
        outputPrice: { original: 60.00, discounted: 30.00 }
      },
      {
        apiName: 'openai:o3-mini',
        realName: 'OpenAI o3-mini',
        inputPrice: { original: 2.20, discounted: 1.10 },
        outputPrice: { original: 8.80, discounted: 4.40 }
      },
      {
        apiName: 'openai:o3-mini-think-exp',
        realName: 'OpenAI o3-mini',
        inputPrice: { original: 2.20, discounted: 1.10 },
        outputPrice: { original: 8.80, discounted: 4.40 }
      },
      {
        apiName: 'openai:gpt-4o',
        realName: 'OpenAI 4o',
        inputPrice: { original: 2.50, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'openai:gpt-4o-search',
        realName: 'OpenAI 4o search',
        inputPrice: { original: 2.50, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'openai:gpt-4o-mini',
        realName: 'OpenAI 4o-mini',
        inputPrice: { original: 0.15, discounted: 0.075 },
        outputPrice: { original: 0.60, discounted: 0.3 }
      },
      {
        apiName: 'openai:gpt-4o-2024-08-06',
        realName: 'OpenAI 4o-2024-08-06',
        inputPrice: { original: 2.50, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'openai:o1-mini',
        realName: 'OpenAI o1-mini',
        inputPrice: { original: 3.00, discounted: 1.5 },
        outputPrice: { original: 12.00, discounted: 6.00 }
      },
      {
        apiName: 'openai:gpt-4',
        realName: 'OpenAI gpt-4',
        inputPrice: { original: 30.00, discounted: 15.00 },
        outputPrice: { original: 60.00, discounted: 30.00 }
      },
      {
        apiName: 'openai:gpt-4-turbo-2024-04-09',
        realName: 'OpenAI gpt-4-turbo-2024-04-09',
        inputPrice: { original: 10.00, discounted: 5.00 },
        outputPrice: { original: 30.00, discounted: 15.00 }
      }
    ],
    "DeepSeek Models": [
      {
        apiName: 'deepseek:deepseek-v3-0324',
        realName: 'Deepseek v3 03-2024',
        inputPrice: { original: 0.5, discounted: 0.25 },
        outputPrice: { original: 1.5, discounted: 0.75 }
      },
      {
        apiName: 'deepseek:deepseek-r1-search',
        realName: 'Deepseek R1 search',
        inputPrice: { original: 0.80, discounted: 0.40 },
        outputPrice: { original: 2.40, discounted: 1.20 }
      },
      {
        apiName: 'deepseek:deepseek-r1',
        realName: 'Deepseek Reasoner',
        inputPrice: { original: 0.80, discounted: 0.40 },
        outputPrice: { original: 2.40, discounted: 1.20 }
      }
    ],
    "Grok Models": [
      {
        apiName: 'grok:grok-3',
        realName: 'Grok v3',
        inputPrice: { original: 3.00, discounted: 1.50 },
        outputPrice: { original: 15.00, discounted: 7.50 }
      },
      {
        apiName: 'grok-3-deepsearch',
        realName: 'Grok v3 Deep search',
        inputPrice: { original: 1.50, discounted: 0.75 },
        outputPrice: { original: 7.50, discounted: 3.75 }
      },
      {
        apiName: 'grok-3-reasoner',
        realName: 'Grok v3 reasoner',
        inputPrice: { original: 1.50, discounted: 0.75 },
        outputPrice: { original: 7.50, discounted: 3.75 }
      },
      {
        apiName: 'grok:grok-2',
        realName: 'Grok v2',
        inputPrice: { original: 2.00, discounted: 1.00 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'grok:grok-2-think-exp',
        realName: 'Grok v2 Deep Think',
        inputPrice: { original: 2.00, discounted: 1.00 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
    ],
    "Gemini Models": [
      {
        apiName: 'gemini:gemini-2.5-pro-exp-03-25',
        realName: 'Gemini 2.5 Pro',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'gemini:gemini-2.5-pro-exp-03-25-search',
        realName: 'Gemini 2.5 Pro Search',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'gemini:gemini-2.0-pro-exp',
        realName: 'Gemini 2.0',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'gemini:gemini-2.0-pro-exp-search',
        realName: 'Gemini 2.0 Pro Search',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
      {
        apiName: 'gemini:gemini-2.0-pro-exp-think-exp',
        realName: 'Gemini 2.0 Deep Think',
        inputPrice: { original: 2.5, discounted: 1.25 },
        outputPrice: { original: 10.00, discounted: 5.00 }
      },
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

  // Thay đổi state variables
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Thêm helper function để toggle expanded state
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

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
  }, [menuOpen]);

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
              <a href="https://api.llm.ai.vn" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-500 rounded">
                Explore API LLM
              </a>
              <button onClick={() => scrollToSection(bonusSectionRef)} className="px-4 py-2 bg-green-500 rounded">
                {t('bonusPricing')}
              </button>
              <button onClick={() => scrollToSection(modelSectionRef)} className="px-4 py-2 border border-gray-300 text-white rounded">
                {t('modelsSection')}
              </button>
              <button onClick={() => scrollToSection(footerSectionRef)} className="px-4 py-2 bg-blue-500 rounded">
                Join Us
              </button>
              <button onClick={toggleLanguage} className="px-3 py-1 bg-white/10 text-white rounded">
                {language === 'vi' ? '🇬🇧' : '🇻🇳'}
              </button>
            </nav>
            {/* Title displayed only on mobile */}
            <h1 className="text-2xl font-bold pl-12 pt-1 text-white md:hidden">API Shared</h1>
            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden fixed top-4 left-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-lg z-50 transition-all duration-300"
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
          </div>
          {/* Mobile Menu - Compact Style */}
          {menuOpen && (
            <div className="fixed left-4 top-20 z-40 md:hidden">
              <div 
                ref={menuRef}
                className="bg-white rounded-2xl shadow-xl p-2 w-64 transform transition-all duration-300 animate-slideIn"
              >
                <div className="flex flex-col space-y-1">
                  <a 
                    href="https://api.llm.ai.vn" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200"
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
                    onClick={() => scrollToSection(bonusSectionRef)} 
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">{t('bonusPricing')}</span>
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection(modelSectionRef)} 
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
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
                    onClick={() => scrollToSection(footerSectionRef)} 
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">Join Us</span>
                  </button>
                  
                  <hr className="my-1 border-gray-200" />
                  
                  <button 
                    onClick={toggleLanguage} 
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100">
                      <span className="text-xl">{language === 'vi' ? '🇬🇧' : '🇻🇳'}</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      {language === 'vi' ? 'English' : 'Tiếng Việt'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
        {/* Featured Video Section */}
        <section className="mt-16 md:mt-20 relative z-10 px-4 dark:bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Video Player Container */}
            <div className="grid gap-8 md:grid-cols-12">
              {/* Main Video Player */}
              <div className="md:col-span-8">
                <div className="bg-white/5 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  {selectedVideo && (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo}`}
                        title="Featured Tutorial"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                        className="w-full h-full"
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white dark:text-gray-200">
                      Getting Started with API Shared
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 mt-2 text-sm">
                      Learn the basics of integrating our API services into your applications
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Playlist */}
              <div className="md:col-span-4">
                <div className="bg-white/5 dark:bg-gray-800 rounded-2xl p-4 h-full">
                  <h3 className="text-lg font-semibold text-white dark:text-gray-200 mb-4">
                    More Tutorials
                  </h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {[
                      {
                        id: 'jjAwWP1R8jo',
                        title: 'Getting Started Guide',
                        duration: '8:28',
                        thumbnail: '/path/to/thumbnail1.jpg'
                      },
                      {
                        id: 'D3IOT6z0Bb0',
                        title: 'Hướng dẫn thêm API vào IDE (Vscode, Cursor, Windsurf)',
                        duration: '6:59',
                        thumbnail: '/path/to/thumbnail2.jpg'
                      },
                      {
                        id: 'DqcIc2jtrC0',
                        title: 'Dùng API cá nhân để sử dụng trong các workflow (n8n AI Automation)',
                        duration: '4:33',
                        thumbnail: '/path/to/thumbnail3.jpg'
                      },
                      {
                        id: 'xGzvFbTUdC0',
                        title: 'Dùng API cá nhân với Chatbox AI siêu nhiều tính năng',
                        duration: '4:33',
                        thumbnail: '/path/to/thumbnail3.jpg'
                      }
                    ].map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video.id)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all
                  ${selectedVideo === video.id
                            ? 'bg-blue-500/20 border border-blue-500/50'
                            : 'hover:bg-white/5 dark:hover:bg-gray-700'
                          }`}
                      >
                        <div className="relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gray-700"></div>
                          <span className="absolute bottom-1 right-1 text-xs text-white bg-black/60 px-1 rounded">
                            {video.duration}
                          </span>
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-medium text-white dark:text-gray-200 line-clamp-2">
                            {video.title}
                          </h4>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bonus Tiers Container */}
        <section ref={bonusSectionRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
          {/* Trial Tier */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-lg rounded-3xl p-8 
    border border-green-500/20 shadow-xl transform transition-all duration-300 hover:scale-102 
    hover:shadow-green-500/20 hover:border-green-500/40">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-green-500/20 p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-green-500/10 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold text-green-400">Free Trial</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Join and Test API
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Try before you buy with our trial offer
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">Free <span className="text-green-400 font-semibold">$2</span> credit</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">Valid for <span className="text-green-400 font-semibold">24 hours</span></span>
              </div>
            </div>

            <button
              onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Join Group to Start
            </button>
          </div>

          {/* Tier 1: $10+ Purchase */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-lg rounded-3xl p-8 
    border border-blue-500/20 shadow-xl transform transition-all duration-300 hover:scale-102 
    hover:shadow-blue-500/20 hover:border-blue-500/40">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="bg-blue-500/10 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold text-blue-400">$10+ Purchase</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Standard Bonus Tier
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Double your investment with our standard bonus tier
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">Minimum deposit: <span className="text-blue-400 font-semibold">$10</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">Bonus rate: <span className="text-blue-400 font-semibold">100%</span></span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Example Investment</div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-2xl font-bold text-white">$10</div>
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="text-2xl font-bold text-blue-400">$20</div>
                </div>
                <div className="text-sm text-gray-400 mt-2">Total Balance After Bonus</div>
              </div>
            </div>

            <button
              onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold py-3 px-6 rounded-xl mt-8 transition-colors"
            >
              Contact Us to Purchase
            </button>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section ref={modelSectionRef} className="mt-12 md:mt-20 relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black text-center mb-8 md:mb-12">
            {t('modelPricing')}
          </h2>

          {/* Search Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search models..."
                className="w-full px-4 py-3 bg-white/5 dark:bg-gray-800 rounded-xl 
          border border-white/10 dark:border-gray-700
          text-white dark:text-gray-200 
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto md:overflow-visible rounded-xl shadow-xl">
            <div className="min-w-0 md:min-w-[800px] space-y-8">
              {Object.entries(modelPricing).map(([category, models]) => {
                const filteredModels = filterModels(models, filterText);
                if (filteredModels.length === 0) return null;

                const isExpanded = expandedCategories.includes(category);
                const displayedModels = isExpanded ? filteredModels : filteredModels.slice(0, 5);
                const hasMoreModels = filteredModels.length > 5;

                return (
                  <div key={category} className="bg-white/5 dark:bg-gray-800 backdrop-blur-lg rounded-xl overflow-hidden">
                    <h3 
                      className="text-xl font-bold text-white dark:text-red-300 bg-red-500/20 p-4 border-b border-white/10 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleCategory(category)}
                    >
                      <span>{category} ({filteredModels.length} models)</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h3>

                    {/* Desktop version - Table */}
                    <div className="hidden md:block">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-white/10 dark:bg-gray-900">
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base w-1/3">
                              Model Name
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base">
                              Real Model Name
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base whitespace-nowrap">
                              Input Price ($/1M tokens)
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base whitespace-nowrap">
                              Output Price ($/1M tokens)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayedModels.map((model, index) => (
                            <tr
                              key={index}
                              className="border-b border-white/10 dark:border-gray-700 hover:bg-white/5 dark:hover:bg-gray-800 transition-colors group"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2 group">
                                  <code className="text-blue-400 dark:text-blue-200 text-sm font-mono break-all">
                                    {model.apiName}
                                  </code>
                                  <button
                                    onClick={() => handleCopyCode(model.apiName)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                    title="Copy API Name"
                                  >
                                    <FaCopy className="text-blue-400 dark:text-blue-200 hover:text-blue-300" />
                                  </button>
                                </div>
                              </td>
                              <td className="p-4 text-gray-300 dark:text-gray-400 text-sm">
                                {model.realName}
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                    ${model.inputPrice.original.toFixed(2)}
                                  </span>
                                  <span className="text-green-400 dark:text-green-300 font-bold">
                                    ${model.inputPrice.discounted.toFixed(2)}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                    ${model.outputPrice.original.toFixed(2)}
                                  </span>
                                  <span className="text-green-400 dark:text-green-300 font-bold">
                                    ${model.outputPrice.discounted.toFixed(2)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile version - Cards */}
                    <div className="md:hidden">
                      <div className="grid gap-3 p-3">
                        {displayedModels.map((model, index) => (
                          <div 
                            key={index} 
                            className="bg-[#0F2442] rounded-lg p-4 border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <div className="mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-blue-400 dark:text-blue-200 text-sm font-mono break-all line-clamp-1">
                                  {model.apiName}
                                </code>
                                <button
                                  onClick={() => handleCopyCode(model.apiName)}
                                  className="flex-shrink-0"
                                  title="Copy API Name"
                                >
                                  <FaCopy className="text-blue-400 dark:text-blue-200 hover:text-blue-300 w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-gray-300 dark:text-gray-400 text-xs mb-1">
                                {model.realName}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 mt-2">
                              <div className="bg-[#162D50] p-3 rounded">
                                <div className="text-xs text-gray-400 mb-1">Input Price ($/1M tokens)</div>
                                <div className="flex flex-col">
                                  <span className="text-gray-400 dark:text-gray-500 line-through text-xs">
                                    ${model.inputPrice.original.toFixed(2)}
                                  </span>
                                  <span className="text-green-400 dark:text-green-300 font-bold">
                                    ${model.inputPrice.discounted.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="bg-[#162D50] p-3 rounded">
                                <div className="text-xs text-gray-400 mb-1">Output Price ($/1M tokens)</div>
                                <div className="flex flex-col">
                                  <span className="text-gray-400 dark:text-gray-500 line-through text-xs">
                                    ${model.outputPrice.original.toFixed(2)}
                                  </span>
                                  <span className="text-green-400 dark:text-green-300 font-bold">
                                    ${model.outputPrice.discounted.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Show All / Show Less button */}
                    {hasMoreModels && (
                      <div className="p-3 border-t border-white/10 bg-white/5 text-center">
                        <button 
                          onClick={() => toggleCategory(category)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex md:inline-flex items-center justify-center mx-auto px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                        >
                          {isExpanded ? 'Show less' : `Show all ${filteredModels.length} models`}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer ref={footerSectionRef} className="text-center mt-12 md:mt-20 relative z-10 px-4 pb-20">
          <p className="text-gray-300 dark:text-gray-500 mb-4 text-sm md:text-base">{t('footerText')}</p>
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-6 md:space-x-8 mb-4">
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
          </div>
          <p className="text-gray-400 dark:text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">{t('copyrightText')}</p>
        </footer>
      </main>
    </div>
  )
}