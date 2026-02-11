"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "hidden sm:flex")}
          >
            <Link href="/words">Words & Phrases</Link>
          </NavigationMenuLink>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "flex sm:hidden")}
          >
            <Link href="/words">Words</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "hidden sm:flex")}
          >
            <Link href="/irregular-verbs">Irregular Verbs</Link>
          </NavigationMenuLink>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "flex sm:hidden")}
          >
            <Link href="/irregular-verbs">Verbs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
