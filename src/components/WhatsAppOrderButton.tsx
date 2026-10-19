"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface Props {
  message: string;
  label?: string;
  className?: string;
}

export default function WhatsAppOrderButton({ message, label = "Order on WhatsApp", className = "btn btn-outline" }: Props) {
  const number = siteConfig.whatsappNumber;

  if (!number) {
    return (
      <div>
        <button type="button" disabled className={className} title="WhatsApp number is not configured yet">
          <MessageCircle className="h-4 w-4" /> {label}
        </button>
        <p className="mt-1 text-xs text-[#2a2623]/50">WhatsApp ordering is not available yet.</p>
      </div>
    );
  }

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle className="h-4 w-4" /> {label}
    </a>
  );
}