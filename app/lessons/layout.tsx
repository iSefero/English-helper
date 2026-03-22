import PageLayout from "@/components/layouts/PageLayout";
import { ReactNode } from "react";

export default function LessonsLayout({ children }: { children: ReactNode }) {
  return <PageLayout title="Lessons">{children}</PageLayout>;
}
