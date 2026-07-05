"use client";
import { useState, useCallback } from "react";
import { uploadManyToCloudinaryUnsigned } from "@/lib/cloudinary/uploadClient";
import { X, Loader2, UploadCloud } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

export function CloudinaryUploader({
  value = [],
  onChange,
  max = 6,
}: {
  value: string[];
  onChange: (images: string[]) => void;
  max?: number;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || !files.length) return;

    const remaining = max - value.length;
    if (remaining <= 0) {
      toast.error(`Max ${max} images`);
      return;
    }

    const batch = Array.from(files)
      .filter((f) => ["image/png", "image/jpeg", "image/webp"].includes(f.type))
      .filter((f) => f.size < 5_000_000)
      .slice(0, remaining);

    if (!batch.length) {
      toast.error("No valid images (PNG/JPG/WEBP, under 5MB)");
      return;
    }

    setUploading(true);
    try {
      const results = await uploadManyToCloudinaryUnsigned(batch);
      onChange([...value, ...results.map((r) => r.url)]);
      toast.success(`${results.length} image(s) uploaded`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [value, onChange, max]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed p-10 transition-colors ${
          dragOver ? "border-[var(--accent-lime)] bg-[var(--bg-canvas-alt)]" : "border-[var(--border-hairline)]"
        }`}
      >
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <UploadCloud className="mb-2 opacity-60" />
            <p className="text-sm text-[var(--ink-600)]">Drag images here or</p>
            <label className="cursor-pointer text-sm font-medium underline">
              browse files
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          </>
        )}
      </div>

      <Reorder.Group axis="x" values={value} onReorder={onChange} as="div" className="flex flex-wrap gap-3">
        <AnimatePresence>
          {value.map((url) => (
            <Reorder.Item
              key={url}
              value={url}
              as="div"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative h-20 w-20 cursor-grab overflow-hidden rounded-[var(--radius-md)]"
            >
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== url))}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
              >
                <X size={12} />
              </button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}