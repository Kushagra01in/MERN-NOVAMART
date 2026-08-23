import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  MapPin,
  Package,
  ShieldCheck,
  Plus,
  Trash2,
  Lock,
  Save,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage = () => {
  const { user, isAdmin, updateProfile, addAddress, deleteAddress } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // New Address modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phone: user?.phone || '',
    country: 'India',
    isDefault: false
  });

  if (!user) {
    navigate('/login?redirect=/profile');
    return null;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const payload = { name, phone };
    if (password) payload.password = password;

    const res = await updateProfile(payload);
    setSavingProfile(false);
    if (res.success) {
      setPassword('');
    }
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.postalCode) {
      addToast('Please complete all address fields', 'error');
      return;
    }

    const res = await addAddress(newAddr);
    if (res.success) {
      setShowAddModal(false);
      setNewAddr({
        fullName: user?.name || '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        phone: user?.phone || '',
        country: 'India',
        isDefault: false
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Your Account</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage personal information, security, and addresses</p>
          </div>

          {isAdmin && (
            <Link
              to="/admin"
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/orders"
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs hover:shadow-md transition flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-amazon-orange">Your Orders</h3>
              <p className="text-xs text-gray-500">Track, return, or buy items again</p>
            </div>
          </Link>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Login & Security</h3>
              <p className="text-xs text-gray-500">Edit name, mobile number, and password</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Your Addresses</h3>
              <p className="text-xs text-gray-500">Edit addresses for orders</p>
            </div>
          </div>
        </div>

        {/* Profile & Password Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="border-b pb-3">
            <h2 className="text-lg font-bold text-gray-900">Profile Details</h2>
            <p className="text-xs text-gray-500">Keep your contact information up to date</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  New Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="New password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="bg-amazon-yellow hover:bg-amazon-orange text-gray-950 font-bold px-6 py-2 rounded-lg text-xs shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingProfile ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </form>
        </div>

        {/* Saved Addresses Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Saved Addresses</h2>
              <p className="text-xs text-gray-500">Addresses used for shipping and delivery estimates</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-1.5 rounded-lg text-xs border border-gray-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add Address Card */}
            <button
              onClick={() => setShowAddModal(true)}
              className="border-2 border-dashed border-gray-300 hover:border-amazon-orange rounded-xl p-6 flex flex-col items-center justify-center text-center text-gray-500 hover:text-amazon-orange transition min-h-[160px] group"
            >
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-amazon-orange mb-2" />
              <span className="font-bold text-sm text-gray-800 group-hover:text-amazon-orange">Add Address</span>
            </button>

            {/* Address Cards */}
            {user.addresses?.map((addr) => (
              <div
                key={addr._id}
                className="border border-gray-200 rounded-xl p-5 shadow-2xs relative flex flex-col justify-between space-y-3 bg-gray-50/50"
              >
                <div className="space-y-1 text-xs text-gray-700">
                  {addr.isDefault && (
                    <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded mb-1">
                      Default Address
                    </span>
                  )}
                  <div className="font-bold text-sm text-gray-900">{addr.fullName}</div>
                  <div>{addr.street}</div>
                  <div>
                    {addr.city}, {addr.state} {addr.postalCode}
                  </div>
                  <div>{addr.country}</div>
                  <div>Phone number: {addr.phone}</div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                  <span className="text-gray-400 text-[10px]">Saved</span>
                  <button
                    onClick={() => deleteAddress(addr._id)}
                    className="text-rose-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Add a new address</h3>

            <form onSubmit={handleCreateAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full name</label>
                <input
                  type="text"
                  required
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Phone number</label>
                <input
                  type="text"
                  required
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, P.O. box, company name, c/o"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={newAddr.postalCode}
                    onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-amazon-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amazon-yellow hover:bg-amazon-orange text-gray-950 font-bold rounded shadow-xs"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;