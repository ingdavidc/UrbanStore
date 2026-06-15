import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      // Initialize auth listener
      initAuth: () => {
        onAuthStateChanged(auth, (user) => {
          set({ user: user ? { uid: user.uid, email: user.email } : null })
        })
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const result = await signInWithEmailAndPassword(auth, email, password)
          set({ user: { uid: result.user.uid, email: result.user.email }, isLoading: false })
          return true
        } catch (err) {
          set({ error: err.message, isLoading: false })
          return false
        }
      },

      logout: async () => {
        await signOut(auth)
        set({ user: null })
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
