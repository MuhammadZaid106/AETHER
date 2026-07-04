import { create } from "zustand";
import { persist } from "zustand/middleware";
import seedProducts from "@/data/products.json";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  variants?: Array<{
    id: string;
    color?: string;
    size?: string;
    stock: number;
  }>;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
}

interface AdminProductStore {
  products: Product[];
  isInitialized: boolean;
  initialize: () => void;
  addProduct: (product: Omit<Product, "id" | "slug" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useAdminProductStore = create<AdminProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      isInitialized: false,
      initialize: () => {
        if (!get().isInitialized || get().products.length === 0) {
          set({
            products: seedProducts as Product[],
            isInitialized: true,
          });
        }
      },
      addProduct: (newProd) => {
        const id = `p_custom_${Date.now()}`;
        const slug = newProd.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        const product: Product = {
          ...newProd,
          id,
          slug,
          rating: 5.0,
          reviewCount: 0,
          variants: newProd.variants || [],
        };

        set({ products: [product, ...get().products] });
      },
      updateProduct: (id, updatedFields) => {
        set({
          products: get().products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...updatedFields,
                  slug: updatedFields.name
                    ? updatedFields.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")
                    : p.slug,
                }
              : p
          ),
        });
      },
      deleteProduct: (id) => {
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },
    }),
    {
      name: "aether-products-storage",
      onRehydrateStorage: () => (state) => {
        // Automatically seed if empty upon hydration
        if (state && (!state.products || state.products.length === 0)) {
          state.initialize();
        }
      },
    }
  )
);
