import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = (typeof localStorage !== 'undefined'
        ? localStorage.getItem('appearance')
        : null) as Appearance;

    if (currentAppearance === 'system') {
        const isDark = prefersDark();
        console.log('System theme changed, isDark:', isDark); // Debug log

        if (typeof document !== 'undefined') {
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }
};

export function initializeTheme() {
    const savedAppearance = (typeof localStorage !== 'undefined'
        ? localStorage.getItem('appearance')
        : null) as Appearance || 'system';

    // Apply theme immediately
    const isDark = savedAppearance === 'dark' || (savedAppearance === 'system' && prefersDark());
    console.log('Initializing theme:', savedAppearance, 'isDark:', isDark); // Debug log

    if (typeof document !== 'undefined') {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    // Add the event listener for system theme changes
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        console.log('Updating appearance to:', mode); // Debug log

        // Update state first
        setAppearance(mode);

        // Apply theme immediately to DOM
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
        console.log('Applying dark mode:', isDark); // Debug log

        // Add class to indicate view transition is active (if supported)
        const hasViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;
        if (hasViewTransitions) {
            document.documentElement.classList.add('view-transition-active');
        }

        // Force DOM update with better error handling
        if (typeof document !== 'undefined') {
            try {
                if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                }
            } catch (error) {
                console.warn('Error updating theme classes:', error);
            }

            // Remove view transition class after a brief delay
            if (hasViewTransitions) {
                setTimeout(() => {
                    document.documentElement.classList.remove('view-transition-active');
                }, 100);
            }
        }

        // Store in localStorage for client-side persistence
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('appearance', mode);
            } catch (error) {
                console.warn('Error saving to localStorage:', error);
            }
        }

        // Store in cookie for SSR
        setCookie('appearance', mode);
    }, []);

    useEffect(() => {
        // Get saved appearance from localStorage
        const savedAppearance = (typeof localStorage !== 'undefined'
            ? localStorage.getItem('appearance')
            : null) as Appearance | null;

        const initialAppearance = savedAppearance || 'system';

        // Apply theme immediately on mount
        const isDark = initialAppearance === 'dark' || (initialAppearance === 'system' && prefersDark());

        if (typeof document !== 'undefined') {
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }

        setAppearance(initialAppearance);

        // Add system theme change listener
        const mediaQueryList = mediaQuery();
        if (mediaQueryList) {
            mediaQueryList.addEventListener('change', handleSystemThemeChange);
        }

        return () => {
            if (mediaQueryList) {
                mediaQueryList.removeEventListener('change', handleSystemThemeChange);
            }
        };
    }, []);

    return { appearance, updateAppearance } as const;
}
