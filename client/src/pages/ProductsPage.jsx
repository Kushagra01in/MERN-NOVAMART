import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, Zap, Check, RotateCcw, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const categoriesList = [
  'All',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Books',
  'Sports & Fitness'
];

const sortOptions = [
  { label: 'Popular & Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Customer Rating', value: 'rating' },
  { label: 'Highest Discount', value: 'discount' }
];

const quickPriceRanges = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 - ₹20,000', min: 5000, max: 20000 },
  { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: 500000 },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const keywordParam = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const dealsParam = searchParams.get('deals') === 'true';
  const primeParam = searchParams.get('prime') === 'true';
  const badgeParam = searchParams.get('badge') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [isPrime, setIsPrime] = useState(primeParam);
  const [isDeals, setIsDeals] = useState(dealsParam);
  const [inStock, setInStock] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keywordParam) params.append('keyword', keywordParam);
      if (categoryParam && categoryParam !== 'All') params.append('category', categoryParam);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (minRating) params.append('rating', minRating);
      if (isPrime) params.append('prime', 'true');
      if (isDeals) params.append('deals', 'true');
      if (inStock) params.append('inStock', 'true');
      if (badgeParam) params.append('badge', badgeParam);
      if (sortParam) params.append('sort', sortParam);
      params.append('page', currentPage);
      params.append('limit', 12);

      const res = await api.get(`/products?${params.toString()}`);
      if (res.data.success) {
        setProducts(res.data.products);
        setTotalCount(res.data.totalProducts);
        setTotalPages(res.data.pages);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, currentPage, minRating, isPrime, isDeals, inStock, sortParam]);

  const handleCategoryClick = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handleSortChange = (e) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', e.target.value);
    setSearchParams(nextParams);
  };

  const applyPriceFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const setRange = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
  };

  const clearAllFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setIsPrime(false);
    setIsDeals(false);
    setInStock(false);
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-16">
      
      {/* Top Filter & Results Bar */}
      <div className="bg-white border-b border-gray-200 py-3.5 px-4 sm:px-8 text-xs text-gray-700 sticky top-14 z-30 shadow-2xs">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-gray-500">
              Showing <strong className="text-gray-900">{products.length}</strong> of{' '}
              <strong className="text-gray-900">{totalCount}</strong> items
            </span>
            {keywordParam && (
              <span>
                {' '}for "<strong className="text-orange-600 font-black">{keywordParam}</strong>"
              </span>
            )}
            {categoryParam !== 'All' && (
              <span>
                {' '}in <strong className="text-indigo-900 font-bold">{categoryParam}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs shadow-2xs transition"
            >
              <Filter className="w-4 h-4 text-orange-500" />
              <span>Filters</span>
            </button>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold hidden sm:inline">Sort:</span>
              <select
                value={sortParam}
                onChange={handleSortChange}
                className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 flex gap-8">
        
        {/* Left Filter Sidebar */}
        <aside
          className={`w-72 flex-shrink-0 space-y-6 text-sm text-gray-800 lg:block ${
            showMobileFilter ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
          }`}
        >
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-6">
            
            {showMobileFilter && (
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 lg:hidden">
                <span className="font-black text-base text-gray-900">Filter Products</span>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-lg font-bold"
                >
                  Close
                </button>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={clearAllFilters}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-indigo-700 hover:text-orange-600 bg-indigo-50/60 hover:bg-indigo-100/60 py-2 rounded-xl font-bold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>

            {/* Departments */}
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900 mb-3">
                Categories
              </h3>
              <div className="space-y-1 text-xs font-semibold">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryClick(cat);
                      if (showMobileFilter) setShowMobileFilter(false);
                    }}
                    className={`w-full text-left py-1.5 px-2.5 rounded-xl transition ${
                      categoryParam === cat
                        ? 'font-black text-slate-950 bg-gradient-to-r from-amber-300 to-orange-400 shadow-2xs'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Price Filter (INR) */}
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900 mb-3">
                Price (₹)
              </h3>
              
              {/* Quick range pills */}
              <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                {quickPriceRanges.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setRange(r.min, r.max)}
                    className="px-2 py-1 bg-gray-100 hover:bg-amber-100 rounded-lg text-gray-700 font-semibold"
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <form onSubmit={applyPriceFilter} className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-2 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full pl-6 pr-2 py-1.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-2 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full pl-6 pr-2 py-1.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded-xl transition"
                >
                  Apply Price Filter
                </button>
              </form>
            </div>

            <hr className="border-gray-100" />

            {/* Customer Rating */}
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900 mb-3">
                Customer Rating
              </h3>
              <div className="space-y-1.5 text-xs font-semibold">
                {[4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(minRating === stars.toString() ? '' : stars.toString())}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-xl transition ${
                      minRating === stars.toString() ? 'bg-amber-50 text-amber-900 font-black' : 'hover:bg-gray-50'
                    }`}
                  >
                    <RatingStars rating={stars} size="sm" showNum={false} />
                    <span className="text-gray-500 font-bold">{stars}★ & above</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Special Highlights */}
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900 mb-3">
                Offers & Delivery
              </h3>
              <div className="space-y-2.5 text-xs font-bold text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDeals}
                    onChange={(e) => setIsDeals(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span>Super Deals & Discounts Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrime}
                    onChange={(e) => setIsPrime(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-emerald-700">NovaExpress 24H Delivery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-3xl border border-gray-100" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 p-8 shadow-card space-y-4">
              <h3 className="text-xl font-black text-gray-900">No products matching your search</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try searching for generic terms like "phones", "laptops", "shoes", or clear your price filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 shadow-2xs"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition shadow-2xs ${
                        currentPage === idx + 1
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm'
                          : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 shadow-2xs"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
};

export default ProductsPage;