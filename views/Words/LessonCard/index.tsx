"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "./../words";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LessonWords from "../LessonWords";

export default function LessonCard({
  lesson,
}: {
  lesson: (typeof lessons)[0];
}) {
  const [showOption, setShowOption] = useState<"term" | "translation" | "all">(
    "all",
  );

  const date = new Date(lesson.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Card key={lesson.date} className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {formattedDate}
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
      <CardContent>
        {lesson.words.map((word) => (
          <Accordion type="single" collapsible key={word.term}>
            <AccordionItem value={word.term}>
              <AccordionTrigger key={word.term}>
                <LessonWords word={word} showOption={showOption} />
              </AccordionTrigger>
              <AccordionContent>
                {word.examples.map((example, index) => (
                  <p key={index}>{example}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
}
