"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const navigationList = [
  { href: "/phrases", label: "Phrases" },
  { href: "/lessons", label: "Lessons" },
  { href: "/irregular-verbs", label: "Irregular Verbs" },
];

export function DesktopNavigation() {
  const params = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        {navigationList.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              active={params === item.href}
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
