export default function AvailableFoodPickupsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-4 border rounded-xl h-48 bg-muted/30"
        >
          <div className="h-32 w-full bg-muted rounded mb-4"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
