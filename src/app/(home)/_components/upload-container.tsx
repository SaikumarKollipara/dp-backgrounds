"use client";

import { UploadCloud } from "lucide-react";
import { useHomeStore } from "@/store/home-store";

export default function UploadContainer() {
  const imageUrl = useHomeStore((state) => state.imageUrl);
  const setImageUrl = useHomeStore((state) => state.setImageUrl);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const maxSize = 1000;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);

        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedImageUrl = canvas.toDataURL("image/png");
          setImageUrl(resizedImageUrl);
        }
      };
    };

    reader.readAsDataURL(file);
  }

  return (
    <>
      <input
        id="image-upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label
        className="mx-auto my-16 flex h-[280px] w-[280px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-app-black bg-white ring-[10px] ring-gray-300"
        htmlFor="image-upload"
      >
        {imageUrl ? (
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="Uploaded image"
          />
        ) : (
          <>
            <UploadCloud size={30} className="text-gray-500" />
            <p className="text-sm font-medium capitalize text-gray-500">
              Upload image
            </p>
          </>
        )}
      </label>
    </>
  );
}
