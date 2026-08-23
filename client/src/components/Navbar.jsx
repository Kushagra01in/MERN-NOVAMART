import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  MapPin,
  User,
  ChevronDown,
  LogOut,
  Package,
  ShieldCheck,
  Menu,
  Heart,
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

const categories = [
  'All Departments',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Books',
  'Sports & Fitness'
];

const Navbar = ({ onOpenDrawer }) => {
  const { user, isAdmin, logout } = useAuth();
  const { itemsCount, itemsPrice } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Departments');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [pincode, setPincode] = useState('400001');
  const [editingPincode, setEditingPincode] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('keyword', searchTerm.trim());
    if (selectedCat !== 'All Departments') params.append('category', selectedCat);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-brand-900 to-slate-900 text-white font-sans shadow-md">
      
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-slate-950 text-[11px] font-extrabold py-1 px-4 text-center tracking-wide flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>FESTIVE SAVINGS BONANZA: Extra 10% Instant Discount on HDFC & ICICI Cards + Flat ₹100 Cashback on UPI</span>
        </span>
        <span className="hidden md:inline font-normal">|</span>
        <span className="hidden md:inline font-semibold">Free Express Delivery Across 19,000+ Indian Pincodes</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2.5 flex items-center gap-3 lg:gap-6 text-sm">
        
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenDrawer}
          className="lg:hidden p-2 hover:bg-white/10 rounded-xl text-white flex items-center transition"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Distinctive Brand Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-glow group-hover:scale-105 transition transform">
            N
          </div>
          <div>
            <div className="flex items-center font-black text-xl sm:text-2xl tracking-tight leading-none">
              <span className="text-white">Nova</span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Mart</span>
              <span className="ml-1 text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                India
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide block">
              India's Premier SuperStore
            </span>
          </div>
        </Link>

        {/* Indian Pincode Delivery Selector (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer text-xs">
          <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div>
            <span className="text-gray-400 block text-[10px]">Deliver to</span>
            <div className="font-bold text-white flex items-center gap-1">
              <span>{user ? user.name.split(' ')[0] : 'Mumbai'}</span>
              <span className="text-amber-400">{user?.addresses?.[0]?.postalCode || pincode}</span>
            </div>
          </div>
        </div>

        {/* Modern Pill Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center min-w-0 max-w-2xl">
          <div className="relative flex w-full h-11 rounded-full overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-amber-400 border border-white/20 transition">
            
            {/* Category Dropdown */}
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              aria-label="Filter category"
              className="bg-gray-100 text-gray-800 text-xs px-3 border-r border-gray-200 focus:outline-none cursor-pointer hidden md:block max-w-[130px] font-semibold truncate"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search for Mobiles, Laptops, Fashion, Groceries, Appliances & More..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 text-xs sm:text-sm text-gray-900 bg-white focus:outline-none placeholder-gray-400"
            />

            {/* Search Action Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-5 flex items-center justify-center transition-all text-slate-950 font-bold"
              aria-label="Submit Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>

        {/* Right Nav Options */}
        <div className="flex items-center gap-2 lg:gap-4">
          
          {/* Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}
          >
            <div className="px-3 py-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer text-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-brand-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <span className="text-gray-400 block text-[10px]">
                  {user ? `Namaste, ${user.name.split(' ')[0]}` : 'Sign In / Register'}
                </span>
                <span className="font-bold text-white flex items-center gap-0.5">
                  My Account <ChevronDown className="w-3 h-3 text-gray-400" />
                </span>
              </div>
            </div>

            {/* Account Floating Panel */}
            {showAccountMenu && (
              <div className="absolute right-0 top-full pt-2 w-64 z-50 text-gray-900">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
                  {!user ? (
                    <div className="text-center pb-3 border-b border-gray-100">
                      <Link
                        to="/login"
                        onClick={() => setShowAccountMenu(false)}
                        className="w-full block bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold py-2 rounded-xl text-xs shadow-md transition"
                      >
                        Sign In to Your Account
                      </Link>
                      <p className="text-xs text-gray-500 mt-2">
                        New Customer?{' '}
                        <Link
                          to="/register"
                          onClick={() => setShowAccountMenu(false)}
                          className="text-indigo-600 font-bold hover:underline"
                        >
                          Register Free
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="pb-3 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-black flex items-center justify-center text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-sm text-gray-900 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>
                  )}

                  <div className="py-2 space-y-1 text-xs font-semibold text-gray-700">
                    {user && (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setShowAccountMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          <User className="w-4 h-4 text-indigo-600" />
                          <span>My Profile & Saved Addresses</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setShowAccountMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          <Package className="w-4 h-4 text-amber-600" />
                          <span>My Orders & Tracking</span>
                        </Link>
                      </>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-amber-50 text-amber-900 font-bold hover:bg-amber-100"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        <span>Admin Control Dashboard</span>
                      </Link>
                    )}

                    {user && (
                      <button
                        onClick={() => {
                          logout();
                          setShowAccountMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-bold text-left border-t border-gray-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Orders */}
          <Link
            to={user ? "/orders" : "/login"}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 transition text-xs font-bold"
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Orders</span>
          </Link>

          {/* Modern Shopping Cart Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 px-3.5 py-2 rounded-xl font-black text-xs shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-950 text-amber-300 font-black text-[10px] px-1.5 py-0.2 rounded-full border border-amber-400 shadow-sm">
                  {itemsCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {itemsCount > 0 ? formatINR(itemsPrice) : 'Cart'}
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;