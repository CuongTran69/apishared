'use client';

import React, { useState } from 'react';
import { FaCopy, FaSearch, FaTimes, FaStar, FaFire } from 'react-icons/fa';
import modelPricing, { ModelInfo } from '@/app/data/modelPricing';
import { filterModels } from '@/app/utils/helpers';

interface ModelPricingSectionProps {
  t: (key: string) => string;
  modelSectionRef: React.RefObject<HTMLDivElement | null>;
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
  handleCopyCode: (code: string) => void;
  footerSectionRef?: React.RefObject<HTMLDivElement | null>;
}

// Loading skeleton component
const TableSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white/5 dark:bg-gray-800 backdrop-blur-lg rounded-xl overflow-hidden">
        <div className="h-16 bg-red-500/20 p-4 border-b border-white/10">
          <div className="h-6 bg-gray-600 rounded w-1/3"></div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex space-x-4">
              <div className="h-4 bg-gray-600 rounded w-1/3"></div>
              <div className="h-4 bg-gray-600 rounded w-1/4"></div>
              <div className="h-4 bg-gray-600 rounded w-1/5"></div>
              <div className="h-4 bg-gray-600 rounded w-1/5"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ModelPricingSection: React.FC<ModelPricingSectionProps> = ({
  t,
  modelSectionRef,
  expandedCategories,
  toggleCategory,
  handleCopyCode,
  footerSectionRef
}) => {
  const [filterText, setFilterText] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedModels, setSavedModels] = useState<string[]>([]);
  const [showComparePanel, setShowComparePanel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);
  const [showModelPopup, setShowModelPopup] = useState(false);

  // Load saved models from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('savedModels');
    if (saved) {
      setSavedModels(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedModels changes
  React.useEffect(() => {
    localStorage.setItem('savedModels', JSON.stringify(savedModels));
  }, [savedModels]);

  const toggleSaveModel = (apiName: string) => {
    setSavedModels(prev => 
      prev.includes(apiName) 
        ? prev.filter(name => name !== apiName)
        : [...prev, apiName]
    );
  };

  const getSavedModelDetails = () => {
    const allModels = Object.values(modelPricing).flat();
    return allModels.filter(model => savedModels.includes(model.apiName));
  };

  // Show model details popup
  const showModelDetails = (model: ModelInfo) => {
    setSelectedModel(model);
    setShowModelPopup(true);
  };

  // Close popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showModelPopup && !(e.target as Element)?.closest('.model-popup')) {
        setShowModelPopup(false);
      }
    };

    if (showModelPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModelPopup]);

  // Calculate statistics
  const getStatistics = () => {
    const allModels = Object.values(modelPricing).flat();
    const totalModels = allModels.length;
    const avgInputPrice = allModels.reduce((sum, model) => sum + model.inputPrice.discounted, 0) / totalModels;
    const avgOutputPrice = allModels.reduce((sum, model) => sum + model.outputPrice.discounted, 0) / totalModels;
    const cheapestInput = Math.min(...allModels.map(m => m.inputPrice.discounted));
    const cheapestOutput = Math.min(...allModels.map(m => m.outputPrice.discounted));
    const avgDiscount = allModels.reduce((sum, model) => {
      const inputDiscount = ((model.inputPrice.original - model.inputPrice.discounted) / model.inputPrice.original) * 100;
      const outputDiscount = ((model.outputPrice.original - model.outputPrice.discounted) / model.outputPrice.original) * 100;
      return sum + (inputDiscount + outputDiscount) / 2;
    }, 0) / totalModels;

    return {
      totalModels,
      avgInputPrice: avgInputPrice.toFixed(2),
      avgOutputPrice: avgOutputPrice.toFixed(2),
      cheapestInput: cheapestInput.toFixed(2),
      cheapestOutput: cheapestOutput.toFixed(2),
      avgDiscount: avgDiscount.toFixed(0)
    };
  };

  const stats = getStatistics();

  // Simulate loading for filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsLoading(true);
    
    // Debounce effect
    setTimeout(() => {
      setFilterText(value);
      setIsLoading(false);
    }, 300);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Ctrl/Cmd + S to toggle saved models
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        setShowComparePanel(!showComparePanel);
      }
      
      // Escape to close compare panel or model popup
      if (e.key === 'Escape') {
        if (showModelPopup) {
          setShowModelPopup(false);
        } else if (showComparePanel) {
          setShowComparePanel(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showComparePanel, showModelPopup]);



  // Get all providers for filter
  const allProviders = Object.keys(modelPricing);

  // Filter models based on search and provider
  const getFilteredModels = () => {
    let filtered: Record<string, ModelInfo[]> = { ...modelPricing };

    // Filter by provider
    if (selectedProvider && selectedProvider in modelPricing) {
      const providerKey = selectedProvider as keyof typeof modelPricing;
      filtered = { [selectedProvider]: modelPricing[providerKey] };
    }

    // Filter by search text
    if (filterText) {
      Object.keys(filtered).forEach(category => {
        if (filtered[category]) {
          filtered[category] = filterModels(filtered[category], filterText);
        }
      });
    }

    return filtered;
  };

  const filteredModels = getFilteredModels();

  return (
    <section ref={modelSectionRef} className="mt-12 md:mt-20 relative z-10 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-6">
          {t('modelPricing')}
        </h2>

        {/* Enhanced Search & Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              onChange={handleFilterChange}
              className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              placeholder={`${t('placeholder')} (Ctrl+K)`}
            />
            {filterText && (
              <button
                onClick={() => {
                  setFilterText('');
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) input.value = '';
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Provider Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setSelectedProvider('')}
              className={`px-4 py-2 rounded-full transition-all ${
                !selectedProvider
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-600'
              }`}
            >
              All Providers
            </button>
            {allProviders.map((provider) => (
              <button
                key={provider}
                onClick={() => setSelectedProvider(selectedProvider === provider ? '' : provider)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedProvider === provider
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-600'
                }`}
              >
                {provider.replace(' Models', '')}
              </button>
            ))}
          </div>

          {/* Search Results Summary */}
          {(filterText || selectedProvider) && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <FaSearch className="h-4 w-4" />
                <span>
                  Found {Object.values(filteredModels).reduce((acc, models) => acc + models.length, 0)} models
                  {filterText && ` matching "${filterText}"`}
                  {selectedProvider && ` from ${selectedProvider.replace(' Models', '')}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* New Models Spotlight - Moved to top for better visibility */}
        {(() => {
          const newModels = Object.entries(modelPricing).reduce((acc, [category, models]) => {
            const newInCategory = (models as ModelInfo[]).filter(model => model.isNew === true);
            if (newInCategory.length > 0) {
              acc.push(...newInCategory.map(model => ({ ...model, category })));
            }
            return acc;
          }, [] as (ModelInfo & { category: string })[]);

          if (newModels.length === 0) return null;

          return (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-red-500/15 via-pink-500/15 to-purple-500/15 rounded-3xl p-8 border border-red-500/30 relative overflow-hidden shadow-2xl">
                {/* Animated background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-pink-500/5 to-purple-500/5 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 animate-pulse"></div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="animate-bounce">🔥</div>
                      <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        HOT! New Models Just Dropped
                      </h3>
                      <div className="animate-bounce">⚡</div>
                    </div>
                    <p className="text-gray-300 text-lg">
                      Latest AI models with <span className="text-green-400 font-semibold">50% discount</span> - Limited time offer!
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
                      <FaFire className="text-red-400 animate-pulse" />
                      <span className="text-red-400 font-medium">{newModels.length} New Models Available</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newModels.slice(0, 6).map((model, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-lg">
                                  <FaStar className="mr-1" />
                                  NEW
                                </span>
                                <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-lg">
                                  {model.category.replace(' Models', '')}
                                </span>
                              </div>
                              <h4 className="font-bold text-white text-lg mb-2 line-clamp-1">
                                {model.realName}
                              </h4>
                              <code className="text-blue-400 text-sm font-mono bg-blue-500/10 px-2 py-1 rounded break-all line-clamp-1">
                                {model.apiName}
                              </code>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-green-500/15 rounded-xl p-4 border border-green-500/30">
                              <div className="text-xs text-green-400 mb-2 font-medium">Input Price</div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 line-through text-sm">
                                  ${model.inputPrice.original.toFixed(2)}
                                </span>
                                <span className="text-green-400 font-bold text-lg">
                                  ${model.inputPrice.discounted.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">per 1M tokens</span>
                              </div>
                            </div>

                            <div className="bg-blue-500/15 rounded-xl p-4 border border-blue-500/30">
                              <div className="text-xs text-blue-400 mb-2 font-medium">Output Price</div>
                              <div className="flex flex-col">
                                <span className="text-gray-400 line-through text-sm">
                                  ${model.outputPrice.original.toFixed(2)}
                                </span>
                                <span className="text-blue-400 font-bold text-lg">
                                  ${model.outputPrice.discounted.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">per 1M tokens</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCopyCode(model.apiName)}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                            >
                              <FaCopy className="text-sm" />
                              Copy Code
                            </button>
                            {footerSectionRef && (
                              <button
                                onClick={() => footerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                              >
                                Try Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {newModels.length > 6 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setFilterText('')}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-8 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                      >
                        View All {newModels.length} New Models
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Statistics Panel */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">{stats.totalModels}</div>
              <div className="text-xs text-gray-400">Total Models</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">${stats.avgInputPrice}</div>
              <div className="text-xs text-gray-400">Avg Input Price</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">${stats.avgOutputPrice}</div>
              <div className="text-xs text-gray-400">Avg Output Price</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-yellow-400">${stats.cheapestInput}</div>
              <div className="text-xs text-gray-400">Cheapest Input</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-yellow-400">${stats.cheapestOutput}</div>
              <div className="text-xs text-gray-400">Cheapest Output</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-purple-400">{stats.avgDiscount}%</div>
              <div className="text-xs text-gray-400">Avg Discount</div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto md:overflow-visible rounded-xl shadow-xl">
        <div className="min-w-0 md:min-w-[800px] space-y-8">
          {isLoading ? (
            <TableSkeleton />
          ) : Object.values(filteredModels).every(models => models.length === 0) ? (
            // No results found
            <div className="text-center py-16">
              <div className="bg-white/5 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No models found</h3>
                <p className="text-gray-400 mb-6">
                  {filterText
                    ? `No models match "${filterText}"${selectedProvider ? ` in ${selectedProvider.replace(' Models', '')}` : ''}`
                    : `No models available${selectedProvider ? ` in ${selectedProvider.replace(' Models', '')}` : ''}`
                  }
                </p>
                <button
                  onClick={() => {
                    setFilterText('');
                    setSelectedProvider('');
                    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                    if (input) input.value = '';
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            Object.entries(filteredModels).map(([category, models]) => {
              if (models.length === 0) return null;

              const isExpanded = expandedCategories.includes(category);
              const displayedModels = isExpanded ? models : models.slice(0, 5);
              const hasMoreModels = models.length > 5;

              return (
                <div key={category} className="bg-white/5 dark:bg-gray-800 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/7">
                  <h3 
                    className="text-xl font-bold text-white dark:text-red-300 bg-red-500/20 p-4 border-b border-white/10 cursor-pointer flex justify-between items-center hover:bg-red-500/30 transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category} ({models.length} models)</span>
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
                                  {(model as any).isNew && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                      {t('newBadge')}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => toggleSaveModel(model.apiName)}
                                    className={`opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 p-1 rounded ${
                                      savedModels.includes(model.apiName) 
                                        ? 'text-yellow-400 opacity-100' 
                                        : 'text-gray-400 hover:text-yellow-400'
                                    }`}
                                    title={savedModels.includes(model.apiName) ? "Remove from saved" : "Save model"}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={savedModels.includes(model.apiName) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleCopyCode(model.apiName)}
                                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 p-1 rounded hover:bg-blue-500/20"
                                    title="Copy API Name"
                                  >
                                    <FaCopy className="text-blue-400 dark:text-blue-200 hover:text-blue-300" />
                                  </button>
                                </div>
                              </div>
                            </td>
                                                      <td className="p-4 text-gray-300 dark:text-gray-400 text-sm">
                            <button
                              onClick={() => showModelDetails(model)}
                              className="text-left hover:text-white transition-colors hover:underline cursor-pointer"
                              title="Click for details"
                            >
                              {model.realName}
                            </button>
                          </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                  ${model.inputPrice.original.toFixed(2)}
                                </span>
                                <span className="text-green-400 dark:text-green-300 font-bold text-lg">
                                  ${model.inputPrice.discounted.toFixed(2)}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-400 dark:text-gray-500 line-through text-sm">
                                  ${model.outputPrice.original.toFixed(2)}
                                </span>
                                <span className="text-green-400 dark:text-green-300 font-bold text-lg">
                                  ${model.outputPrice.discounted.toFixed(2)}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile version - Enhanced Cards */}
                  <div className="md:hidden">
                    <div className="grid gap-3 p-3">
                      {displayedModels.map((model, index) => (
                        <div 
                          key={index} 
                          className="bg-[#0F2442] rounded-lg p-4 border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="mb-3">
                            <div className="flex items-start gap-2 mb-1">
                              <div className="flex-1 min-w-0">
                                <code className="text-blue-400 dark:text-blue-200 text-sm font-mono break-all line-clamp-1">
                                  {model.apiName}
                                </code>
                                {(model as any).isNew && (
                                  <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                    {t('newBadge')}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => toggleSaveModel(model.apiName)}
                                  className={`flex-shrink-0 mt-1 p-2 rounded transition-colors ${
                                    savedModels.includes(model.apiName) 
                                      ? 'text-yellow-400' 
                                      : 'text-gray-400 hover:text-yellow-400'
                                  }`}
                                  title={savedModels.includes(model.apiName) ? "Remove from saved" : "Save model"}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={savedModels.includes(model.apiName) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleCopyCode(model.apiName)}
                                  className="flex-shrink-0 mt-1 p-2 rounded hover:bg-blue-500/20 transition-colors"
                                  title="Copy API Name"
                                >
                                  <FaCopy className="text-blue-400 dark:text-blue-200 hover:text-blue-300 w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => showModelDetails(model)}
                              className="text-gray-300 dark:text-gray-400 text-xs mb-1 hover:text-white transition-colors hover:underline text-left"
                              title="Click for details"
                            >
                              {model.realName}
                            </button>
                          </div>
                          
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="bg-[#162D50] p-3 rounded transition-colors hover:bg-[#1A3658]">
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
                            
                            <div className="bg-[#162D50] p-3 rounded transition-colors hover:bg-[#1A3658]">
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
                  
                  {/* Enhanced Show All / Show Less button */}
                  {hasMoreModels && (
                    <div className="p-3 border-t border-white/10 bg-white/5 text-center">
                      <button 
                        onClick={() => toggleCategory(category)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex md:inline-flex items-center justify-center mx-auto px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-105"
                      >
                        {isExpanded ? t('showLess') : t('showAll')}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
            })
          )}
        </div>
      </div>

      {/* Model Details Popup */}
      {showModelPopup && selectedModel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="model-popup bg-[#0A192F] border border-white/20 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInScale">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{selectedModel.realName}</h3>
                    {selectedModel.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                        {t('newBadge')}
                      </span>
                    )}
                  </div>
                  <code className="text-blue-400 text-sm font-mono bg-white/5 px-3 py-1 rounded-lg">
                    {selectedModel.apiName}
                  </code>
                </div>
                <button
                  onClick={() => setShowModelPopup(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Pricing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <h4 className="font-semibold text-green-400">{t('inputPrice')}</h4>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-400 line-through text-sm">
                      ${selectedModel.inputPrice.original.toFixed(2)}
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      ${selectedModel.inputPrice.discounted.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">per 1M tokens</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <h4 className="font-semibold text-blue-400">{t('outputPrice')}</h4>
                  </div>
                  <div className="space-y-1">
                    <div className="text-gray-400 line-through text-sm">
                      ${selectedModel.outputPrice.original.toFixed(2)}
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                      ${selectedModel.outputPrice.discounted.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">per 1M tokens</div>
                  </div>
                </div>
              </div>

              {/* Savings Info */}
              <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-semibold text-purple-400">Your Savings</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      {(((selectedModel.inputPrice.original - selectedModel.inputPrice.discounted) / selectedModel.inputPrice.original) * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Input Discount</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      {(((selectedModel.outputPrice.original - selectedModel.outputPrice.discounted) / selectedModel.outputPrice.original) * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Output Discount</div>
                  </div>
                </div>
                             </div>

               {/* Usage Example */}
               <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
                 <div className="flex items-center gap-2 mb-3">
                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                   <h4 className="font-semibold text-gray-300">Usage Example</h4>
                 </div>
                 <div className="bg-black/30 rounded-lg p-3 border border-gray-600">
                   <code className="text-sm text-green-400 block whitespace-pre-wrap">
{`curl -X POST "https://api.llm.ai.vn/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${selectedModel.apiName}",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}
                   </code>
                 </div>
                 <p className="text-xs text-gray-500 mt-2">
                   💡 Replace YOUR_API_KEY with your actual API key from our portal
                 </p>
               </div>

                              {/* Primary CTA */}
               <div className="mb-4">
                 <button
                   onClick={() => {
                     window.open('https://api.llm.ai.vn', '_blank');
                     setShowModelPopup(false);
                   }}
                   className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105 shadow-lg"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.968 9.313 13.83 9 14.5 9z" />
                   </svg>
                   Get API Key & Start Using {selectedModel.realName}
                 </button>
               </div>

               {/* Secondary Actions */}
               <div className="grid grid-cols-3 gap-2">
                 <button
                   onClick={() => handleCopyCode(selectedModel.apiName)}
                   className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-blue-500/30"
                 >
                   <FaCopy className="w-3 h-3" />
                   Copy API
                 </button>
                 
                 <button
                   onClick={() => handleCopyCode(selectedModel.realName)}
                   className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-gray-500/30"
                 >
                   <FaCopy className="w-3 h-3" />
                   Copy Name
                 </button>

                 <button
                   onClick={() => toggleSaveModel(selectedModel.apiName)}
                   className={`font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                     savedModels.includes(selectedModel.apiName)
                       ? 'bg-yellow-600/30 text-yellow-400 border border-yellow-500/30'
                       : 'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/30'
                   }`}
                 >
                   <svg className="w-3 h-3" fill={savedModels.includes(selectedModel.apiName) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                   {savedModels.includes(selectedModel.apiName) ? 'Saved' : 'Save'}
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModelPricingSection; 