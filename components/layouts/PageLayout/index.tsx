export default function PageLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="pt-4">{title}</h2>
      <div>{description}</div>
      <div className="flex justify-center w-full">{children}</div>
    </div>
  );
}
