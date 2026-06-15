import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cartStore'
import styles from './CartDrawer.module.css'

const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity } = useCartStore()
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <h2 className={styles.title}>Mi Carrito</h2>
                {items.length > 0 && (
                  <span className="badge badge-accent">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                )}
              </div>
              <button
                className={`btn btn-icon ${styles.closeBtn}`}
                onClick={closeDrawer}
                aria-label="Cerrar carrito"
                id="cart-drawer-close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🛍️</div>
                <p className={styles.emptyTitle}>Tu carrito está vacío</p>
                <p className={styles.emptySubtitle}>Agrega productos para comenzar</p>
                <Link
                  to="/catalogo"
                  className="btn btn-primary"
                  onClick={closeDrawer}
                  id="cart-go-catalog"
                >
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              <>
                {/* Items list */}
                <ul className={styles.itemsList} role="list">
                  <AnimatePresence>
                    {items.map((item, idx) => (
                      <motion.li
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                        className={styles.item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.05 }}
                        role="listitem"
                      >
                        {/* Product image */}
                        <div className={styles.itemImage}>
                          {item.image ? (
                            <img src={item.image} alt={item.name} loading="lazy" />
                          ) : (
                            <div className={styles.imagePlaceholder} aria-hidden="true">👕</div>
                          )}
                        </div>

                        {/* Product info */}
                        <div className={styles.itemInfo}>
                          <p className={styles.itemName}>{item.name}</p>
                          <p className={styles.itemVariant}>
                            {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                            {item.selectedColor && <span> · {item.selectedColor}</span>}
                          </p>
                          <p className={styles.itemPrice}>{formatCOP(item.price)}</p>

                          {/* Quantity controls */}
                          <div className={styles.qtyControls}>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              aria-label="Reducir cantidad"
                            >−</button>
                            <span className={styles.qtyValue} aria-live="polite">{item.quantity}</span>
                            <button
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                            >+</button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6"/><path d="m10 11 0 6"/><path d="m14 11 0 6"/>
                          </svg>
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className={styles.footer}>
                  <div className={styles.subtotal}>
                    <span className={styles.subtotalLabel}>Subtotal</span>
                    <span className={styles.subtotalValue}>{formatCOP(subtotal)}</span>
                  </div>
                  <p className={styles.shippingNote}>Envío calculado en el checkout</p>
                  <Link
                    to="/checkout"
                    className={`btn btn-primary btn-lg ${styles.checkoutBtn}`}
                    onClick={closeDrawer}
                    id="cart-checkout-btn"
                  >
                    Ir al Pago
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link
                    to="/carrito"
                    className={`btn btn-ghost ${styles.viewCartBtn}`}
                    onClick={closeDrawer}
                    id="cart-view-btn"
                  >
                    Ver carrito completo
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
