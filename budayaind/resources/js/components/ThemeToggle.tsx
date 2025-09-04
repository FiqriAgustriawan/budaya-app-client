"use client";

import { Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({
  className,
  size = 'md',
  ...props
}: ThemeToggleProps) {
  const { appearance, updateAppearance } = useAppearance();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-[1.2rem] w-[1.2rem]',
    lg: 'h-6 w-6'
  };

  // Determine if current theme is dark
  useEffect(() => {
    const isDark = appearance === 'dark' ||
      (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
  }, [appearance]);

  // Listen for system theme changes when using system mode
  useEffect(() => {
    if (appearance !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appearance]);

  const toggleTheme = () => {
    // Toggle between light and dark (skip system for this simple toggle)
    const newTheme = isDarkMode ? 'light' : 'dark';
    updateAppearance(newTheme);
  };

  return (
    <button
      className={cn(
        "relative flex items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground",
        sizeClasses[size],
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      {...props}
    >
      <div className={cn("relative", iconSizes[size])}>
        <Sun
          className={cn(
            "absolute rotate-0 scale-100 transition-all",
            iconSizes[size],
            isDarkMode ? "-rotate-90 scale-0" : "rotate-0 scale-100"
          )}
        />
        <Moon
          className={cn(
            "absolute rotate-90 scale-0 transition-all",
            iconSizes[size],
            isDarkMode ? "rotate-0 scale-100" : "rotate-90 scale-0"
          )}
        />
      </div>
    </button>
  );
}
