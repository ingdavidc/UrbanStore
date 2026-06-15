import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const STORE_INFO = {
  address: 'Cl. 26 # 15-75, Saravena, Arauca',
  phone: '3173319592',
  mobile: '3173319592',
  email: 'contacto@urbanstore.com',
  hours: [
    { day: 'Lunes – Sábado', time: '8:00 am – 6:00 pm' },
    { day: 'Domingo', time: '9:00 am – 5:00 pm' },
  ],
};

const SOCIAL = [
  { label: 'Instagram', icon: '📸', handle: '@urbanstore.co', url: 'https://instagram.com' },
  { label: 'Facebook', icon: '📘', handle: 'Urban Store Colombia', url: 'https://facebook.com' },
  { label: 'TikTok', icon: '🎵', handle: '@urbanstore', url: 'https://tiktok.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending (mock)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const isValid = Object.values(form).every((v) => v.trim().length > 0);

  return (
    <div className={styles.page}>
      {/* hero */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.heroTag}>¿Necesitas ayuda?</span>
        <h1 className={styles.heroTitle}>Contáctanos</h1>
        <p className={styles.heroSub}>
          Estamos aquí para ayudarte. Escríbenos y te responderemos en menos de 24 horas.
        </p>
      </motion.div>

      <div className={styles.layout}>
        {/* ── INFO COLUMN ── */}
        <motion.div
          className={styles.infoCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* store info */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Información de la tienda</h2>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <div>
                  <span className={styles.infoLabel}>Dirección</span>
                  <span className={styles.infoValue}>{STORE_INFO.address}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📞</span>
                <div>
                  <span className={styles.infoLabel}>Teléfono</span>
                  <span className={styles.infoValue}>{STORE_INFO.phone}</span>
                  <span className={styles.infoValue}>{STORE_INFO.mobile}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>✉️</span>
                <div>
                  <span className={styles.infoLabel}>Correo electrónico</span>
                  <a href={`mailto:${STORE_INFO.email}`} className={styles.emailLink}>
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🕐</span>
                <div>
                  <span className={styles.infoLabel}>Horario de atención</span>
                  {STORE_INFO.hours.map((h) => (
                    <div key={h.day} className={styles.hourRow}>
                      <span>{h.day}</span>
                      <span className={styles.hourTime}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/573173319592"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <span className={styles.waIcon}>💬</span>
            <div>
              <span className={styles.waBtnTitle}>Chatear por WhatsApp</span>
              <span className={styles.waBtnSub}>Respuesta inmediata</span>
            </div>
            <span className={styles.waArrow}>→</span>
          </a>

          {/* social links */}
          <div className={styles.socialCard}>
            <h3 className={styles.socialTitle}>Síguenos en redes</h3>
            <div className={styles.socialLinks}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <div>
                    <span className={styles.socialLabel}>{s.label}</span>
                    <span className={styles.socialHandle}>{s.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* map */}
          <div className={styles.mapCard}>
            <h3 className={styles.mapTitle}>Ubicación</h3>
            <div className={styles.mapEmbed}>
              <iframe
                title="Urban Store Location"
                src="https://maps.google.com/maps?q=Cl.%2026%20%23%2015-75%2C%20Saravena%2C%20Arauca&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>

        {/* ── FORM COLUMN ── */}
        <motion.div
          className={styles.formCol}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.formCard}>
            {sent ? (
              <motion.div
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.successIcon}>✅</span>
                <h2>¡Mensaje enviado!</h2>
                <p>Te responderemos en menos de 24 horas a <strong>{form.email}</strong>.</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className={styles.formTitle}>Envíanos un mensaje</h2>
                <p className={styles.formSub}>
                  Completa el formulario y nuestro equipo te contactará pronto.
                </p>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="contact-name">Nombre completo *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className={styles.input}
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel} htmlFor="contact-email">Correo electrónico *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className={styles.input}
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-subject">Asunto *</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className={styles.input}
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="pedido">Estado de mi pedido</option>
                      <option value="cambio">Cambios y devoluciones</option>
                      <option value="producto">Consulta de producto</option>
                      <option value="pago">Problema con el pago</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-message">Mensaje *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Cuéntanos en qué te podemos ayudar..."
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!isValid || loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? (
                      <span className={styles.spinner}>⏳ Enviando...</span>
                    ) : (
                      'Enviar mensaje →'
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
