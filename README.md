# NovaMart - Amazon-Style Full-Stack E-Commerce Platform

NovaMart is a full-featured, Amazon-inspired E-Commerce web application built with a modern React + Tailwind CSS frontend and a resilient Node.js / Express / MongoDB backend.

---

## 🌟 Key Features

### 🛒 Customer Storefront & Shopping Experience
- **Amazon-Style Top Header & Sub-Navigation**: 
  - Dynamic brand logo with smile accent
  - Category selector dropdown integrated into search bar
  - Location/delivery pin
  - "Account & Lists" menu
  - "Returns & Orders" link
  - Shopping cart with live counter badge
- **Sliding Department Drawer**: Multi-level navigation for all store departments.
- **Hero Carousel Banner**: Promotional slides with call-to-action buttons.
- **Quad Homepage Cards**: Category discovery, Deal of the Day showcases, Best Sellers.
- **Horizontal Product Rails**: Smooth scrolling deal sliders.
- **Product Catalog with Dynamic Filtering**:
  - Filter by Department, Price range, Minimum star ratings, Prime eligibility, Deals only, Stock status.
  - Sorting: Featured, Price (Low to High / High to Low), Avg Customer Rating, Biggest Discount.
- **Amazon-Style Product Detail Page**:
  - Multi-image gallery with thumbnail switcher
  - Technical specifications table & feature highlights
  - Sticky "Buy Box" with quantity selector, "Add to Cart", "Buy Now", and delivery time countdowns
  - Customer ratings breakdown bar charts with verified purchase reviews
  - "Write a Customer Review" modal
- **Cart & 3-Step Checkout Flow**:
  - Cart item management, real-time quantity modifiers, free delivery progress meter ($35 threshold)
  - Multi-step checkout: Shipping Address selection/entry, Payment simulation (Credit/Debit card, UPI, Net Banking, COD), Order review & instant placement.
- **Order Tracking & History**:
  - User Order History list with status badges (`Processing`, `Confirmed`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`)
  - Order Detail view with visual progress tracker timeline, items breakdown, shipping address, payment receipt, and cancellation capability.

### 👑 Admin Management Portal (`/admin`)
- **Executive Analytics Dashboard**:
  - Revenue, Total Orders, Total Products, and Total Users metrics
  - Real-time pipeline status count (Processing, Shipped, Delivered, Cancelled)
  - Low Stock Inventory alerts banner
  - Recent customer orders stream
- **Product Inventory Control**:
  - Complete CRUD: Add new products with image preview, brand, category, pricing, discount, stock, specs
  - Edit & delete products with instant catalog synchronization
- **Order Fulfillment Control**:
  - Filter orders by status or search by customer name / tracking ID
  - Change status (`Processing` ➔ `Confirmed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered` ➔ `Cancelled`)
  - Inspect order details, items, address, and payment method
- **User Account Moderation**:
  - View all registered customers, toggle administrator privileges, manage roles.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- *(Optional)* Local MongoDB or MongoDB Atlas URI (An embedded in-memory MongoDB is built-in as an automated fallback, so it runs out-of-the-box with zero database configuration needed!).

### 2. Installation
Open your terminal in the root `novamart` folder and run:
```bash
# Install root, server, and client dependencies
npm run install-all
```
*(Or run `npm install` inside `server` and `client` individually).*

### 3. Start the Full Application
```bash
# Run both Backend API and Frontend concurrently
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Demo Accounts

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@novamart.com` | `admin123` | Full access to `/admin` dashboard, product CRUD, and order status controls |
| **Customer** | `john@example.com` | `user123` | Customer account with pre-filled addresses & sample order history |
| **Customer** | `sarah@example.com` | `user123` | Customer account with active in-transit orders |

---

## 📁 Project Architecture

```
novamart/
├── .vscode/                   # VS Code configuration & launch profiles
│   ├── launch.json
│   └── settings.json
├── client/                    # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/        # Navbar, SubNav, CategoryDrawer, HeroBanner, ProductCard, Footer, etc.
│   │   ├── context/           # AuthContext, CartContext, ToastContext
│   │   ├── pages/             # Storefront, Catalog, Details, Cart, Checkout, Orders, Profile, Auth
│   │   │   └── admin/         # AdminDashboard, AdminProducts, AdminOrders, AdminUsers
│   │   ├── services/          # Axios API client with automatic JWT bearer attachment
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                    # Backend (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/            # Resilient MongoDB connector with embedded auto-fallback
│   │   ├── controllers/       # Auth, Product, Order, Admin analytics
│   │   ├── middleware/        # JWT auth, Admin role protection, Error handler
│   │   ├── models/            # User, Product, Order, Review, Category
│   │   ├── routes/            # Express RESTful routes
│   │   ├── seeder/            # Rich 20+ item catalog data & demo accounts
│   │   └── server.js
│   └── .env
└── package.json               # Root scripts (concurrently dev runner)
```

---

## 🛡️ API Endpoints Summary

- `POST /api/auth/register` - Create customer/admin account
- `POST /api/auth/login` - Authenticate & receive JWT
- `GET /api/auth/me` - Get current user profile
- `GET /api/products` - Search, filter, sort & paginate products
- `GET /api/products/featured/deals` - Homepage deals & spotlight data
- `GET /api/products/:id` - Product details & customer reviews
- `POST /api/products/:id/reviews` - Submit product review
- `POST /api/orders` - Place new order & decrement stock
- `GET /api/orders/myorders` - Get current user order history
- `GET /api/orders/:id` - Get order tracking & timeline
- `GET /api/admin/stats` - Admin KPI metrics & low stock alerts
- `GET /api/admin/orders` - Admin order management
- `PUT /api/admin/orders/:id/status` - Update delivery status
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product