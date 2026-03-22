import { AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FontSize } from "@/types/common";
import { useState } from "react";

export default function LessonWords({
  word,
  showOption,
  fontSize,
}: {
  word: { term: string; translation: string };
  showOption: "term" | "translation" | "all";
  fontSize: FontSize;
}) {
  const [translationHovered, setTranslationHovered] = useState(false);
  const [termHovered, setTermHovered] = useState(false);

  return (
    <AccordionTrigger key={word.term}>
      <span
        onMouseEnter={() => setTranslationHovered(true)}
        onMouseLeave={() => setTranslationHovered(false)}
        className={cn("w-1/2 text-right transition-all", `text-${fontSize}`, {
          "blur-sm": showOption === "translation" && !translationHovered,
        })}
      >
        {word.term}
      </span>
      —
      <span
        className={cn("w-fit w-1/2 transition-all", `text-${fontSize}`, {
          "blur-sm": showOption === "term" && !termHovered,
        })}
        onMouseEnter={() => setTermHovered(true)}
        onMouseLeave={() => setTermHovered(false)}
      >
        {word.translation}
      </span>
    </AccordionTrigger>
  );
}
