"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "./../words";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LessonWords from "../LessonWords";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobileLessonWords from "../MobileLessonWords";
import { FontSize } from "@/types/common";
import { memo } from "react";

function LessonCard({
  lesson,
  fontSize,
}: {
  lesson: (typeof lessons)[0];
  fontSize: FontSize;
}) {
  const [showOption, setShowOption] = useState<"term" | "translation" | "all">(
    "all",
  );
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
    <Card key={lesson.date} className="w-full gap-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
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
  );
}

export default memo(LessonCard);
