import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const navigate  = useNavigate()

  const { totalItems, openDrawer } = useCartStore()
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  // Navbar shrinks on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  // Close menu on route change
  const closeMenu = () => setMenuOpen(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { to: '/',         label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Navegación principal">
        <div className={`container ${styles.inner}`}>

          {/* ── Logo ─────────────────────────────────── */}
          <Link to="/" className={styles.logo} aria-label="Urban 8 Store - Inicio" onClick={closeMenu}>
            <span className={styles.logoUs}>US</span>
            <span className={styles.logoText}>
              URBAN<span className={styles.logoSlash}>/</span>STORE
            </span>
          </Link>

          {/* ── Nav Links (desktop) ───────────────────── */}
          <ul className={styles.navLinks} role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Actions ──────────────────────────────── */}
          <div className={styles.actions}>
            {/* Search */}
            <button
              className={`btn btn-icon ${styles.iconBtn}`}
              aria-label="Abrir búsqueda"
              id="navbar-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              className={`btn btn-icon ${styles.iconBtn} ${styles.cartBtn}`}
              aria-label={`Carrito de compras — ${itemCount} productos`}
              id="navbar-cart-btn"
              onClick={openDrawer}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`btn btn-icon ${styles.iconBtn} ${styles.hamburger}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              id="navbar-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`} />
            </button>
          </div>
        </div>

        {/* ── Search Bar ─────────────────────────────── */}
        {searchOpen && (
          <div className={styles.searchBar} role="search">
            <div className="container">
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={searchRef}
                  type="search"
                  className={styles.searchInput}
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar productos"
                  id="navbar-search-input"
                />
                <button type="submit" className="btn btn-primary btn-sm">Buscar</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(false)}>
                  Cerrar
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile menu overlay ─────────────────────── */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menú móvil">
          <div className={styles.mobileMenuInner}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/admin" className={styles.mobileAdminLink} onClick={closeMenu}>
              Panel Admin
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
