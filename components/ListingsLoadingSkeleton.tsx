export default function ListingsLoadingSkeleton() {
  return (
    <div className="w-full lg:w-100 hidden lg:block space-y-4 max-h-[calc(100vh-8rem)]">
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-28 rounded-lg border bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
}
