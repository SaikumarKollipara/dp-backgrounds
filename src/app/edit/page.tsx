"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/store/home-store";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function EditPage() {
  const router = useRouter();
  const fgImageUrl = useHomeStore((state) => state.imageUrl);
  const bgImageUrl = useHomeStore((state) => state.bgImageUrl);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawImages() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 500; // Output image size (1:1)
    canvas.width = size;
    canvas.height = size;

    const drawImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const scale = Math.max(size / img.width, size / img.height);
          const x = (size - img.width * scale) / 2;
          const y = (size - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          resolve();
        };
      });
    };

    ctx.clearRect(0, 0, size, size);
    (async () => {
      if (bgImageUrl) await drawImage(bgImageUrl);
      if (fgImageUrl) await drawImage(fgImageUrl);
    })();
  }

  function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "combined-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  if (!fgImageUrl || !bgImageUrl) return null;

  useEffect(() => {
    if (!fgImageUrl || !bgImageUrl) {
      router.push("/");
    }
  }, [fgImageUrl, bgImageUrl]);

  useEffect(() => {
    drawImages();
  }, []);

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
        <canvas
          ref={canvasRef}
          className="mx-auto h-[300px] w-[300px] rounded-lg border border-app-black ring-[10px] ring-gray-300"
        ></canvas>
      </div>
    </main>
  );
}
