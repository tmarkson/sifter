import React from 'react';

export const Header: React.FC = () => (
  <header>
    <div className="flex items-center gap-4 mb-2">
      <div className="w-12 h-12 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="#FF6B6B" strokeWidth="3"/>
          <circle cx="20" cy="20" r="11" stroke="#4ECDC4" strokeWidth="3"/>
          <circle cx="20" cy="20" r="4" fill="#FFFFFF"/>
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100">AI-Powered Comparison Matrix</h1>
    </div>
    <p className="text-gray-400">Use the power of AI to generate and compare structured data on any topic.</p>
  </header>
);