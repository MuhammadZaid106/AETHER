"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/validations/product.schema";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      category: initialData?.category || "Electronics",
      price: initialData?.price || 0,
      compareAtPrice: initialData?.compareAtPrice || undefined,
      sku: initialData?.sku || "SKU-1234",
      stock: initialData?.stock || 0,
      variants: initialData?.variants || [],
    },
  });

  // Dynamic variants array Builder
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      setValue("images", filesArray as any);

      // Create quick local preview URLs
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      setValue("images", filesArray as any);

      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  };

  const formSubmit = (data: ProductFormData) => {
    // Use uploaded file previews, fall back to existing images from initialData, then a placeholder
    const resolvedImages =
      imageUrls.length > 0
        ? imageUrls
        : initialData?.images?.length > 0
        ? initialData.images
        : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"];

    const cleanProd = {
      ...data,
      images: resolvedImages,
      tags: initialData?.tags || [],
      reviewCount: initialData?.reviewCount ?? 0,
    };
    onSubmit(cleanProd);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-6 max-w-3xl">
      {/* Detail fields */}
      <div className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)] border-b pb-2 mb-2">
          General Details
        </h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Product Name</label>
          <input
            type="text"
            {...register("name")}
            className="h-11 border border-[var(--border-hairline)] px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0"
          />
          {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Description</label>
          <textarea
            rows={4}
            {...register("description")}
            className="border border-[var(--border-hairline)] p-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 resize-y"
          />
          {errors.description && <span className="text-[10px] text-red-500 font-bold">{errors.description.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Category</label>
            <select
              {...register("category")}
              className="h-11 border border-[var(--border-hairline)] px-3.5 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] cursor-pointer"
            >
              {["Electronics", "Fashion", "Beauty", "Home & Living", "Sports", "Groceries", "Kids", "Auto"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="text-[10px] text-red-500 font-bold">{errors.category.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">SKU Code</label>
            <input
              type="text"
              {...register("sku")}
              className="h-11 border border-[var(--border-hairline)] px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0"
            />
            {errors.sku && <span className="text-[10px] text-red-500 font-bold">{errors.sku.message}</span>}
          </div>
        </div>
      </div>

      {/* Pricing fields */}
      <div className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)] border-b pb-2 mb-2">
          Pricing Setup
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Sale Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="h-11 border border-[var(--border-hairline)] px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0"
            />
            {errors.price && <span className="text-[10px] text-red-500 font-bold">{errors.price.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Compare At Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("compareAtPrice")}
              className="h-11 border border-[var(--border-hairline)] px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0"
            />
            {errors.compareAtPrice && <span className="text-[10px] text-red-500 font-bold">{errors.compareAtPrice.message}</span>}
          </div>
        </div>
      </div>

      {/* Upload files block */}
      <div className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)] border-b pb-2 mb-2">
          Upload Images
        </h3>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[var(--radius-md)] p-8 text-center transition-colors ${
            dragActive ? "border-[var(--accent-lime)] bg-[var(--bg-canvas-alt)]" : "border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
          }`}
        >
          <Upload className="w-8 h-8 text-[var(--ink-600)] mx-auto mb-3" />
          <span className="text-xs font-bold text-[var(--ink-900)] block">
            Drag files here or click to upload
          </span>
          <span className="text-[10px] text-[var(--ink-600)] mt-1.5 block">
            PNG, JPG, or WEBP under 5MB (Max 6)
          </span>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="hidden"
            id="product-file-upload"
          />
          <label
            htmlFor="product-file-upload"
            className="inline-block mt-4 text-[10px] font-black uppercase bg-[var(--ink-900)] text-white px-4 py-2.5 rounded-[var(--radius-md)] cursor-pointer hover:bg-[var(--ink-600)] transition-colors"
          >
            Select Files
          </label>
        </div>

        {/* Thumbnail previews */}
        {imageUrls.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="w-16 h-16 relative border border-[var(--border-hairline)] rounded-[var(--radius-md)] overflow-hidden">
                <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Variants array builder */}
      <div className="bg-white border border-[var(--border-hairline)] p-6 rounded-[var(--radius-md)] flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-[var(--ink-600)]">
            Product Variants
          </h3>
          <button
            type="button"
            onClick={() => append({ color: "Grey", size: "M", stock: 10 })}
            className="text-[10px] font-black uppercase text-[var(--accent-lime)] bg-[var(--ink-900)] px-3 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--ink-600)] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Variant
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end border border-[var(--border-hairline)] p-3 rounded-[var(--radius-md)] bg-[var(--bg-canvas)]">
              <div className="flex flex-col gap-1 flex-grow">
                <label className="text-[9px] font-bold uppercase text-[var(--ink-600)]">Color</label>
                <input
                  type="text"
                  {...register(`variants.${index}.color` as const)}
                  className="h-9 border border-[var(--border-hairline)] px-2 w-full rounded-[var(--radius-md)] text-xs bg-white"
                />
              </div>

              <div className="flex flex-col gap-1 flex-grow">
                <label className="text-[9px] font-bold uppercase text-[var(--ink-600)]">Size</label>
                <input
                  type="text"
                  {...register(`variants.${index}.size` as const)}
                  className="h-9 border border-[var(--border-hairline)] px-2 w-full rounded-[var(--radius-md)] text-xs bg-white"
                />
              </div>

              <div className="flex flex-col gap-1 flex-grow">
                <label className="text-[9px] font-bold uppercase text-[var(--ink-600)]">Stock</label>
                <input
                  type="number"
                  {...register(`variants.${index}.stock` as const)}
                  className="h-9 border border-[var(--border-hairline)] px-2 w-full rounded-[var(--radius-md)] text-xs bg-white"
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:bg-white border rounded-[var(--radius-md)] border-[var(--border-hairline)] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end mt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="uppercase font-bold tracking-widest text-[10px]">
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="uppercase font-bold tracking-widest text-[10px]">
          Save Product
        </Button>
      </div>
    </form>
  );
}
