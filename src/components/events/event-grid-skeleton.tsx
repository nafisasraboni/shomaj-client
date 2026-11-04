import { Skeleton } from "@/components/ui/skeleton";

export function EventGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => <div key={index} className="overflow-hidden rounded-2xl border bg-[var(--card)] shadow-[var(--shadow-soft)]"><Skeleton className="aspect-[16/10] w-full rounded-none" /><div className="grid grid-cols-[3.25rem_1fr] gap-4 p-5"><Skeleton className="h-16 w-full" /><div><Skeleton className="h-4 w-1/2" /><Skeleton className="mt-4 h-7 w-4/5" /><Skeleton className="mt-3 h-4 w-2/3" /></div></div><div className="border-t p-4"><Skeleton className="h-4 w-full" /></div></div>)}
    </div>
  );
}
