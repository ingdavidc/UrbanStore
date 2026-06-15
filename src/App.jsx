import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'

// Layout components
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import CartDrawer  from './components/CartDrawer'

// Public pages
import Home              from './pages/Home'
import Catalog           from './pages/Catalog'
import ProductDetail     from './pages/ProductDetail'
import Cart              from './pages/Cart'
import Checkout          from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Contact           from './pages/Contact'

// Admin pages
import AdminLogin     from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminInventory from './pages/admin/Inventory'
import AdminOrders    from './pages/admin/Orders'
import AdminCustomers from './pages/admin/Customers'
import AdminSocialHub from './pages/admin/SocialHub'
import AdminLayout    from './components/admin/AdminLayout'

// ── Route Guards ──────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="page-wrapper">{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Tienda pública ─────────────────────────────── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/catalogo" element={<PublicLayout><Catalog /></PublicLayout>} />
        <Route path="/producto/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/carrito" element={<PublicLayout><Cart /></PublicLayout>} />
        <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
        <Route path="/confirmacion/:orderId" element={<PublicLayout><OrderConfirmation /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* ── Admin ──────────────────────────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute><AdminLayout /></ProtectedRoute>
        }>
          <Route index          element={<AdminDashboard />} />
          <Route path="inventario"      element={<AdminInventory />} />
          <Route path="pedidos"         element={<AdminOrders />} />
          <Route path="clientes"        element={<AdminCustomers />} />
          <Route path="redes-sociales"  element={<AdminSocialHub />} />
        </Route>

        {/* ── Fallback ───────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
