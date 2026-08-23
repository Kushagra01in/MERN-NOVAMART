import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('novamart_token') || null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error('Failed to load user profile:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('novamart_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        addToast(`Welcome back, ${res.data.user.name}!`, 'success');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        localStorage.setItem('novamart_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        addToast('Account created successfully!', 'success');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('novamart_token');
    setToken(null);
    setUser(null);
    addToast('You have been signed out', 'info');
  };

  const updateProfile = async (userData) => {
    try {
      const res = await api.put('/auth/profile', userData);
      if (res.data.success) {
        setUser(res.data.user);
        addToast('Profile updated successfully', 'success');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const addAddress = async (addressData) => {
    try {
      const res = await api.post('/auth/address', addressData);
      if (res.data.success) {
        setUser((prev) => ({ ...prev, addresses: res.data.addresses }));
        addToast('Address added successfully', 'success');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add address';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const res = await api.delete(`/auth/address/${addressId}`);
      if (res.data.success) {
        setUser((prev) => ({ ...prev, addresses: res.data.addresses }));
        addToast('Address removed', 'info');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete address';
      addToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
