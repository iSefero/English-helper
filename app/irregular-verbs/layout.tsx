import PageLayout from "@/components/layouts/PageLayout";
import { ReactNode } from "react";

export default function IrregularVerbsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PageLayout title="Irregular Verbs">{children}</PageLayout>;
}
