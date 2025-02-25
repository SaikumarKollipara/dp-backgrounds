"use client";

import { useHomeStore } from "@/store/home-store";
import React, { useEffect, useState } from "react";

const LOADING_TEXTS = [
  "Loading...",
  "Please wait...",
  "This might take a moment...",
  "Hold on tight...",
  "Almost there...",
];

export default function LoadingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoading = useHomeStore((state) => state.isLoading);

  // useEffect(() => {
  //   if (!isLoading) return;

  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed left-0 top-0 z-[999] grid h-[100vh] w-[100vw] place-content-center bg-black/80">
      <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-6 rounded-sm bg-white">
        <img
          className="h-8 w-8"
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/Lightness_rotate_36f-L_cw.gif"
        />
        {/* <p>{LOADING_TEXTS[currentIndex]}</p> */}
        <p>Loading...</p>
      </div>
    </div>
  );
}
