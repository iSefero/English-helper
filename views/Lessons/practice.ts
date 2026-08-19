import { lessons } from "./words";

export type Lesson = (typeof lessons)[number];
export type LessonWord = Lesson["words"][number];

export type PracticeItem = LessonWord & {
  id: string;
};

export type PracticeDirection = "ua-en" | "en-ua";

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
    })),
  );
}
