import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <main className="container-shell section-padding"><Skeleton className="h-4 w-32" /><Skeleton className="mt-5 h-14 w-2/3" /><div className="mt-12"><EventGridSkeleton count={6} /></div></main>;
}
