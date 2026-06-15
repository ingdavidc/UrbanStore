import { useState } from 'react';
import styles from './Orders.module.css';

/* ── Mock data ── */
const MOCK_ORDERS = [
  {
    id: '#ORD-0091', cliente: 'Carlos Medina',  email: 'carlos@mail.com',
    telefono: '310 456 7890',
    productos: [
      { nombre: 'Camiseta Urban Classic – M', qty: 1, precio: 79900 },
      { nombre: 'Gorra Snapback', qty: 2, precio: 59900 },
    ],
    total: 199700, envio: 'Domicilio – Bogotá', pago: 'Nequi',
    estado: 'Pendiente', fecha: '15 Jun 2026', direccion: 'Calle 72 #15-30, Bogotá',
  },
  {
    id: '#ORD-0090', cliente: 'Laura Gómez', email: 'laura@mail.com',
    telefono: '315 789 0123',
    productos: [{ nombre: 'Hoodie Street Vibes – L', qty: 1, precio: 149900 }],
    total: 149900, envio: 'Envío nacional', pago: 'Tarjeta débito',
    estado: 'En proceso', fecha: '15 Jun 2026', direccion: 'Carrera 13 #45-22, Medellín',
  },
  {
    id: '#ORD-0089', cliente: 'Andrés Torres', email: 'andres@mail.com',
    telefono: '300 111 2233',
    productos: [
      { nombre: 'Pantalón Cargo – S', qty: 1, precio: 189900 },
      { nombre: 'Camiseta Urban Classic – XL', qty: 1, precio: 79900 },
    ],
    total: 269800, envio: 'Retiro en tienda', pago: 'Efectivo',
    estado: 'Enviado', fecha: '14 Jun 2026', direccion: 'Avenida 6N #24-10, Cali',
  },
  {
    id: '#ORD-0088', cliente: 'Valentina Ruiz', email: 'vale@mail.com',
    telefono: '320 987 6543',
    productos: [{ nombre: 'Sudadera Bomber – M', qty: 2, precio: 129900 }],
    total: 259800, envio: 'Domicilio – Bogotá', pago: 'PSE',
    estado: 'Entregado', fecha: '14 Jun 2026', direccion: 'Diagonal 85 #19-67, Bogotá',
  },
  {
    id: '#ORD-0087', cliente: 'Felipe Castro', email: 'felipe@mail.com',
    telefono: '313 246 8101',
    productos: [{ nombre: 'Gorra Snapback Logo', qty: 3, precio: 59900 }],
    total: 179700, envio: 'Envío nacional', pago: 'Daviplata',
    estado: 'Cancelado', fecha: '13 Jun 2026', direccion: 'Calle 50 #80-120, Barranquilla',
  },
  {
    id: '#ORD-0086', cliente: 'Manuela López', email: 'manu@mail.com',
    telefono: '317 369 1215',
    productos: [
      { nombre: 'Camiseta Urban Classic – L', qty: 1, precio: 79900 },
      { nombre: 'Hoodie Street Vibes – M', qty: 1, precio: 149900 },
    ],
    total: 229800, envio: 'Domicilio – Bogotá', pago: 'Nequi',
    estado: 'En proceso', fecha: '13 Jun 2026', direccion: 'Transversal 78 #5-30, Bogotá',
  },
];

const TABS = ['Todos', 'Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'];
const ALL_ESTADOS = ['Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'];

const estadoBadgeClass = (e) => ({
  Pendiente:   'badge badge-warning',
  'En proceso': 'badge badge-accent',
  Enviado:     'badge badge-accent',
  Entregado:   'badge badge-success',
  Cancelado:   'badge badge-danger',
}[e] || 'badge badge-muted');

const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Orders() {
  const [orders, setOrders]       = useState(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState('Todos');
  const [detailOrder, setDetailOrder] = useState(null);

  const filtered = activeTab === 'Todos'
    ? orders
    : orders.filter((o) => o.estado === activeTab);

  const updateStatus = (id, newEstado) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, estado: newEstado } : o));
    if (detailOrder?.id === id) setDetailOrder((d) => ({ ...d, estado: newEstado }));
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Pedidos</h1>
          <p className={styles.pageSubtitle}>{orders.length} órdenes en total</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((tab) => {
          const count = tab === 'Todos' ? orders.length : orders.filter((o) => o.estado === tab).length;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className={styles.tabCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#Orden</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Envío</th>
                <th>Pago</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className={styles.emptyRow}>Sin pedidos en esta categoría</td></tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id}>
                    <td><span className={styles.orderId}>{o.id}</span></td>
                    <td>
                      <div className={styles.clientCell}>
                        <span className={styles.clientName}>{o.cliente}</span>
                        <span className={styles.clientEmail}>{o.email}</span>
                      </div>
                    </td>
                    <td className={styles.mutedCell}>{o.productos.length} ítem(s)</td>
                    <td className={styles.totalCell}>${o.total.toLocaleString('es-CO')}</td>
                    <td className={styles.mutedCell}>{o.envio}</td>
                    <td className={styles.mutedCell}>{o.pago}</td>
                    <td><span className={estadoBadgeClass(o.estado)}>{o.estado}</span></td>
                    <td className={styles.mutedCell}>{o.fecha}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setDetailOrder(o)}
                          title="Ver detalle"
                        >
                          <IconEye /> Ver
                        </button>
                        <select
                          className={styles.statusSelect}
                          value={o.estado}
                          onChange={(e) => updateStatus(o.id, e.target.value)}
                        >
                          {ALL_ESTADOS.map((es) => <option key={es}>{es}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Order Detail Modal ── */}
      {detailOrder && (
        <div className={styles.overlay} onClick={() => setDetailOrder(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>{detailOrder.id}</h2>
                <span className={estadoBadgeClass(detailOrder.estado)}>{detailOrder.estado}</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setDetailOrder(null)}>
                <IconClose />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Customer info */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Cliente</h3>
                <p className={styles.detailLine}><b>Nombre:</b> {detailOrder.cliente}</p>
                <p className={styles.detailLine}><b>Email:</b> {detailOrder.email}</p>
                <p className={styles.detailLine}><b>Teléfono:</b> {detailOrder.telefono}</p>
                <p className={styles.detailLine}><b>Dirección:</b> {detailOrder.direccion}</p>
              </section>

              {/* Products */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Productos</h3>
                <table className={styles.innerTable}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Precio unit.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder.productos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.nombre}</td>
                        <td>{p.qty}</td>
                        <td>${p.precio.toLocaleString('es-CO')}</td>
                        <td>${(p.qty * p.precio).toLocaleString('es-CO')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={styles.totalLine}>
                  Total: <strong>${detailOrder.total.toLocaleString('es-CO')} COP</strong>
                </p>
              </section>

              {/* Shipping & Payment */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Envío y Pago</h3>
                <p className={styles.detailLine}><b>Método de envío:</b> {detailOrder.envio}</p>
                <p className={styles.detailLine}><b>Método de pago:</b> {detailOrder.pago}</p>
                <p className={styles.detailLine}><b>Fecha:</b> {detailOrder.fecha}</p>
              </section>

              {/* Status change */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Cambiar estado</h3>
                <div className={styles.statusRow}>
                  {ALL_ESTADOS.map((es) => (
                    <button
                      key={es}
                      className={`${styles.statusBtn} ${detailOrder.estado === es ? styles.statusBtnActive : ''}`}
                      onClick={() => updateStatus(detailOrder.id, es)}
                    >
                      {es}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
