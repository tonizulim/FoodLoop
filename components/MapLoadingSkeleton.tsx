export default function MapLoadingSkeleton() {
  return (
    <div className="h-[90vh] flex-1 relative rounded-lg border-2 border-green-200 dark:border-green-800 overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* shimmer */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* fake map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="h-20 w-32 rounded-lg bg-white/70 dark:bg-gray-700" />
      </div>
    </div>
  );
}
