'use client';

import React from 'react';
import { Language } from '@/app/data/translations';
import { scrollToSection } from '@/app/utils/helpers';

interface BonusTierSectionProps {
  t: (key: string) => string;
  footerSectionRef: React.RefObject<HTMLDivElement | null>;
  bonusSectionRef: React.RefObject<HTMLDivElement | null>;
}

const BonusTierSection: React.FC<BonusTierSectionProps> = ({ 
  t,
  footerSectionRef,
  bonusSectionRef
}) => {
  return (
    <section ref={bonusSectionRef} className="max-w-6xl mx-auto mt-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          💰 Special Pricing Offers
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Get more value with our bonus credit system. The more you invest, the more you save!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
          onClick={() => scrollToSection(footerSectionRef)}
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
          onClick={() => scrollToSection(footerSectionRef)}
          className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold py-3 px-6 rounded-xl mt-8 transition-colors"
        >
          {t('contactUsToPurchase')}
        </button>
      </div>
      </div>
    </section>
  );
};

export default BonusTierSection; 