"use client";

import { BACKGROUNDS } from "@/lib/constants";
import { useHomeStore } from "@/store/home-store";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn, handleRemoveBackground } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useWindowSize from "@/lib/hooks";
import { Upload } from "lucide-react";
import UploadBgImage from "./upload-bg-image";

export default function BackgroundsList() {
  const imageUrl = useHomeStore((state) => state.imageUrl);

  if (!imageUrl) return null;

  return (
    <div className="">
      <h3 className="font-bricolage text-xl font-semibold">
        Choose a background
      </h3>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 *:min-w-24 *:flex-1 *:rounded-full *:border *:border-app-black *:p-4 *:text-center *:font-semibold">
        <UploadBgImage />

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
  const isLoading = useHomeStore((state) => state.isLoading);
  const setIsLoading = useHomeStore((state) => state.setIsLoading);
  const { isMdWidth } = useWindowSize();

  const [activeBgIdx, setActiveBgIdx] = useState<null | number>(null);

  async function applyBackground() {
    if (activeBgIdx === null) return;
    try {
      setIsLoading(true);
      const url = await handleRemoveBackground(imageUrl as string);
      setImageUrl(url);

      const bgImageUrl = BACKGROUNDS[name][activeBgIdx];
      setBgImageUrl(bgImageUrl);
      router.push("/edit");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isMdWidth) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{name}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select an image</DialogTitle>
            <DialogDescription>
              The image will apply as background to uploaded image.
            </DialogDescription>
          </DialogHeader>
          <BackgroundOptions
            name={name}
            activeBgIdx={activeBgIdx}
            setActiveBgIdx={setActiveBgIdx}
          />

          {activeBgIdx !== null && (
            <DialogFooter className="bg-transparent">
              <Button
                className="w-full"
                onClick={applyBackground}
                isLoading={isLoading}
              >
                Apply
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
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
            The image will apply as background to uploaded image.
          </DrawerDescription>
        </DrawerHeader>

        <BackgroundOptions
          name={name}
          activeBgIdx={activeBgIdx}
          setActiveBgIdx={setActiveBgIdx}
        />

        {activeBgIdx !== null && (
          <DrawerFooter className="bg-transparent">
            <Button onClick={applyBackground} isLoading={isLoading}>
              Apply
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function BackgroundOptions({
  name,
  activeBgIdx,
  setActiveBgIdx,
}: {
  name: string;
  activeBgIdx: null | number;
  setActiveBgIdx: Dispatch<SetStateAction<number | null>>;
}) {
  function handleBgClick(idx: number) {
    if (activeBgIdx === idx) {
      setActiveBgIdx(null);
      return;
    }
    setActiveBgIdx(idx);
  }

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-4 overflow-y-scroll p-5">
      {BACKGROUNDS[name].map((imageUrl, idx) => (
        <Image
          className={cn(
            "h-full w-full rounded-md object-cover",
            activeBgIdx === idx && "ring ring-app-black",
          )}
          key={idx}
          src={imageUrl}
          height={150}
          width={150}
          alt="bg"
          onClick={() => handleBgClick(idx)}
        />
      ))}
    </div>
  );
}
