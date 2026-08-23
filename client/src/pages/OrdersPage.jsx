import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Truck,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const statusBadges = {
  Processing: 'bg-blue-100 text-blue-900 border-blue-200',
  Confirmed: 'bg-indigo-100 text-indigo-900 border-indigo-200',
  Shipped: 'bg-amber-100 text-amber-900 border-amber-200',
  'Out for Delivery': 'bg-orange-100 text-orange-900 border-orange-200',
  Delivered: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  Cancelled: 'bg-rose-100 text-rose-900 border-rose-200'
};

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/orders');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/myorders');
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch =
      order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems?.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order._id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950">My Orders & Tracking</h1>
            <p className="text-xs text-gray-500 mt-0.5">Track packages, view tax invoices, and manage past deliveries</p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by order or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-amber-400 shadow-2xs"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs border-b border-gray-200">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 font-black rounded-xl transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-950 text-amber-400 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
              }`}
            >
              {st} Orders
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-44 bg-white rounded-3xl border border-gray-100" />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center shadow-card space-y-4">
            <Package className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-lg font-black text-gray-900">No orders found</h3>
            <p className="text-xs text-gray-500">
              {searchTerm || statusFilter !== 'All'
                ? 'Try adjusting your search keywords or active filters.'
                : 'You have not placed any orders on NovaMart yet.'}
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition"
              >
                {/* Order Top Bar */}
                <div className="bg-gray-50/80 p-4 sm:p-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-600">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-gray-400 uppercase text-[10px] font-black block">ORDER PLACED</span>
                      <span className="font-bold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase text-[10px] font-black block">TOTAL</span>
                      <span className="font-black text-slate-950">{formatINR(order.totalPrice)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase text-[10px] font-black block">SHIP TO</span>
                      <span className="font-bold text-gray-800">{order.shippingAddress?.fullName}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-gray-400 uppercase text-[10px] font-black block">
                      TRACKING ID: {order.trackingNumber}
                    </span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      View Order Details →
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border ${
                        statusBadges[order.status] || 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-xs font-black text-orange-600 hover:underline flex items-center gap-1"
                    >
                      <span>Track Package</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {order.orderItems?.map((item) => (
                      <div key={item.product} className="py-3 flex items-center justify-between gap-4 first:pt-0">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt="" className="w-14 h-14 object-contain rounded-2xl bg-gray-50 p-1 border" />
                          <div>
                            <Link to={`/products/${item.product}`} className="font-bold text-sm text-gray-900 hover:text-orange-600 line-clamp-1">
                              {item.name}
                            </Link>
                            <span className="text-xs text-gray-500 font-semibold">Qty: {item.qty} • Price: {formatINR(item.price)}</span>
                          </div>
                        </div>

                        <Link
                          to={`/products/${item.product}`}
                          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-2xs"
                        >
                          Buy Again
                        </Link>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;