import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { formatINR } from '../../utils/formatters';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Books',
  'Sports & Fitness'
];

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(searchParams.get('action') === 'new');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Electronics',
    subcategory: '',
    price: '',
    originalPrice: '',
    countInStock: 10,
    mainImage: '',
    description: '',
    isPrimeEligible: true,
    isDealOfTheDay: false,
    badge: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products?limit=100');
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      brand: '',
      category: 'Electronics',
      subcategory: '',
      price: '',
      originalPrice: '',
      countInStock: 10,
      mainImage: '',
      description: '',
      isPrimeEligible: true,
      isDealOfTheDay: false,
      badge: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setEditingId(product._id);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      countInStock: product.countInStock,
      mainImage: product.mainImage,
      description: product.description,
      isPrimeEligible: product.isPrimeEligible,
      isDealOfTheDay: product.isDealOfTheDay,
      badge: product.badge || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        addToast('Product deleted successfully', 'success');
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        const res = await api.put(`/products/${editingId}`, formData);
        if (res.data.success) {
          addToast('Product updated successfully!', 'success');
          setShowModal(false);
          fetchProducts();
        }
      } else {
        const res = await api.post('/products', formData);
        if (res.data.success) {
          addToast('New product created successfully!', 'success');
          setShowModal(false);
          fetchProducts();
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error saving product', 'error');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Product Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Control live store pricing, inventory count, and deals</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 bg-white font-bold text-gray-800 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="text-gray-500 font-bold">
          Total: <span className="text-slate-950 font-black">{filteredProducts.length}</span> products
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-[10px] font-extrabold border-b border-gray-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₹)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">Loading catalog...</td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.mainImage} alt="" className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1 border flex-shrink-0" />
                        <div className="max-w-xs">
                          <span className="text-[10px] font-bold text-gray-400 uppercase block">{p.brand}</span>
                          <span className="font-bold text-gray-900 line-clamp-1">{p.name}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-gray-800">{p.category}</td>

                    <td className="p-4">
                      <div className="font-black text-slate-950">{formatINR(p.price)}</div>
                      {p.originalPrice > p.price && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {formatINR(p.originalPrice)}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`inline-block font-black px-2.5 py-0.5 rounded-lg text-xs ${
                        p.countInStock > 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.countInStock} in stock
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {p.badge && (
                          <span className="bg-slate-950 text-amber-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                        {p.isDealOfTheDay && (
                          <span className="bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                            DEAL
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-black text-gray-900">
                {isEditing ? 'Edit Product' : 'Add New Product (₹ Price)'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OnePlus 12 5G (16GB RAM, 512GB Storage)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony, OnePlus, Nike"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-amber-400 focus:outline-none font-bold"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, 40% OFF"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 24999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">M.R.P. (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 29999"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={formData.countInStock}
                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Main Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.mainImage}
                  onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description / Features</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Key specifications, warranty details, features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black rounded-xl shadow-sm"
                >
                  {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;