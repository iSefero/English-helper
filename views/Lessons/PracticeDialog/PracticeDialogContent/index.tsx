"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  type PracticeDirection,
  type PracticeItem,
  shuffle,
} from "../../practice";

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.7;
  window.speechSynthesis.speak(utterance);
}

export default function PracticeDialogContent({
  items,
  title,
}: {
  items: PracticeItem[];
  title?: string;
}) {
  const initialDeck = useMemo(() => shuffle(items), [items]);
  const [queue, setQueue] = useState<PracticeItem[]>(initialDeck);
  const [known, setKnown] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<PracticeDirection>("ua-en");
  const [pronunciation, setPronunciation] = useState(false);

  const current = queue[0] ?? null;
  const total = items.length;
  const prompt = current
    ? direction === "ua-en"
      ? current.translation
      : current.term
    : "";
  const answer = current
    ? direction === "ua-en"
      ? current.term
      : current.translation
    : "";

  useEffect(() => {
    if (!pronunciation || !current) {
      return;
    }

    if (direction === "en-ua" || revealed) {
      speak(current.term);
    }
  }, [current, direction, pronunciation, revealed]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const resetCard = () => setRevealed(false);

  const handleAgain = () => {
    if (!current) {
      return;
    }

    const rest = queue.slice(1);
    const insertAt =
      rest.length === 0 ? 0 : Math.floor(Math.random() * rest.length) + 1;
    const nextQueue = [...rest];
    nextQueue.splice(insertAt, 0, current);
    resetCard();
    setQueue(nextQueue);
  };

  const handleGotIt = () => {
    if (!current) {
      return;
    }

    resetCard();
    setKnown((value) => value + 1);
    setQueue(queue.slice(1));
  };

  const handleRestart = () => {
    resetCard();
    setKnown(0);
    setQueue(shuffle(items));
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{title ?? "Practice words"}</DialogTitle>
        <DialogDescription>
          Recall the other side, then mark if you still need this card.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full border border-border/70 bg-muted/40 p-1">
          <Button
            size="xs"
            variant={direction === "ua-en" ? "default" : "ghost"}
            className="rounded-full px-3"
            onClick={() => {
              resetCard();
              setDirection("ua-en");
            }}
          >
            UA → EN
          </Button>
          <Button
            size="xs"
            variant={direction === "en-ua" ? "default" : "ghost"}
            className="rounded-full px-3"
            onClick={() => {
              resetCard();
              setDirection("en-ua");
            }}
          >
            EN → UA
          </Button>
        </div>
        <Field orientation="horizontal" className="w-fit">
          <Checkbox
            id="lesson-pronunciation"
            checked={pronunciation}
            onCheckedChange={(checked) => setPronunciation(checked === true)}
          />
          <Label htmlFor="lesson-pronunciation">Pronounce English</Label>
        </Field>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {Math.min(known + (current ? 1 : 0), total)} / {total}
          </span>
          <span>{known} known</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${total ? (known / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {current ? (
        <div className="space-y-3">
          <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-border/70 bg-muted/30 px-4 py-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {direction === "ua-en" ? "Ukrainian" : "English"}
            </p>
            <p className="mt-3 text-2xl font-semibold first-letter:uppercase">
              {prompt}
            </p>
            <div
              className={cn(
                "mt-5 w-full border-t border-dashed border-border/80 pt-4",
                !revealed && "blur-sm select-none",
              )}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {direction === "ua-en" ? "English" : "Ukrainian"}
              </p>
              <p className="mt-2 text-xl font-medium">{answer}</p>
            </div>
          </div>

          {revealed ? (
            <div className="rounded-xl border border-border/60 bg-card px-4 py-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Examples
              </p>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                {current.examples.map((example, index) => (
                  <p key={index}>- {example}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-border/70 bg-muted/30 px-4 py-8 text-center">
          <p className="text-xl font-semibold">All cards reviewed</p>
          <p className="mt-2 text-sm text-muted-foreground">
            You marked {known} of {total} as known.
          </p>
        </div>
      )}

      <DialogFooter className="justify-between sm:justify-between">
        <DialogClose asChild>
          <Button variant="destructive">Close</Button>
        </DialogClose>
        {current ? (
          revealed ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAgain}>
                Again
              </Button>
              <Button onClick={handleGotIt}>Got it</Button>
            </div>
          ) : (
            <Button onClick={() => setRevealed(true)}>Show answer</Button>
          )
        ) : (
          <Button onClick={handleRestart}>
            <RotateCcw />
            Restart
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
