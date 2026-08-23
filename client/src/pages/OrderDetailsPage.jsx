import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Ban,
  ArrowLeft,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const statusSteps = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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
      addToast('Could not load order details', 'error');
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
    return <div className="max-w-4xl mx-auto py-16 text-center text-gray-500 animate-pulse">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/orders" className="text-amazon-blue hover:underline text-sm mt-2 block">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="bg-gray-100 min-h-screen py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Back Link */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-1 text-xs font-bold text-amazon-blue hover:text-amazon-orange hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Your Orders</span>
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs text-gray-500 font-medium">Order #{order.trackingNumber || order._id}</span>
            <h1 className="text-2xl font-black text-gray-900 mt-0.5">Order Details</h1>
            <p className="text-xs text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </p>
          </div>

          {!isCancelled && order.status !== 'Delivered' && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 px-4 py-2 rounded-lg text-xs transition disabled:opacity-50"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>

        {/* Live Delivery Progress Tracker Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-bold text-base text-gray-900">
                {isCancelled ? 'Order Cancelled' : `Status: ${order.status}`}
              </h3>
              <p className="text-xs text-gray-500">
                {isCancelled
                  ? 'This order has been cancelled and refunded.'
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition duration-300 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[11px] mt-2 font-bold ${
                          isCurrent
                            ? 'text-gray-950 font-black'
                            : isCompleted
                            ? 'text-emerald-700'
                            : 'text-gray-400'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress track line */}
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

          {/* Activity Log */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2 text-xs">
              <h4 className="font-bold text-gray-900">Tracking History</h4>
              <div className="space-y-1.5 divide-y divide-gray-200/60">
                {order.statusHistory.map((hist, i) => (
                  <div key={i} className="pt-1.5 first:pt-0 flex justify-between items-center text-gray-600">
                    <div>
                      <strong className="text-gray-800">{hist.status}</strong> - {hist.note || 'Status updated'}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Shipping & Payment Summary Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-2 text-xs">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amazon-orange" />
              <span>Delivery Address</span>
            </h3>
            <div className="text-gray-700 space-y-0.5 pt-1">
              <div className="font-bold text-gray-900">{order.shippingAddress?.fullName}</div>
              <div>{order.shippingAddress?.street}</div>
              <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</div>
              <div>Phone: {order.shippingAddress?.phone}</div>
            </div>
          </div>

          {/* Payment Method & Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-2 text-xs">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amazon-blue" />
              <span>Payment Details</span>
            </h3>
            <div className="space-y-1 pt-1 text-gray-600">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <strong className="text-gray-900">{order.paymentMethod}</strong>
              </div>
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>${order.itemsPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.shippingPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span>${order.taxPrice?.toFixed(2)}</span>
              </div>
              <hr className="border-gray-200 my-1" />
              <div className="flex justify-between text-sm font-black text-gray-950">
                <span>Grand Total:</span>
                <span className="text-rose-700">${order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-gray-900">Items in this Package</h3>
          <div className="divide-y divide-gray-100">
            {order.orderItems?.map((item) => (
              <div key={item.product} className="py-4 flex items-center justify-between gap-4 first:pt-0">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 p-1 flex items-center justify-center flex-shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <Link
                      to={`/products/${item.product}`}
                      className="font-bold text-sm text-gray-900 hover:text-amazon-orange hover:underline line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="text-xs text-gray-500">
                      Quantity: {item.qty} • Unit Price: ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;