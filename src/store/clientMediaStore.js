import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_POSTS = [
  {
    id: 1,
    username: '@carlos_ruiz',
    mediaType: 'image',
    mediaUrl: '/assets/images/product-sneaker.png',
    caption: 'Estrenando mis Neon Run ⚡ ¡Están brutales!',
    source: 'Instagram',
    sourceColor: '#E1306C',
    timestamp: 'Hace 12 min',
    verifiedPurchase: true,
  },
  {
    id: 2,
    username: '@david_c',
    mediaType: 'video',
    mediaUrl: '/assets/videos/urban-dance.mp4',
    caption: 'Actitud urbana a otro nivel con mis nuevas zapas 👟🔥',
    source: 'Instagram Story',
    sourceColor: '#E1306C',
    timestamp: 'En vivo 🔴',
    verifiedPurchase: true,
  },
  {
    id: 3,
    username: '@laura_m',
    mediaType: 'image',
    mediaUrl: '/assets/images/product-cap.png',
    caption: 'Estilo completo y premium. Llegó super rápido ✦',
    source: 'Directo Web',
    sourceColor: '#8FC740',
    timestamp: 'Hace 1 hora',
    verifiedPurchase: true,
  },
  {
    id: 4,
    username: '@mafe_rodriguez',
    mediaType: 'image',
    mediaUrl: '/assets/images/product-set.png',
    caption: 'El mejor streetwear de Saravena. Outfit completado.',
    source: 'Facebook',
    sourceColor: '#1877F2',
    timestamp: 'Hace 3 horas',
    verifiedPurchase: false,
  }
];

const useClientMediaStore = create(
  persist(
    (set) => ({
      posts: DEFAULT_POSTS,
      
      addPost: (post) => set((state) => ({
        posts: [
          {
            id: Date.now(),
            verifiedPurchase: true,
            timestamp: 'Hace un momento',
            ...post
          },
          ...state.posts
        ]
      })),

      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((p) => p.id !== id)
      })),
      
      resetPosts: () => set({ posts: DEFAULT_POSTS })
    }),
    {
      name: 'urban8-client-media',
    }
  )
)

export default useClientMediaStore
