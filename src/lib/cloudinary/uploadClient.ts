export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export async function uploadToCloudinaryUnsigned(file: File): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !preset) {
    throw new Error("Missing Cloudinary env vars — check .env.local");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error?.message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id, width: data.width, height: data.height };
}

export async function uploadManyToCloudinaryUnsigned(files: File[]): Promise<CloudinaryUploadResult[]> {
  return Promise.all(files.map((f) => uploadToCloudinaryUnsigned(f)));
}