import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('novamart_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('novamart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((item) => item.product === product._id);

      if (existItem) {
        const newQty = Math.min(existItem.qty + qty, product.countInStock || 99);
        addToast(`Updated quantity for ${product.name.substring(0, 30)}...`, 'success');
        return prevItems.map((item) =>
          item.product === product._id ? { ...item, qty: newQty } : item
        );
      } else {
        addToast(`Added to cart: ${product.name.substring(0, 30)}...`, 'success');
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            image: product.mainImage || (product.images && product.images[0]),
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            countInStock: product.countInStock,
            brand: product.brand,
            category: product.category,
            isPrimeEligible: product.isPrimeEligible,
            qty: Math.min(qty, product.countInStock || 1)
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product !== productId));
    addToast('Item removed from your cart', 'info');
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product === productId ? { ...item, qty: Math.min(qty, item.countInStock || 99) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('novamart_cart');
  };

  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const originalSubtotal = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.qty, 0);
  const totalSavings = Math.max(0, originalSubtotal - itemsPrice);
  const isFreeDelivery = itemsPrice >= 499 || itemsCount === 0;
  const shippingPrice = isFreeDelivery ? 0 : 49;
  const taxPrice = Math.round(itemsPrice * 0.18); // 18% GST estimate
  const totalPrice = Math.round(itemsPrice + shippingPrice);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemsCount,
        itemsPrice,
        originalSubtotal,
        totalSavings,
        isFreeDelivery,
        shippingPrice,
        taxPrice,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);