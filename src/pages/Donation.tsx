import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus } from "lucide-react";

// Dummy data based on design system
const donationData = {
  organizationName: "Yayasan Kita Peduli",
  campaignTitle: "Bencana alam gempa di Cianjur",
  defaultAmount: 50000,
  amountOptions: [50000, 100000, 200000],
  currencySymbol: "Rp",
  paymentMethods: [
    {
      id: "pay1",
      name: "Budi Santoso",
      details: "BCA 0899 XXXX XXXX",
      logoUrl: "https://placehold.co/40x40/EFF6FF/3B82F6?text=BCA"
    }
  ]
};

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState(donationData.defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(donationData.paymentMethods[0].id);
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setIsCustomAmount(true);
    if (value) {
      setSelectedAmount(parseInt(value.replace(/\D/g, '')));
    }
  };

  const handleDonate = () => {
    const finalAmount = isCustomAmount ? parseInt(customAmount.replace(/\D/g, '')) : selectedAmount;
    console.log("Donate amount:", finalAmount, "Payment method:", selectedPayment);
    // Process donation logic would go here
  };

  const handleBack = () => {
    console.log("Navigate back");
    // Navigation logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        title="Detail Donasi"
        showBack={true}
        onBack={handleBack}
      />

      <div className="px-6 py-6 space-y-6">
        {/* Donation Target */}
        <Card className="p-4 rounded-2xl">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Donasi untuk</p>
            <h3 className="font-bold text-foreground">{donationData.organizationName}</h3>
            <p className="text-sm text-muted-foreground">{donationData.campaignTitle}</p>
          </div>
        </Card>

        {/* Amount Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            Berapa banyak yang ingin Anda kirim?
          </h3>
          
          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3">
            {donationData.amountOptions.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount && !isCustomAmount ? "default" : "outline"}
                className="py-4 rounded-2xl font-medium"
                onClick={() => handleAmountSelect(amount)}
              >
                {donationData.currencySymbol} {formatCurrency(amount)}
              </Button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
              {donationData.currencySymbol}
            </div>
            <Input
              type="text"
              placeholder="Nominal lainnya"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="pl-12 py-4 bg-input border-0 rounded-2xl text-base focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">Pilih Pembayaran</h3>
          
          <div className="space-y-3">
            {donationData.paymentMethods.map((method) => (
              <Card 
                key={method.id}
                className={`p-4 rounded-2xl cursor-pointer transition-colors ${
                  selectedPayment === method.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={method.logoUrl}
                      alt={method.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-foreground">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.details}</p>
                    </div>
                  </div>
                  {selectedPayment === method.id && (
                    <CheckCircle className="text-primary" size={20} />
                  )}
                </div>
              </Card>
            ))}
            
            {/* Add New Payment Method */}
            <Card className="p-4 rounded-2xl cursor-pointer border-dashed border-2 border-muted">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Plus size={20} />
                <span className="font-medium">Tambah Metode Pembayaran Baru</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed Donate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Total Donasi</span>
            <span className="font-bold text-lg text-foreground">
              {donationData.currencySymbol} {formatCurrency(selectedAmount || donationData.defaultAmount)}
            </span>
          </div>
          <Button 
            className="w-full py-4 rounded-full text-base font-medium"
            onClick={handleDonate}
            disabled={!selectedAmount}
          >
            Donasi Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}