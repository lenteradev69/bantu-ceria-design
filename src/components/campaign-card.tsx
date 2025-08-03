import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CampaignCardProps {
  title: string;
  location: string;
  imageUrl: string;
  collected: number;
  target: number;
  currency: string;
  daysLeft?: number;
  category?: string;
  onClick?: () => void;
}

export function CampaignCard({
  title,
  location,
  imageUrl,
  collected,
  target,
  currency,
  daysLeft,
  category,
  onClick
}: CampaignCardProps) {
  const progressPercentage = (collected / target) * 100;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <Card 
      className="p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative mb-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
        {category && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-white/90 text-foreground"
          >
            {category}
          </Badge>
        )}
        {daysLeft !== undefined && (
          <Badge 
            variant={daysLeft <= 7 ? "destructive" : "default"}
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full"
          >
            {daysLeft} hari
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs mt-1">{location}</p>
        </div>
        
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-foreground">
              {currency} {formatCurrency(collected)}
            </span>
            <span className="text-muted-foreground">
              dari {currency} {formatCurrency(target)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}