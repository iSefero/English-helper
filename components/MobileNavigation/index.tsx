"use client";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import ThemeSwitcher from "../ThemeSwitcher";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navigationList = [
  { href: "/phrases", label: "Phrases" },
  { href: "/lessons", label: "Lessons" },
  { href: "/irregular-verbs", label: "Irregular Verbs" },
];

export function MobileNavigation() {
  const params = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="bg-card max-w-[300px]">
        <SheetHeader>
          <SheetTitle className="border-b">
            <Image src="/logo.png" alt="logo" width={100} height={30} />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-end p-2">
          {navigationList.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "relative flex items-center gap-2 rounded-lg p-1 text-md transition-all outline-none",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1",
                "after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-full after:bg-current",
                "after:origin-center after:-translate-x-1/2 after:scale-x-0 after:transition-transform after:duration-300",

                // hover effect
                "hover:after:scale-x-100",

                // active state
                params === item.href && "after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SheetFooter>
          <ThemeSwitcher />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
