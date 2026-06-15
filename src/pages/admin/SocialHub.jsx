import { useState } from 'react';
import useClientMediaStore from '../../store/clientMediaStore';
import styles from './SocialHub.module.css';

/* ── Mock data ── */
const SCHEDULED_POSTS = [
  {
    id: 1,
    caption: '🔥 Nueva colección de hoodies disponible ahora mismo. No te la pierdas! #UrbanStore #Streetwear',
    platforms: ['Instagram', 'Facebook'],
    scheduled: '16 Jun 2026 – 10:00 AM',
    image: 'https://placehold.co/80x80/2E2E2E/8FC740?text=POST',
  },
  {
    id: 2,
    caption: '¡Últimas unidades de la gorra Snapback! Corre a conseguir la tuya 🧢 #Urban8',
    platforms: ['Instagram'],
    scheduled: '17 Jun 2026 – 6:00 PM',
    image: 'https://placehold.co/80x80/2E2E2E/8FC740?text=CAP',
  },
];

const RECENT_POSTS = [
  {
    id: 1,
    caption: 'El estilo urbano que defines tú 💫 Nueva camiseta Urban Classic disponible en nuestra tienda.',
    platform: 'Instagram',
    date: '14 Jun 2026',
    likes: 248,
    comments: 34,
    image: 'https://placehold.co/260x260/1C1C1C/8FC740?text=IG+Post',
  },
  {
    id: 2,
    caption: '¿Ya conoces nuestra línea de pantalones cargo? Comodidad y estilo en uno solo 🔥',
    platform: 'Facebook',
    date: '12 Jun 2026',
    likes: 142,
    comments: 19,
    image: 'https://placehold.co/260x260/1C1C1C/8FC740?text=FB+Post',
  },
  {
    id: 3,
    caption: 'Streetwear hecho en Colombia 🇨🇴 UrbanStore. Tu identidad, tu estilo.',
    platform: 'Instagram',
    date: '10 Jun 2026',
    likes: 391,
    comments: 56,
    image: 'https://placehold.co/260x260/1C1C1C/8FC740?text=Promo',
  },
];

const ACCOUNTS = [
  {
    id: 'ig',
    name: 'Instagram',
    handle: '@urbanstore',
    connected: false,
    color: '#E1306C',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'fb',
    name: 'Facebook',
    handle: 'UrbanStore',
    connected: false,
    color: '#1877F2',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const PLATFORMS = ['Instagram', 'Facebook'];

const IconHeart = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconComment = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconImage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function SocialHub() {
  const addClientPost = useClientMediaStore((state) => state.addPost);
  const clientPosts = useClientMediaStore((state) => state.posts);
  const deleteClientPost = useClientMediaStore((state) => state.deletePost);

  const [caption, setCaption]         = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduled, setScheduled]     = useState(SCHEDULED_POSTS);
  const [toast, setToast]             = useState('');

  const togglePlatform = (p) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handlePublish = () => {
    if (!caption.trim()) return;
    showToast('✅ Publicación enviada (demo – sin API conectada)');
    setCaption('');
    setSelectedPlatforms([]);
  };

  // Client Post state
  const [clientUser, setClientUser] = useState('@');
  const [clientCaption, setClientCaption] = useState('');
  const [clientSource, setClientSource] = useState('Instagram');
  const [clientMedia, setClientMedia] = useState('/assets/images/product-sneaker.png');

  const handleAddClientPost = (e) => {
    e.preventDefault();
    if (!clientUser.trim() || clientUser === '@') {
      showToast('⚠️ Ingresa un usuario de cliente válido (ej: @carlos_m)');
      return;
    }
    if (!clientCaption.trim()) {
      showToast('⚠️ Ingresa el comentario del cliente');
      return;
    }

    const mediaType = clientMedia.endsWith('.mp4') ? 'video' : 'image';
    const sourceColors = {
      'Instagram': '#E1306C',
      'Instagram Story': '#E1306C',
      'Facebook': '#1877F2',
      'TikTok / Reel': '#00F2FE',
      'Directo Web': '#8FC740'
    };

    addClientPost({
      username: clientUser,
      mediaType,
      mediaUrl: clientMedia,
      caption: clientCaption,
      source: clientSource,
      sourceColor: sourceColors[clientSource] || '#ffffff'
    });

    showToast('📸 ¡Foto de cliente agregada al feed en tiempo real!');
    setClientUser('@');
    setClientCaption('');
  };

  const handleSchedule = () => {
    if (!caption.trim() || !scheduleDate || !scheduleTime) {
      showToast('⚠️ Completa el caption, fecha y hora');
      return;
    }
    const newPost = {
      id: Date.now(),
      caption,
      platforms: selectedPlatforms.length ? selectedPlatforms : ['Instagram'],
      scheduled: `${scheduleDate} – ${scheduleTime}`,
      image: 'https://placehold.co/80x80/2E2E2E/8FC740?text=NEW',
    };
    setScheduled((prev) => [newPost, ...prev]);
    showToast('🗓️ Post programado exitosamente (demo)');
    setCaption('');
    setSelectedPlatforms([]);
    setScheduleDate('');
    setScheduleTime('');
  };

  const removeScheduled = (id) => setScheduled((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className={styles.page}>
      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Centro de Redes Sociales</h1>
          <p className={styles.pageSubtitle}>Gestiona y programa publicaciones para Instagram y Facebook</p>
        </div>
      </div>

      {/* Connection Status */}
      <div className={styles.accountsRow}>
        {ACCOUNTS.map(({ id, name, handle, connected, color, Icon }) => (
          <div key={id} className={styles.accountCard}>
            <div className={styles.accountIcon} style={{ '--acc-color': color }}>
              <Icon />
            </div>
            <div className={styles.accountInfo}>
              <p className={styles.accountName}>{name}</p>
              <p className={styles.accountHandle}>{handle}</p>
            </div>
            <div className={styles.accountStatus}>
              {connected ? (
                <span className="badge badge-success">Conectado</span>
              ) : (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => showToast(`Conectar ${name} – integración API pendiente`)}
                >
                  Conectar cuenta
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* ── Left: Composer + Scheduled ── */}
        <div className={styles.leftCol}>
          {/* Composer */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Nueva Publicación</h2>

            <textarea
              id="post-caption"
              className={`${styles.captionArea}`}
              placeholder="Escribe tu caption aquí… ✨ #UrbanStore #Streetwear"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
            />

            <div className={styles.captionFooter}>
              <span className={styles.charCount}>{caption.length} / 2200</span>
              <button className="btn btn-ghost btn-sm" onClick={() => showToast('Sube una imagen (demo)')}>
                <IconImage /> Imagen
              </button>
            </div>

            {/* Platform selection */}
            <div className={styles.platformRow}>
              {PLATFORMS.map((p) => (
                <label key={p} className={styles.platformLabel}>
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(p)}
                    onChange={() => togglePlatform(p)}
                  />
                  <span className={`${styles.platformChip} ${selectedPlatforms.includes(p) ? styles.platformActive : ''}`}>
                    {p}
                  </span>
                </label>
              ))}
            </div>

            {/* Schedule pickers */}
            <div className={styles.scheduleRow}>
              <input
                type="date"
                className="input"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
              <input
                type="time"
                className="input"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>

            <div className={styles.composerActions}>
              <button id="publish-now-btn" className="btn btn-primary" onClick={handlePublish}>
                Publicar Ahora
              </button>
              <button id="schedule-btn" className="btn btn-outline" onClick={handleSchedule}>
                <IconClock /> Programar
              </button>
            </div>
          </div>

          {/* Scheduled Posts */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Posts Programados</h2>
            {scheduled.length === 0 ? (
              <p className={styles.emptyText}>No hay posts programados.</p>
            ) : (
              <div className={styles.scheduledList}>
                {scheduled.map((post) => (
                  <div key={post.id} className={styles.scheduledItem}>
                    <img src={post.image} alt="" className={styles.scheduledImg} />
                    <div className={styles.scheduledInfo}>
                      <p className={styles.scheduledCaption}>{post.caption}</p>
                      <div className={styles.scheduledMeta}>
                        <span className={styles.scheduledPlatforms}>
                          {post.platforms.join(' · ')}
                        </span>
                        <span className={styles.scheduledTime}>
                          <IconClock /> {post.scheduled}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => removeScheduled(post.id)}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Clients Feed Moderation + Recent Posts ── */}
        <div className={styles.rightCol}>
          {/* Clients moderation card */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Feed de Clientes en Tiempo Real</h2>
            <p className={styles.cardInfoText}>
              Sube fotos y videos de tus ventas. Se mostrarán en la sección "Nuestros Clientes" de la página principal.
            </p>
            
            <form onSubmit={handleAddClientPost} className={styles.clientForm}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Usuario del Cliente</label>
                <input
                  type="text"
                  className="input"
                  placeholder="@usuario_instagram"
                  value={clientUser}
                  onChange={(e) => setClientUser(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Comentario / Caption</label>
                <input
                  type="text"
                  className="input"
                  placeholder="¡Estrenando mis zapatillas!"
                  value={clientCaption}
                  onChange={(e) => setClientCaption(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>Red Social / Origen</label>
                  <select
                    className="input"
                    value={clientSource}
                    onChange={(e) => setClientSource(e.target.value)}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Instagram Story">Instagram Story</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok / Reel">TikTok / Reel</option>
                    <option value="Directo Web">Directo Web</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>Imagen / Video a Mostrar</label>
                  <select
                    className="input"
                    value={clientMedia}
                    onChange={(e) => setClientMedia(e.target.value)}
                  >
                    <option value="/assets/images/product-sneaker.png">Zapatillas Neon Run (Imagen)</option>
                    <option value="/assets/images/product-hoodie.png">Hoodie Streetwear (Imagen)</option>
                    <option value="/assets/images/product-cap.png">Gorra Snapback (Imagen)</option>
                    <option value="/assets/images/product-tshirt.png">Camiseta Oversized (Imagen)</option>
                    <option value="/assets/images/product-jogger.png">Jogger Cargo (Imagen)</option>
                    <option value="/assets/images/product-set.png">Conjunto Deportivo Fem (Imagen)</option>
                    <option value="/assets/videos/urban-dance.mp4">Bailarín Urbano (Video MP4)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 'var(--space-3)' }}>
                📸 Publicar en Sección "Nuestros Clientes"
              </button>
            </form>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Publicaciones Recientes</h2>
            <div className={styles.postsGrid}>
              {RECENT_POSTS.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <img src={post.image} alt="post" className={styles.postImg} />
                  <div className={styles.postBody}>
                    <div className={styles.postMeta}>
                      <span className={`badge badge-muted ${styles.platformTag}`}>{post.platform}</span>
                      <span className={styles.postDate}>{post.date}</span>
                    </div>
                    <p className={styles.postCaption}>{post.caption}</p>
                    <div className={styles.postStats}>
                      <span className={styles.statItem}><IconHeart /> {post.likes}</span>
                      <span className={styles.statItem}><IconComment /> {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
