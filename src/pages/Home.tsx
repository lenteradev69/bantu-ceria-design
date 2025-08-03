import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryTabs } from "@/components/category-tabs";
import { CampaignCard } from "@/components/campaign-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Dummy data based on the design system
const userData = {
  name: "Budi Santoso",
  status: "Pengguna Baru",
  avatarUrl: "https://placehold.co/40x40/E0E7FF/4F46E5?text=BS"
};

const urgentCampaigns = [
  {
    id: "camp1",
    title: "Bencana Alam Gempa di Cianjur",
    location: "Cugenang, Cianjur",
    imageUrl: "https://placehold.co/600x400/FEE2E2/DC2626?text=Bencana+Alam",
    collected: 150542000,
    target: 500000000,
    currency: "Rp",
    daysLeft: 2
  },
  {
    id: "camp2",
    title: "Bantuan Medis untuk Korban Banjir",
    location: "Demak, Jawa Tengah",
    imageUrl: "https://placehold.co/600x400/DBEAFE/3B82F6?text=Bantuan+Medis",
    collected: 75200000,
    target: 200000000,
    currency: "Rp",
    daysLeft: 15
  }
];

const featuredCampaigns = [
  {
    id: "camp3",
    title: "Bantu Pendidikan Anak Indonesia",
    category: "Pendidikan",
    location: "Jakarta, Indonesia",
    imageUrl: "https://placehold.co/600x400/D1FAE5/059669?text=Pendidikan",
    collected: 25000000,
    target: 50000000,
    currency: "Rp"
  },
  {
    id: "camp4",
    title: "Program Kesehatan Masyarakat",
    category: "Kesehatan",
    location: "Surabaya, Jawa Timur",
    imageUrl: "https://placehold.co/600x400/FEF3C7/F59E0B?text=Kesehatan",
    collected: 40000000,
    target: 80000000,
    currency: "Rp"
  }
];

const categories = ["Semua", "Pendidikan", "Kesehatan", "Sosial", "Lainnya"];

const bottomNavItems = [
  { label: "Beranda", icon: "home" },
  { label: "Riwayat", icon: "history" },
  { label: "Buat", icon: "add_circle" },
  { label: "Profil", icon: "profile" }
];

export default function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const filteredCampaigns = featuredCampaigns.filter(campaign => {
    if (activeCategory === "Semua") return true;
    return campaign.category === activeCategory;
  });

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleNavigation = (index: number) => {
    setActiveNavIndex(index);
    switch (index) {
      case 0:
        // Already on home
        break;
      case 1:
        navigate('/history');
        break;
      case 2:
        navigate('/create-campaign');
        break;
      case 3:
        navigate('/profile');
        break;
    }
  };

  const handleNotification = () => {
    navigate('/notifications');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <Header
        showProfile={true}
        showNotification={true}
        user={userData}
        onNotification={handleNotification}
        onProfile={() => navigate('/profile')}
      />

      {/* Main Content */}
      <div className="px-6 space-y-8">
        {/* Search Bar */}
        <SearchBar
          placeholder="Cari..."
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => console.log("Search:", value)}
        />

        {/* Urgent Needed Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Dibutuhkan Segera</h2>
            <Button variant="ghost" className="text-primary p-0 h-auto">
              Lihat Semua
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {urgentCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                onClick={() => handleCampaignClick(campaign.id)}
              />
            ))}
          </div>
        </section>

        {/* Featured Campaigns Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Kampanye Pilihan</h2>
            <Button variant="ghost" className="text-primary p-0 h-auto">
              Lihat Semua
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                onClick={() => handleCampaignClick(campaign.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={bottomNavItems.map((item, index) => ({
          ...item,
          onClick: () => handleNavigation(index)
        }))}
        activeIndex={activeNavIndex}
      />
    </div>
  );
}