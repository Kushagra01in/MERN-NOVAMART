import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  Plus
} from 'lucide-react';
import api from '../../services/api';
import { formatINR } from '../../utils/formatters';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Failed to load admin stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Admin Analytics...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Admin Control Center</h1>
          <p className="text-xs text-gray-500 mt-0.5">Overview of store sales, product inventory, and customer orders across India</p>
        </div>

        <Link
          to="/admin/products?action=new"
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sales Revenue</span>
            <h3 className="text-2xl font-black text-slate-950 mt-1">{formatINR(stats?.totalRevenue || 0)}</h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl">
            ₹
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</span>
            <h3 className="text-2xl font-black text-slate-950 mt-1">{stats?.totalOrders || 0}</h3>
            <span className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5 mt-1">
              <Clock className="w-3.5 h-3.5" /> {stats?.orderStatusCounts?.processing || 0} in progress
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Store Products</span>
            <h3 className="text-2xl font-black text-slate-950 mt-1">{stats?.totalProducts || 0}</h3>
            <span className="text-[11px] text-amber-600 font-bold flex items-center gap-0.5 mt-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {stats?.lowStockCount || 0} low stock
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Users</span>
            <h3 className="text-2xl font-black text-slate-950 mt-1">{stats?.totalUsers || 0}</h3>
            <span className="text-[11px] text-purple-600 font-bold flex items-center gap-0.5 mt-1">
              Registered customers
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Orders Status Grid */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <h3 className="font-black text-sm text-gray-900">Live Indian Delivery Pipeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
            <span className="text-blue-700 font-bold block">Processing</span>
            <span className="text-xl font-black text-blue-900">{stats?.orderStatusCounts?.processing || 0}</span>
          </div>
          <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200">
            <span className="text-indigo-700 font-bold block">Confirmed</span>
            <span className="text-xl font-black text-indigo-900">{stats?.orderStatusCounts?.confirmed || 0}</span>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
            <span className="text-amber-700 font-bold block">Shipped</span>
            <span className="text-xl font-black text-amber-900">{stats?.orderStatusCounts?.shipped || 0}</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <span className="text-emerald-700 font-bold block">Delivered</span>
            <span className="text-xl font-black text-emerald-900">{stats?.orderStatusCounts?.delivered || 0}</span>
          </div>
          <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
            <span className="text-rose-700 font-bold block">Cancelled</span>
            <span className="text-xl font-black text-rose-900">{stats?.orderStatusCounts?.cancelled || 0}</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-black text-sm text-gray-900">Recent Customer Orders</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-indigo-600 hover:text-orange-600">
              View all orders →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {stats?.recentOrders?.map((ord) => (
              <div key={ord._id} className="py-3 flex items-center justify-between gap-4 first:pt-0">
                <div>
                  <div className="font-bold text-gray-900">{ord.user?.name || 'Customer'}</div>
                  <div className="text-gray-400 text-[11px]">
                    #{ord.trackingNumber} • {new Date(ord.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-950">{formatINR(ord.totalPrice)}</div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h3 className="font-black text-sm text-gray-900">Low Stock Alert</h3>
            </div>
            <Link to="/admin/products" className="text-xs font-bold text-indigo-600 hover:text-orange-600">
              Manage inventory →
            </Link>
          </div>

          {stats?.lowStockProducts?.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">All products well-stocked!</div>
          ) : (
            <div className="divide-y divide-gray-100 text-xs">
              {stats?.lowStockProducts?.map((prod) => (
                <div key={prod._id} className="py-2.5 flex items-center justify-between gap-3 first:pt-0">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={prod.mainImage} alt="" className="w-10 h-10 object-contain rounded-xl bg-gray-50 p-1 border flex-shrink-0" />
                    <span className="font-bold text-gray-900 truncate">{prod.name}</span>
                  </div>
                  <span className="bg-rose-100 text-rose-800 font-black text-xs px-2.5 py-0.5 rounded-lg flex-shrink-0">
                    {prod.countInStock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;