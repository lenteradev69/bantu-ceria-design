import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Shield, Bell, FileText, LogOut, ChevronRight } from "lucide-react";

// Dummy data based on design system
const userData = {
  name: "Budi Santoso",
  email: "budi.s@email.com",
  avatarUrl: "https://placehold.co/80x80/E0E7FF/4F46E5?text=BS"
};

const menuItems = [
  { id: "editProfile", label: "Ubah Profil", icon: Edit },
  { id: "accountSecurity", label: "Keamanan Akun", icon: Shield },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "myCampaigns", label: "Kampanye Saya", icon: FileText }
];

export default function Profile() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  const handleMenuClick = (menuId: string) => {
    switch (menuId) {
      case 'notifications':
        navigate('/notifications');
        break;
      default:
        console.log("Menu clicked:", menuId);
    }
  };

  const handleLogout = () => {
    // Logout logic and navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header
        title="Profil Saya"
        showBack={true}
        onBack={handleBack}
      />

      <div className="px-6 py-6 space-y-6">
        {/* User Profile Card */}
        <Card className="p-6 rounded-2xl">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="p-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMenuClick(item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <item.icon size={20} className="text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Card className="p-4 rounded-2xl">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Keluar
          </Button>
        </Card>
      </div>
    </div>
  );
}