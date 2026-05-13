"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigationList = [
  { href: "/phrases", label: "Phrases" },
  { href: "/lessons", label: "Lessons" },
  { href: "/irregular-verbs", label: "Irregular Verbs" },
] as const;

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1 shadow-sm"
    >
      {navigationList.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              "text-muted-foreground hover:bg-background/70 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              "after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-8 after:-translate-x-1/2 after:rounded-full after:bg-current after:opacity-0 after:transition-all after:duration-300",
              "hover:after:opacity-40",
              isActive &&
                "bg-background text-foreground shadow-sm after:opacity-100",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
