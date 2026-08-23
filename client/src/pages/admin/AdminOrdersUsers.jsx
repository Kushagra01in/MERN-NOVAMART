import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Truck,
  Eye,
  CheckCircle2,
  Clock,
  Ban,
  X,
  MapPin,
  CreditCard
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { formatINR } from '../../utils/formatters';

const statusOptions = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

export const AdminOrders = () => {
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/orders');
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        addToast(`Order status updated to ${newStatus}`, 'success');
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(res.data.order);
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update order status', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const matchesSearch =
      ord.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord._id.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Order Fulfillment</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage customer shipments and delivery statuses across India</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by Tracking ID, Customer or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 bg-white font-bold text-gray-800 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div className="text-gray-500 font-bold">
          Total: <span className="text-slate-950 font-black">{filteredOrders.length}</span> orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-900 uppercase text-[10px] font-extrabold border-b border-gray-200">
              <tr>
                <th className="p-4">Tracking / Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items / Total</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">No matching orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <span className="font-black text-slate-950 block">{o.trackingNumber}</span>
                      <span className="text-[10px] text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-gray-900">{o.user?.name || o.shippingAddress?.fullName}</div>
                      <div className="text-gray-400 text-[11px]">{o.user?.email || o.shippingAddress?.phone}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-black text-slate-950">{formatINR(o.totalPrice)}</div>
                      <span className="text-gray-500 text-[10px]">{o.orderItems?.length} item(s)</span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-gray-800 block">{o.paymentMethod}</span>
                      <span className={`text-[10px] font-bold ${o.isPaid ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {o.isPaid ? '✓ PAID' : 'Pending'}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        disabled={updatingId === o._id}
                        className={`text-xs font-black px-3 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : o.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : o.status === 'Shipped'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-blue-50 text-blue-800 border-blue-300'
                        }`}
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-1.5 rounded-xl font-bold text-xs shadow-2xs transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Order Inspection</span>
                <h3 className="text-lg font-black text-gray-900">#{selectedOrder.trackingNumber}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-black text-gray-900 block">Customer Information</span>
                <div className="font-bold text-gray-800">{selectedOrder.user?.name}</div>
                <div className="text-gray-600">{selectedOrder.user?.email}</div>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1">
                <span className="font-black text-gray-900 block">Delivery Address</span>
                <div>{selectedOrder.shippingAddress?.fullName}</div>
                <div>{selectedOrder.shippingAddress?.street}</div>
                <div>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.postalCode}</div>
                <div>Phone: <strong>{selectedOrder.shippingAddress?.phone}</strong></div>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <span className="font-black text-gray-900 block text-sm">Ordered Items</span>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl p-2 bg-gray-50">
                {selectedOrder.orderItems?.map((item) => (
                  <div key={item.product} className="py-2.5 flex items-center justify-between gap-3 first:pt-0">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border" />
                      <div>
                        <span className="font-bold text-gray-900 line-clamp-1">{item.name}</span>
                        <span className="text-gray-500">Qty: {item.qty}</span>
                      </div>
                    </div>
                    <span className="font-black text-gray-900">{formatINR(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs border-t">
              <div>
                <div>Payment Method: <strong>{selectedOrder.paymentMethod}</strong></div>
                <div>Total Amount: <strong className="text-rose-700 text-sm font-black">{formatINR(selectedOrder.totalPrice)}</strong></div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-slate-950 text-white font-black px-5 py-2.5 rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const AdminUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change ${user.name}'s role to ${newRole}?`)) return;

    try {
      const res = await api.put(`/admin/users/${user._id}/role`, { role: newRole });
      if (res.data.success) {
        addToast(`Role updated to ${newRole}`, 'success');
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update role', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;

    try {
      const res = await api.delete(`/admin/users/${id}`);
      if (res.data.success) {
        addToast('User deleted', 'info');
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Cannot delete user', 'error');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">User Management</h1>
        <p className="text-xs text-gray-500 mt-0.5">Control customer accounts and assign store administrator roles</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-50 text-gray-900 uppercase text-[10px] font-extrabold border-b border-gray-200">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">Loading accounts...</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-900 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{u.name}</span>
                  </td>

                  <td className="p-4 font-medium text-gray-600">{u.email}</td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase ${
                        u.role === 'admin'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      className="text-xs text-indigo-700 hover:text-orange-600 font-bold hover:underline"
                    >
                      {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};