import { Home, History, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface BottomNavigationProps {
  items: NavItem[];
  activeIndex?: number;
}

const iconMap = {
  home: Home,
  history: History,
  add_circle: Plus,
  profile: User,
};

export function BottomNavigation({ items, activeIndex = 0 }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          const isActive = index === activeIndex;
          
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center space-y-1 py-2 px-3 min-w-0 flex-1"
            >
              <IconComponent 
                size={24} 
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span 
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}