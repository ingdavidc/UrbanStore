import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './OrderConfirmation.module.css';

const formatCOP = (v) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(v);

/* animated check mark paths */
const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut', delay: 0.4 },
  },
};

const circleVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut', delay: 0.1 },
  },
};

/* mock order data (in a real app, fetch from store or API) */
const MOCK_ORDER = {
  items: [
    { id: '1', name: 'Chaqueta Urban Premium', selectedSize: 'M', price: 189000, quantity: 1 },
    { id: '2', name: 'Camiseta Oversize Essentials', selectedSize: 'L', price: 75000, quantity: 2 },
  ],
  shipping: {
    method: 'Domicilio',
    address: 'Calle 123 #45-67, Bogotá, Cundinamarca',
    estimatedDays: '3 – 5 días hábiles',
    cost: 15000,
  },
  payment: 'MercadoPago',
};

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const order = MOCK_ORDER;
  const subtotal = order.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const total = subtotal + order.shipping.cost;

  return (
    <div className={styles.page}>
      {/* animated checkmark */}
      <motion.div
        className={styles.checkCircle}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <svg
          viewBox="0 0 52 52"
          className={styles.checkSvg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            stroke="#8FC740"
            strokeWidth="2.5"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M14 27l8 8 16-18"
            stroke="#8FC740"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </motion.div>

      {/* hero text */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className={styles.title}>¡Pedido confirmado!</h1>
        <p className={styles.subtitle}>
          Gracias por tu compra. Recibirás un correo de confirmación pronto.
        </p>
        <div className={styles.orderNumber}>
          <span>Número de pedido:</span>
          <strong>{orderId}</strong>
        </div>
      </motion.div>

      {/* details card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* order items */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumen del pedido</h2>
          <div className={styles.itemsList}>
            {order.items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className={styles.orderItem}>
                <div className={styles.itemImgPlaceholder}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemMeta}>Talla {item.selectedSize} · Cant. {item.quantity}</span>
                </div>
                <span className={styles.itemTotal}>{formatCOP(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCOP(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío ({order.shipping.method})</span>
              <span>{formatCOP(order.shipping.cost)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total pagado</span>
              <span>{formatCOP(total)}</span>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* shipping info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Información de envío</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Método</span>
              <span className={styles.infoValue}>{order.shipping.method}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Dirección</span>
              <span className={styles.infoValue}>{order.shipping.address}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Tiempo estimado</span>
              <span className={`${styles.infoValue} ${styles.deliveryTime}`}>
                🕐 {order.shipping.estimatedDays}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Método de pago</span>
              <span className={styles.infoValue}>{order.payment}</span>
            </div>
          </div>
        </section>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className={styles.actions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/products" className={styles.btnPrimary}>
          Seguir comprando
        </Link>
        <Link to="/profile/orders" className={styles.btnOutline}>
          Ver mis pedidos
        </Link>
      </motion.div>

      {/* confetti dots decoration */}
      <div className={styles.confetti} aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.confettiDot}
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 80 + Math.random() * 80],
              x: [(Math.random() - 0.5) * 200],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              background: i % 3 === 0 ? '#8FC740' : i % 3 === 1 ? '#fff' : '#FFD700',
            }}
          />
        ))}
      </div>
    </div>
  );
}
