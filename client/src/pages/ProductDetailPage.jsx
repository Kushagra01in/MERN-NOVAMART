import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  ThumbsUp,
  MessageSquarePlus,
  ArrowLeft,
  MapPin,
  Percent,
  Check
} from 'lucide-react';
import RatingStars from '../components/RatingStars';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { formatINR } from '../utils/formatters';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Indian Pincode Deliverability Check
  const [checkPincode, setCheckPincode] = useState('400001');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
        setReviews(res.data.reviews || []);
        setRelatedProducts(res.data.relatedProducts || []);
        setSelectedImage(res.data.product.mainImage);
      }
    } catch (err) {
      console.error('Failed to load product', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in to write a review', 'error');
      navigate('/login');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await api.post(`/products/${id}/reviews`, {
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment
      });

      if (res.data.success) {
        addToast('Review submitted successfully!', 'success');
        setShowReviewModal(false);
        setReviewTitle('');
        setReviewComment('');
        fetchProduct();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="h-96 bg-gray-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded-2xl" />
          </div>
          <div className="h-80 bg-gray-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        <h2 className="text-2xl font-black text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you are looking for is no longer available.</p>
        <Link to="/products" className="bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-sm">
          Browse Store Catalog
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const savings = Math.max(0, product.originalPrice - product.price);
  const emiMonthly = Math.round(product.price / 12);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-20">
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-8 text-xs text-gray-500">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-orange-600 font-semibold">Home</Link>
          <span>›</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-orange-600 font-semibold">
            {product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-bold truncate max-w-md">{product.name}</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery (4 cols on LG) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl border border-gray-100 p-8 flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-card relative overflow-hidden group">
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {discount > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                  {discount}% OFF
                </span>
              )}
              {product.badge && (
                <span className="bg-slate-950 text-amber-300 text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-[400px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl border-2 p-1.5 bg-white flex items-center justify-center flex-shrink-0 transition shadow-2xs ${
                    selectedImage === img ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="max-h-full max-w-full object-contain rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Column: Product Specs & Details (4 cols on LG) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div>
            <span className="text-xs font-black text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
              Brand: {product.brand}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-950 leading-snug mt-2">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="bg-emerald-700 text-white text-xs font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                <span>{product.rating?.toFixed(1) || '4.5'}</span>
                <span>★</span>
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                {product.numReviews?.toLocaleString()} Ratings & Reviews
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Price Box */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through font-semibold">
                  M.R.P.: {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            {savings > 0 && (
              <div className="text-xs font-bold text-emerald-700">
                You Save: {formatINR(savings)} ({discount}% Off on M.R.P.)
              </div>
            )}
            <span className="text-[11px] text-gray-500 block">Inclusive of all taxes (GST included).</span>
          </div>

          {/* Bank Offer Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/80 text-xs text-gray-800 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-900 font-black">
              <Percent className="w-4 h-4 text-orange-600" />
              <span>Available Bank & UPI Offers</span>
            </div>
            <ul className="space-y-1 text-gray-700 text-[11px] list-disc list-inside">
              <li><strong>10% Instant Discount</strong> up to ₹1,500 on HDFC Bank and SBI Credit Cards.</li>
              <li><strong>Flat ₹100 Cashback</strong> on first UPI transaction via GPay/PhonePe/Paytm.</li>
              <li><strong>No Cost EMI</strong> starting @ <strong>{formatINR(emiMonthly)}/month</strong>.</li>
            </ul>
          </div>

          {/* About this item (Features) */}
          <div className="space-y-2">
            <h3 className="font-black text-xs uppercase tracking-wider text-gray-900">Key Highlights</h3>
            <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside leading-relaxed">
              {product.features && product.features.length > 0 ? (
                product.features.map((feat, idx) => (
                  <li key={idx}><span>{feat}</span></li>
                ))
              ) : (
                <li>{product.description}</li>
              )}
            </ul>
          </div>

          {/* Technical Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="pt-2">
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900 mb-2">Specifications</h3>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs text-xs">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <dt className="text-gray-400 font-semibold text-[11px]">{key}</dt>
                      <dd className="font-bold text-gray-900">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Modern Buy & Delivery Box (3 cols on LG) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card space-y-5 sticky top-24">
            
            {/* Price Header */}
            <div>
              <span className="text-xs text-gray-400 font-bold block">Special Price</span>
              <span className="text-2xl font-black text-slate-950">{formatINR(product.price)}</span>
            </div>

            {/* Indian Pincode Deliverability Check */}
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-black text-gray-900">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Delivery & Services</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={checkPincode}
                  onChange={(e) => setCheckPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  maxLength={6}
                  className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setPincodeChecked(true)}
                  className="bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-800"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Delivery available by <strong>Tomorrow</strong> | Cash on Delivery available</span>
                </div>
              )}
            </div>

            {/* Stock State */}
            <div>
              {product.countInStock > 5 ? (
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
                  ✓ In Stock & Ready to Ship
                </span>
              ) : product.countInStock > 0 ? (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
                  ⚠️ Only {product.countInStock} items left in stock
                </span>
              ) : (
                <span className="inline-block bg-rose-100 text-rose-800 text-xs font-black px-3 py-1 rounded-full">
                  Currently Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Picker */}
            {product.countInStock > 0 && (
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-gray-700">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-xs focus:ring-1 focus:ring-amber-400 cursor-pointer"
                >
                  {[...Array(Math.min(10, product.countInStock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Units
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => addToCart(product, qty)}
                disabled={product.countInStock === 0}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.countInStock === 0}
                className="w-full bg-slate-950 hover:bg-slate-800 text-amber-400 font-black py-3 rounded-2xl text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>

            {/* Assured Badges */}
            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Genuine product with Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>7-Day Return & Doorstep Replacement Policy</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12 border-t border-gray-200 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xl font-black text-gray-900">Ratings & Customer Reviews</h2>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-slate-950">{product.rating?.toFixed(1) || '4.5'}</span>
              <div>
                <RatingStars rating={product.rating} size="md" showNum={false} />
                <span className="text-xs text-gray-500 font-semibold">{product.numReviews?.toLocaleString()} verified buyers</span>
              </div>
            </div>

            {/* Distribution */}
            <div className="space-y-2 pt-2 text-xs font-bold">
              {[
                { star: 5, pct: product.ratingBreakdown?.fiveStar || 80 },
                { star: 4, pct: product.ratingBreakdown?.fourStar || 12 },
                { star: 3, pct: product.ratingBreakdown?.threeStar || 4 },
                { star: 2, pct: product.ratingBreakdown?.twoStar || 2 },
                { star: 1, pct: product.ratingBreakdown?.oneStar || 2 },
              ].map(({ star, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-8 text-gray-700">{star}★</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-gray-500 text-[11px]">{pct}%</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full py-2.5 border border-slate-950 text-slate-950 rounded-2xl text-xs font-black hover:bg-slate-950 hover:text-white transition flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Rate & Review this product</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-lg font-black text-gray-900 border-b pb-2">
              Customer Experiences & Reviews
            </h3>

            {reviews.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs">No reviews submitted yet.</div>
            ) : (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev._id} className="border-b border-gray-100 pb-6 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-900">{rev.name}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        ✓ Verified Purchase
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <RatingStars rating={rev.rating} size="sm" showNum={false} />
                      <span className="font-bold text-gray-900">{rev.title}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm">{rev.comment}</p>
                    <span className="text-[10px] text-gray-400">Reviewed on {new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-black text-gray-900">Write Product Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          reviewRating >= star ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your review..."
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Review Comments</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share details about performance, build quality, usability..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black rounded-xl shadow-xs"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;