import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

/*
 * Demo login – no Firebase, no env vars.
 * Any email + password combo works (just validates non-empty).
 * Auth state is persisted in localStorage as a simple flag.
 */

const DEMO_EMAIL    = 'admin@urbanstore.com';
const DEMO_PASSWORD = 'urban2026';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);

    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 900));

    // Accept DEMO credentials or any non-empty combo for demo purposes
    localStorage.setItem('admin_auth', JSON.stringify({ email, loggedInAt: Date.now() }));
    setLoading(false);
    navigate('/admin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <span className={styles.logoLetters}>US</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoUrban}>URBAN</span>
            <span className={styles.logoStore}>STORE</span>
          </div>
        </div>

        <h1 className={styles.title}>Panel de Administración</h1>
        <p className={styles.subtitle}>Inicia sesión para continuar</p>

        {/* Demo hint */}
        <div className={styles.demoHint}>
          <span>Demo:</span> {DEMO_EMAIL} / {DEMO_PASSWORD}
        </div>

        {error && (
          <div className={styles.errorBox} role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="admin-email" className={styles.label}>Correo electrónico</label>
            <input
              id="admin-email"
              type="email"
              className={`input ${styles.input}`}
              placeholder="admin@urbanstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.label}>Contraseña</label>
            <input
              id="admin-password"
              type="password"
              className={`input ${styles.input}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinnerWrapper}>
                <span className={styles.spinner} aria-hidden="true" />
                Iniciando sesión…
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <p className={styles.footer}>Urban 8 Store &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
