import AppHeader from "@/components/AppHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background bg-gradient-to-b from-muted/35 via-background to-background dark:from-muted/10">
      <AppHeader />
      <main className="w-full p-4">
        <div className="m-auto flex max-w-[1450px] justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
