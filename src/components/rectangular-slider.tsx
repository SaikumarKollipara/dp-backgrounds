"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RectangularSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export default function RectangularSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
}: RectangularSliderProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateValue = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return currentValue;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      return clampedValue;
    },
    [currentValue, max, min, step],
  );

  const handleMove = useCallback(
    (clientX: number) => {
      const newValue = calculateValue(clientX);
      setCurrentValue(newValue);
      onValueChange?.(newValue);
    },
    [calculateValue, onValueChange],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {currentValue % 1 !== 0 ? currentValue.toFixed(2) : currentValue}
        </span>
      </div>
      <div
        ref={sliderRef}
        className="relative h-12 w-full cursor-pointer rounded-md bg-secondary"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full rounded-md bg-primary transition-all duration-100"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
