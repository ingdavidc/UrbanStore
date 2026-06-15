import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';
import styles from './Checkout.module.css';

const formatCOP = (v) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(v);

const SHIPPING_COST = 15000;
const IVA_RATE = 0.19;

/* ─── Step indicators ───────────────────────────────────────────────── */
const STEPS = ['Información', 'Envío', 'Pago'];

/* ─── payment methods ───────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  {
    id: 'mercadopago',
    label: 'MercadoPago',
    subtitle: 'Tarjeta débito, crédito, PSE y más',
    badge: '#009EE3',
    icon: <img src="/assets/images/mercadopago.png" alt="Mercado Pago" className={styles.paymentLogoImg} />,
  },
  {
    id: 'addi',
    label: 'Addi',
    subtitle: 'Compra ahora, paga después',
    badge: '#FF5A00',
    icon: <img src="/assets/images/addi.png" alt="Addi" className={styles.paymentLogoImg} />,
  },
  {
    id: 'sistecredito',
    label: 'Sistecredito',
    subtitle: 'Crédito retail fácil y rápido',
    badge: '#1E40AF',
    icon: <img src="/assets/images/sistecredito.png" alt="Sistecredito" className={styles.paymentLogoImg} />,
  },
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    subtitle: 'Pago directo a cuenta bancaria',
    badge: '#6B7280',
    icon: '🔁',
  },
  {
    id: 'contra_entrega',
    label: 'Contra entrega',
    subtitle: 'Solo disponible para domicilio',
    badge: '#8FC740',
    icon: '📦',
    domicilioOnly: true,
  },
];

const BANK_DETAILS = {
  bank: 'Bancolombia',
  account: '123-456789-01',
  type: 'Cuenta corriente',
  name: 'URBAN STORE S.A.S',
  nit: '900.123.456-7',
};

/* ─── main ─────────────────────────────────────────────────────────── */
export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState(1);

  /* step 1 – customer info */
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
  });

  /* step 2 – shipping */
  const [shipping, setShipping] = useState('domicilio'); // 'domicilio' | 'tienda'

  /* step 3 – payment */
  const [paymentMethod, setPaymentMethod] = useState('');

  /* ── calculations ── */
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const shippingCost = shipping === 'tienda' ? 0 : SHIPPING_COST;
  const ivaAmount = subtotal * IVA_RATE;
  const total = subtotal + shippingCost;

  /* ── handlers ── */
  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isStep1Valid = Object.values(form).every((v) => v.trim().length > 0);

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handlePlaceOrder = () => {
    const orderId = `US-${Date.now().toString().slice(-6)}`;
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  const availableMethods = PAYMENT_METHODS.filter(
    (m) => !m.domicilioOnly || shipping === 'domicilio'
  );

  return (
    <div className={styles.page}>
      {/* progress */}
      <div className={styles.progress}>
        {STEPS.map((label, i) => {
          const num = i + 1;
          return (
            <div key={label} className={styles.progressItem}>
              <div
                className={`${styles.progressDot} ${step >= num ? styles.progressDotActive : ''} ${step > num ? styles.progressDotDone : ''}`}
              >
                {step > num ? '✓' : num}
              </div>
              <span className={`${styles.progressLabel} ${step >= num ? styles.progressLabelActive : ''}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`${styles.progressLine} ${step > num ? styles.progressLineDone : ''}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.layout}>
        {/* ── FORM AREA ── */}
        <div className={styles.formCol}>
          <AnimatePresence mode="wait">
            {/* ─── STEP 1: Customer Info ─── */}
            {step === 1 && (
              <motion.div
                key="step1"
                className={styles.stepCard}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.stepTitle}>Información del cliente</h2>
                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      className={styles.input}
                      placeholder="Juan Pérez"
                      value={form.nombre}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Correo electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      placeholder="juan@ejemplo.com"
                      value={form.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      className={styles.input}
                      placeholder="+57 300 000 0000"
                      value={form.telefono}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel}>Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      className={styles.input}
                      placeholder="Calle 123 # 45-67"
                      value={form.direccion}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      className={styles.input}
                      placeholder="Bogotá"
                      value={form.ciudad}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Departamento *</label>
                    <input
                      type="text"
                      name="departamento"
                      className={styles.input}
                      placeholder="Cundinamarca"
                      value={form.departamento}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className={styles.stepNav}>
                  <Link to="/cart" className={styles.backLink}>← Volver al carrito</Link>
                  <button
                    className={styles.nextBtn}
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                  >
                    Continuar →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Shipping ─── */}
            {step === 2 && (
              <motion.div
                key="step2"
                className={styles.stepCard}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.stepTitle}>Método de envío</h2>

                <div className={styles.shippingOptions}>
                  {/* domicilio */}
                  <label
                    className={`${styles.shippingCard} ${shipping === 'domicilio' ? styles.shippingCardActive : ''}`}
                    htmlFor="shipping-domicilio"
                  >
                    <input
                      id="shipping-domicilio"
                      type="radio"
                      name="shipping"
                      value="domicilio"
                      checked={shipping === 'domicilio'}
                      onChange={() => setShipping('domicilio')}
                      className={styles.radioHidden}
                    />
                    <div className={styles.shippingIcon}>🚚</div>
                    <div className={styles.shippingInfo}>
                      <span className={styles.shippingLabel}>Domicilio</span>
                      <span className={styles.shippingDesc}>Entrega en tu dirección — 3 a 5 días hábiles</span>
                    </div>
                    <span className={styles.shippingPrice}>{formatCOP(SHIPPING_COST)}</span>
                  </label>

                  {shipping === 'domicilio' && (
                    <motion.div
                      className={styles.addressPreview}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <p>📍 <strong>Dirección de entrega:</strong></p>
                      <p>{form.direccion}, {form.ciudad}, {form.departamento}</p>
                    </motion.div>
                  )}

                  {/* tienda */}
                  <label
                    className={`${styles.shippingCard} ${shipping === 'tienda' ? styles.shippingCardActive : ''}`}
                    htmlFor="shipping-tienda"
                  >
                    <input
                      id="shipping-tienda"
                      type="radio"
                      name="shipping"
                      value="tienda"
                      checked={shipping === 'tienda'}
                      onChange={() => setShipping('tienda')}
                      className={styles.radioHidden}
                    />
                    <div className={styles.shippingIcon}>🏪</div>
                    <div className={styles.shippingInfo}>
                      <span className={styles.shippingLabel}>Recogida en tienda</span>
                      <span className={styles.shippingDesc}>Disponible en 1–2 días hábiles. Sin costo.</span>
                    </div>
                    <span className={`${styles.shippingPrice} ${styles.shippingFree}`}>Gratis</span>
                  </label>

                  {shipping === 'tienda' && (
                    <motion.div
                      className={styles.storeAddress}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <p>🏪 <strong>Urban Store</strong></p>
                      <p>Calle 100 #15-20, Centro Comercial Andino, Local 312</p>
                      <p>Bogotá, Cundinamarca · Horario: Lun–Sáb 10am–8pm</p>
                    </motion.div>
                  )}
                </div>

                <div className={styles.stepNav}>
                  <button className={styles.backBtn} onClick={handleBack}>← Atrás</button>
                  <button className={styles.nextBtn} onClick={handleNext}>
                    Continuar →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Payment ─── */}
            {step === 3 && (
              <motion.div
                key="step3"
                className={styles.stepCard}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.stepTitle}>Método de pago</h2>

                <div className={styles.paymentOptions}>
                  {availableMethods.map((method) => (
                    <div key={method.id}>
                      <label
                        className={`${styles.paymentCard} ${paymentMethod === method.id ? styles.paymentCardActive : ''}`}
                        htmlFor={`pay-${method.id}`}
                      >
                        <input
                          id={`pay-${method.id}`}
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className={styles.radioHidden}
                        />
                        <span className={styles.paymentIcon}>{method.icon}</span>
                        <div className={styles.paymentInfo}>
                          <span className={styles.paymentLabel}>{method.label}</span>
                          <span className={styles.paymentSubtitle}>{method.subtitle}</span>
                        </div>
                        <span
                          className={styles.paymentBadge}
                          style={{ background: method.badge }}
                        >
                          {method.id === 'mercadopago' ? 'MP' : method.id === 'addi' ? 'ADDI' : method.id === 'sistecredito' ? 'SC' : method.id === 'transferencia' ? '🏦' : 'CE'}
                        </span>
                        <div className={`${styles.radioCheck} ${paymentMethod === method.id ? styles.radioCheckActive : ''}`} />
                      </label>

                      {/* bank details panel */}
                      {paymentMethod === 'transferencia' && method.id === 'transferencia' && (
                        <motion.div
                          className={styles.bankDetails}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <p><strong>Datos bancarios para transferencia:</strong></p>
                          <div className={styles.bankGrid}>
                            <span>Banco:</span><span>{BANK_DETAILS.bank}</span>
                            <span>Cuenta:</span><span>{BANK_DETAILS.account} ({BANK_DETAILS.type})</span>
                            <span>Titular:</span><span>{BANK_DETAILS.name}</span>
                            <span>NIT:</span><span>{BANK_DETAILS.nit}</span>
                          </div>
                          <p className={styles.bankNote}>
                            Una vez realizada la transferencia, envía el comprobante a{' '}
                            <strong>pagos@urbanstore.co</strong>
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.stepNav}>
                  <button className={styles.backBtn} onClick={handleBack}>← Atrás</button>
                  <button
                    className={styles.placeOrderBtn}
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod}
                  >
                    Confirmar pedido 🎉
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Resumen del pedido</h3>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className={styles.summaryItem}>
                  <div className={styles.summaryItemImg}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className={styles.summaryImgPlaceholder}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                    )}
                    <span className={styles.summaryQtyBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <span>{item.name}</span>
                    {item.selectedSize && <span className={styles.summarySize}>Talla {item.selectedSize}</span>}
                  </div>
                  <span className={styles.summaryItemPrice}>{formatCOP(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCOP(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>IVA (19%)</span>
              <span>{formatCOP(ivaAmount)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span className={shippingCost === 0 ? styles.free : ''}>
                {shippingCost === 0 ? 'Gratis' : formatCOP(shippingCost)}
              </span>
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>

            <div className={styles.secureNote}>
              <span>🔒</span>
              <span>Pago 100% seguro y protegido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
