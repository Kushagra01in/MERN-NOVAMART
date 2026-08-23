import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Check, ShieldCheck, Heart } from 'lucide-react';
import RatingStars from './RatingStars';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const savings = Math.max(0, product.originalPrice - product.price);
  const emiPerMonth = Math.round(product.price / 12);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden group">
      
      {/* Product Image Container */}
      <div className="relative p-4 bg-gradient-to-b from-gray-50/80 to-white flex items-center justify-center h-52 sm:h-60 overflow-hidden border-b border-gray-100">
        
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discount > 0 && (
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs tracking-wide">
              {discount}% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-slate-900 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Assured Indian Quality Tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 text-[9px] font-black px-2 py-0.5 rounded-full shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            <span>Assured</span>
          </span>
        </div>

        {/* Product Image Link */}
        <Link to={`/products/${product._id}`} className="w-full h-full flex items-center justify-center p-2">
          <img
            src={product.mainImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Tag */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-brand-600 uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">{product.category}</span>
          </div>

          {/* Title */}
          <Link
            to={`/products/${product._id}`}
            className="block text-sm font-bold text-gray-900 hover:text-orange-600 transition line-clamp-2 mt-1 leading-snug"
          >
            {product.name}
          </Link>

          {/* Rating Stars */}
          <div className="mt-1.5 flex items-center gap-2">
            <span className="bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
              <span>{product.rating?.toFixed(1) || '4.5'}</span>
              <span>★</span>
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              ({product.numReviews?.toLocaleString()} ratings)
            </span>
          </div>

          {/* Pricing & Savings */}
          <div className="mt-2.5 space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-950">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            {savings > 0 && (
              <div className="text-[11px] text-emerald-700 font-bold">
                Save {formatINR(savings)} on this deal
              </div>
            )}
          </div>

          {/* EMI & Delivery highlights */}
          <div className="pt-1.5 space-y-1 text-[11px] text-gray-600">
            {product.price >= 3000 && (
              <div className="text-gray-500">
                No Cost EMI from <strong className="text-gray-800">{formatINR(emiPerMonth)}/month</strong>
              </div>
            )}

            <div className="flex items-center gap-1 font-semibold text-emerald-800">
              <Zap className="w-3 h-3 text-amber-500 fill-current" />
              <span>FREE 1-Day Delivery across India</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-2">
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition duration-200 shadow-sm ${
              product.countInStock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 hover:shadow-md active:scale-98'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;