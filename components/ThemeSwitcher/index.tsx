"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Subscript } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
