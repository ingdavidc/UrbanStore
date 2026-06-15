import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useClientMediaStore from '../../store/clientMediaStore';
import styles from './AdminPanel.module.css';

// ── MOCK/DEFAULT DATA ─────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Zapatillas Urban Neon Run', sku: 'ZAP-NEON-001', category: 'Calzado', stock: 12, price: 189000, image: '/assets/images/product-sneaker.png', sizes: ['38','39','40','41','42'] },
  { id: '2', name: 'Jogger Streetwear Premium', sku: 'JOG-PREM-002', category: 'Hombre', stock: 8, price: 75000, image: '/assets/images/product-jogger.png', sizes: ['S','M','L'] },
  { id: '3', name: 'Conjunto Deportivo Fem', sku: 'CON-FEM-003', category: 'Mujer', stock: 20, price: 130000, image: '/assets/images/product-set.png', sizes: ['XS','S','M','L'] },
  { id: '4', name: 'Gorra Snapback US8', sku: 'CAP-US8-004', category: 'Accesorios', stock: 30, price: 35000, image: '/assets/images/product-cap.png', sizes: ['Única'] }
];

const INITIAL_ORDERS = [
  { id: 'ORD-5482', customer: 'Mateo Gómez', date: '15 Jun 2026', total: 189000, items: '1x Zapatillas Urban Neon Run', payment: 'MercadoPago', status: 'Pendiente' },
  { id: 'ORD-5481', customer: 'Sofía Martínez', date: '14 Jun 2026', total: 205000, items: '1x Jogger Streetwear, 1x Gorra Snapback', payment: 'Addi', status: 'En proceso' },
  { id: 'ORD-5480', customer: 'Andrés Castro', date: '12 Jun 2026', total: 130000, items: '1x Conjunto Deportivo Fem', payment: 'Sistecredito', status: 'Enviado' },
  { id: 'ORD-5479', customer: 'Valeria Peralta', date: '10 Jun 2026', total: 75000, items: '1x Jogger Streetwear Premium', payment: 'Contra entrega', status: 'Entregado' }
];

const INITIAL_CREDITS = [
  { id: 'CRE-101', customer: 'Juan Sebastián Díaz', platform: 'Sistecredito', total: 189000, dues: '3/6', remaining: 94500, status: 'Al día' },
  { id: 'CRE-102', customer: 'Camila Albarracín', platform: 'Addi', total: 260000, dues: '1/3', remaining: 173333, status: 'Al día' },
  { id: 'CRE-103', customer: 'Humberto Soler', platform: 'Sistecredito', total: 75000, dues: '4/4', remaining: 0, status: 'Pagado' }
];

const INITIAL_APARTADOS = [
  { id: 'APA-201', customer: 'Liliana Peñaranda', product: 'Zapatillas Urban Neon Run', total: 189000, paid: 50000, remaining: 139000, dueDate: '30 Jun 2026', status: 'Vigente' },
  { id: 'APA-202', customer: 'Felipe Casadiegos', product: 'Conjunto Deportivo Fem + Gorra', total: 165000, paid: 100000, remaining: 65000, dueDate: '25 Jun 2026', status: 'Por vencer' }
];

const INITIAL_CASH_LOG = [
  { id: 1, type: 'ingreso', desc: 'Venta ORD-5482 (MercadoPago)', amount: 189000, date: 'Hoy 15:30' },
  { id: 2, type: 'ingreso', desc: 'Abono Apartado APA-201', amount: 50000, date: 'Hoy 11:15' },
  { id: 3, type: 'egreso', desc: 'Pago flete envío nacional', amount: 18000, date: 'Ayer 17:00' },
  { id: 4, type: 'ingreso', desc: 'Desembolso Crédito Addi CRE-102', amount: 260000, date: '14 Jun 2026' }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('home');

  // --- TAB 1: INDEX CONTENT EDITOR STATE ---
  const [heroTitleGreen, setHeroTitleGreen] = useState('STORE');
  const [watermark, setWatermark] = useState('URBANSTORE');
  const [bannerVideo, setBannerVideo] = useState('/assets/videos/urban-dance.mp4');
  const [promoPercent, setPromoPercent] = useState('40');
  const [promoText, setPromoText] = useState('Aprovecha nuestras ofertas de temporada. Paga con Addi o Sistecredito y lleva lo que quieras hoy.');

  // Community posts sync
  const clientPosts = useClientMediaStore((state) => state.posts);
  const deleteClientPost = useClientMediaStore((state) => state.deletePost);

  // --- TAB 2: INVENTORY STATE ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  // Form State
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState('Calzado');
  const [prodStock, setProdStock] = useState(0);
  const [prodPrice, setProdPrice] = useState(0);
  const [prodImage, setProdImage] = useState('/assets/images/product-sneaker.png');

  // --- TAB 3: SOCIAL MEDIA STATE ---
  const [socialCaption, setSocialCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, caption: '🔥 Nueva colección de hoodies disponible hoy mismo. #UrbanStore #Streetwear', platforms: ['Instagram', 'Facebook'], scheduled: '16 Jun 2026 – 10:00 AM' }
  ]);

  // --- TAB 4: FINANCES STATE ---
  const [cashLog, setCashLog] = useState(INITIAL_CASH_LOG);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [apartados, setApartados] = useState(INITIAL_APARTADOS);
  const [newCashType, setNewCashType] = useState('ingreso');
  const [newCashDesc, setNewCashDesc] = useState('');
  const [newCashAmount, setNewCashAmount] = useState('');

  // --- TAB 5: ONLINE ORDERS STATE ---
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // General Notification Toast
  const [toast, setToast] = useState('');
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // --- INVENTORY LOGIC ---
  const openAddModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdSku(`URB-${Math.floor(100 + Math.random() * 900)}`);
    setProdCategory('Calzado');
    setProdStock(10);
    setProdPrice(150000);
    setProdImage('/assets/images/product-sneaker.png');
    setShowProductModal(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdSku(prod.sku);
    setProdCategory(prod.category);
    setProdStock(prod.stock);
    setProdPrice(prod.price);
    setProdImage(prod.image);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    if (editingProduct) {
      // Modify
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, name: prodName, category: prodCategory, stock: parseInt(prodStock), price: parseInt(prodPrice), image: prodImage }
            : p
        )
      );
      triggerToast('📦 Producto modificado exitosamente');
    } else {
      // Create
      const newProd = {
        id: Date.now().toString(),
        name: prodName,
        sku: prodSku,
        category: prodCategory,
        stock: parseInt(prodStock),
        price: parseInt(prodPrice),
        image: prodImage,
        sizes: prodCategory === 'Calzado' ? ['38','39','40'] : ['S','M','L']
      };
      setProducts((prev) => [...prev, newProd]);
      triggerToast('📦 Nuevo producto agregado al catálogo');
    }
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del catálogo?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      triggerToast('🗑️ Producto eliminado');
    }
  };

  // --- SOCIAL HUB LOGIC ---
  const handleSchedulePost = () => {
    if (!socialCaption.trim()) return;
    const newScheduled = {
      id: Date.now(),
      caption: socialCaption,
      platforms: selectedPlatforms.length ? selectedPlatforms : ['Instagram'],
      scheduled: 'Mañana – 6:00 PM'
    };
    setScheduledPosts((prev) => [newScheduled, ...prev]);
    setSocialCaption('');
    setSelectedPlatforms([]);
    triggerToast('🗓️ Publicación programada exitosamente');
  };

  // --- FINANCES LOGIC ---
  const handleAddCashLog = (e) => {
    e.preventDefault();
    if (!newCashDesc.trim() || !newCashAmount) return;
    const newEntry = {
      id: Date.now(),
      type: newCashType,
      desc: newCashDesc,
      amount: parseInt(newCashAmount),
      date: 'Hace un momento'
    };
    setCashLog((prev) => [newEntry, ...prev]);
    setNewCashDesc('');
    setNewCashAmount('');
    triggerToast('💵 Movimiento de caja registrado');
  };

  // --- ORDERS LOGIC ---
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    triggerToast(`🚚 Orden ${orderId} actualizada a ${newStatus}`);
  };

  // Helpers
  const formatCOP = (v) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className={styles.wrapper}>
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Admin Panel Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Centro de Control Administrativo</h1>
          <p className={styles.subtitle}>Supervisa y edita toda la operación de UrbanStore en un solo lugar</p>
        </div>
      </div>

      {/* Tabs Switcher Navigation */}
      <div className={styles.tabsNav} role="tablist">
        {[
          { id: 'home', label: 'Index & Multimedia', icon: '🎨' },
          { id: 'inventory', label: 'Inventario (Catálogo)', icon: '📦' },
          { id: 'social', label: 'Redes Sociales', icon: '📢' },
          { id: 'finances', label: 'Finanzas, Caja y Apartados', icon: '💰' },
          { id: 'orders', label: 'Pedidos en Línea', icon: '🚚' },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Unified Panel Content Area */}
      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          {/* ──── TAB 1: INDEX & MULTIMEDIA CONTENT EDITOR ──── */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.tabPane}
            >
              <div className={styles.grid2Col}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Textos y Contenido Principal</h3>
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <label className={styles.fieldLabel}>Marca de agua del Hero (Watermark)</label>
                      <input
                        type="text"
                        className="input"
                        value={watermark}
                        onChange={(e) => setWatermark(e.target.value)}
                        placeholder="URBANSTORE"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.fieldLabel}>Texto Destacado del Hero (Verde)</label>
                      <input
                        type="text"
                        className="input"
                        value={heroTitleGreen}
                        onChange={(e) => setHeroTitleGreen(e.target.value)}
                        placeholder="STORE"
                      />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Porcentaje Descuento Oferta</label>
                        <input
                          type="text"
                          className="input"
                          value={promoPercent}
                          onChange={(e) => setPromoPercent(e.target.value)}
                          placeholder="40"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Video de Fondo Activo</label>
                        <select
                          className="input"
                          value={bannerVideo}
                          onChange={(e) => setBannerVideo(e.target.value)}
                        >
                          <option value="/assets/videos/urban-dance.mp4">Bailarín Urbano (Local)</option>
                          <option value="https://vjs.zencdn.net/v/oceans.mp4">Oceans (Externo)</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.fieldLabel}>Leyenda Banner Promocional</label>
                      <textarea
                        className="input"
                        rows={3}
                        value={promoText}
                        onChange={(e) => setPromoText(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => triggerToast('✅ Cambios de diseño index guardados (simulado)')}
                    >
                      Guardar Cambios de Contenido
                    </button>
                  </div>
                </div>

                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Comunidad de Clientes (Fotos Moderadas)</h3>
                  <p className={styles.cardInfoText}>
                    Elimina o modera fotos que tus clientes suben en tiempo real a la web.
                  </p>
                  <div className={styles.clientsList}>
                    {clientPosts.map((post) => (
                      <div key={post.id} className={styles.clientItem}>
                        <div className={styles.clientThumbWrapper}>
                          {post.mediaType === 'video' ? (
                            <span className={styles.videoIndicator}>▶ Video</span>
                          ) : (
                            <img src={post.mediaUrl} alt="" className={styles.clientThumb} />
                          )}
                        </div>
                        <div className={styles.clientDetails}>
                          <p className={styles.clientUser}>{post.username} <span className={styles.sourceTag} style={{ color: post.sourceColor }}>{post.source}</span></p>
                          <p className={styles.clientCaptionText}>{post.caption}</p>
                        </div>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => deleteClientPost(post.id)}
                          title="Eliminar de la web"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ──── TAB 2: INVENTORY CRUD MANAGEMENT ──── */}
          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.tabPane}
            >
              <div className={styles.card}>
                <div className={styles.cardHeaderFlex}>
                  <h3 className={styles.cardTitle} style={{ margin: 0 }}>Listado de Productos</h3>
                  <button className="btn btn-primary btn-sm" onClick={openAddModal}>
                    ✦ Agregar Producto
                  </button>
                </div>

                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>SKU</th>
                      <th>Categoría</th>
                      <th>Stock</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <img src={prod.image} alt={prod.name} className={styles.tableThumb} />
                        </td>
                        <td><strong>{prod.name}</strong></td>
                        <td><span className={styles.skuSpan}>{prod.sku}</span></td>
                        <td>{prod.category}</td>
                        <td>
                          <span className={`badge ${prod.stock < 10 ? 'badge-warning' : 'badge-muted'}`}>
                            {prod.stock} uds
                          </span>
                        </td>
                        <td>{formatCOP(prod.price)}</td>
                        <td>
                          <div className={styles.actionRow}>
                            <button className="btn btn-outline btn-sm" onClick={() => openEditModal(prod)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(prod.id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Product Add/Edit Modal */}
              {showProductModal && (
                <div className={styles.modalOverlay}>
                  <motion.div className={styles.modal} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
                    <h3 className={styles.modalTitle}>
                      {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <form onSubmit={handleSaveProduct} className={styles.form}>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Nombre del Producto</label>
                        <input
                          type="text"
                          className="input"
                          required
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                        />
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.fieldLabel}>SKU</label>
                          <input type="text" className="input" disabled value={prodSku} />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.fieldLabel}>Categoría</label>
                          <select
                            className="input"
                            value={prodCategory}
                            onChange={(e) => setProdCategory(e.target.value)}
                          >
                            <option value="Calzado">Calzado</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Accesorios">Accesorios</option>
                          </select>
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label className={styles.fieldLabel}>Precio (COP)</label>
                          <input
                            type="number"
                            className="input"
                            required
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.fieldLabel}>Stock Inicial</label>
                          <input
                            type="number"
                            className="input"
                            required
                            value={prodStock}
                            onChange={(e) => setProdStock(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.fieldLabel}>Ruta de la Imagen</label>
                        <select
                          className="input"
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                        >
                          <option value="/assets/images/product-sneaker.png">Sneaker Neon Run</option>
                          <option value="/assets/images/product-jogger.png">Jogger Cargo</option>
                          <option value="/assets/images/product-cap.png">Gorra Snapback</option>
                          <option value="/assets/images/product-tshirt.png">Camiseta Oversized</option>
                          <option value="/assets/images/product-hoodie.png">Hoodie Premium</option>
                          <option value="/assets/images/product-set.png">Conjunto Deportivo Fem</option>
                        </select>
                      </div>
                      <div className={styles.modalActions}>
                        <button type="button" className="btn btn-outline" onClick={() => setShowProductModal(false)}>
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Guardar Producto
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* ──── TAB 3: SOCIAL MEDIA COMPOSER & POSTING ──── */}
          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.tabPane}
            >
              <div className={styles.grid2Col}>
                {/* Composer */}
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Publicación Centralizada</h3>
                  <p className={styles.cardInfoText}>Crea y comparte contenido simultáneamente en redes sociales.</p>
                  <div className={styles.form}>
                    <textarea
                      className="input"
                      rows={5}
                      placeholder="Escribe tu publicación... 🔥 #UrbanStore #CalzadoDeportivo"
                      value={socialCaption}
                      onChange={(e) => setSocialCaption(e.target.value)}
                    />
                    
                    <div className={styles.platformsSelect}>
                      {['Instagram', 'Facebook', 'TikTok'].map((platform) => (
                        <label key={platform} className={styles.platformCheckbox}>
                          <input
                            type="checkbox"
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() =>
                              setSelectedPlatforms((prev) =>
                                prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
                              )
                            }
                          />
                          <span>{platform}</span>
                        </label>
                      ))}
                    </div>

                    <div className={styles.composerActions}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (!socialCaption.trim()) return;
                          setSocialCaption('');
                          setSelectedPlatforms([]);
                          triggerToast('✅ Publicado exitosamente en tus redes sociales vinculadas');
                        }}
                      >
                        Publicar Ahora
                      </button>
                      <button className="btn btn-outline" onClick={handleSchedulePost}>
                        Programar Publicación
                      </button>
                    </div>
                  </div>
                </div>

                {/* Queue */}
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Cola de Programados</h3>
                  <div className={styles.scheduledList}>
                    {scheduledPosts.map((post) => (
                      <div key={post.id} className={styles.scheduledItem}>
                        <div className={styles.scheduledDetails}>
                          <p className={styles.scheduledCaptionText}>{post.caption}</p>
                          <div className={styles.scheduledMeta}>
                            <span className={styles.platTags}>{post.platforms.join(' · ')}</span>
                            <span className={styles.schedTime}>⏱ {post.scheduled}</span>
                          </div>
                        </div>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id))}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ──── TAB 4: FINANCES, CASH LOG & CREDIT PLATFORMS ──── */}
          {activeTab === 'finances' && (
            <motion.div
              key="finances"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.tabPane}
            >
              <div className={styles.kpiRow}>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>💵</span>
                  <div>
                    <p className={styles.kpiLabel}>Caja de Hoy</p>
                    <p className={styles.kpiVal}>{formatCOP(539000)}</p>
                  </div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>📈</span>
                  <div>
                    <p className={styles.kpiLabel}>Ventas Totales</p>
                    <p className={styles.kpiVal}>{formatCOP(2349000)}</p>
                  </div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>💳</span>
                  <div>
                    <p className={styles.kpiLabel}>Créditos Siste/Addi</p>
                    <p className={styles.kpiVal}>{formatCOP(267833)}</p>
                  </div>
                </div>
                <div className={styles.kpiCard}>
                  <span className={styles.kpiIcon}>🛍️</span>
                  <div>
                    <p className={styles.kpiLabel}>Sistemas de Apartado</p>
                    <p className={styles.kpiVal}>{formatCOP(204000)}</p>
                  </div>
                </div>
              </div>

              <div className={styles.grid2Col}>
                {/* Money and Cash Register logs */}
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Caja Diaria (Movimientos de Dinero)</h3>
                  
                  <form onSubmit={handleAddCashLog} className={styles.cashRegisterForm}>
                    <div className={styles.formRow}>
                      <select className="input" value={newCashType} onChange={(e) => setNewCashType(e.target.value)}>
                        <option value="ingreso">Ingreso (+)</option>
                        <option value="egreso">Egreso (-)</option>
                      </select>
                      <input
                        type="number"
                        className="input"
                        placeholder="Monto ($)"
                        required
                        value={newCashAmount}
                        onChange={(e) => setNewCashAmount(e.target.value)}
                      />
                    </div>
                    <div className={styles.formRow}>
                      <input
                        type="text"
                        className="input"
                        placeholder="Concepto (ej: venta local, pago fletes)"
                        required
                        value={newCashDesc}
                        onChange={(e) => setNewCashDesc(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        Registrar Movimiento
                      </button>
                    </div>
                  </form>

                  <div className={styles.cashLogs}>
                    {cashLog.map((log) => (
                      <div key={log.id} className={styles.cashItem}>
                        <span className={log.type === 'ingreso' ? styles.incomeTag : styles.outcomeTag}>
                          {log.type === 'ingreso' ? '+' : '-'} {formatCOP(log.amount)}
                        </span>
                        <div className={styles.cashInfo}>
                          <span className={styles.cashDesc}>{log.desc}</span>
                          <span className={styles.cashDate}>{log.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credits / Sistecredito / Addi logs & Apartado Layaways */}
                <div className={styles.rightCol}>
                  {/* Credits */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Créditos Retail (Sistecrédito / Addi)</h3>
                    <div className={styles.creditsList}>
                      {credits.map((c) => (
                        <div key={c.id} className={styles.creditItem}>
                          <div className={styles.creditHeader}>
                            <strong>{c.customer}</strong>
                            <span className={c.platform === 'Addi' ? styles.addiBadge : styles.sisteBadge}>{c.platform}</span>
                          </div>
                          <div className={styles.creditGrid}>
                            <span>Total financiado:</span><span>{formatCOP(c.total)}</span>
                            <span>Cuotas:</span><span>{c.dues}</span>
                            <span>Por cobrar:</span><span>{formatCOP(c.remaining)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Systems of Apartados */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Sistemas de Apartado (Apartados)</h3>
                    <div className={styles.apartadosList}>
                      {apartados.map((a) => (
                        <div key={a.id} className={styles.apartadoItem}>
                          <div className={styles.apartadoHeader}>
                            <strong>{a.customer}</strong>
                            <span className={styles.apartadoDueDate}>Vence: {a.dueDate}</span>
                          </div>
                          <p className={styles.apartadoProduct}>{a.product}</p>
                          <div className={styles.apartadoGrid}>
                            <span>Valor total:</span><span>{formatCOP(a.total)}</span>
                            <span>Abonado:</span><span>{formatCOP(a.paid)}</span>
                            <span>Saldo pendiente:</span><span className={styles.saldoText}>{formatCOP(a.remaining)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ──── TAB 5: ONLINE ORDERS TRACKER ──── */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.tabPane}
            >
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Pedidos en Línea</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th># Orden</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Detalle de Artículos</th>
                      <th>Total</th>
                      <th>Método Pago</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td><span className={styles.orderIdSpan}>{order.id}</span></td>
                        <td><strong>{order.customer}</strong></td>
                        <td>{order.date}</td>
                        <td><span className={styles.orderItemsSpan}>{order.items}</span></td>
                        <td>{formatCOP(order.total)}</td>
                        <td>{order.payment}</td>
                        <td>
                          <select
                            className={`${styles.statusSelect} ${
                              order.status === 'Pendiente' ? styles.statusPend :
                              order.status === 'En proceso' ? styles.statusProc :
                              order.status === 'Enviado' ? styles.statusEnv :
                              order.status === 'Entregado' ? styles.statusEnt : styles.statusCanc
                            }`}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          >
                            <option value="Pendiente">🟡 Pendiente</option>
                            <option value="En proceso">🔵 En proceso</option>
                            <option value="Enviado">🔁 Enviado</option>
                            <option value="Entregado">🟢 Entregado</option>
                            <option value="Cancelado">🔴 Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
