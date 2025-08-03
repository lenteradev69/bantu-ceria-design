import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data based on design system
const donations = [
  {
    id: "don1",
    campaignTitle: "Bantu Pendidikan Anak Indonesia",
    date: "15 Juli 2024",
    amount: 100000,
    currency: "Rp",
    status: "Berhasil",
    imageUrl: "https://placehold.co/80x80/D1FAE5/059669?text=Pendidikan"
  },
  {
    id: "don2",
    campaignTitle: "Bantuan Medis untuk Korban Banjir",
    date: "10 Juli 2024",
    amount: 200000,
    currency: "Rp",
    status: "Berhasil",
    imageUrl: "https://placehold.co/80x80/DBEAFE/3B82F6?text=Bantuan+Medis"
  },
  {
    id: "don3",
    campaignTitle: "Bencana Alam Gempa di Cianjur",
    date: "5 Juli 2024",
    amount: 150000,
    currency: "Rp",
    status: "Berhasil",
    imageUrl: "https://placehold.co/80x80/FEE2E2/DC2626?text=Bencana+Alam"
  }
];

export default function History() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const handleDonationClick = (donationId: string) => {
    console.log("View donation details:", donationId);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header
        title="Riwayat Donasi"
        showBack={true}
        onBack={handleBack}
      />

      <div className="px-6 py-6">
        {donations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Belum ada riwayat donasi</p>
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card 
                key={donation.id}
                className="p-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleDonationClick(donation.id)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={donation.imageUrl}
                    alt={donation.campaignTitle}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                      {donation.campaignTitle}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {donation.date}
                        </p>
                        <p className="font-bold text-foreground">
                          {donation.currency} {formatCurrency(donation.amount)}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-success/10 text-success border-success/20"
                      >
                        {donation.status}
                      </Badge>
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