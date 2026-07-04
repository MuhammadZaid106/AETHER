"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";
import { ProductForm } from "@/components/admin/ProductForm";
import { toast } from "sonner";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const products = useAdminProductStore((state) => state.products);
  const updateProduct = useAdminProductStore((state) => state.updateProduct);

  const product = products.find((p) => p.id === id);

  const handleSubmit = (data: any) => {
    updateProduct(id, {
      ...data,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      stock: Number(data.stock),
    });
    toast.success("Successfully updated product configuration");
    router.push("/admin/products");
  };

  if (!product) {
    return (
      <div className="py-20 text-center text-sm text-[var(--ink-600)]">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
          Modifier Panel
        </span>
        <h1 className="text-grotesk text-4xl font-black uppercase tracking-tight text-[var(--ink-900)] mt-1">
          EDIT PRODUCT FORM
        </h1>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
