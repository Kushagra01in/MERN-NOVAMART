import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Zap,
  Flame,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  BookOpen,
  Dumbbell,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SubNav = ({ onOpenDrawer }) => {
  const { isAdmin } = useAuth();

  const categoriesRail = [
    { name: 'Super Deals', icon: Flame, path: '/products?deals=true', highlight: true },
    { name: 'Mobiles & Tech', icon: Smartphone, path: '/products?category=Electronics' },
    { name: 'Fashion & Style', icon: Shirt, path: '/products?category=Fashion' },
    { name: 'Home & Kitchen', icon: Home, path: '/products?category=Home+%26+Kitchen' },
    { name: 'Beauty & Care', icon: Sparkles, path: '/products?category=Beauty+%26+Personal+Care' },
    { name: 'Bestseller Books', icon: BookOpen, path: '/products?category=Books' },
    { name: 'Sports & Fitness', icon: Dumbbell, path: '/products?category=Sports+%26+Fitness' },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs font-semibold px-4 sm:px-8 py-2 flex items-center justify-between overflow-x-auto select-none border-b border-white/10 shadow-xs">
      
      {/* Category Icons Rail */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        
        {/* All Hamburger Menu */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-gray-200 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span>All Categories</span>
        </button>

        {/* Categories */}
        {categoriesRail.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              to={cat.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                cat.highlight
                  ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${cat.highlight ? 'text-rose-400' : 'text-amber-400'}`} />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Badges */}
      <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-lg text-xs transition shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
        )}
        <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
          <Zap className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>NovaExpress 24H Delivery</span>
        </div>
      </div>

    </div>
  );
};

export default SubNav;