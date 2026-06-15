import { useState } from 'react';
import styles from './Inventory.module.css';

/* ── Initial mock data ── */
const INITIAL_PRODUCTS = [
  {
    id: 1,
    nombre: 'Camiseta Urban Classic',
    sku: 'URB-TEE-001',
    categoria: 'Camisetas',
    tallas: ['S', 'M', 'L', 'XL'],
    stock: 24,
    precio: 79900,
    descripcion: 'Camiseta de algodón premium con logo Urban 8.',
    imagen: 'https://placehold.co/60x60/242424/8FC740?text=TEE',
  },
  {
    id: 2,
    nombre: 'Hoodie Street Vibes',
    sku: 'URB-HOD-003',
    categoria: 'Hoodies',
    tallas: ['M', 'L', 'XL', 'XXL'],
    stock: 1,
    precio: 149900,
    descripcion: 'Hoodie oversize con bordado lateral.',
    imagen: 'https://placehold.co/60x60/242424/8FC740?text=HOD',
  },
  {
    id: 3,
    nombre: 'Gorra Snapback Logo',
    sku: 'URB-CAP-007',
    categoria: 'Accesorios',
    tallas: ['Única'],
    stock: 3,
    precio: 59900,
    descripcion: 'Gorra snapback edición limitada.',
    imagen: 'https://placehold.co/60x60/242424/8FC740?text=CAP',
  },
  {
    id: 4,
    nombre: 'Pantalón Cargo Urban',
    sku: 'URB-PNT-002',
    categoria: 'Pantalones',
    tallas: ['XS', 'S', 'M', 'L'],
    stock: 12,
    precio: 189900,
    descripcion: 'Pantalón cargo con bolsillos laterales.',
    imagen: 'https://placehold.co/60x60/242424/8FC740?text=PNT',
  },
  {
    id: 5,
    nombre: 'Sudadera Bomber',
    sku: 'URB-SWE-005',
    categoria: 'Hoodies',
    tallas: ['S', 'M', 'L'],
    stock: 8,
    precio: 129900,
    descripcion: 'Sudadera estilo bomber con parche trasero.',
    imagen: 'https://placehold.co/60x60/242424/8FC740?text=SWE',
  },
];

const CATEGORIAS = ['Camisetas', 'Hoodies', 'Pantalones', 'Accesorios', 'Calzado', 'Otro'];
const ALL_TALLAS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const EMPTY_FORM = {
  nombre: '', sku: '', categoria: 'Camisetas', precio: '',
  tallas: [], stock: '', descripcion: '', imagen: '',
};

function stockBadgeClass(stock) {
  if (stock < 5)  return 'badge badge-danger';
  if (stock <= 10) return 'badge badge-warning';
  return 'badge badge-success';
}

function stockLabel(stock) {
  if (stock < 5)  return 'Bajo';
  if (stock <= 10) return 'Medio';
  return 'OK';
}

/* ── Pencil icon ── */
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Inventory() {
  const [products, setProducts]   = useState(INITIAL_PRODUCTS);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId]       = useState(null);   // null = add mode
  const [form, setForm]           = useState(EMPTY_FORM);
  const [deleteId, setDeleteId]   = useState(null);

  /* Filtered list */
  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  );

  /* Open modal */
  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre, sku: p.sku, categoria: p.categoria,
      precio: p.precio, tallas: p.tallas, stock: p.stock,
      descripcion: p.descripcion, imagen: p.imagen,
    });
    setShowModal(true);
  };

  /* Field changes */
  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleTalla = (t) => {
    setForm((f) => ({
      ...f,
      tallas: f.tallas.includes(t) ? f.tallas.filter((x) => x !== t) : [...f.tallas, t],
    }));
  };

  /* Save */
  const handleSave = (e) => {
    e.preventDefault();
    const entry = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };
    if (editId === null) {
      setProducts((prev) => [...prev, { ...entry, id: Date.now() }]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === editId ? { ...p, ...entry } : p)));
    }
    setShowModal(false);
  };

  /* Delete */
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Inventario</h1>
          <p className={styles.pageSubtitle}>{products.length} productos registrados</p>
        </div>
        <button id="add-product-btn" className="btn btn-primary" onClick={openAdd}>
          + Agregar Producto
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <input
          id="inventory-search"
          className={`input ${styles.searchInput}`}
          type="search"
          placeholder="Buscar por nombre, SKU o categoría…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>SKU</th>
                <th>Categoría</th>
                <th>Tallas</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.emptyRow}>Sin resultados</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.imagen} alt={p.nombre} className={styles.productImg} />
                    </td>
                    <td className={styles.productName}>{p.nombre}</td>
                    <td className={styles.skuCell}>{p.sku}</td>
                    <td>{p.categoria}</td>
                    <td>
                      <div className={styles.tallasRow}>
                        {p.tallas.map((t) => (
                          <span key={t} className={styles.tallaChip}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className={styles.stockCell}>
                        <span>{p.stock}</span>
                        <span className={stockBadgeClass(p.stock)}>{stockLabel(p.stock)}</span>
                      </div>
                    </td>
                    <td className={styles.priceCell}>
                      ${p.precio.toLocaleString('es-CO')}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openEdit(p)}
                          title="Editar"
                        >
                          <IconEdit /> Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteId(p.id)}
                          title="Eliminar"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{editId === null ? 'Agregar Producto' : 'Editar Producto'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <IconClose />
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSave}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre</label>
                  <input name="nombre" className="input" value={form.nombre} onChange={handleField} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>SKU</label>
                  <input name="sku" className="input" value={form.sku} onChange={handleField} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Categoría</label>
                  <select name="categoria" className="input" value={form.categoria} onChange={handleField}>
                    {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Precio (COP)</label>
                  <input name="precio" type="number" className="input" value={form.precio} onChange={handleField} required min="0" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Stock</label>
                  <input name="stock" type="number" className="input" value={form.stock} onChange={handleField} required min="0" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>URL Imagen</label>
                  <input name="imagen" className="input" value={form.imagen} onChange={handleField} placeholder="https://…" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Descripción</label>
                <textarea name="descripcion" className={`input ${styles.textarea}`} value={form.descripcion} onChange={handleField} rows={3} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Tallas</label>
                <div className={styles.tallasCheck}>
                  {ALL_TALLAS.map((t) => (
                    <label key={t} className={styles.checkLabel}>
                      <input
                        type="checkbox"
                        checked={form.tallas.includes(t)}
                        onChange={() => toggleTalla(t)}
                      />
                      <span className={styles.checkChip}>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editId === null ? 'Agregar' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteId !== null && (
        <div className={styles.overlay} onClick={() => setDeleteId(null)}>
          <div className={`${styles.modal} ${styles.confirmModal}`} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>¿Eliminar producto?</h2>
            <p className={styles.confirmText}>Esta acción no se puede deshacer.</p>
            <div className={styles.modalFooter}>
              <button className="btn btn-outline" onClick={() => setDeleteId(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
