import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center max-w-md shadow-sm space-y-4">
          <ShieldCheck className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Admin Access Required</h2>
          <p className="text-xs text-gray-500">
            You must be signed in with an administrator account to access the control panel.
          </p>
          <div className="pt-2 flex gap-3 justify-center">
            <Link to="/" className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold">
              Return to Store
            </Link>
            <Link to="/login" className="px-4 py-2 bg-amazon-yellow text-gray-950 font-bold rounded-lg text-xs">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Admin Top Navigation */}
      <header className="bg-amazon-dark text-white px-6 py-3 border-b border-gray-800 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-extrabold text-xl tracking-tight text-white flex items-center">
            <span>Nova</span>
            <span className="text-amazon-yellow">Mart</span>
            <span className="ml-2 text-[10px] bg-amber-500 text-gray-950 px-2 py-0.5 rounded font-black tracking-wider uppercase">
              Admin
            </span>
          </Link>

          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-gray-800 transition"
          >
            <Store className="w-3.5 h-3.5 text-amazon-yellow" />
            <span>Go to Public Storefront</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right hidden sm:block">
            <div className="font-bold text-white">{user?.name}</div>
            <div className="text-gray-400 text-[10px]">Super Administrator</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 hover:bg-gray-800 rounded transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 p-4 space-y-6 hidden md:block">
          <div>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2 px-3">
              Management
            </span>
            <nav className="space-y-1 text-xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-bold transition ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amazon-orange' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-amazon-orange" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Dynamic Admin Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;