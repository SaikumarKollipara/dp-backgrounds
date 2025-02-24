"use client";

import { useHomeStore } from "@/store/home-store";
import React from "react";

export default function LoadingScreen() {
  const isLoading = useHomeStore((state) => state.isLoading);

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
      <p>Loading...</p>
    </div>
  );
}
