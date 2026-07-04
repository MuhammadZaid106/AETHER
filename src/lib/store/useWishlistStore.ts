import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggleWishlist: (productId) => {
        const productIds = get().productIds;
        const exists = productIds.includes(productId);
        if (exists) {
          set({ productIds: productIds.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...productIds, productId] });
        }
      },
      hasItem: (productId) => {
        return get().productIds.includes(productId);
      },
    }),
    {
      name: "aether-wishlist-storage",
    }
  )
);
