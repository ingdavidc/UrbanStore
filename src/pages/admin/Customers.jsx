import { useState } from 'react';
import styles from './Customers.module.css';

/* ── Mock data ── */
const MOCK_CUSTOMERS = [
  {
    id: 1,
    nombre: 'Carlos Medina',
    email: 'carlos.medina@gmail.com',
    telefono: '310 456 7890',
    compras: 5,
    totalGastado: 894500,
    ultimaCompra: '15 Jun 2026',
    ciudad: 'Bogotá',
  },
  {
    id: 2,
    nombre: 'Laura Gómez',
    email: 'laura.gomez@outlook.com',
    telefono: '315 789 0123',
    compras: 3,
    totalGastado: 489700,
    ultimaCompra: '15 Jun 2026',
    ciudad: 'Medellín',
  },
  {
    id: 3,
    nombre: 'Andrés Torres',
    email: 'andres.torres@hotmail.com',
    telefono: '300 111 2233',
    compras: 7,
    totalGastado: 1240000,
    ultimaCompra: '14 Jun 2026',
    ciudad: 'Cali',
  },
  {
    id: 4,
    nombre: 'Valentina Ruiz',
    email: 'vale.ruiz@gmail.com',
    telefono: '320 987 6543',
    compras: 2,
    totalGastado: 259800,
    ultimaCompra: '14 Jun 2026',
    ciudad: 'Bogotá',
  },
  {
    id: 5,
    nombre: 'Felipe Castro',
    email: 'felipe.castro@gmail.com',
    telefono: '313 246 8101',
    compras: 1,
    totalGastado: 179700,
    ultimaCompra: '13 Jun 2026',
    ciudad: 'Barranquilla',
  },
  {
    id: 6,
    nombre: 'Manuela López',
    email: 'manu.lopez@gmail.com',
    telefono: '317 369 1215',
    compras: 4,
    totalGastado: 670000,
    ultimaCompra: '13 Jun 2026',
    ciudad: 'Bogotá',
  },
];

const IconUser = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const tierLabel = (total) => {
  if (total >= 1000000) return { label: 'VIP', cls: 'badge badge-accent' };
  if (total >= 500000)  return { label: 'Frecuente', cls: 'badge badge-success' };
  return { label: 'Nuevo', cls: 'badge badge-muted' };
};

export default function Customers() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CUSTOMERS.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.ciudad.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = MOCK_CUSTOMERS.reduce((s, c) => s + c.totalGastado, 0);
  const avgOrder     = Math.round(totalRevenue / MOCK_CUSTOMERS.reduce((s, c) => s + c.compras, 0));

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Clientes</h1>
          <p className={styles.pageSubtitle}>{MOCK_CUSTOMERS.length} clientes registrados</p>
        </div>
      </div>

      {/* Summary chips */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryValue}>{MOCK_CUSTOMERS.length}</p>
          <p className={styles.summaryLabel}>Total Clientes</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryValue}>${totalRevenue.toLocaleString('es-CO')}</p>
          <p className={styles.summaryLabel}>Ingresos Totales</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryValue}>${avgOrder.toLocaleString('es-CO')}</p>
          <p className={styles.summaryLabel}>Ticket Promedio</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryValue}>
            {MOCK_CUSTOMERS.filter((c) => c.totalGastado >= 1000000).length}
          </p>
          <p className={styles.summaryLabel}>Clientes VIP</p>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <input
          id="customers-search"
          className={`input ${styles.searchInput}`}
          type="search"
          placeholder="Buscar por nombre, email o ciudad…"
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
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Total Compras</th>
                <th>Total Gastado</th>
                <th>Última Compra</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className={styles.emptyRow}>Sin resultados</td></tr>
              ) : (
                filtered.map((c) => {
                  const tier = tierLabel(c.totalGastado);
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className={styles.clientCell}>
                          <div className={styles.avatar}>
                            <IconUser />
                          </div>
                          <div>
                            <p className={styles.clientName}>{c.nombre}</p>
                            <p className={styles.clientEmail}>
                              <IconMail /> {c.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={styles.mutedCell}>{c.telefono}</td>
                      <td className={styles.mutedCell}>{c.ciudad}</td>
                      <td className={styles.centerCell}>{c.compras} órdenes</td>
                      <td className={styles.totalCell}>${c.totalGastado.toLocaleString('es-CO')}</td>
                      <td className={styles.mutedCell}>{c.ultimaCompra}</td>
                      <td><span className={tier.cls}>{tier.label}</span></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
