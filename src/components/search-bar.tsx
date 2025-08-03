import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export function SearchBar({ 
  placeholder = "Cari...", 
  value, 
  onChange, 
  onSearch 
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch && value) {
      onSearch(value);
    }
  };

  return (
    <div className="relative">
      <Search 
        size={20} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-12 pr-4 py-3 bg-input border-0 rounded-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-0"
      />
    </div>
  );
}