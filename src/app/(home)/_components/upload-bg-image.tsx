"use client";

import { Button } from "@/components/ui/button";
import { Upload, UploadCloud } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useHomeStore } from "@/store/home-store";
import { handleRemoveBackground } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useWindowSize from "@/lib/hooks";

export default function UploadBgImage() {
  const { isMdWidth } = useWindowSize();

  if (isMdWidth) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="!min-w-max">
            Upload my own <Upload />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Upload an image</DialogTitle>
            <DialogDescription>
              The image will apply as background to uploaded image.
            </DialogDescription>
          </DialogHeader>
          <UploadOptions />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="!min-w-max">
          Upload my own <Upload />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100vh-100px)]">
        <DrawerHeader>
          <DrawerTitle className="font-bricolage capitalize">
            Upload an image
          </DrawerTitle>
          <DrawerDescription>
            The image will apply as background to uploaded image.
          </DrawerDescription>
        </DrawerHeader>

        <UploadOptions />
      </DrawerContent>
    </Drawer>
  );
}

function UploadOptions() {
  const router = useRouter();
  const overlayImageUrl = useHomeStore((state) => state.imageUrl);
  const setOverlayImageUrl = useHomeStore((state) => state.setImageUrl);
  const setBgImageUrl = useHomeStore((state) => state.setBgImageUrl);
  const setIsLoading = useHomeStore((state) => state.setIsLoading);

  const [inputUrl, setInputUrl] = useState("");

  async function handleBgUpload(bgUrl: string) {
    try {
      setIsLoading(true);
      const url = await handleRemoveBackground(overlayImageUrl as string);
      setOverlayImageUrl(url);
      setBgImageUrl(bgUrl);
      router.push("/edit");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      await handleBgUpload(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  async function handleApplyClick() {
    await handleBgUpload(inputUrl);
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 p-4">
      <input
        id="bg-image-upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label
        className="flex h-[250px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-app-gray-dark bg-app-gray"
        htmlFor="bg-image-upload"
      >
        <UploadCloud className="text-app-gray-dark" />
        <p className="text-center text-sm font-medium text-app-gray-dark">
          Upload from device
        </p>
      </label>

      <div className="flex w-full items-center justify-center gap-4">
        <Separator className="flex-1" />
        <p className="text-sm font-medium text-app-gray-dark">or</p>
        <Separator className="flex-1" />
      </div>

      <div className="flex w-full gap-2">
        <Input
          className="flex-1"
          type="text"
          placeholder="Paste a url of an image"
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <Button className="px-8" onClick={handleApplyClick}>
          Apply
        </Button>
      </div>
    </div>
  );
}
