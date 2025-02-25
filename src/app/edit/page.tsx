"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useHomeStore } from "@/store/home-store";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Controls from "./_components/controls";
import { Transform } from "@/lib/types";

export default function EditPage() {
  const router = useRouter();
  const overlayImageUrl = useHomeStore((state) => state.imageUrl);
  const bgImageUrl = useHomeStore((state) => state.bgImageUrl);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [bgTransform, setBgTransform] = useState<Transform>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  });

  const [imageTransform, setImageTransform] = useState<Transform>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  });

  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (bgImageUrl) {
      const img = new Image();
      img.src = bgImageUrl;
      img.onload = () => (bgImageRef.current = img);
    }
    if (overlayImageUrl) {
      const img = new Image();
      img.src = overlayImageUrl;
      img.onload = () => (overlayImageRef.current = img);
    }
  }, [bgImageUrl, overlayImageUrl]);

  function downloadImage() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Download the image
    const link = document.createElement("a");
    link.download = "combined-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function drawImages() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1000;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    const drawImage = (img: HTMLImageElement | null, transform: Transform) => {
      if (!img) return;

      const scale =
        transform.scale * Math.max(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2 + transform.x;
      const y = (size - img.height * scale) / 2 + transform.y;

      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((transform.rotation * Math.PI) / 180);
      ctx.translate(-size / 2, -size / 2);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      ctx.restore();
    };

    drawImage(bgImageRef.current, bgTransform);
    drawImage(overlayImageRef.current, imageTransform);
    requestAnimationFrame(drawImages);
  }

  function handleTransformChange(
    imageType: "background" | "overlay",
    field: keyof Transform,
    value: number,
  ) {
    const updateTransform =
      imageType === "background" ? setBgTransform : setImageTransform;
    updateTransform((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    requestAnimationFrame(drawImages);
  }, [bgImageUrl, overlayImageUrl]);

  useEffect(() => {
    if (!overlayImageUrl || !bgImageUrl) {
      router.push("/");
    }
  }, [overlayImageUrl, bgImageUrl]);

  if (!overlayImageUrl || !bgImageUrl) return null;

  useEffect(() => {
    drawImages();
  }, [bgTransform, imageTransform]);

  return (
    <main className="flex h-[100dvh] flex-col md:block">
      <Header
        className="static"
        backHref="/"
        title="Edit Image"
        SecondaryButton={
          <Button variant={"secondary"} size={"icon"} onClick={downloadImage}>
            <Download />
          </Button>
        }
      />

      <div className="hide-scrollbar flex flex-1 flex-col gap-8 overflow-scroll p-5 md:mx-auto md:h-[calc(100%-100px)] md:max-w-6xl md:flex-row md:items-center md:gap-20 md:px-12">
        <canvas
          ref={canvasRef}
          className="md: mx-auto h-[300px] w-[300px] rounded-lg border border-app-black ring-[10px] ring-gray-300 md:h-[500px] md:w-[500px]"
        ></canvas>
        <Controls
          bgTransform={bgTransform}
          imageTransform={imageTransform}
          handleTransformChange={handleTransformChange}
        />
      </div>
    </main>
  );
}
