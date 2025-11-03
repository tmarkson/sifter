
import React from 'react';
import type { Product } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { TextIcon } from './icons/TextIcon';
import { LinkIcon } from './icons/LinkIcon';
import { DocumentIcon } from './icons/DocumentIcon';

const TAG_COLORS = [
    'bg-red-800/70 text-red-200', 'bg-green-800/70 text-green-200', 'bg-blue-800/70 text-blue-200',
    'bg-yellow-800/70 text-yellow-200', 'bg-purple-800/70 text-purple-200', 'bg-indigo-800/70 text-indigo-200',
    'bg-pink-800/70 text-pink-200', 'bg-teal-800/70 text-teal-200'
];

const FORM_FACTOR_COLORS: { [key: string]: string } = {
    'Boxed SBC': 'bg-red-800/70 text-red-200 border border-red-600',
    'Carrier Board': 'bg-rose-800/70 text-rose-200 border border-rose-600',
    'SBC': 'bg-blue-800/70 text-blue-200 border border-blue-600',
    'SOM': 'bg-teal-800/70 text-teal-200 border border-teal-600',
    'Module': 'bg-purple-800/70 text-purple-200 border border-purple-600',
};

const getTagColor = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % TAG_COLORS.length);
  return TAG_COLORS[index];
};

const getFormFactorColor = (formFactor: string) => {
    return FORM_FACTOR_COLORS[formFactor] || 'bg-gray-700 text-gray-200 border border-gray-600';
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

const formatPrice = (price: number | null) => {
  if (price === null || price === undefined) return '-';
  return `$${price.toFixed(2)}`;
};

interface ComparisonTableProps {
  products: Product[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto relative rounded-lg border border-gray-800 shadow-lg">
      <table className="w-full text-sm text-left text-gray-400 bg-[#2A2A2A]">
        <thead className="text-xs text-gray-400 uppercase bg-[#343434] sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-4 py-3 min-w-[200px] border-r border-gray-700"><div className="flex items-center gap-2"><ClockIcon/> Last Modified</div></th>
            <th scope="col" className="px-4 py-3 min-w-[250px] border-r border-gray-700"><div className="flex items-center gap-2"><TextIcon/> Title</div></th>
            <th scope="col" className="px-4 py-3 min-w-[150px] border-r border-gray-700"><div className="flex items-center gap-2"><DocumentIcon/> Mfg</div></th>
            <th scope="col" className="px-4 py-3 min-w-[150px] border-r border-gray-700"><div className="flex items-center gap-2"># Mfg Pn</div></th>
            <th scope="col" className="px-4 py-3 min-w-[200px] border-r border-gray-700"><div className="flex items-center gap-2"><LinkIcon/> Link</div></th>
            <th scope="col" className="px-4 py-3 min-w-[120px] border-r border-gray-700"><div className="flex items-center gap-2">Country...</div></th>
            <th scope="col" className="px-4 py-3 min-w-[150px] border-r border-gray-700"><div className="flex items-center gap-2">Form factor</div></th>
            <th scope="col" className="px-4 py-3 min-w-[100px] border-r border-gray-700"><div className="flex items-center gap-2"># Price @...</div></th>
            <th scope="col" className="px-4 py-3 min-w-[400px]"><div className="flex items-center gap-2">Features</div></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.title}-${index}`} className="border-b border-gray-700 hover:bg-gray-800/50">
              <td className="px-4 py-3 align-top border-r border-gray-700">{formatDate(product.lastModified)}</td>
              <td className="px-4 py-3 font-medium text-gray-200 align-top border-r border-gray-700">
                <div className="flex items-center gap-2"><DocumentIcon /> {product.title}</div>
              </td>
              <td className="px-4 py-3 align-top border-r border-gray-700">{product.mfg}</td>
              <td className="px-4 py-3 align-top border-r border-gray-700">{product.mfgPn}</td>
              <td className="px-4 py-3 align-top border-r border-gray-700">
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block max-w-[200px]">{product.link}</a>
              </td>
              <td className="px-4 py-3 align-top border-r border-gray-700">{product.country}</td>
              <td className="px-4 py-3 align-top border-r border-gray-700">
                {product.formFactor && <span className={`px-2 py-1 text-xs font-semibold rounded-md ${getFormFactorColor(product.formFactor)}`}>{product.formFactor}</span>}
              </td>
              <td className="px-4 py-3 align-top border-r border-gray-700">{formatPrice(product.price)}</td>
              <td className="px-4 py-3 align-top">
                <div className="flex flex-wrap gap-2">
                  {product.features?.map((feature) => (
                    <span key={feature} className={`px-2 py-1 text-xs font-semibold rounded-md ${getTagColor(feature)}`}>{feature}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
