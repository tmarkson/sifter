
import React, { useState, useCallback } from 'react';
import type { Product } from './types';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ComparisonTable } from './components/ComparisonTable';
import { GalleryView } from './components/GalleryView';
import { generateComparisonData } from './services/geminiService';
import { GalleryIcon } from './components/icons/GalleryIcon';
import { TableIcon } from './components/icons/TableIcon';
import { FilterIcon } from './components/icons/FilterIcon';
import { SortIcon } from './components/icons/SortIcon';
import { SearchIcon } from './components/icons/SearchIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ChevronDownIcon } from './components/icons/ChevronDownIcon';


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProducts([]);
    try {
      const newProducts = await generateComparisonData(prompt);
      setProducts(newProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-gray-300 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-full mx-auto">
        <Header />
        
        <div className="my-6">
           <PromptInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        
        {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-4">{error}</div>}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center gap-1">
                <button 
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}>
                    <TableIcon />
                    Table
                </button>
                <button 
                    onClick={() => setViewMode('gallery')}
                    className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-lg transition-colors ${viewMode === 'gallery' ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}>
                    <GalleryIcon />
                    Gallery
                </button>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 rounded-lg hover:bg-gray-700/50"><FilterIcon /></button>
                <button className="p-2 rounded-lg hover:bg-gray-700/50"><SortIcon /></button>
                <button className="p-2 rounded-lg hover:bg-gray-700/50"><SearchIcon /></button>
                <button className="p-2 rounded-lg hover:bg-gray-700/50"><SparklesIcon /></button>
                <div className="w-px h-6 bg-gray-700 mx-2"></div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    New
                    <ChevronDownIcon />
                </button>
            </div>
        </div>
        
        {isLoading ? (
           <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-4 text-lg">Generating data, please wait...</p>
            </div>
        ) : products.length > 0 ? (
            viewMode === 'table' ? (
                <ComparisonTable products={products} />
            ) : (
                <GalleryView products={products} />
            )
        ) : !error ? (
            <div className="text-center py-10 text-gray-500">
                <p>No data to display. Use the prompt above to generate a comparison matrix.</p>
            </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
