"use client";

import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "../words";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import LessonWords from "../LessonWords";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobileLessonWords from "../MobileLessonWords";
import { FontSize } from "@/types/common";
import { memo } from "react";
import { PracticeDialog } from "../PracticeDialog";
import { toPracticeDeck } from "../practice";
import { cn } from "@/lib/utils";

function LessonCard({
  lesson,
  fontSize,
  selectionMode = false,
  selected = false,
  onToggleSelect,
}: {
  lesson: (typeof lessons)[0];
  fontSize: FontSize;
  selectionMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}) {
  const [showOption, setShowOption] = useState<"term" | "translation" | "all">(
    "all",
  );
  const [practiceOpen, setPracticeOpen] = useState(false);
  const practiceItems = useMemo(() => toPracticeDeck(lesson), [lesson]);
  const breakpoint = useBreakpoint();

  const date = new Date(lesson.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  const showAccordionItem = (word: (typeof lesson.words)[0]) => {
    if (breakpoint === "xl" || breakpoint === "2xl") {
      return (
        <LessonWords word={word} showOption={showOption} fontSize={fontSize} />
      );
    }
    if (
      breakpoint === "xs" ||
      breakpoint === "sm" ||
      breakpoint === "md" ||
      breakpoint === "lg"
    ) {
      return (
        <MobileLessonWords
          word={word}
          hidedOption={showOption}
          fontSize={fontSize}
        />
      );
    }
  };

  return (
    <div className="relative w-full">
      <Card key={lesson.date} className="w-full gap-8">
        <PracticeDialog
          open={practiceOpen}
          onOpenChange={setPracticeOpen}
          items={practiceItems}
          title={`Practice · ${formattedDate}`}
        />
        <CardHeader className="gap-4">
          <CardTitle className="flex items-center justify-between gap-3">
            <span className="text-xl font-bold">{formattedDate}</span>
            <div>
              <Button
                disabled={showOption === "all"}
                onClick={() => setShowOption("all")}
              >
                All
              </Button>
              <Button
                disabled={showOption === "term"}
                onClick={() => setShowOption("term")}
              >
                EN
              </Button>
              <Button
                disabled={showOption === "translation"}
                onClick={() => setShowOption("translation")}
              >
                UA
              </Button>
            </div>
          </CardTitle>
          {!selectionMode ? (
            <Button variant="outline" onClick={() => setPracticeOpen(true)}>
              Practice
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {lesson.words.map((word) => (
            <Accordion type="single" collapsible key={word.term}>
              <AccordionItem value={word.term}>
                {showAccordionItem(word)}
                <AccordionContent className="border-b">
                  {word.examples.map((example, index) => (
                    <p className={`text-${fontSize}`} key={index}>
                      - {example}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      {selectionMode ? (
        <button
          type="button"
          onClick={onToggleSelect}
          aria-pressed={selected}
          aria-label={selected ? "Deselect lesson" : "Select lesson"}
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center rounded-xl transition-colors",
            selected ? "bg-primary/20" : "bg-black/25 hover:bg-black/30",
          )}
        >
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-lg border-2 shadow-sm transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-white/80 bg-white/90 text-transparent",
            )}
          >
            <Check className="size-8" strokeWidth={3} />
          </span>
        </button>
      ) : null}
    </div>
  );
}

export default memo(LessonCard);
