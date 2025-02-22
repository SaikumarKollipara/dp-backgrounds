"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SliderControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export default function CustomSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
}: SliderControlProps) {
  const [sliderValue, setSliderValue] = React.useState(value);

  const handleValueChange = React.useCallback(
    (values: number[]) => {
      const newValue = values[0];
      setSliderValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <span className="text-sm text-muted-foreground">
          {sliderValue % 1 !== 0 ? sliderValue.toFixed(2) : sliderValue}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[sliderValue]}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  );
}
