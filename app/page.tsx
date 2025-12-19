import { Suspense } from "react";
import PageComp from "./pageComp";
import MapLoadingSkeleton from "@/components/MapLoadingSkeleton";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for food, location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 h-12 text-base"
      />
      <Suspense fallback={<MapLoadingSkeleton />}>
        <PageComp />
      </Suspense>
    </div>
  );
}
