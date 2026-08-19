"use client";
import { lessons } from "./words";
import LessonCard from "./LessonCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo, useEffect } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { FontSize, SortOrder } from "@/types/common";
import { Button } from "@/components/ui/button";
import { PracticeDialog } from "./PracticeDialog";
import { toPracticeDeck } from "./practice";

export default function LessonsView() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newestFirst");
  const [fontSize, setFontSize] = useState<FontSize>("sm");
  const [practiceOpen, setPracticeOpen] = useState(false);
  const allPracticeItems = useMemo(() => toPracticeDeck(lessons), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedFontSize = localStorage.getItem("fontSize");
    if (storedFontSize && ["sm", "base", "lg", "xl"].includes(storedFontSize)) {
      setFontSize(storedFontSize as FontSize);
    }
  }, []);

  const handleFontSizeChange = (value: FontSize) => {
    setFontSize(value);
    localStorage.setItem("fontSize", value);
  };

  const parseDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => {
      const d1 = parseDate(a.date).getTime();
      const d2 = parseDate(b.date).getTime();

      return sortOrder === "newestFirst" ? d2 - d1 : d1 - d2;
    });
  }, [sortOrder]);

  return (
    <div className="flex flex-col gap-6">
      <PracticeDialog
        open={practiceOpen}
        onOpenChange={setPracticeOpen}
        items={allPracticeItems}
        title="Practice all words"
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button onClick={() => setPracticeOpen(true)}>Test yourself</Button>
        <div className="flex justify-end gap-4">
          <Field orientation={"horizontal"} className="w-fit">
            <FieldLabel className="whitespace-nowrap ">Font:</FieldLabel>
            <Select
              onValueChange={handleFontSizeChange}
              defaultValue="sm"
              value={fontSize || "sm"}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sm">SM</SelectItem>
                  <SelectItem value="base">MD</SelectItem>
                  <SelectItem value="lg">LG</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field orientation={"horizontal"} className="w-fit">
            <FieldLabel className="whitespace-nowrap ">Sort By:</FieldLabel>
            <Select
              onValueChange={(value) => setSortOrder(value as SortOrder)}
              defaultValue="newestFirst"
              value={sortOrder}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newestFirst">Newest first</SelectItem>
                  <SelectItem value="oldestFirst">Oldest first</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedLessons.map((lesson) => (
          <LessonCard fontSize={fontSize} key={lesson.date} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
