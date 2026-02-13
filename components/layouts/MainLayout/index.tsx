import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Navigation } from "@/components/Navigation";
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
        <div className="m-auto max-w-[1600px] flex justify-center">
          {children}
        </div>
      </main>
    </>
  );
}
