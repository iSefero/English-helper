import PageLayout from "@/components/layouts/PageLayout";
import { ReactNode } from "react";

export default function PhrasesLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout
      title="Phrases"
      description={
        <div>
          <p>Обирайте 1–2 картки на день</p>
          <p>Складайте власні речення і повторюйте їх вголос</p>
          <p>Практикуйтесь регулярно — і фрази стануть автоматичними</p>
          <p>
            Натискайте на фрази, щоб почути вимову (можливі незначні неточності)
          </p>
        </div>
      }
    >
      {children}
    </PageLayout>
  );
}
