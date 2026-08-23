import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Contexts
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import SubNav from './components/SubNav';
import CategoryDrawer from './components/CategoryDrawer';
import Footer from './components/Footer';

// Public & Customer Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { OrderDetailsPage, OrderSuccessPage } from './pages/OrderDetailsAndSuccess';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import { AdminOrders, AdminUsers } from './pages/admin/AdminOrdersUsers';

// Storefront Layout Wrapper
const StoreLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onOpenDrawer={() => setDrawerOpen(true)} />
      <SubNav onOpenDrawer={() => setDrawerOpen(true)} />
      <CategoryDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Storefront Layout Routes */}
              <Route element={<StoreLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Dedicated Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Admin Portal Protected Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;