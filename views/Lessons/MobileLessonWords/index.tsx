import { AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontSize } from "@/types/common";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LessonWords({
  word,
  hidedOption,
  fontSize,
}: {
  word: { term: string; translation: string };
  hidedOption: "term" | "translation" | "all";
  fontSize: FontSize;
}) {
  const [revealed, setRevealed] = useState(false);

  const hideTerm = hidedOption === "translation" && !revealed;
  const hideTranslation = hidedOption === "term" && !revealed;

  return (
    <div className={`flex gap-4 items-center `}>
      <AccordionTrigger className="py-1">
        <span
          className={cn("transition-all", `text-${fontSize}`, {
            "blur-sm": hideTerm,
          })}
        >
          {word.term}
        </span>

        {" — "}

        <span
          className={cn("transition-all", `text-${fontSize}`, {
            "blur-sm": hideTranslation,
          })}
        >
          {word.translation}
        </span>
      </AccordionTrigger>

      {
        <Button
          size="icon"
          disabled={hidedOption === "all"}
          onClick={() => setRevealed((v) => !v)}
        >
          {revealed ? <EyeOff /> : <Eye />}
        </Button>
      }
    </div>
  );
}
