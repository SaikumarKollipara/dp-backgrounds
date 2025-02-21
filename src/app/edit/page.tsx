"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/store/home-store";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function EditPage() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const imageUrl = useHomeStore((state) => state.imageUrl);
  const bgImageUrl = useHomeStore((state) => state.bgImageUrl);

  function downloadImage() {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    html2canvas(canvas).then((canvas) => {
      const link = document.createElement("a");
      link.download = "display-picture.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  useEffect(() => {
    if (!imageUrl || !bgImageUrl) {
      router.push("/");
    }
  }, [imageUrl, bgImageUrl]);

  if (!imageUrl || !bgImageUrl) return null;

  return (
    <main>
      <Header
        backHref="/"
        title="Edit Image"
        SecondaryButton={
          <Button
            className="bg-white text-app-black"
            size={"icon"}
            onClick={downloadImage}
          >
            <Download />
          </Button>
        }
      />
      <div className="px-5 py-12">
        <div className="mx-auto flex h-[300px] w-[300px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-app-black ring-[10px] ring-gray-300">
          <div className="relative h-full w-full" ref={canvasRef}>
            <img
              className="absolute left-0 top-0 h-full w-full object-cover"
              src={bgImageUrl}
              alt="Background image"
            />
            <img
              className="absolute left-0 top-0 z-10 h-full w-full object-cover"
              src={imageUrl}
              alt="Uploaded image"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
