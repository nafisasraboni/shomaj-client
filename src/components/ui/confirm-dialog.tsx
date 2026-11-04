"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./button";

export function ConfirmDialog({ trigger, title, description, confirmLabel = "Confirm", onConfirm, destructive = false }: { trigger: React.ReactNode; title: string; description: string; confirmLabel?: string; onConfirm: () => void | Promise<void>; destructive?: boolean }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-[var(--card)] p-7 shadow-[var(--shadow-lift)]">
          <AlertDialog.Title className="text-2xl font-bold">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-3 leading-7 text-[var(--muted-foreground)]">{description}</AlertDialog.Description>
          <div className="mt-7 flex justify-end gap-3"><AlertDialog.Cancel asChild><Button variant="ghost">Cancel</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button variant={destructive ? "danger" : "default"} onClick={onConfirm}>{confirmLabel}</Button></AlertDialog.Action></div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
