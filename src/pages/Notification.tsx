import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

// Dummy data based on design system
const notifications = [
  {
    id: "notif1",
    message: "Update dari 'Bantu Pendidikan Anak': Dana tahap 1 telah disalurkan!",
    time: "2 jam yang lalu",
    isRead: false
  },
  {
    id: "notif2",
    message: "Donasi Anda sebesar Rp 200.000 untuk 'Bantuan Medis' telah berhasil.",
    time: "1 hari yang lalu",
    isRead: true
  },
  {
    id: "notif3",
    message: "Kampanye 'Bencana Alam Gempa di Cianjur' mendekati target! Terima kasih atas dukungan Anda.",
    time: "2 hari yang lalu",
    isRead: true
  },
  {
    id: "notif4",
    message: "Selamat datang di Platform Crowdfunding! Mulai berdonasi untuk membantu sesama.",
    time: "1 minggu yang lalu",
    isRead: true
  }
];

export default function Notification() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleNotificationClick = (notificationId: string) => {
    console.log("Notification clicked:", notificationId);
    // Mark as read logic would go here
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header
        title="Notifikasi"
        showBack={true}
        onBack={handleBack}
      />

      <div className="px-6 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`p-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    !notification.isRead ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Bell 
                      size={20} 
                      className={!notification.isRead ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-relaxed ${
                      !notification.isRead ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                      {!notification.isRead && (
                        <Badge variant="default" className="text-xs px-2 py-1">
                          Baru
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}