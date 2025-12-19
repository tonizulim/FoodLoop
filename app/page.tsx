import { Suspense } from "react";
import PageComp from "./pageComp";
import MapLoadingSkeleton from "@/components/MapLoadingSkeleton";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<MapLoadingSkeleton />}>
        <PageComp />
      </Suspense>
    </div>
  );
}
