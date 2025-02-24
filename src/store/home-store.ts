import { create } from "zustand";

interface HomeStore {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  bgImageUrl: string | null;
  setBgImageUrl: (url: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  imageUrl: null,
  setImageUrl: (url) => set({ imageUrl: url }),
  bgImageUrl: null,
  setBgImageUrl: (url) => set({ bgImageUrl: url }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
