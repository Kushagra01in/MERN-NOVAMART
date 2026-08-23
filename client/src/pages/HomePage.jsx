import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  Tag,
  CreditCard,
  Percent,
  CheckCircle2,
  Clock
} from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductRow from '../components/ProductRow';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const departmentCircles = [
  { name: 'Mobiles', icon: '📱', path: '/products?category=Electronics', tag: 'Up to 40% Off' },
  { name: 'Laptops', icon: '💻', path: '/products?category=Electronics', tag: 'From ₹24,990' },
  { name: 'Fashion', icon: '👗', path: '/products?category=Fashion', tag: 'Min 50% Off' },
  { name: 'Home & Kitchen', icon: '🏠', path: '/products?category=Home+%26+Kitchen', tag: 'From ₹499' },
  { name: 'Beauty & Care', icon: '✨', path: '/products?category=Beauty+%26+Personal+Care', tag: 'Under ₹999' },
  { name: 'Books', icon: '📚', path: '/products?category=Books', tag: 'Bestsellers' },
  { name: 'Audio & Earbuds', icon: '🎧', path: '/products?category=Electronics', tag: 'From ₹999' },
  { name: 'Fitness', icon: '🏋️', path: '/products?category=Sports+%26+Fitness', tag: 'Top Deals' }
];

const HomePage = () => {
  const [data, setData] = useState({
    deals: [],
    bestSellers: [],
    topRated: [],
    categoriesSpotlight: { electronics: [], fashion: [], homeKitchen: [] }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/products/featured/deals');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      
      {/* Top Hero Banner */}
      <HeroBanner />

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative -mt-8 sm:-mt-12 z-20 space-y-8">
        
        {/* Quick Category Icons Strip */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100/80">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
            {departmentCircles.map((dept) => (
              <Link
                key={dept.name}
                to={dept.path}
                className="flex flex-col items-center text-center group flex-shrink-0 min-w-[90px] sm:min-w-[110px]"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50 group-hover:from-amber-100 group-hover:to-orange-100 border border-amber-200/60 flex items-center justify-center text-3xl shadow-2xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <span>{dept.icon}</span>
                </div>
                <span className="text-xs font-black text-gray-900 mt-2 group-hover:text-orange-600 transition">
                  {dept.name}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full mt-0.5">
                  {dept.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bank Offers & Savings Strip */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-md">
              <Percent className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="inline-block bg-amber-400/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                Bank & Payment Offers
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Extra 10% Instant Discount on HDFC, SBI, ICICI Cards & UPI
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Up to ₹1,500 Instant Savings on Orders above ₹4,999. No coupon required at checkout!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/products?deals=true"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition"
            >
              View All Eligible Deals
            </Link>
          </div>
        </div>

        {/* 4 Feature Quad Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Today's Super Deals */}
          <div className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 flex flex-col justify-between hover:shadow-card-hover transition">
            <div>
              <div className="flex items-center gap-1.5 text-rose-600 font-black text-xs uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 fill-current" />
                <span>Maha Deals</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Today's Top Deals</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to="/products?category=Electronics" className="group text-center">
                  <div className="bg-gray-50 h-28 rounded-2xl flex items-center justify-center p-2 group-hover:bg-amber-50/60 transition overflow-hidden border border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
                      alt="Headphones"
                      className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block mt-1">Noise Cancelling</span>
                </Link>

                <Link to="/products?category=Electronics" className="group text-center">
                  <div className="bg-gray-50 h-28 rounded-2xl flex items-center justify-center p-2 group-hover:bg-amber-50/60 transition overflow-hidden border border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80"
                      alt="OnePlus 12"
                      className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block mt-1">5G Mobiles</span>
                </Link>

                <Link to="/products?category=Fashion" className="group text-center">
                  <div className="bg-gray-50 h-28 rounded-2xl flex items-center justify-center p-2 group-hover:bg-amber-50/60 transition overflow-hidden border border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
                      alt="Footwear"
                      className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block mt-1">Sneakers</span>
                </Link>

                <Link to="/products?category=Home+%26+Kitchen" className="group text-center">
                  <div className="bg-gray-50 h-28 rounded-2xl flex items-center justify-center p-2 group-hover:bg-amber-50/60 transition overflow-hidden border border-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"
                      alt="Air Fryer"
                      className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block mt-1">Air Fryers</span>
                </Link>
              </div>
            </div>
            <Link
              to="/products?deals=true"
              className="text-xs font-black text-indigo-600 hover:text-orange-600 flex items-center gap-1"
            >
              <span>See all deals ({data.deals?.length || 8})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Upgrade Your Space */}
          <div className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 flex flex-col justify-between hover:shadow-card-hover transition">
            <div>
              <div className="flex items-center gap-1.5 text-amber-600 font-black text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Living & Work</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Ergonomic Living</h3>
              <Link to="/products?category=Home+%26+Kitchen" className="block mb-4 group">
                <div className="bg-gray-50 h-52 rounded-2xl flex items-center justify-center p-3 overflow-hidden border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1580481077195-c3a9a3229831?auto=format&fit=crop&w=500&q=80"
                    alt="Ergonomic Furniture"
                    className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                  />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-bold text-gray-900 block">Executive Ergonomic Chairs</span>
                  <span className="text-xs font-bold text-emerald-700">Starts @ ₹11,499</span>
                </div>
              </Link>
            </div>
            <Link
              to="/products?category=Home+%26+Kitchen"
              className="text-xs font-black text-indigo-600 hover:text-orange-600 flex items-center gap-1"
            >
              <span>Explore Home & Kitchen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Best Sellers */}
          <div className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 flex flex-col justify-between hover:shadow-card-hover transition">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-black text-xs uppercase tracking-wider mb-1">
                <Tag className="w-4 h-4 fill-current" />
                <span>Customer Favorites</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Bestseller Books</h3>
              <Link to="/products?category=Books" className="block mb-4 group">
                <div className="bg-gray-50 h-52 rounded-2xl flex items-center justify-center p-3 overflow-hidden border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80"
                    alt="Atomic Habits"
                    className="max-h-full object-contain group-hover:scale-108 transition duration-200"
                  />
                </div>
                <div className="mt-2">
                  <span className="text-sm font-bold text-gray-900 block">Atomic Habits & Tech Titles</span>
                  <span className="text-xs font-bold text-emerald-700">From ₹549</span>
                </div>
              </Link>
            </div>
            <Link
              to="/products?category=Books"
              className="text-xs font-black text-indigo-600 hover:text-orange-600 flex items-center gap-1"
            >
              <span>Browse All Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: NovaExpress Fast Delivery */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 rounded-3xl shadow-card text-slate-950 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-slate-950 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                NovaExpress Club
              </div>
              <h3 className="text-2xl font-black leading-tight text-slate-950 mb-2">
                Guaranteed 24-Hour Express Delivery
              </h3>
              <p className="text-xs text-slate-900 font-semibold mb-4 leading-relaxed">
                Enjoy unlimited free delivery across India, early access to lightning sales, and exclusive UPI cashbacks.
              </p>
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 mb-4 shadow-sm">
                <div className="font-extrabold text-sm text-gray-950">Free Delivery Above ₹499</div>
                <p className="text-[11px] text-gray-700 mt-0.5">No membership fee required. Shop & Save today!</p>
              </div>
            </div>

            <Link
              to="/products"
              className="w-full text-center bg-slate-950 hover:bg-slate-900 text-amber-400 font-black py-3 rounded-2xl text-xs shadow-md transition"
            >
              Start Shopping Now
            </Link>
          </div>

        </div>

        {/* 4 Trust & Service Pillars */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-card">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-black flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-gray-900">Fast Delivery</h4>
              <p className="text-xs text-gray-500">Free above ₹499 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-black flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-gray-900">7-Day Easy Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free doorstep pickups</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800 font-black flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-gray-900">100% Genuine</h4>
              <p className="text-xs text-gray-500">Direct from authorized brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-800 font-black flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm text-gray-900">UPI & No Cost EMI</h4>
              <p className="text-xs text-gray-500">GPay, PhonePe, Paytm, Cards</p>
            </div>
          </div>
        </div>

        {/* Product Deals Row */}
        {data.deals.length > 0 && (
          <ProductRow
            title="⚡ Super Saver Deals of the Day"
            subtitle="Handpicked mega discounts available for a limited time"
            products={data.deals}
            linkHref="/products?deals=true"
            linkText="View all deals"
          />
        )}

        {/* Best Sellers Row */}
        {data.bestSellers.length > 0 && (
          <ProductRow
            title="🔥 India's Most Loved & Best Sellers"
            subtitle="Top purchased items across electronics, fashion, and home appliances"
            products={data.bestSellers}
            linkHref="/products?badge=Bestseller"
            linkText="See Bestsellers"
          />
        )}

        {/* Top Rated Row */}
        {data.topRated.length > 0 && (
          <ProductRow
            title="⭐ Top Rated by Verified Indian Buyers"
            subtitle="Rated 4.5+ stars with thousands of customer reviews"
            products={data.topRated}
            linkHref="/products?rating=4.5"
            linkText="Explore Top Rated"
          />
        )}

        {/* Electronics Spotlight */}
        {data.categoriesSpotlight.electronics?.length > 0 && (
          <ProductRow
            title="📱 Flagship Smartphones & Audio Spotlight"
            products={data.categoriesSpotlight.electronics}
            linkHref="/products?category=Electronics"
            linkText="Explore all Electronics"
          />
        )}

      </div>
    </div>
  );
};

export default HomePage;