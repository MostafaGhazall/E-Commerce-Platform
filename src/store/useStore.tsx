import { create } from "zustand";

// Define types for the product, user, and address
interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number; // Optional since it's added in the cart
}

interface User {
  name: string;
  email: string;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

interface ProductStore {
  // Products State
  products: Product[];
  setProducts: (products: Product[]) => void;

  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart State
  cart: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartItemQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;

  // Derived cart state
  getTotalQuantity: () => number;
  getTotalPrice: () => number;

  // Orders State
  orders: any[]; // Update this type as necessary (e.g., `Order` type if available)
  setOrders: (callback: (prevOrders: any[]) => any[]) => void;

  // User State
  user: User;
  setUser: (updatedUser: Partial<User>) => void;

  // Address State
  defaultAddress: Address | null;
  setDefaultAddress: (address: Address) => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
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
              ? { ...item, quantity: item.quantity! + quantity } // TypeScript requires you to assert non-null for quantity
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

  // Derived cart state
  getTotalQuantity: () =>
    get().cart.reduce((total, item) => total + (item.quantity || 0), 0), // Make sure quantity is safely accessed

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * (item.quantity || 0), 0), // Make sure quantity is safely accessed

  // -------------------------------------
  // Orders State
  // -------------------------------------
  orders: [],
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
