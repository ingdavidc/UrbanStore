import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../store/cartStore'
import styles from './ProductCard.module.css'

const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    images,
    category,
    sizes = [],
    isNew,
    isSale,
    stock,
  } = product

  const displayImage = images?.[0] || image
  const hoverImage   = images?.[1] || null
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // If has sizes, pick first available; otherwise add directly
    const defaultSize = sizes.length > 0 ? sizes[0] : null
    addItem(product, defaultSize, null, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const isOutOfStock = stock === 0

  return (
    <motion.article
      className={`${styles.card} ${isOutOfStock ? styles.outOfStock : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/producto/${id}`}
        className={styles.imageWrapper}
        aria-label={`Ver ${name}`}
        tabIndex={isOutOfStock ? -1 : 0}
      >
        {/* Main image */}
        {displayImage && !imageError ? (
          <img
            src={displayImage}
            alt={name}
            className={styles.image}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true">
            <span>👕</span>
          </div>
        )}

        {/* Hover second image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${name} — vista alternativa`}
            className={`${styles.image} ${styles.imageHover}`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className={styles.badges}>
          {isNew && <span className={`badge badge-accent ${styles.badge}`}>Nuevo</span>}
          {isSale && discount > 0 && (
            <span className={`badge badge-danger ${styles.badge}`}>-{discount}%</span>
          )}
          {isOutOfStock && (
            <span className={`badge badge-muted ${styles.badge}`}>Agotado</span>
          )}
        </div>

        {/* Quick add button (appears on hover) */}
        {!isOutOfStock && (
          <button
            className={`${styles.quickAdd} ${added ? styles.quickAdded : ''}`}
            onClick={handleQuickAdd}
            aria-label={`Agregar ${name} al carrito`}
            id={`quick-add-${id}`}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                ¡Agregado!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Agregar
              </>
            )}
          </button>
        )}
      </Link>

      {/* Card body */}
      <div className={styles.body}>
        {category && (
          <span className={styles.category}>{category}</span>
        )}
        <h3 className={styles.name}>
          <Link to={`/producto/${id}`} className={styles.nameLink}>{name}</Link>
        </h3>

        {/* Sizes preview */}
        {sizes.length > 0 && (
          <div className={styles.sizes} aria-label="Tallas disponibles">
            {sizes.slice(0, 5).map((s) => (
              <span key={s} className={styles.size}>{s}</span>
            ))}
            {sizes.length > 5 && (
              <span className={styles.sizesMore}>+{sizes.length - 5}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatCOP(price)}</span>
          {originalPrice && (
            <span className={styles.originalPrice}>{formatCOP(originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
