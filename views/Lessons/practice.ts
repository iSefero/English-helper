import { lessons } from "./words";

export type Lesson = (typeof lessons)[number];
export type LessonWord = Lesson["words"][number];

export type PracticeItem = LessonWord & {
  id: string;
  lessonDate: string;
};

export type PracticeDirection = "ua-en" | "en-ua";

export type LessonRangeFilter = "all" | "two-weeks" | "month";

export function parseLessonDate(dateStr: string) {
  const [month, day, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}`);
}

export function formatLessonDate(dateStr: string) {
  return parseLessonDate(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export function toPracticeDeck(source: Lesson | Lesson[]): PracticeItem[] {
  const lessonList = Array.isArray(source) ? source : [source];

  return lessonList.flatMap((lesson) =>
    lesson.words.map((word, index) => ({
      ...word,
      id: `${lesson.date}-${index}-${word.term}`,
      lessonDate: lesson.date,
    })),
  );
}

export function getLessonsSortedNewestFirst(source: Lesson[] = lessons) {
  return [...source].sort(
    (a, b) => parseLessonDate(b.date).getTime() - parseLessonDate(a.date).getTime(),
  );
}

export function filterLessonsByRange(
  source: Lesson[],
  range: LessonRangeFilter,
) {
  if (range === "all") {
    return source;
  }

  const now = new Date();
  const days = range === "two-weeks" ? 14 : 30;
  const cutoff = new Date(now);
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - days);

  return source.filter((lesson) => parseLessonDate(lesson.date) >= cutoff);
}
