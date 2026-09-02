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
import {
  filterLessonsByRange,
  parseLessonDate,
  toPracticeDeck,
  type LessonRangeFilter,
} from "./practice";

const RANGE_OPTIONS: { value: LessonRangeFilter; label: string }[] = [
  { value: "two-weeks", label: "Last 2 weeks" },
  { value: "month", label: "Last month" },
  { value: "all", label: "All lessons" },
];

export default function LessonsView() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newestFirst");
  const [fontSize, setFontSize] = useState<FontSize>("sm");
  const [selectionMode, setSelectionMode] = useState(false);
  const [range, setRange] = useState<LessonRangeFilter>("two-weeks");
  const [selectedDates, setSelectedDates] = useState<Set<string>>(
    () => new Set(),
  );
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [practiceItems, setPracticeItems] = useState(() =>
    toPracticeDeck([]),
  );

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

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => {
      const d1 = parseLessonDate(a.date).getTime();
      const d2 = parseLessonDate(b.date).getTime();

      return sortOrder === "newestFirst" ? d2 - d1 : d1 - d2;
    });
  }, [sortOrder]);

  const selectedWordCount = useMemo(() => {
    const selected = sortedLessons.filter((lesson) =>
      selectedDates.has(lesson.date),
    );
    return toPracticeDeck(selected).length;
  }, [sortedLessons, selectedDates]);

  const enterSelectionMode = () => {
    const initial = filterLessonsByRange(sortedLessons, "two-weeks");
    setRange("two-weeks");
    setSelectedDates(new Set(initial.map((lesson) => lesson.date)));
    setSelectionMode(true);
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedDates(new Set());
    setRange("two-weeks");
  };

  const handleRangeChange = (nextRange: LessonRangeFilter) => {
    setRange(nextRange);
    const nextVisible = filterLessonsByRange(sortedLessons, nextRange);
    setSelectedDates(new Set(nextVisible.map((lesson) => lesson.date)));
  };

  const toggleLesson = (date: string) => {
    setSelectedDates((current) => {
      const next = new Set(current);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const startPractice = () => {
    const selected = sortedLessons.filter((lesson) =>
      selectedDates.has(lesson.date),
    );
    setPracticeItems(toPracticeDeck(selected));
    setPracticeOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <PracticeDialog
        open={practiceOpen}
        onOpenChange={setPracticeOpen}
        items={practiceItems}
        title="Test yourself"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectionMode ? "secondary" : "default"}
            onClick={() => {
              if (selectionMode) {
                exitSelectionMode();
              } else {
                enterSelectionMode();
              }
            }}
          >
            {selectionMode ? "Cancel" : "Test yourself"}
          </Button>

          {selectionMode ? (
            <>
              <div className="flex flex-wrap gap-1 rounded-full border border-border/70 bg-muted/40 p-1">
                {RANGE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    size="xs"
                    variant={range === option.value ? "default" : "ghost"}
                    className="rounded-full px-3"
                    onClick={() => handleRangeChange(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <Button
                size="sm"
                disabled={selectedWordCount === 0}
                onClick={startPractice}
              >
                Start ({selectedWordCount})
              </Button>
            </>
          ) : null}
        </div>

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
          <LessonCard
            fontSize={fontSize}
            key={lesson.date}
            lesson={lesson}
            selectionMode={selectionMode}
            selected={selectedDates.has(lesson.date)}
            onToggleSelect={() => toggleLesson(lesson.date)}
          />
        ))}
      </div>
    </div>
  );
}
