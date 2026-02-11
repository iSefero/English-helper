import { Navigation } from "../Navigation";
import ThemeSwitcher from "../ThemeSwitcher";

export default function AppHeader() {
  return (
    <div className="w-full relative flex items-center h-16 bg-card border-b">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Navigation />
      </div>
      <div className="absolute right-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
