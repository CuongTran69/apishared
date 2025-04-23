// pages/index.tsx
'use client';  // Add client directive for client-side components

import Head from 'next/head'
import { FaFacebook, FaTelegram, FaCopy, FaCode } from 'react-icons/fa'
import React, { useState, useEffect, useRef } from 'react'
import ApiTester from './components/ApiTester'

// Define translations
const translations = {
  en: {
    title: 'API Shared - All in one API',
    description: 'Access powerful AI APIs at discounted rates. Featuring OpenAI, Anthropic, and more.',
    exploreAPILLM: 'Explore LLMAIVN',
    modelsSection: 'Prices Token Models',
    joinUs: 'Join Us',
    providersTitle: 'Providers',
    modelCodeCopy: 'Copy Model Code',
    bonusPricing: 'Bonus Recharge',
    modelPricing: 'AI Model Pricing',
    footerText: 'Join our community groups to get $2 credit and 24h free trial access! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    freeTrial: 'Free Trial',
    joinAndTest: 'Join and Test API',
    tryBeforeYouBuy: 'Try before you buy with our trial offer',
    freeCreditText: "Free",
    bonusCreditTiers: 'Bonus Credit Tiers:',
    minimumDeposit: 'Minimum deposit:',
    bonusRate: 'Bonus rate:',
    exampleInvestment: 'Example Investment',
    totalBalanceAfterBonus: 'Total Balance After Bonus',
    contactUsToPurchase: 'Contact Us to Purchase',
    validFor: 'Valid for',
    tenPlusPurchase: '$10+ Purchase',
    getExtraTen: 'Get an extra 100% bonus when you spend over $10',
    spend: 'Spend',
    bonus: 'Bonus',
    bonusPercentage: 'Bonus %',
    tenDollarTier: 'Buy 10$: 100% Bonus',
    testApiKey: 'Test API Key',
    placeholder: 'Search models...',
    modelName: 'Model Name',
    realModelName: 'Real Model Name',
    inputPrice: 'Input Price ($/1M tokens)',
    outputPrice: 'Output Price ($/1M tokens)',
    showAll: 'Show all',
    showLess: 'Show less'
  },
  vi: {
    title: 'API Shared - All in one API',
    description: 'Truy cập các API AI mạnh mẽ với mức ưu đãi cực lớn. Được trang bị các models của OpenAI, Anthropic và nhiều hơn nữa.',
    exploreAPILLM: 'Khám phá LLMAIVN',
    modelsSection: 'Giá token models AI',
    joinUs: 'Tham gia cùng chúng tôi',
    providersTitle: 'Nhà Cung Cấp',
    modelCodeCopy: 'Sao Chép Mã Mô Hình',
    bonusPricing: 'Ưu đãi nạp tiền',
    modelPricing: 'Giá Các Models AI',
    footerText: 'Tham gia nhóm cộng đồng của chúng tôi để nhận $2 credit và 24h miễn phí dùng thử! 🎁',
    copyrightText: '2024 API Shared. All rights reserved.',
    freeTrial: 'Dùng thử miễn phí',
    joinAndTest: 'Tham gia và dùng thử API',
    tryBeforeYouBuy: 'Dùng thử trước khi mua',
    freeCreditText: 'Miễn phí',
    bonusCreditTiers: 'Ưu Đãi Nạp Tiền',
    minimumDeposit: 'Mệnh giá nạp tối thiểu:',
    bonusRate: 'Tỷ lệ ưu đãi:',
    exampleInvestment: 'Ví dụ đầu tư:',
    totalBalanceAfterBonus: 'Tổng số dư sau khi nhận ưu đãi',
    contactUsToPurchase: 'Liên hệ với chúng tôi để mua',
    validFor: 'Hạn sử dụng',
    tenPlusPurchase: 'Mua Trên $10',
    getExtraTen: 'Nhận thêm ưu đãi 100% khi nạp trên $10',
    spend: 'Chi Tiêu',
    bonus: 'Ưu Đãi',
    bonusPercentage: '% Ưu Đãi',
    tenDollarTier: 'Mua trên $10: Ưu Đãi 100%',
    testApiKey: 'Kiểm Tra API Key',
    placeholder: 'Tìm kiếm model...',
    modelName: 'Tên Model',
    realModelName: 'Tên Model Thực',
    inputPrice: 'Giá Input ($/1M tokens)',
    outputPrice: 'Giá Output ($/1M tokens)',
    showAll: 'Hiển thị tất cả',
    showLess: 'Hiển thị ít hơn'
  }
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>('EOdb9EPEEqQ')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copyNotification, setCopyNotification] = useState({
    message: '',
    visible: false
  })
  const [isApiTesterOpen, setIsApiTesterOpen] = useState(false)

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
      }
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
        <link rel="icon" href="/public/logo.png" />
      </Head>

      <main className="container mx-auto px-4 relative dark:bg-white">
        {/* Enhanced Header Menu with Action Buttons */}
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
                    onClick={() => scrollToSection(bonusSectionRef)} 
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
                    onClick={() => scrollToSection(modelSectionRef)} 
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
                    onClick={() => scrollToSection(footerSectionRef)} 
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
                        id: 'EOdb9EPEEqQ',
                        title: 'Build local Cherry Studio',
                        duration: '9:32',
                        thumbnail: '/path/to/thumbnail1.jpg'
                      },
                      {
                        id: 'D3IOT6z0Bb0',
                        title: 'Hướng dẫn thêm API vào IDE (Vscode, Cursor, Windsurf)',
                        duration: '6:59',
                        thumbnail: '/path/to/thumbnail2.jpg'
                      },
                      {
                        id: 'jjAwWP1R8jo',
                        title: 'Getting Started Guide',
                        duration: '8:28',
                        thumbnail: '/path/to/thumbnail1.jpg'
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
                <span className="text-2xl font-bold text-green-400">{t('freeTrial')}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {t('joinAndTest')}
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              {t('tryBeforeYouBuy')}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">{t('freeCreditText')} <span className="text-green-400 font-semibold">$2</span> credit</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">{t('validFor')} <span className="text-green-400 font-semibold">24 hours</span></span>
              </div>
            </div>

            <button
              onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {t('joinAndTest')}
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
                <span className="text-2xl font-bold text-blue-400">{t('tenPlusPurchase')}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {t('bonusCreditTiers')}
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              {t('getExtraTen')}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">{t('minimumDeposit')} <span className="text-blue-400 font-semibold">$10</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">{t('bonusRate')} <span className="text-blue-400 font-semibold">100%</span></span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">{t('exampleInvestment')}</div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-2xl font-bold text-white">$10</div>
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="text-2xl font-bold text-blue-400">$20</div>
                </div>
                <div className="text-sm text-gray-400 mt-2">{t('totalBalanceAfterBonus')}</div>
              </div>
            </div>

            <button
              onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold py-3 px-6 rounded-xl mt-8 transition-colors"
            >
              {t('contactUsToPurchase')}
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
                placeholder={t('placeholder')}
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
                              {t('modelName')}
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base">
                              {t('realModelName')}
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base whitespace-nowrap">
                              {t('inputPrice')}
                            </th>
                            <th className="p-4 text-left text-white dark:text-gray-200 font-semibold text-sm md:text-base whitespace-nowrap">
                              {t('outputPrice')}
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
                          {isExpanded ? t('showLess') : t('showAll')}
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