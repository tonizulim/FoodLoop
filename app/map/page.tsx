"use client";

import { Suspense } from "react";
import MapContent from "./MapContent";
import MapLoadingSkeleton from "@/components/MapLoadingSkeleton";

export default function MapPage() {
  return (
    <Suspense fallback={<MapLoadingSkeleton />}>
      <MapContent />
    </Suspense>
  );
}
