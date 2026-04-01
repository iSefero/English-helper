import { Dialog } from "@/components/ui/dialog";
import TestDialogContent from "./TestDialogContent";

type DialogProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function TestDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && <TestDialogContent />}
    </Dialog>
  );
}
