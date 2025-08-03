import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, CheckCircle } from "lucide-react";

// Dummy data based on design system
const campaignData = {
  id: "camp1",
  title: "Bencana Alam Gempa di Cianjur",
  imageUrl: "https://placehold.co/600x400/FEE2E2/DC2626?text=Bencana+Alam",
  location: "Cugenang, Cianjur, Jawa Barat",
  description: "Bencana alam adalah dampak yang sangat berbahaya dari suatu peristiwa alam. Contohnya gempa bumi di Cianjur telah menyebabkan kerusakan yang luas dan membutuhkan bantuan segera dari kita semua untuk pemulihan.",
  category: "Sosial",
  daysLeft: 2,
  donationType: "Sosial",
  organization: {
    name: "Yayasan Kita Peduli",
    status: "Akun Terverifikasi",
    avatarUrl: "https://placehold.co/40x40/E0E7FF/4F46E5?text=YK"
  },
  collected: 150542000,
  target: 500000000,
  currency: "Rp"
};

export default function CampaignDetail() {
  const progressPercentage = (campaignData.collected / campaignData.target) * 100;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const handleDonate = () => {
    console.log("Navigate to donation page");
    // Navigation logic would go here
  };

  const handleBack = () => {
    console.log("Navigate back");
    // Navigation logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        showBack={true}
        onBack={handleBack}
      />

      {/* Campaign Image */}
      <div className="relative">
        <img
          src={campaignData.imageUrl}
          alt={campaignData.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <Badge 
            variant="secondary" 
            className="mb-2 bg-white/90 text-foreground"
          >
            {campaignData.category}
          </Badge>
          <h1 className="text-xl font-bold text-white mb-2">
            {campaignData.title}
          </h1>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin size={16} className="mr-2" />
            {campaignData.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Organization Info */}
        <Card className="p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={campaignData.organization.avatarUrl} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {campaignData.organization.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">
                {campaignData.organization.name}
              </h3>
              <div className="flex items-center text-success text-sm">
                <CheckCircle size={14} className="mr-1" />
                {campaignData.organization.status}
              </div>
            </div>
          </div>
        </Card>

        {/* Campaign Progress */}
        <Card className="p-4 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dana Terkumpul</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              {campaignData.daysLeft} hari lagi
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-bold text-foreground">
                  {campaignData.currency} {formatCurrency(campaignData.collected)}
                </span>
                <span className="text-sm text-muted-foreground">
                  dari {campaignData.currency} {formatCurrency(campaignData.target)}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}% tercapai
              </span>
              <span className="text-muted-foreground">
                {Math.floor(Math.random() * 1000) + 500} donatur
              </span>
            </div>
          </div>
        </Card>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Deskripsi</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {campaignData.description}
          </p>
        </div>
      </div>

      {/* Fixed Donate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
        <Button 
          className="w-full py-4 rounded-full text-base font-medium"
          onClick={handleDonate}
        >
          Donasi Sekarang
        </Button>
      </div>
    </div>
  );
}