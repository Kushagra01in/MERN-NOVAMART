import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Zap,
  Info,
  CreditCard,
  Percent
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

const CartPage = () => {
  const {
    cartItems,
    itemsCount,
    itemsPrice,
    originalSubtotal,
    totalSavings,
    isFreeDelivery,
    shippingPrice,
    taxPrice,
    totalPrice,
    removeFromCart,
    updateQty,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950">My Shopping Bag</h1>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{itemsCount} Items in your bag</p>
          </div>
          {itemsCount > 0 && (
            <button onClick={clearCart} className="text-xs text-rose-600 hover:underline font-bold">
              Empty Bag
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center max-w-xl mx-auto shadow-card space-y-4">
            <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-700">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Your shopping bag is empty</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore our wide range of top smartphones, electronics, fashion, and home appliances!
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black px-8 py-3 rounded-2xl text-xs shadow-md transition"
              >
                Start Shopping Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Free Delivery Bar */}
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-card">
                <div className="flex items-center gap-2 text-xs font-bold">
                  {isFreeDelivery ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-emerald-800">
                        🎉 Great news! Your order qualifies for <strong>FREE Express Delivery</strong>!
                      </span>
                    </>
                  ) : (
                    <>
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-700">
                        Add items worth <strong className="text-amber-800">{formatINR(499 - itemsPrice)}</strong> more for <strong>FREE Delivery</strong>!
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (itemsPrice / 499) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.product} className="py-6 flex flex-col sm:flex-row gap-5 first:pt-2">
                    
                    {/* Item Image */}
                    <div className="w-28 h-28 bg-gray-50 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-black text-indigo-600 uppercase">{item.brand}</span>
                          <Link
                            to={`/products/${item.product}`}
                            className="block font-bold text-sm text-gray-900 hover:text-orange-600 line-clamp-2"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-lg font-black text-slate-950">{formatINR(item.price)}</span>
                          {item.originalPrice > item.price && (
                            <span className="block text-[11px] text-gray-400 line-through">
                              {formatINR(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-emerald-700 font-bold">✓ In Stock</span>
                        <span className="text-gray-500">7-Day Replacement</span>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-2xs">
                          <button
                            onClick={() => updateQty(item.product, item.qty - 1)}
                            className="p-2 hover:bg-gray-200 transition text-gray-700"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-black text-gray-900">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product, item.qty + 1)}
                            className="p-2 hover:bg-gray-200 transition text-gray-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product)}
                          className="text-rose-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-5 sticky top-24">
                
                <h3 className="font-black text-base text-gray-900 border-b pb-3">Price Summary</h3>

                <div className="space-y-2.5 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>Total M.R.P. ({itemsCount} items):</span>
                    <span className="font-bold text-gray-900">{formatINR(originalSubtotal)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl">
                      <span>Discount on M.R.P.:</span>
                      <span>-{formatINR(totalSavings)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className="font-bold text-gray-900">
                      {isFreeDelivery ? <span className="text-emerald-700">FREE</span> : formatINR(shippingPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated GST (18% included):</span>
                    <span className="font-bold text-gray-900">{formatINR(taxPrice)}</span>
                  </div>

                  <hr className="border-gray-200 my-2" />

                  <div className="flex justify-between text-base font-black text-slate-950">
                    <span>Total Payable:</span>
                    <span className="text-xl text-rose-700">{formatINR(totalPrice)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout ({itemsCount} items)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-gray-500 text-center space-y-1 pt-2">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Safe and Secure Indian Payments</span>
                  </div>
                  <p>100% Payment Protection & Easy Returns</p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;