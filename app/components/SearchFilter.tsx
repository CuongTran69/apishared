'use client';

import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
  providers: string[];
  language: 'en' | 'vi';
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedProvider,
  onProviderChange,
  providers,
  language
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const translations = {
    en: {
      searchPlaceholder: 'Search models...',
      allProviders: 'All Providers',
      filterBy: 'Filter by Provider',
      clearFilters: 'Clear Filters'
    },
    vi: {
      searchPlaceholder: 'Tìm kiếm model...',
      allProviders: 'Tất cả nhà cung cấp',
      filterBy: 'Lọc theo nhà cung cấp',
      clearFilters: 'Xóa bộ lọc'
    }
  };

  const t = (key: keyof typeof translations['en']) => translations[language][key];

  const clearFilters = () => {
    onSearchChange('');
    onProviderChange('');
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder={t('searchPlaceholder')}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isFilterOpen || selectedProvider
              ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
              : 'bg-white/5 border border-gray-600 text-gray-300 hover:bg-white/10'
          }`}
        >
          <FaFilter className="h-4 w-4" />
          <span>{t('filterBy')}</span>
          {selectedProvider && (
            <span className="bg-blue-500/30 px-2 py-1 rounded text-xs">
              {selectedProvider.replace(' Models', '')}
            </span>
          )}
        </button>

        {(searchTerm || selectedProvider) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
          >
            <FaTimes className="h-4 w-4" />
            <span>{t('clearFilters')}</span>
          </button>
        )}
      </div>

      {/* Provider Filter Dropdown */}
      {isFilterOpen && (
        <div className="bg-white/5 border border-gray-600 rounded-xl p-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => {
              onProviderChange('');
              setIsFilterOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
              !selectedProvider
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            {t('allProviders')}
          </button>
          {providers.map((provider) => (
            <button
              key={provider}
              onClick={() => {
                onProviderChange(provider);
                setIsFilterOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                selectedProvider === provider
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {provider.replace(' Models', '')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
