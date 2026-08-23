import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductRow = ({ title, subtitle, products = [], linkText = 'See all deals', linkHref = '/products' }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 my-6 shadow-xs relative">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {linkHref && (
          <a
            href={linkHref}
            className="text-xs font-semibold text-amazon-blue hover:text-amazon-orange hover:underline"
          >
            {linkText}
          </a>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-r-md shadow-lg border border-gray-200 hidden sm:flex items-center justify-center transition"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-l-md shadow-lg border border-gray-200 hidden sm:flex items-center justify-center transition"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Product List Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product._id} className="min-w-[240px] sm:min-w-[270px] max-w-[270px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;