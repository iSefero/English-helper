import PageLayout from "@/components/layouts/PageLayout";
import { ReactNode } from "react";

export default function WordsLayout({ children }: { children: ReactNode }) {
  return <PageLayout title="Words and Phrases">{children}</PageLayout>;
}
