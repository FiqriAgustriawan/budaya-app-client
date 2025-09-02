import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative ${sizeClasses[size]} rounded-xl transition-all duration-300 group overflow-hidden
                ${theme === 'dark'
                    ? 'bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700/50 hover:border-gray-500/70'
                    : 'bg-white/80 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }
                backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105
                ${className}
            `}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Background glow effect */}
            <div className={`
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${theme === 'dark'
                    ? 'bg-gradient-to-r from-[#a4773e]/10 to-cyan-500/10'
                    : 'bg-gradient-to-r from-[#a4773e]/10 to-blue-500/10'
                }
            `}></div>

            {/* Icon container */}
            <div className="relative flex items-center justify-center w-full h-full">
                {theme === 'dark' ? (
                    <Sun className={`
                        ${iconSizes[size]} text-[#a4773e] group-hover:text-[#d4a574]
                        transition-all duration-300 group-hover:rotate-180
                    `} />
                ) : (
                    <Moon className={`
                        ${iconSizes[size]} text-gray-600 group-hover:text-[#a4773e]
                        transition-all duration-300 group-hover:rotate-12
                    `} />
                )}
            </div>

            {/* Tooltip */}
            <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                ${theme === 'dark'
                    ? 'bg-gray-800 text-gray-200 border border-gray-600'
                    : 'bg-gray-900 text-gray-100 border border-gray-700'
                }
                backdrop-blur-sm whitespace-nowrap z-50
            `}>
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                <div className={`
                    absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
                    ${theme === 'dark' ? 'border-t-gray-800' : 'border-t-gray-900'}
                `}></div>
            </div>
        </button>
    );
}
