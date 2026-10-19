"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  label?: string;
}

export default function QtyControl({ value, onChange, max = 10, label = "quantity" }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#d9ccb4] bg-white">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#f3ece0] disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span aria-live="polite" className="w-8 text-center text-sm font-medium">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#f3ece0] disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}