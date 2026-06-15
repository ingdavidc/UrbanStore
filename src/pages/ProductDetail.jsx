import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/ProductCard';
import styles from './ProductDetail.module.css';

/* ─── mock data ────────────────────────────────────────────────────── */
const MOCK_PRODUCTS = {
  '1': {
    id: '1',
    name: 'Chaqueta Urban Premium',
    price: 189000,
    originalPrice: 240000,
    discount: 21,
    description:
      'Chaqueta de corte slim fit elaborada con materiales de alta calidad. Diseño urbano contemporáneo ideal para cualquier ocasión. Costuras reforzadas, forro interior suave y cierre metálico premium.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 8,
    category: 'Chaquetas',
    images: [null, null],
  },
  '2': {
    id: '2',
    name: 'Camiseta Oversize Essentials',
    price: 75000,
    originalPrice: null,
    discount: null,
    description:
      'Camiseta oversize de algodón pima 100%. Acabado premium, cuello redondo reforzado y estampado de alta resolución resistente al lavado.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    category: 'Camisetas',
    images: [null, null],
  },
};

const RELATED = [
  { id: '2', name: 'Camiseta Oversize Essentials', price: 75000, category: 'Camisetas' },
  { id: '3', name: 'Jogger Cargo Urban', price: 120000, category: 'Pantalones' },
  { id: '4', name: 'Hoodie Classic Logo', price: 145000, category: 'Hoodies' },
];

const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

/* ─── placeholder image ─────────────────────────────────────────────── */
function PlaceholderImage({ label }) {
  return (
    <div className={styles.placeholder}>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

/* ─── main component ────────────────────────────────────────────────── */
export default function ProductDetail() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS[id] || MOCK_PRODUCTS['1'];

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    addToCart({ ...product, selectedSize, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={styles.page}>
      {/* breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/products">Productos</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── GALLERY ── */}
        <div className={styles.galleryCol}>
          <div className={styles.mainImage}>
            {product.images[activeImg] ? (
              <img src={product.images[activeImg]} alt={product.name} />
            ) : (
              <PlaceholderImage label={`Vista ${activeImg + 1}`} />
            )}
            {product.discount && (
              <span className={styles.badge}>-{product.discount}%</span>
            )}
          </div>

          <div className={styles.thumbnails}>
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                {img ? (
                  <img src={img} alt={`thumb-${i}`} />
                ) : (
                  <PlaceholderImage label={`${i + 1}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── INFO ── */}
        <div className={styles.infoCol}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.productName}>{product.name}</h1>

          {/* price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatCOP(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{formatCOP(product.originalPrice)}</span>
            )}
            {product.discount && (
              <span className={styles.discountBadge}>{product.discount}% OFF</span>
            )}
          </div>

          {/* stock */}
          <div className={styles.stockRow}>
            <span className={`${styles.stockDot} ${product.stock > 0 ? styles.inStock : styles.outStock}`} />
            <span className={styles.stockText}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
            </span>
          </div>

          {/* size selector */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeader}>
              <span>Talla</span>
              <button className={styles.sizeGuide}>Guía de tallas</button>
            </div>
            <div className={styles.sizes}>
              {product.sizes.map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.92 }}
                  className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          {/* qty */}
          <div className={styles.qtySection}>
            <span>Cantidad</span>
            <div className={styles.qtyControls}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          {/* add to cart */}
          <motion.button
            className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={product.stock === 0}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  ✓ Agregado al carrito
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Agregar al carrito
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <Link to="/checkout" className={styles.buyNowBtn}>
            Comprar ahora
          </Link>

          {/* description */}
          <div className={styles.description}>
            <h3>Descripción del producto</h3>
            <p>{product.description}</p>
          </div>

          {/* features */}
          <ul className={styles.features}>
            <li>
              <span>🚚</span> Envío gratis en compras mayores a $200.000 COP
            </li>
            <li>
              <span>↩️</span> Cambios y devoluciones en 15 días
            </li>
            <li>
              <span>🔒</span> Pago seguro garantizado
            </li>
          </ul>
        </div>
      </motion.div>

      {/* ── RELATED PRODUCTS ── */}
      <section className={styles.related}>
        <h2 className={styles.relatedTitle}>Productos relacionados</h2>
        <div className={styles.relatedGrid}>
          {RELATED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
