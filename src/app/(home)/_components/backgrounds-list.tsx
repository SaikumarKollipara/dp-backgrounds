"use client";

import { BACKGROUNDS } from "@/lib/constants";
import { useHomeStore } from "@/store/home-store";
import { removeBackground } from "@imgly/background-removal";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function BackgroundsList() {
  const imageUrl = useHomeStore((state) => state.imageUrl);

  if (!imageUrl) return null;

  return (
    <div>
      <h3 className="font-bricolage text-xl font-semibold">
        Choose a background
      </h3>

      <div className="mt-4 flex flex-wrap justify-between gap-2 *:min-w-24 *:flex-1 *:rounded-full *:border *:border-app-black *:p-4 *:text-center *:font-semibold *:text-app-black">
        {Object.keys(BACKGROUNDS).map((name, idx) => (
          <BackgroundTag name={name} key={idx} />
        ))}
      </div>
    </div>
  );
}

function BackgroundTag({ name }: { name: string }) {
  const router = useRouter();
  const imageUrl = useHomeStore((state) => state.imageUrl);
  const setImageUrl = useHomeStore((state) => state.setImageUrl);
  const setBgImageUrl = useHomeStore((state) => state.setBgImageUrl);

  const [activeBgIdx, setActiveBgIdx] = useState<null | number>(null);
  const [isApplying, setIsApplying] = useState(false);

  function handleBgClick(idx: number) {
    if (activeBgIdx === idx) {
      setActiveBgIdx(null);
      return;
    }
    setActiveBgIdx(idx);
  }

  async function applyBackground() {
    if (activeBgIdx === null) return;
    try {
      setIsApplying(true);
      const imageBlob = await removeBackground(imageUrl as string, {
        debug: true,
        progress: (key, current, total) => {
          console.log(`Downloading ${key}: ${current} of ${total}`);
        },
      });
      const url = URL.createObjectURL(imageBlob);
      setImageUrl(url);

      const bgImageUrl = BACKGROUNDS[name][activeBgIdx];
      setBgImageUrl(bgImageUrl);
      router.push("/edit");
    } catch (error) {
      console.log(error);
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger>{name}</DrawerTrigger>
      <DrawerContent className="max-h-[calc(100vh-100px)]">
        <DrawerHeader>
          <DrawerTitle className="font-bricolage capitalize">
            Select an image
          </DrawerTitle>
          <DrawerDescription>
            The image will apply as background to uploaded image
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-4 overflow-y-scroll p-5">
          {BACKGROUNDS[name].map((imageUrl, idx) => (
            <Image
              className={cn(
                "h-full w-full rounded-md bg-cover",
                activeBgIdx === idx && "ring ring-app-black",
              )}
              key={idx}
              src={imageUrl}
              height={200}
              width={200}
              alt="bg"
              onClick={() => handleBgClick(idx)}
            />
          ))}
        </div>

        {activeBgIdx !== null && (
          <DrawerFooter className="bg-transparent">
            <Button onClick={applyBackground} isLoading={isApplying}>
              Apply
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
