"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}

/** Fills its (relative) parent. Shows a graceful fallback if the image fails to load. */
export default function SmartImage({ src, alt, className = "", sizes = "(max-width: 768px) 100vw, 50vw", preload = false }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#e6dac6] to-[#f3ece0] text-[#5a3d2b]/50"
      >
        <ImageOff className="h-8 w-8" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      onError={() => setFailedSrc(src)}
      className={`object-cover ${className}`}
    />
  );
}