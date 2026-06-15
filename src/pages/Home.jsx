import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

// ── Mock data (replace with Firebase Firestore data) ──────────
const FEATURED_PRODUCTS = [
  {
    id: '1', name: 'Zapatillas Urban Neon Run', price: 189000, originalPrice: 245000,
    category: 'Calzado', sizes: ['38','39','40','41','42'], isNew: true, isSale: true, stock: 12,
    image: '/assets/images/product-sneaker.png',
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
  { 
    label: 'Calzado', 
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17.5a2.5 2.5 0 0 0 5 0V17h11c1.1 0 2-.9 2-2v-2c0-.55-.45-1-1-1h-6.2l-3-4A2 2 0 0 0 9.2 7H5c-1.1 0-2 .9-2 2v8.5z" />
        <path d="M12 12h8m-11 5v-3.5" />
      </svg>
    ), 
    href: '/catalogo?cat=calzado', 
    description: 'Zapatillas, sneakers urbanos' 
  },
  { 
    label: 'Hombre', 
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 7.83h-3v-3l4.38-4.37a1 1 0 0 1 1.41 0l1.59 1.59a1 1 0 0 1 0 1.41zM2 13h10v8H2v-8zm13-3h7v11h-7V10zM5 16h4M17 14h3M8 10c0-3.3 2.7-6 6-6" />
      </svg>
    ), 
    href: '/catalogo?cat=hombre', 
    description: 'Camisetas, hoodies, joggers' 
  },
  { 
    label: 'Mujer', 
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5v3.17a10 10 0 0 0 3 7.18V22h4v-4.65a10 10 0 0 0 3-7.18V7a5 5 0 0 0-5-5zM9 7h6M12 10v4" />
      </svg>
    ), 
    href: '/catalogo?cat=mujer', 
    description: 'Crop tops, leggings, sets' 
  },
  { 
    label: 'Accesorios', 
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-2V7a4 4 0 0 0-8 0v3H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zM10 7a2 2 0 0 1 4 0v3h-4V7zM12 14v3" />
      </svg>
    ), 
    href: '/catalogo?cat=accesorios', 
    description: 'Gorras, bolsos, mochilas' 
  },
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
      <section className={styles.hero} aria-label="Hero UrbanStore">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroGradient} />
          {/* Background watermark overlay */}
          <div className={styles.heroWatermark}>URBANSTORE</div>
          {/* Background Video Loop - Highly Stable Public CDN */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={styles.heroVideo}
          >
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba273e32c3eed21d857f6e52c800&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>

        <div className={`container ${styles.heroContent}`}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className={`${styles.heroBadge} badge badge-accent`}>
              ✦ Nueva Colección 2026
            </span>
            <h1 className={styles.heroTitle}>
              URBAN
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
                alt="UrbanStore — Nueva Colección"
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
              preload="auto"
              className={styles.brandShowcaseVideo}
            >
              <source src="https://player.vimeo.com/external/341496265.sd.mp4?s=d0f04c636f456c701ccbe831e51be7737e94e5e4&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              Tu navegador no soporta reproducción de video.
            </video>
            <div className={styles.videoOverlay}>
              <div className={styles.videoOverlayContent}>
                <h3>Colección Streetwear 2026</h3>
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
                  <span className={styles.categoryIcon}><cat.icon /></span>
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
            {/* MercadoPago */}
            <div className={`${styles.paymentMethod} ${styles.mpCard}`} title="MercadoPago">
              <span className={styles.methodIcon}>🔵</span>
              <span className={styles.methodText}>Mercado Pago</span>
            </div>

            {/* Addi */}
            <div className={`${styles.paymentMethod} ${styles.addiCard}`} title="Addi">
              <span className={styles.methodIcon} style={{color: '#00E676'}}>⚫</span>
              <span className={styles.methodText}>Addi</span>
            </div>

            {/* Sistecredito */}
            <div className={`${styles.paymentMethod} ${styles.sisteCard}`} title="Sistecrédito">
              <span className={styles.methodIcon} style={{color: '#00C853'}}>🟢</span>
              <span className={styles.methodText}>Sistecrédito</span>
            </div>

            {/* Transferencia */}
            <div className={`${styles.paymentMethod} ${styles.bankCard}`} title="Transferencia Bancaria">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#8FC740'}}>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <span className={styles.methodText}>Transferencia</span>
            </div>

            {/* Contra entrega */}
            <div className={`${styles.paymentMethod} ${styles.codCard}`} title="Contra entrega">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#8FC740'}}>
                <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span className={styles.methodText}>Contra entrega</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
