import AppHeader from "@/components/AppHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="w-full p-4">
        <div className="m-auto max-w-[1450px] flex justify-center">
          {children}
        </div>
      </main>
    </>
  );
}
