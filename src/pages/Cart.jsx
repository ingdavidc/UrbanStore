import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import styles from './Cart.module.css';

const formatCOP = (v) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(v);

const SHIPPING_THRESHOLD = 200000;
const SHIPPING_COST = 15000;
const IVA_RATE = 0.19;

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const ivaAmount = subtotal * IVA_RATE;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === 'URBAN10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido o expirado');
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={styles.emptyInner}
        >
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra</p>
          <Link to="/products" className={styles.btnPrimary}>
            Ver productos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mi Carrito</h1>
        <span className={styles.itemCount}>{items.length} {items.length === 1 ? 'artículo' : 'artículos'}</span>
      </div>

      <div className={styles.layout}>
        {/* ── CART ITEMS ── */}
        <div className={styles.itemsCol}>
          <div className={styles.itemsHeader}>
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Total</span>
            <span></span>
          </div>

          <div className={styles.itemsList}>
            {items.map((item, idx) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}`}
                className={styles.cartItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                layout
              >
                {/* image */}
                <div className={styles.itemImg}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className={styles.imgPlaceholder}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* info */}
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  {item.selectedSize && (
                    <span className={styles.itemSize}>Talla: {item.selectedSize}</span>
                  )}
                  <span className={styles.itemCategory}>{item.category}</span>
                </div>

                {/* price */}
                <span className={styles.itemPrice}>{formatCOP(item.price)}</span>

                {/* qty */}
                <div className={styles.qtyControls}>
                  <button onClick={() => updateQty(item.id, item.selectedSize, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.selectedSize, item.quantity + 1)}>+</button>
                </div>

                {/* line total */}
                <span className={styles.lineTotal}>{formatCOP(item.price * item.quantity)}</span>

                {/* remove */}
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id, item.selectedSize)}
                  aria-label="Eliminar producto"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>

          {/* actions */}
          <div className={styles.cartActions}>
            <Link to="/products" className={styles.continueShopping}>
              ← Seguir comprando
            </Link>
            <button className={styles.clearBtn} onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Resumen del pedido</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCOP(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>IVA (19%)</span>
                <span>{formatCOP(ivaAmount)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span className={shipping === 0 ? styles.freeShipping : ''}>
                  {shipping === 0 ? 'Gratis 🎉' : formatCOP(shipping)}
                </span>
              </div>
              {couponApplied && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Descuento (URBAN10)</span>
                  <span>−{formatCOP(discount)}</span>
                </div>
              )}
            </div>

            {/* coupon */}
            <div className={styles.couponSection}>
              <label className={styles.couponLabel}>Código de descuento</label>
              <div className={styles.couponRow}>
                <input
                  type="text"
                  className={styles.couponInput}
                  placeholder="URBAN10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={couponApplied}
                />
                <button
                  className={styles.couponBtn}
                  onClick={handleCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? '✓' : 'Aplicar'}
                </button>
              </div>
              {couponError && <span className={styles.couponError}>{couponError}</span>}
              {couponApplied && (
                <span className={styles.couponSuccess}>¡Cupón aplicado! 10% de descuento</span>
              )}
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>

            {subtotal < SHIPPING_THRESHOLD && (
              <div className={styles.shippingBar}>
                <p>
                  Agrega{' '}
                  <strong>{formatCOP(SHIPPING_THRESHOLD - subtotal)}</strong> más para
                  obtener <strong>envío gratis</strong>
                </p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(subtotal / SHIPPING_THRESHOLD) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <Link to="/checkout" className={styles.checkoutBtn}>
              Proceder al Pago →
            </Link>

            <div className={styles.secureNote}>
              <span>🔒</span>
              <span>Pago 100% seguro y encriptado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
