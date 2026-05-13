"use client";

import { BookOpen, GraduationCap, Menu, Repeat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeSwitcher from "../ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationList = [
  { href: "/phrases", label: "Phrases", icon: BookOpen },
  { href: "/lessons", label: "Lessons", icon: GraduationCap },
  { href: "/irregular-verbs", label: "Irregular Verbs", icon: Repeat },
] as const;

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted/80"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-[min(100vw,20rem)] flex-col gap-0 border-l border-border/60 bg-background/95 p-0 shadow-xl backdrop-blur-sm"
      >
        <SheetHeader className="border-b border-border/60 px-5 py-5">
          <SheetTitle className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="English Helper"
              width={100}
              height={30}
            />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
          {navigationList.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left transition-all",
                    "hover:border-border/70 hover:bg-muted/70",
                    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    isActive &&
                      "border-primary/15 bg-primary/8 text-foreground shadow-sm",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground transition-colors",
                      "group-hover:bg-background group-hover:text-foreground",
                      isActive && "bg-primary text-primary-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold">{item.label}</span>
                    {isActive ? (
                      <span className="text-xs text-muted-foreground">
                        Current page
                      </span>
                    ) : null}
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <SheetFooter className="border-t border-border/60 bg-muted/20 px-5 py-4">
          <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">Appearance</p>
              <p className="text-xs text-muted-foreground">
                Switch light or dark mode
              </p>
            </div>
            <ThemeSwitcher />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
