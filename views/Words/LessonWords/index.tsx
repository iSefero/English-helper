import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LessonWords({
  word,
  showOption,
}: {
  word: { term: string; translation: string };
  showOption: "term" | "translation" | "all";
}) {
  const [translationHovered, setTranslationHovered] = useState(false);
  const [termHovered, setTermHovered] = useState(false);
  return (
    <>
      <span
        onMouseEnter={() => setTranslationHovered(true)}
        onMouseLeave={() => setTranslationHovered(false)}
        className={cn("w-1/2 text-right transition-all", {
          "blur-sm": showOption === "translation" && !translationHovered,
        })}
      >
        {word.term}
      </span>
      —
      <span
        className={cn("w-fit w-1/2 transition-all", {
          "blur-sm": showOption === "term" && !termHovered,
        })}
        onMouseEnter={() => setTermHovered(true)}
        onMouseLeave={() => setTermHovered(false)}
      >
        {word.translation}
      </span>
    </>
  );
}
