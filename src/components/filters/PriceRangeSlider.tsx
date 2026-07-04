"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export function PriceRangeSlider({ min, max, value, onValueChange }: PriceRangeSliderProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between text-xs font-extrabold text-[var(--ink-900)]">
        <span>Min: ${value[0]}</span>
        <span>Max: ${value[1]}</span>
      </div>

      <SliderPrimitive.Root
        min={min}
        max={max}
        step={5}
        value={value}
        onValueChange={onValueChange as any}
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
      >
        <SliderPrimitive.Track className="bg-[var(--bg-canvas-alt)] relative grow h-1 rounded-full">
          <SliderPrimitive.Range className="absolute bg-[var(--ink-900)] h-full rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-4.5 h-4.5 bg-white border border-[var(--ink-900)] rounded-full hover:bg-[var(--accent-lime)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ink-900)]"
          aria-label="Min price"
        />
        <SliderPrimitive.Thumb
          className="block w-4.5 h-4.5 bg-white border border-[var(--ink-900)] rounded-full hover:bg-[var(--accent-lime)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ink-900)]"
          aria-label="Max price"
        />
      </SliderPrimitive.Root>
    </div>
  );
}
