import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RectangularSlider from "@/components/rectangular-slider";
import { Transform } from "@/lib/types";

interface Props {
  bgTransform: Transform;
  imageTransform: Transform;
  handleTransformChange: (
    imageType: "background" | "overlay",
    field: keyof Transform,
    value: number,
  ) => void;
}

export default function Controls({
  bgTransform,
  imageTransform,
  handleTransformChange,
}: Props) {
  return (
    <div className="hide-scrollbar h-full w-full flex-1 overflow-scroll rounded-md bg-white p-5 md:max-h-[800px]">
      <Tabs
        defaultValue="overlay"
        className="hide-scrollbar h-full w-full overflow-y-auto"
      >
        <div className="sticky top-0 z-10 w-full bg-white pb-2">
          <TabsList className="flex w-full">
            <TabsTrigger className="flex-1" value="overlay">
              Overlay
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="background">
              Background
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overlay">
          <Control
            type="overlay"
            bgTransform={bgTransform}
            imageTransform={imageTransform}
            handleTransformChange={handleTransformChange}
          />
        </TabsContent>
        <TabsContent value="background">
          <Control
            type="background"
            bgTransform={bgTransform}
            imageTransform={imageTransform}
            handleTransformChange={handleTransformChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Control({
  type,
  bgTransform,
  imageTransform,
  handleTransformChange,
}: { type: "overlay" | "background" } & Props) {
  return (
    <div className="w-full space-y-4 p-4">
      {(["x", "y", "scale", "rotation"] as const).map((field) => (
        <div key={field} className="flex items-center gap-2">
          <RectangularSlider
            className="w-full"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={
              type === "background" ? bgTransform[field] : imageTransform[field]
            }
            min={field === "scale" ? 0.5 : field === "rotation" ? 0 : -200}
            max={field === "scale" ? 3 : field === "rotation" ? 360 : 200}
            step={field === "scale" ? 0.1 : 1}
            onValueChange={(value: any) =>
              handleTransformChange(type, field, parseFloat(value))
            }
          />
        </div>
      ))}
    </div>
  );
}
