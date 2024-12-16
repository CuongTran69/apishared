// pages/index.tsx
'use client';  // Add client directive for client-side components

import Head from 'next/head'
import { FaYoutube, FaFacebook, FaTelegram, FaCopy } from 'react-icons/fa'
import React, { useState, useEffect, useRef } from 'react'

// Define translations
const translations = {
  en: {
    title: 'API Shared - AI Services Hub',
    description: 'Access powerful AI APIs at discounted rates. Featuring OpenAI, Anthropic, and more.',
    youtubeSection: 'Featured API Shared Video Insights',
    modelsSection: 'AI Models',
    providersTitle: 'Providers',
    modelCodeCopy: 'Copy Model Code',
    socialConnect: 'Connect With Us',
    tokenInformation: '🤖 Tokens và Tokenization: Nền Tảng Của AI Trong Xử Lý Dữ Liệu',
    whatAreTokens: '📝 What is Tokens?',
    tokenExamples: '🎯 Ví Dụ Cụ Thể Về Token',
    tokenLimits: '📈 Giới Hạn Token của Các Mô Hình Phổ Biến',
    tokenCorrespondence: '📊 Token Tương ứng bao nhiêu từ?',
    futureTrends: '🔮 Xu Hướng Tương Lai',
    modelPricing: 'Model Pricing',
    footerText: 'Connect with us on social media',
    copyrightText: '2024 API Shared. All rights reserved.'
  },
  vi: {
    title: 'API Shared - Trung Tâm Dịch Vụ AI',
    description: 'Truy cập các API AI mạnh mẽ với mức ưu đãi cực lớn. Được trang bị các models của OpenAI, Anthropic và nhiều hơn nữa.',
    youtubeSection: 'Video Hướng dẫn sử dụng API Shared',
    modelsSection: 'Bảng giá token models AI',
    providersTitle: 'Nhà Cung Cấp',
    modelCodeCopy: 'Sao Chép Mã Mô Hình',
    socialConnect: 'Kết Nối Với Chúng Tôi',
    tokenInformation: '🤖 Tokens và Tokenization: Nền Tảng Của AI Trong Xử Lý Dữ Liệu',
    whatAreTokens: '📝 Tokens Là Gì?',
    tokenExamples: '🎯 Ví Dụ Cụ Thể Về Token',
    tokenLimits: '📈 Giới Hạn Token của Các Mô Hình Phổ Biến',
    tokenCorrespondence: '📊 Token Tương ứng bao nhiêu từ?',
    futureTrends: '🔮 Xu Hướng Tương Lai',
    modelPricing: 'Giá Mô Hình',
    footerText: 'Kết nối với chúng tôi trên mạng xã hội',
    copyrightText: '2024 API Shared. All rights reserved.'
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

  // Scroll to section function
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const modelPricing = [
    {
      apiName: 'anthropic:3-opus',
      realName: 'claude-3-opus',
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
      apiName: 'anthropic:3.5-sonnet',
      realName: 'claude-3.5-sonnet',
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
      apiName: 'openai:gpt-4o',
      realName: 'gpt-4o',
      inputPrice: { original: 2.50, discounted: 1.75 },
      outputPrice: { original: 10.00, discounted: 5 },
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
      apiName: 'openai:gpt-4o-mini',
      realName: 'gpt-4o-mini',
      inputPrice: { original: 0.15, discounted: 0.25 },
      outputPrice: { original: 0.60, discounted: 0.3 },
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
      apiName: 'openai:gpt-3.5-turbo',
      realName: 'gpt-3.5-turbo',
      inputPrice: { original: 0.50, discounted: 0.25 },
      outputPrice: { original: 1.50, discounted: 0.75 },
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

  const handleVideoSelect = (embedId: string) => {
    setSelectedVideo(embedId)
  }

  const handleCopyCode = (code: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
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
    <div className="min-h-screen bg-[#0A192F] p-4 overflow-hidden relative">
      {copyNotification.visible && (
        <div 
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg 
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

      <main className="container mx-auto px-4 py-16 relative">
        {/* Animated Tech Background Elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          <div className="absolute animate-pulse opacity-20 bg-blue-500 rounded-full w-64 h-64 -top-32 -right-32 blur-3xl"></div>
          <div className="absolute animate-bounce opacity-10 bg-purple-500 rounded-full w-48 h-48 top-1/3 -left-24 blur-2xl"></div>
          <div className="absolute animate-spin opacity-10 bg-green-500 rounded-full w-32 h-32 top-1/2 -left-12 blur-xl"></div>
          <div className="absolute animate-ping opacity-10 bg-yellow-500 rounded-full w-24 h-24 -top-16 -right-8 blur-sm"></div>
          <div className="absolute animate-ping opacity-10 bg-red-500 rounded-full w-12 h-12 top-1/4 -right-4 blur-xs"></div>
          <div className="absolute animate-ping opacity-10 bg-green-500 rounded-full w-12 h-12 bottom-1/4 -left-4 blur-xs"></div>
          <div className="absolute animate-bounce opacity-10 bg-blue-500 rounded-full w-24 h-24 -bottom-16 -left-8 blur-sm"></div>
          <div className="absolute animate-spin opacity-10 bg-yellow-500 rounded-full w-32 h-32 bottom-1/2 -right-12 blur-xl"></div>
          <div className="absolute animate-pulse opacity-20 bg-purple-500 rounded-full w-48 h-48 -bottom-32 -right-24 blur-2xl"></div>
        </div>

        {/* Hero Section */}
        <div className="text-center relative z-10 mb-12 md:mb-20 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-8 
            animate-fade-in leading-tight">
            API Shared
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed
            animate-fade-in-up px-4">
            {t('description')}
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={() => scrollToSection(videoSectionRef)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full 
              hover:bg-blue-700 transition duration-300 
              transform hover:scale-105 
              flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>{t('youtubeSection')}</span>
            </button>
            
            <button 
              onClick={() => scrollToSection(modelSectionRef)}
              className="px-6 py-3 border border-blue-400 text-blue-400 
              rounded-full hover:bg-blue-400 hover:text-white 
              transition duration-300 
              transform hover:scale-105 
              flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2V2zM5 5h10v12H5V5zm4 2a1 1 0 011 1v4a1 1 0 01-1 1H7a1 1 0 01-1-1V8a1 1 0 011-1h2zm6 0a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              <span>{t('modelsSection')}</span>
            </button>
          </div>
        </div>

        {/* Featured Video Section */}
        <section ref={videoSectionRef} className="mt-12 md:mt-20 relative z-10 px-4">
          <div className="">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12 
              animate-pulse-slow">
              {t('youtubeSection')}
            </h2>
            
            <div className="grid gap-2 md:gap-2 bg-white/5 rounded-xl backdrop-blur-lg shadow-xl">
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
          </div>
        </section>

        {/* Pricing Table Section */}
        <div ref={modelSectionRef} className="mt-12 md:mt-20 relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12 
            animate-pulse-slow">
            {t('modelPricing')}
          </h2>
          
          <div className="overflow-x-auto bg-white/5 rounded-xl backdrop-blur-lg shadow-xl -mx-4 sm:mx-0">
            <div className="min-w-[800px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/10 text-left">
                    <th className="p-3 md:p-4 text-white font-semibold rounded-tl-lg text-sm md:text-base">Model Name (API)</th>
                    <th className="p-3 md:p-4 text-white font-semibold text-sm md:text-base">Real Model Name</th>
                    <th className="p-3 md:p-4 text-white font-semibold text-sm md:text-base">Input Price ($/1M tokens)</th>
                    <th className="p-3 md:p-4 text-white font-semibold text-sm md:text-base">Output Price ($/1M tokens)</th>
                    <th className="p-3 md:p-4 text-white font-semibold rounded-tr-lg text-sm md:text-base">Rate Limit (daily)</th>
                  </tr>
                </thead>
                <tbody>
                  {modelPricing.map((model, index) => (
                    <tr 
                      key={index}
                      className="
                        border-b 
                        border-white/10 
                        hover:bg-white/5 
                        transition-colors
                        group
                      "
                    >
                      <td className="p-3 md:p-4">
                        <div className="flex items-center space-x-2">
                          <code className="text-blue-400 text-xs md:text-sm break-all">{model.apiName}</code>
                          <button 
                            onClick={() => handleCopyCode(model.apiName)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy API Name"
                          >
                            <FaCopy className="text-blue-400 hover:text-blue-300 text-sm md:text-base" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300 text-sm md:text-base">{model.realName}</td>
                      <td className="p-3 md:p-4">
                        <div className="flex flex-col">
                          <span className="text-gray-400 line-through text-xs md:text-sm">${model.inputPrice.original.toFixed(2)}</span>
                          <span className="text-green-400 font-bold text-sm md:text-base">${model.inputPrice.discounted.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex flex-col">
                          <span className="text-gray-400 line-through text-xs md:text-sm">${model.outputPrice.original.toFixed(2)}</span>
                          <span className="text-green-400 font-bold text-sm md:text-base">${model.outputPrice.discounted.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300 text-sm md:text-base">{model.rateLimit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Token Explanation Section */}
        <section className="mt-20 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/5 rounded-2xl p-8 backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t('tokenInformation')}
            </h2>

            {/* Introduction */}
            <div className="text-center mb-10 text-gray-300">
              Hiểu sâu về cách AI xử lý và phân tích ngôn ngữ thông qua tokens.
            </div>

            {/* What are Tokens */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">{t('whatAreTokens')}</h3>
              <p className="text-gray-300 mb-4">
                Tokens là các đơn vị nhỏ nhất mà mô hình AI sử dụng để hiểu và xử lý dữ liệu.
              </p>
              <ul className="list-none space-y-2 text-gray-300">
                <li className="flex items-center gap-2">📚 Với văn bản: tokens có thể là từ, phần của từ, hoặc ký tự</li>
                <li className="flex items-center gap-2">🖼️ Với hình ảnh: tokens là các mảnh nhỏ của ảnh, gọi là patches</li>
                <li className="flex items-center gap-2">🎵 Với âm thanh: tokens là các khung thời gian hoặc đặc trưng âm thanh</li>
                <li className="flex items-center gap-2">💻 Với code: tokens có thể là từ khóa, toán tử, biến số</li>
                <li className="flex items-center gap-2">🎥 Với video: tokens có thể là các frame hoặc các phần của frame</li>
              </ul>
            </div>

            {/* Specific Token Examples */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">{t('tokenExamples')}</h3>
              <div className="grid gap-6">
                {/* Vietnamese Text Example */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl text-white mb-3">🇻🇳 Ví dụ Tiếng Việt:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 mb-2">Câu ngắn:</p>
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-white mb-2">"Xin chào"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">Xin</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">chào</span>
                            <span className="text-gray-400 ml-2">≈ 2 tokens</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Câu dài:</p>
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-white mb-2">"Trí tuệ nhân tạo đang phát triển"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">Trí</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">tuệ</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">nhân</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">tạo</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">đang</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">phát</span>
                            <span className="bg-blue-500/20 px-3 py-1 rounded text-white">triển</span>
                            <span className="text-gray-400 ml-2">≈ 7 tokens</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* English Text Example */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl text-white mb-3">🇺🇸 Ví dụ Tiếng Anh:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 mb-2">Từ ghép:</p>
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-white mb-2">"artificial"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">art</span>
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">ific</span>
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">ial</span>
                            <span className="text-gray-400 ml-2">≈ 3 tokens</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">Số và ký tự đặc biệt:</p>
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-white mb-2">"AI-2024!"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">AI</span>
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">-</span>
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">2024</span>
                            <span className="bg-green-500/20 px-3 py-1 rounded text-white">!</span>
                            <span className="text-gray-400 ml-2">≈ 4 tokens</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Cases */}
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl text-white mb-3">🔍 Trường Hợp Đặc Biệt:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">Emoji:</p>
                      <div className="bg-gray-800/50 p-3 rounded">
                        <p className="text-white mb-2">"Hello 👋 World 🌍"</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">Hello</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">👋</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">World</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">🌍</span>
                          <span className="text-gray-400 ml-2">≈ 4-8 tokens</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-2">URL:</p>
                      <div className="bg-gray-800/50 p-3 rounded">
                        <p className="text-white mb-2">"https://example.com"</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">https</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">://</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">example</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">.</span>
                          <span className="bg-purple-500/20 px-3 py-1 rounded text-white">com</span>
                          <span className="text-gray-400 ml-2">≈ 5 tokens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Limits */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">{t('tokenLimits')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">GPT-4 🔵</h4>
                  <p className="text-gray-300">128K tokens</p>
                </div>
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">GPT-3.5 🟢</h4>
                  <p className="text-gray-300">16K tokens</p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white">Claude 🟣</h4>
                  <p className="text-gray-300">100K tokens</p>
                </div>
              </div>
            </div>

            {/* Token Correspondence */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">{t('tokenCorrespondence')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <p className="text-white">Tiếng Anh</p>
                    <p className="text-gray-300">1 token ≈ 4-5 ký tự</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇻🇳</span>
                  <div>
                    <p className="text-white">Tiếng Việt</p>
                    <p className="text-gray-300">1 token ≈ 2-3 ký tự</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Trends */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">{t('futureTrends')}</h3>
              <ul className="list-none space-y-2 text-gray-300">
                <li className="flex items-center gap-2">🎯 Tokenization đa phương thức</li>
                <li className="flex items-center gap-2">🌏 Tối ưu hóa cho ngôn ngữ đặc biệt</li>
                <li className="flex items-center gap-2">💎 Giảm chi phí xử lý token</li>
                <li className="flex items-center gap-2">⚡ Cải thiện hiệu suất mô hình</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 md:mt-20 relative z-10 px-4">
          <p className="text-gray-300 mb-4 text-sm md:text-base">{t('footerText')}</p>
          <div className="flex justify-center space-x-6 md:space-x-8">
            <a 
              href="https://www.youtube.com/@apishared" 
              target="_blank" 
              rel="noopener noreferrer"
              className="
                text-white 
                hover:text-red-500 
                transition-colors 
                duration-300
              "
            >
              <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a 
              href="https://www.facebook.com/share/g/BGj3PsxCXXVquAmE/" 
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white 
                hover:text-blue-500 
                transition-colors 
                duration-300
              "
            >
              <FaFacebook className="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a 
              href="https://t.me/rapidapisupporter" 
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-white 
                hover:text-blue-400 
                transition-colors 
                duration-300
              "
            >
              <FaTelegram className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
          <p className="text-gray-400 mt-6 md:mt-8 text-xs md:text-sm">{t('copyrightText')}</p>
        </footer>

        {/* Language Toggle Button */}
        <div className="absolute top-1 right-4">
          <button 
            onClick={toggleLanguage} 
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition flex items-center space-x-2"
          >
            {language === 'vi' ? '🇻🇳' : '🇬🇧'}
          </button>
        </div>
      </main>
    </div>
  )
}