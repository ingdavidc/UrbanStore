/**
 * Auth Store — MAQUETA (sin Firebase)
 * Login simple con credenciales hardcodeadas para demostración.
 * Usuario demo: admin@urban8store.com / admin123
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEMO_USER = {
  uid:   'demo-admin-001',
  email: 'admin@urban8store.com',
  name:  'Administrador',
  role:  'admin',
}

const useAuthStore = create(
  persist(
    (set) => ({
      user:      null,
      isLoading: false,
      error:     null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        // Simular delay de red
        await new Promise((r) => setTimeout(r, 800))

        // Credenciales válidas para la maqueta
        if (
          (email === 'admin@urban8store.com' && password === 'admin123') ||
          (email === 'admin@urbanstore.com' && password === 'urban2026') ||
          (email === '' && password === '')  // acceso rápido en maqueta
        ) {
          set({ user: DEMO_USER, isLoading: false })
          return true
        } else {
          set({ error: 'Credenciales incorrectas. Usa admin@urbanstore.com / urban2026', isLoading: false })
          return false
        }
      },

      // Acceso directo para demo (sin credenciales)
      loginDemo: () => {
        set({ user: DEMO_USER, error: null })
      },

      logout: () => {
        set({ user: null, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'urban8-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

export default useAuthStore
