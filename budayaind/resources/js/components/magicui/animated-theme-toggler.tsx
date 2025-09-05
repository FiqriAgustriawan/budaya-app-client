"use client";

import { Moon, SunDim } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useAppearance } from "@/hooks/use-appearance";

type props = {
  className?: string;
  onToggle?: () => void;
  autoRefresh?: boolean; // New prop to enable/disable auto refresh
};

export const AnimatedThemeToggler = ({ className, onToggle, autoRefresh = true }: props) => {
  const { appearance, updateAppearance } = useAppearance();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Determine if current theme is dark
  useEffect(() => {
    const isDark = appearance === 'dark' ||
      (appearance === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    console.log('Theme changed to:', appearance, 'isDark:', isDark); // Debug log
    setIsDarkMode(isDark);
  }, [appearance]);

  // Listen for system theme changes when using system mode
  useEffect(() => {
    if (appearance !== 'system' || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const isDark = mediaQuery.matches;
      setIsDarkMode(isDark);

      // Update DOM directly for system changes
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appearance]);

  const changeTheme = async () => {
    if (!buttonRef.current || isTransitioning) return;

    // Toggle between light and dark (skip system for this simple toggle)
    const newTheme = isDarkMode ? 'light' : 'dark';
    console.log('Changing theme from', isDarkMode ? 'dark' : 'light', 'to', newTheme); // Debug log

    setIsTransitioning(true);

    // Call onToggle callback if provided
    if (onToggle) {
      onToggle();
    }

    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      console.log('View Transitions not supported, using fallback'); // Debug log
      updateAppearance(newTheme);
      setIsTransitioning(false);

      // Auto refresh if enabled (no View Transitions case)
      if (autoRefresh) {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
      return;
    }

    try {
      // Get button position before starting transition
      const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      // Calculate the maximum radius for the circle
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      // Start the view transition
      const transition = document.startViewTransition(async () => {
        flushSync(() => {
          // Apply theme change within the transition
          updateAppearance(newTheme);
        });
      });

      // Wait for the transition to be ready
      await transition.ready;

      // Animate the circle expansion
      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 800,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );

      // Wait for animation to complete
      await animation.finished;
      setIsTransitioning(false);

      // Auto refresh if enabled
      if (autoRefresh) {
        setTimeout(() => {
          window.location.reload();
        }, 200); // Small delay after animation
      }

    } catch (error) {
      // View Transitions failed, fallback to normal theme change
      console.warn('View Transitions API failed:', error);
      updateAppearance(newTheme);
      setIsTransitioning(false);

      // Auto refresh if enabled (fallback case)
      if (autoRefresh) {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      disabled={isTransitioning}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95",
        isTransitioning && "opacity-80 cursor-not-allowed",
        className
      )}
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative flex items-center justify-center">
        {isDarkMode ? (
          <SunDim
            className={cn(
              "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500",
              isTransitioning && "theme-toggle-icon"
            )}
          />
        ) : (
          <Moon
            className={cn(
              "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500",
              isTransitioning && "theme-toggle-icon"
            )}
          />
        )}
      </div>
    </button>
  );
};
