import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Cart Store — Zustand
 * Persists cart to localStorage automatically.
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      // ── Actions ──────────────────────────────────────────
      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const { items } = get()
        const existingIndex = items.findIndex(
          (i) => i.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
        )

        if (existingIndex >= 0) {
          // Update quantity of existing item
          const updatedItems = [...items]
          updatedItems[existingIndex].quantity += quantity
          set({ items: updatedItems, isDrawerOpen: true })
        } else {
          set({
            items: [...items, { ...product, selectedSize, selectedColor, quantity }],
            isDrawerOpen: true,
          })
        }
      },

      removeItem: (id, selectedSize, selectedColor) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.selectedSize === selectedSize && i.selectedColor === selectedColor)
          ),
        })
      },

      updateQuantity: (id, selectedSize, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, selectedSize, selectedColor)
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
              ? { ...i, quantity }
              : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      openDrawer:  () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),

      // ── Computed values ───────────────────────────────────
      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },
    }),
    {
      name: 'urban8-cart', // localStorage key
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
)

export default useCartStore
