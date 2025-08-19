'use client';

import React, { useState, useEffect } from 'react';
import { FaRocket, FaCode, FaChartLine, FaShieldAlt } from 'react-icons/fa';

interface HeroSectionProps {
  t: (key: string) => string;
  setIsApiTesterOpen: (isOpen: boolean) => void;
  modelSectionRef: React.RefObject<HTMLDivElement | null>;
  footerSectionRef: React.RefObject<HTMLDivElement | null>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  setIsApiTesterOpen,
  modelSectionRef,
  footerSectionRef
}) => {
  const [currentStat, setCurrentStat] = useState(0);
  const [mounted, setMounted] = useState(false);

  const stats = [
    { number: '50%', label: 'Cost Savings', icon: FaChartLine },
    { number: '10+', label: 'AI Models', icon: FaCode },
    { number: '24/7', label: 'Support', icon: FaShieldAlt },
    { number: '99.9%', label: 'Uptime', icon: FaRocket }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${(i * 5.26) % 100}%`,
              top: `${(i * 7.89) % 100}%`,
              animationDelay: `${(i * 0.25) % 5}s`,
              animationDuration: `${3 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              All in one API
            </span>
            <br />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium AI models from OpenAI, Anthropic, Google, Deepseek, xAI and more at 
            <span className="text-green-400 font-semibold"> 50% discount</span>. 
            One API, unlimited possibilities.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              {React.createElement(stats[currentStat].icon, {
                className: "w-8 h-8 text-blue-400"
              })}
              <div className="text-4xl font-bold text-white">
                {stats[currentStat].number}
              </div>
            </div>
            <div className="text-gray-300 font-medium">
              {stats[currentStat].label}
            </div>
            
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {stats.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStat ? 'bg-blue-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaRocket className="group-hover:animate-bounce" />
              Get Started Free
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => setIsApiTesterOpen(true)}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <FaCode />
              Test API Now
            </span>
          </button>
          
          <button
            onClick={() => modelSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-white font-semibold hover:text-blue-400 transition-colors duration-300 underline decoration-2 underline-offset-4 hover:decoration-blue-400"
          >
            View Pricing →
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
            { icon: '⚡', title: 'Fast', desc: 'Sub-second response times' },
            { icon: '🌍', title: 'Global', desc: 'Worldwide CDN coverage' },
            { icon: '💎', title: 'Premium', desc: 'Latest AI models' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-white mb-1">{item.title}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
