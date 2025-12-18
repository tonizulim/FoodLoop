// components/LoadingItem.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // if you have a skeleton component

export default function ItemLoadingSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-0 sm:p-2 animate-pulse">
          <div className="flex flex-col-reverse gap-2 sm:flex-row items-center sm:justify-between">
            <div className="m-2 flex-1 space-y-2">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-48" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <div className="text-xs text-muted-foreground">
                <Skeleton className="h-3 w-20 mt-1" />
              </div>
            </div>
            <div className="relative w-full h-50 sm:h-60 sm:w-60 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="m-2 h-[40vh] sm:h-[60vh] rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </Card>
      </div>
    </div>
  );
}
