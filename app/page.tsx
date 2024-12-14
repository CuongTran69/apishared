// pages/index.tsx
'use client';  // Add client directive for client-side components

import Head from 'next/head'
import Image from 'next/image'
import { FaYoutube, FaFacebook, FaTelegram, FaCopy } from 'react-icons/fa'
import React, { useState } from 'react'

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>('jjAwWP1R8jo')
  const [copiedModel, setCopiedModel] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const youtubeLinks = [
    {
      title: 'API Shared',
      description: 'Exploring the latest advancements in AI technology',
      embedId: 'jjAwWP1R8jo'
    }
  ]

  const aiModels = [
    {
      provider: 'Anthropic',
      models: [
        { name: 'Claude 3 Opus', code: 'anthropic:3-opus', description: 'Advanced AI with superior reasoning and task completion capabilities' },
        { name: 'Claude 3.5 Sonnet', code: 'anthropic:3.5-sonnet', description: 'Balanced model for complex reasoning and creative tasks' },
        { name: 'Claude 3.5 Sonnet (New)', code: 'anthropic:3.5-sonnet-20241022', description: 'Latest version with improved performance' },
        { name: 'Claude Haiku', code: 'anthropic:3.5-haiku', description: 'Lightweight, fast model for quick interactions' }
      ]
    },
    {
      provider: 'OpenAI',
      models: [
        { name: 'GPT-4o', code: 'openai:gpt-4o', description: 'Multimodal AI with advanced language and vision capabilities' },
        { name: 'GPT-4o Mini', code: 'openai:gpt-4o-mini', description: 'Compact, efficient version of GPT-4o' },
        { name: 'GPT-4', code: 'openai:gpt-4', description: 'Powerful language model for complex reasoning' },
        { name: 'GPT-3.5 Turbo', code: 'openai:gpt-3.5-turbo', description: 'Versatile model for general-purpose AI tasks' }
      ]
    }
  ]

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

  const handleCopyCode = (modelCode: string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(modelCode).then(() => {
        setCopiedCode(modelCode)
        setTimeout(() => setCopiedCode(null), 2000)
      }).catch(err => {
        console.error('Failed to copy: ', err)
      })
    } else {
      // Fallback for browsers without clipboard API
      try {
        const textArea = document.createElement('textarea')
        textArea.value = modelCode
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        setCopiedCode(modelCode)
        setTimeout(() => setCopiedCode(null), 2000)
      } catch (err) {
        console.error('Fallback copy failed: ', err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0A192F] p-4 overflow-hidden">
      <Head>
        <title>API Shared - AI Services Hub</title>
        <meta name="description" content="Access powerful AI APIs at discounted rates. Featuring OpenAI, Anthropic, and more." />
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
            Access powerful AI models at discounted rates. Integrate cutting-edge AI capabilities into your applications with our comprehensive API solutions.
          </p>
        </div>

        {/* Featured Video Section */}
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12 
            animate-pulse-slow">
            Featured API Shared Video Insights
          </h2>
          
          <div className="grid gap-2 md:gap-2">
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

        {/* Pricing Table Section */}
        <div className="mt-12 md:mt-20 relative z-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12 
            animate-pulse-slow">
            Model Pricing
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

        {/* Footer */}
        <footer className="text-center mt-12 md:mt-20 relative z-10 px-4">
          <p className="text-gray-300 mb-4 text-sm md:text-base">
            Connect with us on social media
          </p>
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
          <p className="text-gray-400 mt-6 md:mt-8 text-xs md:text-sm">
            {new Date().getFullYear()} API Shared. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  )
}