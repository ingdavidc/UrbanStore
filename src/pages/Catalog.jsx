import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import styles from './Catalog.module.css'

// Mock products — replace with Firestore query
const ALL_PRODUCTS = [
  { id: '1', name: 'Hoodie Urban Classic', price: 89000, originalPrice: 120000, category: 'Hombre', sizes: ['S','M','L','XL'], isNew: true, isSale: true, stock: 15 },
  { id: '2', name: 'Jogger Streetwear', price: 75000, category: 'Hombre', sizes: ['S','M','L'], stock: 8 },
  { id: '3', name: 'Crop Top Urban Fem', price: 45000, originalPrice: 60000, category: 'Mujer', sizes: ['XS','S','M'], isNew: true, isSale: true, stock: 20 },
  { id: '4', name: 'Gorra Snapback US8', price: 35000, category: 'Accesorios', sizes: ['Única'], stock: 30 },
  { id: '5', name: 'Camiseta Oversize', price: 55000, category: 'Hombre', sizes: ['S','M','L','XL','XXL'], isNew: true, stock: 12 },
  { id: '6', name: 'Legging Performance', price: 65000, originalPrice: 85000, category: 'Mujer', sizes: ['XS','S','M','L'], isSale: true, stock: 18 },
  { id: '7', name: 'Mochila Urban Pack', price: 95000, category: 'Accesorios', sizes: ['Única'], stock: 5 },
  { id: '8', name: 'Conjunto Deportivo', price: 130000, originalPrice: 160000, category: 'Mujer', sizes: ['S','M','L'], isSale: true, stock: 10 },
]

const CATEGORIES = ['Todos', 'Hombre', 'Mujer', 'Accesorios']

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState(ALL_PRODUCTS)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'Todos')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 500000])

  const query = searchParams.get('q') || ''
  const filterNew = searchParams.get('filter') === 'new'
  const filterSale = searchParams.get('filter') === 'sale'

  useEffect(() => {
    let filtered = [...ALL_PRODUCTS]
    if (activeCategory !== 'Todos') filtered = filtered.filter((p) => p.category === activeCategory)
    if (query) filtered = filtered.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    if (filterNew) filtered = filtered.filter((p) => p.isNew)
    if (filterSale) filtered = filtered.filter((p) => p.isSale)
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    setProducts(filtered)
  }, [activeCategory, query, filterNew, filterSale, sortBy, priceRange])

  return (
    <div className="section">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-label">Catálogo</span>
            <h1 className="heading-md">Toda la Colección</h1>
            {query && <p className={styles.searchingFor}>Resultados para: <strong>"{query}"</strong></p>}
          </div>
          <p className={styles.count}>{products.length} productos</p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar} aria-label="Filtros">
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Categoría</h3>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  id={`filter-cat-${cat.toLowerCase()}`}
                >
                  {cat}
                  <span className={styles.filterCount}>
                    {cat === 'Todos' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Ordenar por</h3>
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="sort-select">
                <option value="default">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="newest">Más nuevos primero</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Filtros rápidos</h3>
              <button className={`${styles.filterBtn} ${filterNew ? styles.activeFilter : ''}`} onClick={() => setSearchParams(filterNew ? {} : { filter: 'new' })} id="filter-new">
                ✨ Nuevos
              </button>
              <button className={`${styles.filterBtn} ${filterSale ? styles.activeFilter : ''}`} onClick={() => setSearchParams(filterSale ? {} : { filter: 'sale' })} id="filter-sale">
                🔥 En oferta
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            {products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <p>No se encontraron productos</p>
                <button className="btn btn-outline" onClick={() => { setActiveCategory('Todos'); setSearchParams({}) }}>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
