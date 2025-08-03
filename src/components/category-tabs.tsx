import { Badge } from "@/components/ui/badge";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? "default" : "secondary"}
          className={`
            px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-colors
            ${activeCategory === category 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground hover:bg-accent"
            }
          `}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}