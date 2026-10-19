import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse sofas, beds, dining tables, chairs, coffee tables, storage, office and outdoor furniture.",
};

function GridSkeleton() {
  return (
    <div className="container-x pb-24 pt-32">
      <div className="skeleton h-16 w-72" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton aspect-4/5" />
        ))}
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}