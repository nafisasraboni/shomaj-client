"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, pathname, router, session]);

  if (isPending) {
    return <main className="container-shell section-padding"><Skeleton className="h-10 w-64" /><Skeleton className="mt-8 h-80 w-full" /></main>;
  }

  if (!session) return null;
  return children;
}
