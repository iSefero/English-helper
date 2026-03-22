"use client";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { DesktopNavigation } from "../DesktopNavigation";
import ThemeSwitcher from "../ThemeSwitcher";
import Image from "next/image";
import { MobileNavigation } from "../MobileNavigation";

export default function AppHeader() {
  const breakpoint = useBreakpoint();

  const navgiationByDevice = () => {
    switch (breakpoint) {
      case "xs":
      case "sm":
      case "md":
        return <MobileNavigation />;
      case "lg":
      case "xl":
      case "2xl":
        return (
          <>
            <DesktopNavigation />
            <ThemeSwitcher />
          </>
        );
      default:
        <></>;
    }
  };
  breakpoint;
  return (
    <div className="w-full flex justify-center h-16 bg-card border-b">
      <div className="w-full flex items-center justify-between py-2 px-5 max-w-[1600px]">
        <Image src="/logo.png" alt="logo" width={100} height={30} />
        {navgiationByDevice()}
      </div>
    </div>
  );
}
