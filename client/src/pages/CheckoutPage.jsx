import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  CreditCard,
  CheckCircle,
  Truck,
  ShieldCheck,
  Plus,
  Lock,
  ChevronRight,
  QrCode,
  Smartphone,
  Building2,
  Banknote
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const CheckoutPage = () => {
  const { cartItems, itemsPrice, isFreeDelivery, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay', 'phonepe', 'paytm', 'bhim'
  const [upiId, setUpiId] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  // New address inline form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    country: 'India'
  });

  // Simulated Card Info
  const [cardData, setCardData] = useState({
    cardNumber: '5241 •••• •••• 9102',
    nameOnCard: user?.name || 'Kushagra Jha',
    expiry: '09/29',
    cvv: '821'
  });

  useEffect(() => {
    if (!user) {
      addToast('Please sign in to proceed to checkout', 'info');
      navigate('/login?redirect=/checkout');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, cartItems, navigate]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.street || !newAddress.city || !newAddress.phone) {
      addToast('Please fill all address fields', 'error');
      return;
    }
    const res = await addAddress(newAddress);
    if (res.success) {
      setShowAddressForm(false);
      setSelectedAddressIndex(user.addresses.length);
    }
  };

  const handlePlaceOrder = async () => {
    const activeAddress = user?.addresses?.[selectedAddressIndex] || newAddress;
    if (!activeAddress || !activeAddress.street) {
      addToast('Please select or enter a delivery address', 'error');
      return;
    }

    setPlacingOrder(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          originalPrice: item.originalPrice
        })),
        shippingAddress: activeAddress,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiOption.toUpperCase()})` : paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };

      const res = await api.post('/orders', orderPayload);
      if (res.data.success) {
        clearCart();
        addToast('Order placed successfully!', 'success');
        navigate(`/order-success/${res.data.order._id}`, { state: { order: res.data.order } });
      }
    } catch (err) {
      console.error('Order error', err);
      addToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!user || cartItems.length === 0) return null;

  const currentAddress = user.addresses?.[selectedAddressIndex] || user.addresses?.[0];

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-16">
      
      {/* Top Header */}
      <header className="bg-slate-950 text-white py-3 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-black flex items-center gap-1">
            <span>Nova</span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Mart</span>
            <span className="text-xs text-amber-400 font-bold ml-1">Secure Checkout</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <Lock className="w-4 h-4" />
            <span>100% Encrypted & Safe</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Delivery Address */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-xs">
                  1
                </span>
                <h2 className="text-lg font-black text-gray-900">Select Delivery Address</h2>
              </div>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-xs font-black text-indigo-700 hover:text-orange-600 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add new address</span>
              </button>
            </div>

            {/* Existing Addresses */}
            {user.addresses && user.addresses.length > 0 && !showAddressForm && (
              <div className="space-y-3">
                {user.addresses.map((addr, idx) => (
                  <label
                    key={addr._id || idx}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      selectedAddressIndex === idx
                        ? 'border-orange-500 bg-amber-50/40 ring-1 ring-orange-400'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddressIndex === idx}
                      onChange={() => setSelectedAddressIndex(idx)}
                      className="mt-1 text-orange-600 focus:ring-orange-400"
                    />
                    <div className="text-xs text-gray-700 space-y-0.5">
                      <strong className="text-gray-900 text-sm">{addr.fullName}</strong>
                      <div>{addr.street}</div>
                      <div>{addr.city}, {addr.state} - {addr.postalCode}</div>
                      <div>Mobile: <strong>{addr.phone}</strong></div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Inline Add Address Form */}
            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-3">
                <h3 className="font-black text-sm text-gray-900">Add New Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 9876543210"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Flat, House no., Building, Street</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 402 Crystal Tower, Linking Road, Bandra West"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">City / Town</label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">6-Digit Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="px-4 py-2 border rounded-xl font-bold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black rounded-xl"
                  >
                    Save & Deliver Here
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Step 2: Payment Gateways (UPI, Cards, NetBanking, COD) */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-xs">
                2
              </span>
              <h2 className="text-lg font-black text-gray-900">Choose Payment Method</h2>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* UPI Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'UPI'
                    ? 'border-orange-500 bg-amber-50/40 ring-1 ring-orange-400'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-1 text-orange-600 focus:ring-orange-400"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-gray-900 text-sm block">UPI (Instant & Zero Transaction Fee)</strong>
                      <span className="text-emerald-700 font-bold text-[11px]">⚡ Extra ₹100 Cashback on first order</span>
                    </div>
                    <div className="flex gap-2 text-xs font-black text-slate-950">
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">PhonePe</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">GPay</span>
                      <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">Paytm</span>
                    </div>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                      <div className="flex gap-2">
                        {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                          <button
                            type="button"
                            key={app}
                            onClick={() => setUpiOption(app)}
                            className={`px-3 py-1.5 rounded-lg font-black text-xs uppercase transition ${
                              upiOption === app
                                ? 'bg-slate-950 text-amber-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Enter your UPI ID / VPA</label>
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@upi or username@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'Card'
                    ? 'border-orange-500 bg-amber-50/40 ring-1 ring-orange-400'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="mt-1 text-orange-600 focus:ring-orange-400"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-gray-900 text-sm block">Credit / Debit Card / RuPay</strong>
                      <span className="text-gray-500">10% Instant Discount on HDFC, ICICI & SBI Cards</span>
                    </div>
                    <span className="text-base">💳 🛡️</span>
                  </div>

                  {paymentMethod === 'Card' && (
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="col-span-2">
                        <span className="text-[10px] text-gray-500 font-bold block">Card Number</span>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 font-bold block">Valid Thru</span>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 font-bold block">CVV</span>
                        <input
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Net Banking */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'NetBanking'
                    ? 'border-orange-500 bg-amber-50/40 ring-1 ring-orange-400'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'NetBanking'}
                  onChange={() => setPaymentMethod('NetBanking')}
                  className="mt-1 text-orange-600 focus:ring-orange-400"
                />
                <div>
                  <strong className="text-gray-900 text-sm block">Net Banking</strong>
                  <span className="text-gray-500">SBI, HDFC, ICICI, Axis, Kotak and 50+ Indian banks</span>
                </div>
              </label>

              {/* Cash On Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-orange-500 bg-amber-50/40 ring-1 ring-orange-400'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 text-orange-600 focus:ring-orange-400"
                />
                <div>
                  <strong className="text-gray-900 text-sm block">Cash on Delivery / Pay on Delivery</strong>
                  <span className="text-gray-500">Pay via Cash or QR scan when delivery partner arrives</span>
                </div>
              </label>

            </div>
          </div>

          {/* Step 3: Items summary */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-3 text-xs">
            <h3 className="font-black text-gray-900 text-base">Items in this Order ({cartItems.length})</h3>
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product} className="py-3 flex items-center justify-between gap-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 border" />
                    <div>
                      <span className="font-bold text-gray-900 line-clamp-1">{item.name}</span>
                      <span className="text-gray-500">Quantity: {item.qty}</span>
                    </div>
                  </div>
                  <span className="font-black text-gray-900 text-sm">{formatINR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-5 sticky top-20">
            
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black py-4 rounded-2xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {placingOrder ? (
                <span>Placing Your Order...</span>
              ) : (
                <>
                  <span>Place Your Order ({formatINR(totalPrice)})</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <h3 className="font-black text-sm text-gray-900 border-b pb-2">Price Breakdown</h3>

            <div className="space-y-2.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-gray-900">{formatINR(itemsPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-bold text-gray-900">
                  {isFreeDelivery ? <span className="text-emerald-700 font-black">FREE</span> : formatINR(shippingPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (18% included):</span>
                <span className="font-bold text-gray-900">{formatINR(taxPrice)}</span>
              </div>

              <hr className="border-gray-200 my-2" />

              <div className="flex justify-between text-base font-black text-slate-950">
                <span>Total Amount:</span>
                <span className="text-xl text-rose-700">{formatINR(totalPrice)}</span>
              </div>
            </div>

            {currentAddress && (
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1">
                <span className="font-black text-gray-900 block">Deliver to:</span>
                <div className="font-bold text-gray-800">{currentAddress.fullName}</div>
                <div className="text-gray-600 truncate">{currentAddress.street}, {currentAddress.city}</div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;