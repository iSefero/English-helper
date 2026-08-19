"use client";

import { Dialog } from "@/components/ui/dialog";
import type { PracticeItem } from "../practice";
import PracticeDialogContent from "./PracticeDialogContent";

export function PracticeDialog({
  open,
  onOpenChange,
  items,
  title,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  items: PracticeItem[];
  title?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open ? <PracticeDialogContent items={items} title={title} /> : null}
    </Dialog>
  );
}
