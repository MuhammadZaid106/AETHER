import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedStore {
  productIds: string[];
  addProduct: (productId: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      addProduct: (productId) => {
        const productIds = get().productIds.filter((id) => id !== productId);
        // Limit to last 8 products
        set({ productIds: [productId, ...productIds].slice(0, 8) });
      },
    }),
    {
      name: "aether-recently-viewed-storage",
    }
  )
);
