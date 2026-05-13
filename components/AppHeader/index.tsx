"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import Image from "next/image";

import { DesktopNavigation } from "../DesktopNavigation";
import { MobileNavigation } from "../MobileNavigation";
import ThemeSwitcher from "../ThemeSwitcher";

export default function AppHeader() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md";

  return (
    <div className="flex h-16 w-full justify-center border-b bg-card">
      <div className="relative flex w-full max-w-[1600px] items-center px-5 py-2">
        <Image src="/logo.png" alt="logo" width={100} height={30} />

        {!isMobile ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <DesktopNavigation />
          </div>
        ) : null}

        <div className="ml-auto">
          {isMobile ? <MobileNavigation /> : <ThemeSwitcher />}
        </div>
      </div>
    </div>
  );
}
