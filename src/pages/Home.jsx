import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

// ── Mock data (replace with Firebase Firestore data) ──────────
const FEATURED_PRODUCTS = [
  {
    id: '1', name: 'Hoodie Urban Classic', price: 89000, originalPrice: 120000,
    category: 'Hombre', sizes: ['S','M','L','XL'], isNew: true, isSale: true, stock: 15,
    image: '/assets/images/product-hoodie.png',
  },
  {
    id: '2', name: 'Jogger Streetwear Premium', price: 75000,
    category: 'Hombre', sizes: ['S','M','L'], isNew: false, stock: 8,
    image: '/assets/images/product-jogger.png',
  },
  {
    id: '3', name: 'Conjunto Deportivo Fem', price: 130000, originalPrice: 160000,
    category: 'Mujer', sizes: ['XS','S','M','L'], isNew: true, isSale: true, stock: 20,
    image: '/assets/images/product-set.png',
  },
  {
    id: '4', name: 'Gorra Snapback US8', price: 35000,
    category: 'Accesorios', sizes: ['Única'], isNew: false, stock: 30,
    image: '/assets/images/product-cap.png',
  },
]

const CATEGORIES = [
  { label: 'Hombre', icon: '👕', href: '/catalogo?cat=hombre', description: 'Camisetas, hoodies, joggers' },
  { label: 'Mujer', icon: '👗', href: '/catalogo?cat=mujer', description: 'Crop tops, leggings, sets' },
  { label: 'Accesorios', icon: '🧢', href: '/catalogo?cat=accesorios', description: 'Gorras, bolsos, mochilas' },
  { label: 'Colección Nueva', icon: '✨', href: '/catalogo?filter=new', description: 'Lo más reciente' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className={styles.hero} aria-label="Hero Urban 8 Store">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroGradient} />
          {/* Background Video Loop - Nike Style */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroVideo}
            src="https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-in-streetwear-40348-large.mp4"
          />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className={`${styles.heroBadge} badge badge-accent`}>
              ✦ Nueva Colección 2025
            </span>
            <h1 className={styles.heroTitle}>
              URBAN<span className={styles.heroSlash}>/</span>
              <br />
              <span className={styles.heroTitleGreen}>STORE</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Moda urbana y streetwear de alto impacto.
              <br />Expresa tu estilo, sin límites.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/catalogo" className="btn btn-primary btn-lg" id="hero-shop-btn">
                Ver Colección
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/catalogo?filter=sale" className="btn btn-outline btn-lg" id="hero-sale-btn">
                Ver Ofertas
              </Link>
            </div>

            {/* Trust badges */}
            <div className={styles.trustBadges}>
              <span className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                Envíos a todo Colombia
              </span>
              <span className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Pago 100% seguro
              </span>
              <span className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Recogida en tienda
              </span>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <div className={styles.heroCard}>
              <img
                src="/assets/images/hero-banner.png"
                alt="Urban 8 Store — Nueva Colección"
                className={styles.heroImg}
              />
              <div className={styles.heroCardAccent} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ── IMMERSIVE BRAND VIDEO (Nike Feature) ─────────── */}
      <section className={styles.brandVideoSection} aria-labelledby="brand-video-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Vive la Experiencia</span>
            <h2 className="section-title" id="brand-video-title">Actitud sin límites</h2>
          </div>

          <div className={styles.videoShowcaseContainer}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.brandShowcaseVideo}
              src="https://assets.mixkit.co/videos/preview/mixkit-skater-doing-tricks-in-a-skatepark-at-sunset-34283-large.mp4"
            />
            <div className={styles.videoOverlay}>
              <div className={styles.videoOverlayContent}>
                <h3>Colección Streetwear 2025</h3>
                <p>Inspirada en el movimiento urbano y el estilo urbano real de las calles.</p>
                <Link to="/catalogo" className="btn btn-primary btn-lg">
                  Explorar Prendas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className={`section ${styles.categoriesSection}`} aria-labelledby="categories-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Explorar</span>
            <h2 className="section-title" id="categories-title">Nuestras Categorías</h2>
          </div>

          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={cat.href} className={styles.categoryCard} id={`cat-${cat.label.toLowerCase().replace(' ', '-')}`}>
                  <span className={styles.categoryIcon}>{cat.icon}</span>
                  <h3 className={styles.categoryLabel}>{cat.label}</h3>
                  <p className={styles.categoryDesc}>{cat.description}</p>
                  <span className={styles.categoryArrow}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section className={`section ${styles.productsSection}`} aria-labelledby="featured-title">
        <div className="container">
          <div className={`section-header ${styles.productsHeader}`}>
            <div>
              <span className="section-label">Lo más popular</span>
              <h2 className="section-title" id="featured-title">Productos Destacados</h2>
            </div>
            <Link to="/catalogo" className="btn btn-outline" id="featured-see-all">
              Ver todo el catálogo →
            </Link>
          </div>

          <div className={styles.productsGrid}>
            {FEATURED_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ─────────────────────────────────── */}
      <section className={`section-sm ${styles.promoBanner}`} aria-label="Promoción especial">
        <div className="container">
          <motion.div
            className={styles.promoCard}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.promoContent}>
              <span className="badge badge-accent">🔥 Oferta Especial</span>
              <h2 className={styles.promoTitle}>
                Hasta <span>40% OFF</span> en prendas seleccionadas
              </h2>
              <p className={styles.promoText}>
                Aprovecha nuestras ofertas de temporada. Paga con Addi o Sistecredito y lleva lo que quieras hoy.
              </p>
              <Link to="/catalogo?filter=sale" className="btn btn-primary btn-lg" id="promo-cta">
                Aprovechar Oferta
              </Link>
            </div>
            <div className={styles.promoDecor} aria-hidden="true">
              <span className={styles.promoSlash}>/</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ──────────────────────────────── */}
      <section className={`section-sm ${styles.paymentSection}`} aria-labelledby="payments-title">
        <div className="container">
          <h2 className={styles.paymentTitle} id="payments-title">Métodos de pago aceptados</h2>
          <div className={styles.paymentMethods}>
            {['MercadoPago', 'Addi', 'Sistecredito', 'Transferencia', 'Contra entrega'].map((m) => (
              <div key={m} className={styles.paymentMethod}>
                <span className={styles.paymentDot} aria-hidden="true" />
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
