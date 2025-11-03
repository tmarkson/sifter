
import React from 'react';
import type { Product } from '../types';
import { DocumentIcon } from './icons/DocumentIcon';

interface GalleryViewProps {
  products: Product[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {products.map((product, index) => (
        <a 
          key={`${product.title}-${index}`} 
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2A2A2A] rounded-lg border border-gray-800 overflow-hidden shadow-lg flex flex-col group transition-transform transform hover:-translate-y-1 hover:shadow-blue-900/50"
        >
          <div className="h-40 bg-gray-800 flex items-center justify-center p-2">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-500 p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-200 text-sm truncate group-hover:whitespace-normal group-hover:text-blue-400">{product.title}</h3>
              <p className="text-xs text-gray-400 truncate">{product.mfgPn}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
