import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const statusSteps = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error('Failed to load order', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    setCancelling(true);
    try {
      const res = await api.put(`/orders/${id}/cancel`);
      if (res.data.success) {
        addToast('Order has been cancelled', 'info');
        setOrder(res.data.order);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to cancel order', 'error');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto py-20 text-center text-gray-500 animate-pulse">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/orders" className="text-indigo-600 font-bold hover:underline text-xs mt-2 block">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-700 hover:text-orange-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              TRACKING ID: {order.trackingNumber || order._id}
            </span>
            <h1 className="text-2xl font-black text-slate-950 mt-0.5">Order Summary & Tracking</h1>
            <p className="text-xs text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </p>
          </div>

          {!isCancelled && order.status !== 'Delivered' && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 px-4 py-2 rounded-xl text-xs transition"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>

        {/* Stepper Timeline */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-black text-base text-gray-900">
                {isCancelled ? 'Order Cancelled' : `Delivery Status: ${order.status}`}
              </h3>
              <p className="text-xs text-gray-500">
                {isCancelled
                  ? 'This order was cancelled.'
                  : `Estimated Delivery by ${new Date(order.estimatedDelivery).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black ${
                isCancelled
                  ? 'bg-rose-100 text-rose-800'
                  : order.status === 'Delivered'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Stepper */}
          {!isCancelled && (
            <div className="relative py-4">
              <div className="flex items-center justify-between relative z-10">
                {statusSteps.map((step, idx) => {
                  const isCompleted = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div key={step} className="flex flex-col items-center flex-1 text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] mt-2 font-bold ${
                          isCurrent ? 'text-gray-950 font-black' : isCompleted ? 'text-emerald-700' : 'text-gray-400'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 -z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${(Math.max(0, currentStepIndex) / (statusSteps.length - 1)) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Shipping & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-2 text-xs">
            <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Delivery Address</span>
            </h3>
            <div className="text-gray-700 space-y-0.5 pt-1">
              <div className="font-bold text-gray-900">{order.shippingAddress?.fullName}</div>
              <div>{order.shippingAddress?.street}</div>
              <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}</div>
              <div>Mobile: <strong>{order.shippingAddress?.phone}</strong></div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-2 text-xs">
            <h3 className="font-black text-sm text-gray-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payment Details</span>
            </h3>
            <div className="space-y-1 pt-1 text-gray-600">
              <div className="flex justify-between">
                <span>Method:</span>
                <strong className="text-gray-900">{order.paymentMethod}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-black text-rose-700 text-sm">{formatINR(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="text-emerald-700 font-bold">{order.isPaid ? 'PAID' : 'Pay on Delivery'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-4 text-xs">
          <h3 className="font-black text-base text-gray-900">Ordered Items</h3>
          <div className="divide-y divide-gray-100">
            {order.orderItems?.map((item) => (
              <div key={item.product} className="py-4 flex items-center justify-between gap-4 first:pt-0">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt="" className="w-14 h-14 object-contain rounded-2xl bg-gray-50 p-1 border" />
                  <div>
                    <Link to={`/products/${item.product}`} className="font-bold text-sm text-gray-900 hover:text-orange-600">
                      {item.name}
                    </Link>
                    <span className="text-gray-500 block">Quantity: {item.qty}</span>
                  </div>
                </div>
                <span className="font-black text-sm text-gray-900">{formatINR(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order) {
      const fetchOrder = async () => {
        try {
          const res = await api.get(`/orders/${id}`);
          if (res.data.success) setOrder(res.data.order);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  if (loading) {
    return <div className="py-20 text-center text-gray-400">Loading order receipt...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-card text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Order Confirmed</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              Shukriya! Your order has been placed.
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              We have received your order. Tracking updates will be sent via SMS and Email.
            </p>
          </div>

          <div className="inline-block bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-800 font-semibold">
            Tracking ID: <strong className="text-slate-950 font-black">{order?.trackingNumber}</strong>
          </div>
        </div>

        {order && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-6 text-xs">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-orange-600" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  <span className="text-gray-600">NovaExpress 24H Guaranteed Service</span>
                </div>
              </div>
              <span className="bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-xl text-xs">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t text-sm font-black text-slate-950">
              <span>Total Amount Paid:</span>
              <span className="text-rose-700 text-lg">{formatINR(order.totalPrice)}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link to="/orders" className="bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-xl font-bold text-gray-800">
                View All Orders
              </Link>
              <Link to="/products" className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 px-6 py-2.5 rounded-xl font-black">
                Continue Shopping →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};