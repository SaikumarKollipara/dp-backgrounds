import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { removeBackground } from "@imgly/background-removal";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleRemoveBackground(imageUrl: string) {
  const imageBlob = await removeBackground(imageUrl, {
    debug: true,
    progress: (key, current, total) => {
      console.log(`Downloading ${key}: ${current} of ${total}`);
    },
  });
  const url = URL.createObjectURL(imageBlob);
  return url;
}
