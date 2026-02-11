export default function PageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="pt-4">{title}</h2>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
