import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  showProfile?: boolean;
  user?: {
    name: string;
    status: string;
    avatarUrl: string;
  };
  onBack?: () => void;
  onNotification?: () => void;
  onProfile?: () => void;
}

export function Header({
  title,
  showBack = false,
  showNotification = false,
  showProfile = false,
  user,
  onBack,
  onNotification,
  onProfile
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 bg-transparent">
      <div className="flex items-center space-x-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-10 w-10"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        
        {title && (
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        )}
        
        {showProfile && user && (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.status}</p>
            </div>
          </div>
        )}
      </div>
      
      {showNotification && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotification}
          className="h-10 w-10"
        >
          <Bell size={20} />
        </Button>
      )}
    </header>
  );
}