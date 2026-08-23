import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order) {
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
      fetchOrder();
    }
  }, [id, order]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-500 animate-pulse">
        Loading order confirmation...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Celebration Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              Thank you, your order has been placed!
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              A confirmation email has been sent to your account email with the full receipt.
            </p>
          </div>

          <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-700">
            Order Reference: <strong className="text-gray-900">{order?.trackingNumber || order?._id}</strong>
          </div>
        </div>

        {/* Delivery & Summary Card */}
        {order && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6 text-xs">
            
            {/* Delivery Timeline info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-amazon-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  <p className="text-gray-600">Standard Express Courier (NovaPrime Eligible)</p>
                </div>
              </div>
              <span className="bg-amber-400 text-gray-950 font-bold px-2.5 py-1 rounded text-[11px] shadow-2xs">
                {order.status}
              </span>
            </div>

            {/* Address and Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Shipping Address</h4>
                <div className="text-gray-600 space-y-0.5">
                  <div className="font-semibold text-gray-900">{order.shippingAddress?.fullName}</div>
                  <div>{order.shippingAddress?.street}</div>
                  <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</div>
                  <div>Phone: {order.shippingAddress?.phone}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Payment Details</h4>
                <div className="text-gray-600 space-y-0.5">
                  <div>Method: <strong className="text-gray-900">{order.paymentMethod}</strong></div>
                  <div>Payment Status: <span className="text-emerald-700 font-bold">{order.isPaid ? 'PAID' : 'Pending (Pay on Delivery)'}</span></div>
                  <div>Total Amount: <strong className="text-sm font-black text-rose-700">${order.totalPrice?.toFixed(2)}</strong></div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Items in this order */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-sm">Items Ordered</h4>
              <div className="divide-y divide-gray-100">
                {order.orderItems?.map((item) => (
                  <div key={item.product} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded p-1 flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 line-clamp-1">{item.name}</h5>
                        <span className="text-gray-500">Qty: {item.qty}</span>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-3 justify-between items-center border-t border-gray-200">
              <Link
                to="/orders"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-2xs"
              >
                <Package className="w-4 h-4" />
                <span>View All Orders</span>
              </Link>

              <Link
                to="/products"
                className="bg-amazon-yellow hover:bg-amazon-orange text-gray-950 font-bold px-6 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default OrderSuccessPage;