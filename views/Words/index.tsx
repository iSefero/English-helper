import { lessons } from "./words";
import LessonCard from "./LessonCard";

export default function WordsView() {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 flex-wrap">
      {lessons.map((lesson, index) => (
        <LessonCard key={index} lesson={lesson} />
      ))}
    </div>
  );
}
