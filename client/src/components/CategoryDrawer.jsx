import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, ChevronRight, ShoppingBag, ShieldCheck, Sparkles, Tag, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const departments = [
  { name: 'Electronics & Gadgets', path: '/products?category=Electronics' },
  { name: 'Fashion & Apparel', path: '/products?category=Fashion' },
  { name: 'Home, Kitchen & Furniture', path: '/products?category=Home+%26+Kitchen' },
  { name: 'Beauty & Personal Care', path: '/products?category=Beauty+%26+Personal+Care' },
  { name: 'Books & Audible', path: '/products?category=Books' },
  { name: 'Sports, Fitness & Outdoors', path: '/products?category=Sports+%26+Fitness' },
];

const CategoryDrawer = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-left overflow-y-auto">
        {/* Header */}
        <div className="bg-amazon-dark text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
              {user ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs text-gray-300">Hello,</div>
              <div className="font-bold text-base">{user ? user.name : 'Sign In'}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content sections */}
        <div className="p-4 flex-1 space-y-6 text-sm text-gray-800">
          
          {/* Trending */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2 text-amazon-dark">
              Trending & Highlights
            </h3>
            <div className="space-y-1">
              <Link
                to="/products?deals=true"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-100 rounded text-red-600 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Today's Top Deals</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/products?badge=Best+Seller"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Best Sellers</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Shop by Category */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2">
              Shop by Department
            </h3>
            <div className="space-y-1">
              {departments.map((dept) => (
                <Link
                  key={dept.name}
                  to={dept.path}
                  onClick={onClose}
                  className="flex items-center justify-between py-2 px-2 hover:bg-gray-100 rounded text-gray-700 hover:text-gray-950"
                >
                  <span>{dept.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Account & Settings */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-2">
              Help & Settings
            </h3>
            <div className="space-y-1">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="block py-2 px-2 hover:bg-gray-100 rounded"
                  >
                    Your Account & Addresses
                  </Link>
                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="block py-2 px-2 hover:bg-gray-100 rounded"
                  >
                    Your Orders & Tracking
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={onClose}
                      className="block py-2 px-2 bg-amber-50 text-amber-900 font-semibold rounded hover:bg-amber-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full text-left py-2 px-2 hover:bg-red-50 text-red-600 font-medium rounded"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block py-2 px-2 text-amazon-blue hover:text-amazon-orange font-medium"
                >
                  Sign In to NovaMart
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryDrawer;