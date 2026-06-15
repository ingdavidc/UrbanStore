import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './PosTerminal.module.css';

// Mock Product Catalog for POS
const CATALOG = [
  { id: '1', name: 'Zapatillas Urban Neon Run', sku: 'ZAP-NEON-001', category: 'Calzado', price: 189000, image: '/assets/images/product-sneaker.png' },
  { id: '2', name: 'Jogger Streetwear Premium', sku: 'JOG-PREM-002', category: 'Hombre', price: 75000, image: '/assets/images/product-jogger.png' },
  { id: '3', name: 'Conjunto Deportivo Fem', sku: 'CON-FEM-003', category: 'Mujer', price: 130000, image: '/assets/images/product-set.png' },
  { id: '4', name: 'Gorra Snapback US8', sku: 'CAP-US8-004', category: 'Accesorios', price: 35000, image: '/assets/images/product-cap.png' },
  { id: '5', name: 'Camiseta Oversize', sku: 'TSH-OVR-005', category: 'Hombre', price: 55000, image: '/assets/images/product-tshirt.png' },
  { id: '6', name: 'Hoodie Premium', sku: 'HOD-PRM-006', category: 'Hombre', price: 110000, image: '/assets/images/product-hoodie.png' }
];

const CATEGORIES = ['Todos', 'Calzado', 'Hombre', 'Mujer', 'Accesorios'];
const PAYMENT_METHODS = ['Efectivo', 'Tarjeta (Datafono)', 'Nequi / Daviplata', 'Addi', 'Sistecrédito', 'Sistema de Apartado', 'Crédito Directo'];

export default function PosTerminal() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', id: '', phone: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return CATALOG.filter(p => {
      const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  // Calculate totals
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatCOP = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);

  const handleCheckout = () => {
    if (cart.length === 0 || !paymentMethod || !customer.name) return;
    // Simulate API call and success
    setShowSuccess(true);
  };

  const resetPos = () => {
    setCart([]);
    setCustomer({ name: '', id: '', phone: '', email: '' });
    setPaymentMethod('');
    setShowSuccess(false);
  };

  const isCheckoutEnabled = cart.length > 0 && customer.name.trim() !== '' && paymentMethod !== '';

  return (
    <div className={styles.posContainer}>
      {/* ── PANEL IZQUIERDO: CATÁLOGO TÁCTIL ── */}
      <div className={styles.catalogPane}>
        <div className={styles.catalogHeader}>
          <Link to="/" className={styles.exitBtn} title="Volver a la tienda">
            ◀
          </Link>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Buscar por nombre o SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span>🔍</span>
          </div>
        </div>

        <div className={styles.categoryFilters}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map(prod => (
            <div key={prod.id} className={styles.productCard} onClick={() => addToCart(prod)}>
              <img src={prod.image} alt={prod.name} className={styles.productImage} />
              <div className={styles.productInfo}>
                <span className={styles.productSku}>{prod.sku}</span>
                <h3 className={styles.productName}>{prod.name}</h3>
                <span className={styles.productPrice}>{formatCOP(prod.price)}</span>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ padding: '20px', color: '#6b7280', gridColumn: '1 / -1' }}>No se encontraron productos.</div>
          )}
        </div>
      </div>

      {/* ── PANEL DERECHO: CARRITO Y COBRO ── */}
      <div className={styles.checkoutPane}>
        <div className={styles.checkoutHeader}>
          <h2>🛒 Facturación</h2>
          {cart.length > 0 && (
            <button className={styles.clearBtn} onClick={clearCart}>Vaciar</button>
          )}
        </div>

        <div className={styles.cartItemsList}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <span>📦</span>
              <span>Carrito vacío. Selecciona productos del catálogo.</span>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <motion.div 
                  key={item.id} 
                  className={styles.cartItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <img src={item.image} alt={item.name} className={styles.cartItemImg} />
                  <div className={styles.cartItemDetails}>
                    <p className={styles.cartItemTitle}>{item.name}</p>
                    <p className={styles.cartItemPrice}>{formatCOP(item.price)}</p>
                    <div className={styles.qtyControls}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className={styles.qtyValue}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Captura de Cliente */}
        <div className={styles.customerSection}>
          <h3 className={styles.sectionTitle}>Datos del Cliente</h3>
          <div className={styles.formGrid}>
            <input 
              type="text" 
              placeholder="Nombre Completo *" 
              className={`${styles.inputField} ${styles.fullWidth}`}
              value={customer.name}
              onChange={e => setCustomer({...customer, name: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Cédula" 
              className={styles.inputField}
              value={customer.id}
              onChange={e => setCustomer({...customer, id: e.target.value})}
            />
            <input 
              type="tel" 
              placeholder="Teléfono" 
              className={styles.inputField}
              value={customer.phone}
              onChange={e => setCustomer({...customer, phone: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              className={`${styles.inputField} ${styles.fullWidth}`}
              value={customer.email}
              onChange={e => setCustomer({...customer, email: e.target.value})}
            />
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className={styles.paymentSection}>
          <h3 className={styles.sectionTitle}>Método de Pago</h3>
          <div className={styles.paymentGrid}>
            {PAYMENT_METHODS.map(method => (
              <button 
                key={method}
                className={`${styles.payBtn} ${paymentMethod === method ? styles.active : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Totales y Botón Cobrar */}
        <div className={styles.checkoutFooter}>
          <div className={styles.totalsRow}>
            <span className={styles.totalsLabel}>TOTAL:</span>
            <span className={styles.totalsValue}>{formatCOP(total)}</span>
          </div>
          <button 
            className={styles.chargeBtn} 
            disabled={!isCheckoutEnabled}
            onClick={handleCheckout}
          >
            {isCheckoutEnabled ? 'Facturar Venta' : 'Completar Datos'}
          </button>
        </div>
      </div>

      {/* Modal de Éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className={styles.successOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.successCard}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className={styles.successIcon}>✅</div>
              <h2>Venta Completada</h2>
              <p>El ticket ha sido generado e impreso. El inventario ha sido actualizado.</p>
              <button className={styles.newSaleBtn} onClick={resetPos}>
                Siguiente Cliente
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
