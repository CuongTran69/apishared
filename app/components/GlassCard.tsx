'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: 'blue' | 'purple' | 'green' | 'pink' | 'orange';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = 'blue'
}) => {
  const gradientClasses = {
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/40',
    purple: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-400/40',
    green: 'from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-400/40',
    pink: 'from-pink-500/10 to-rose-500/10 border-pink-500/20 hover:border-pink-400/40',
    orange: 'from-orange-500/10 to-yellow-500/10 border-orange-500/20 hover:border-orange-400/40'
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl
        bg-gradient-to-br ${gradientClasses[gradient]}
        ${hover ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl' : ''}
        ${className}
      `}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      
      {/* Shine effect */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
