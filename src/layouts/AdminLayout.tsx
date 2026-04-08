import { lazy, Suspense, useState, type ReactElement } from 'react';
import { Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import AdminGuard from '../components/AdminGuard';
import '../styles/admin.css';

const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const Members = lazy(() => import('../pages/admin/Members'));
const Products = lazy(() => import('../pages/admin/Products'));
const ProductForm = lazy(() => import('../pages/admin/ProductForm'));
const CouponAdmin = lazy(() => import('../pages/admin/CouponAdmin'));

const Loading = (): ReactElement => (
  <div className="admin-loading">
    <div className="loading-spinner"></div>
  </div>
);

const AdminLayout = (): ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="admin-layout">
        <button
          className="admin-mobile-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            <h2>Admin</h2>
            <p>DreamIT Exam Hub</p>
          </div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-chart-pie"></i>
              대시보드
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-receipt"></i>
              주문 관리
            </NavLink>
            <NavLink
              to="/admin/members"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-users"></i>
              회원 관리
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-box"></i>
              상품 관리
            </NavLink>
            <NavLink
              to="/admin/coupons"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-ticket"></i>
              쿠폰 관리
            </NavLink>
          </nav>

          <div className="admin-sidebar-footer">
            <Link to="/" className="admin-back-link">
              <i className="fa-solid fa-arrow-left"></i>
              사이트로 돌아가기
            </Link>
          </div>
        </aside>

        <main className="admin-main">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="members" element={<Members />} />
              <Route path="products" element={<Products />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="coupons" element={<CouponAdmin />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
