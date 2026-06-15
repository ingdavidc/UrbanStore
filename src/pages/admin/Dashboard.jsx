import styles from './Dashboard.module.css';

/* ── KPI Icons ── */
const IconTrending = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ── Mock Data ── */
const kpis = [
  {
    id: 'ventas',
    label: 'Ventas Hoy',
    value: '$1.240.000',
    sub: 'COP',
    trend: '+12.5%',
    up: true,
    Icon: IconTrending,
    color: '#8FC740',
  },
  {
    id: 'pedidos',
    label: 'Pedidos Pendientes',
    value: '8',
    sub: 'Por procesar',
    trend: '+3',
    up: true,
    Icon: IconBag,
    color: '#facc15',
  },
  {
    id: 'stock',
    label: 'Productos en Stock',
    value: '124',
    sub: 'SKUs activos',
    trend: '-2',
    up: false,
    Icon: IconBox,
    color: '#60a5fa',
  },
  {
    id: 'clientes',
    label: 'Clientes Totales',
    value: '347',
    sub: 'Registrados',
    trend: '+18',
    up: true,
    Icon: IconUsers,
    color: '#c084fc',
  },
];

const recentOrders = [
  { id: '#ORD-0091', cliente: 'Carlos Medina',   total: '$189.900', estado: 'Pendiente',  fecha: '15 Jun 2026' },
  { id: '#ORD-0090', cliente: 'Laura Gómez',     total: '$245.000', estado: 'En proceso', fecha: '15 Jun 2026' },
  { id: '#ORD-0089', cliente: 'Andrés Torres',   total: '$98.500',  estado: 'Enviado',    fecha: '14 Jun 2026' },
  { id: '#ORD-0088', cliente: 'Valentina Ruiz',  total: '$320.000', estado: 'Entregado',  fecha: '14 Jun 2026' },
  { id: '#ORD-0087', cliente: 'Felipe Castro',   total: '$145.000', estado: 'Cancelado',  fecha: '13 Jun 2026' },
];

const lowStock = [
  { sku: 'URB-TEE-001-M', nombre: 'Camiseta Urban Classic – M',   stock: 2 },
  { sku: 'URB-HOD-003-L', nombre: 'Hoodie Street Vibes – L',      stock: 1 },
  { sku: 'URB-CAP-007',   nombre: 'Gorra Snapback Logo',           stock: 3 },
  { sku: 'URB-PNT-002-S', nombre: 'Pantalón Cargo Urban – S',     stock: 4 },
];

const estadoBadge = (estado) => {
  const map = {
    Pendiente:   'badge badge-warning',
    'En proceso': 'badge badge-accent',
    Enviado:     'badge badge-accent',
    Entregado:   'badge badge-success',
    Cancelado:   'badge badge-danger',
  };
  return map[estado] || 'badge badge-muted';
};

export default function Dashboard() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Bienvenido al panel de administración de UrbanStore</p>
        </div>
        <span className={styles.dateChip}>
          {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map(({ id, label, value, sub, trend, up, Icon, color }) => (
          <div key={id} className={styles.kpiCard} id={`kpi-${id}`}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiIcon} style={{ '--kpi-color': color }}>
                <Icon />
              </div>
              <span className={`${styles.kpiTrend} ${up ? styles.trendUp : styles.trendDown}`}>
                {trend}
              </span>
            </div>
            <p className={styles.kpiValue}>{value}</p>
            <p className={styles.kpiLabel}>{label}</p>
            <p className={styles.kpiSub}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Recent Orders */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Órdenes Recientes</h2>
            <a href="/admin/pedidos" className={styles.cardLink}>Ver todas →</a>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#Orden</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td><span className={styles.orderId}>{o.id}</span></td>
                    <td>{o.cliente}</td>
                    <td className={styles.totalCell}>{o.total}</td>
                    <td><span className={estadoBadge(o.estado)}>{o.estado}</span></td>
                    <td className={styles.dateCell}>{o.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className={`${styles.card} ${styles.alertCard}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <span className={styles.alertIcon}><IconAlert /></span>
              Stock Bajo
            </h2>
            <a href="/admin/inventario" className={styles.cardLink}>Ver inventario →</a>
          </div>
          <div className={styles.alertList}>
            {lowStock.map((item) => (
              <div key={item.sku} className={styles.alertItem}>
                <div className={styles.alertInfo}>
                  <p className={styles.alertName}>{item.nombre}</p>
                  <p className={styles.alertSku}>{item.sku}</p>
                </div>
                <span className={`badge badge-danger ${styles.stockBadge}`}>
                  {item.stock} uds.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
