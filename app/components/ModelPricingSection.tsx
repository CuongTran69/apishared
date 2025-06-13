'use client';

import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import modelPricing, { ModelInfo } from '@/app/data/modelPricing';
import { filterModels } from '@/app/utils/helpers';

interface ModelPricingSectionProps {
  t: (key: string) => string;
  modelSectionRef: React.RefObject<HTMLDivElement | null>;
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
  handleCopyCode: (code: string) => void;
}

const ModelPricingSection: React.FC<ModelPricingSectionProps> = ({
  t,
  modelSectionRef,
  expandedCategories,
  toggleCategory,
  handleCopyCode
}) => {
  const [filterText, setFilterText] = useState('');

  return (
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
                              <div className="flex items-center gap-2">
                                <code className="text-blue-400 dark:text-blue-200 text-sm font-mono break-all">
                                  {model.apiName}
                                </code>
                                {model.isNew && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                    {t('newBadge')}
                                  </span>
                                )}
                              </div>
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
                          <div className="flex items-start gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <code className="text-blue-400 dark:text-blue-200 text-sm font-mono break-all line-clamp-1">
                                {model.apiName}
                              </code>
                                                              {model.isNew && (
                                  <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                    {t('newBadge')}
                                  </span>
                                )}
                            </div>
                            <button
                              onClick={() => handleCopyCode(model.apiName)}
                              className="flex-shrink-0 mt-1"
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
                            <div className="text-xs text-gray-400 mb-1">{t('inputPrice')}</div>
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
                            <div className="text-xs text-gray-400 mb-1">{t('outputPrice')}</div>
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
  );
};

export default ModelPricingSection; 