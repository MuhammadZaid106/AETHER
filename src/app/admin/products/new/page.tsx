"use client";

import { useRouter } from "next/navigation";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { ProductForm } from "@/components/admin/ProductForm";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useAdminProductStore((state) => state.addProduct);

  const handleSubmit = (data: any) => {
    addProduct({
      ...data,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      stock: Number(data.stock),
      tags: data.tags || [],
      reviewCount: 0,
      specs: {
        Brand: "CustomBrand",
        Subcategory: "CustomAudio",
        Warranty: "1 Year",
        Material: "Premium Eco",
      },
    });
    toast.success("Successfully added product to local catalog");
    router.push("/admin/products");
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
          Creator Panel
        </span>
        <h1 className="text-grotesk text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
          NEW PRODUCT FORM
        </h1>
      </div>

      <ProductForm onSubmit={handleSubmit} onCancel={() => router.push("/admin/products")} />
    </div>
  );
}
