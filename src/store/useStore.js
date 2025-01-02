import { create } from "zustand";

const useProductStore = create((set, get) => ({
  // -------------------------------------
  // Products State
  // -------------------------------------
  products: [],
  setProducts: (products) => set({ products }),

  // -------------------------------------
  // Search State
  // -------------------------------------
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  // -------------------------------------
  // Cart State
  // -------------------------------------
  cart: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity }] };
    }),

  updateCartItemQuantity: (productId, newQuantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ),
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  // Derived cart state (getTotalQuantity, getTotalPrice)
  getTotalQuantity: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

  // -------------------------------------
  // Orders State
  // -------------------------------------
  orders: [],
  // Accepts a callback so you can do: setOrders(prev => [...prev, newOrder])
  setOrders: (callback) =>
    set((state) => ({
      orders: callback(state.orders),
    })),

  // -------------------------------------
  // User State
  // -------------------------------------
  user: {
    name: "",
    email: "",
  },
  // Use partial updating so you don’t overwrite existing fields
  setUser: (updatedUser) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedUser,
      },
    })),

  // -------------------------------------
  // Address State
  // -------------------------------------
  defaultAddress: null,
  setDefaultAddress: (address) => set({ defaultAddress: address }),
}));

export default useProductStore;
