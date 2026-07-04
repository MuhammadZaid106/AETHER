import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  variantId?: string;
  color?: string;
  size?: string;
  qty: number;
  price: number; // Snapshot of price at add-to-cart
  name: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, qty: number, variantId?: string) => void;
  clear: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.variantId === newItem.variantId
        );

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].qty += newItem.qty ?? 1;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { ...newItem, qty: newItem.qty ?? 1 }],
          });
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.productId === productId && item.variantId === variantId)
          ),
        });
      },
      updateQty: (productId, qty, variantId) => {
        if (qty <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, qty }
              : item
          ),
        });
      },
      clear: () => set({ items: [] }),
      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },
    }),
    {
      name: "aether-cart-storage",
    }
  )
);
