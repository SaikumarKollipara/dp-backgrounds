"use client";

import { useHomeStore } from "@/store/home-store";
import React, { useEffect, useState } from "react";
import styles from "./loading-screen.module.css";

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

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-12 bg-background">
      <div className={styles.loader}></div>
      <p>{LOADING_TEXTS[currentIndex]}</p>
    </div>
  );
}
