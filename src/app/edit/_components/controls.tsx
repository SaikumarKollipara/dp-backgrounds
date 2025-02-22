import CustomSlider from "@/components/custom-slider";
import RectangularSlider from "@/components/rectangular-slider";
import { Transform } from "@/lib/types";
import React from "react";

interface Props {
  bgTransform: Transform;
  imageTransform: Transform;
  handleTransformChange: (
    imageType: "bg" | "image",
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
    <div className="space-y-4">
      {(["bg", "image"] as const).map((type) => (
        <div key={type} className="rounded-lg border p-4">
          <h3 className="font-bold">
            {type === "bg" ? "Background Image" : "Overlay Image"} Controls
          </h3>
          <div className="w-full max-w-sm space-y-4 p-4">
            {(["x", "y", "scale", "rotation"] as const).map((field) => (
              <div key={field} className="flex items-center gap-2">
                <RectangularSlider
                  className="w-full"
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={
                    type === "bg" ? bgTransform[field] : imageTransform[field]
                  }
                  min={
                    field === "scale" ? 0.5 : field === "rotation" ? 0 : -200
                  }
                  max={field === "scale" ? 3 : field === "rotation" ? 360 : 200}
                  step={field === "scale" ? 0.1 : 1}
                  onValueChange={(value: any) =>
                    handleTransformChange(type, field, parseFloat(value))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
