import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { type NavItem } from '@/types';

interface NavigationProps {
  items: NavItem[];
}

export function Navigation({ items }: NavigationProps) {
  const { url } = usePage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return url === href || url.startsWith(href + '/');
  };

  const isParentActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    if (item.subItems) {
      return item.subItems.some((subItem: { href: string; }) => isActive(subItem.href));
    }
    return false;
  };

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedItems.includes(item.title);
        const parentActive = isParentActive(item);

        return (
          <div key={item.title}>
            {hasSubItems ? (
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  parentActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && React.createElement(item.icon, { className: "h-5 w-5" })}
                  <span>{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.icon && React.createElement(item.icon, { className: "h-5 w-5" })}
                <span>{item.title}</span>
              </Link>
            )}

            {hasSubItems && isExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {item.subItems?.map((subItem: NavItem) => (
                  <Link
                    key={subItem.title}
                    href={subItem.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors',
                      isActive(subItem.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {subItem.icon && React.createElement(subItem.icon, { className: "h-4 w-4" })}
                    <span>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}