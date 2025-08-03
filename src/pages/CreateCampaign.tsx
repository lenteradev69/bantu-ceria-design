import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";

// Form data based on design system
const categories = ["Pendidikan", "Kesehatan", "Sosial", "Lingkungan"];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    category: "",
    imageFile: null as File | null
  });

  const handleBack = () => {
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Create campaign:", formData);
    // Process campaign creation and navigate to success
    navigate('/');
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(parseInt(number) || 0);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <Header
        title="Buat Kampanye Baru"
        showBack={true}
        onBack={handleBack}
      />

      <div className="px-6 py-6 space-y-6">
        {/* Form Fields */}
        <Card className="p-6 rounded-2xl space-y-6">
          {/* Campaign Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Judul Kampanye
            </Label>
            <Input
              id="title"
              placeholder="Contoh: Bangun Sekolah di Desa"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="rounded-lg border-border focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Jelaskan tujuan kampanye Anda"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="rounded-lg border-border focus:ring-primary min-h-24"
              rows={4}
            />
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="target" className="text-sm font-medium text-foreground">
              Target Donasi
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                Rp
              </span>
              <Input
                id="target"
                placeholder="50.000.000"
                value={formData.target}
                onChange={(e) => {
                  const formatted = formatCurrency(e.target.value);
                  handleInputChange("target", formatted);
                }}
                className="pl-10 rounded-lg border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Kategori
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="rounded-lg border-border focus:ring-primary">
                <SelectValue placeholder="Pilih kategori kampanye" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Unggah Foto Sampul
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                {formData.imageFile ? (
                  <div className="text-center">
                    <ImageIcon size={32} className="text-primary mx-auto mb-2" />
                    <p className="text-sm text-foreground">{formData.imageFile.name}</p>
                    <p className="text-xs text-muted-foreground">Klik untuk mengubah</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-foreground">Klik untuk unggah foto</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG maksimal 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
        <Button 
          className="w-full py-4 rounded-full text-base font-medium"
          onClick={handleSubmit}
          disabled={!formData.title || !formData.description || !formData.target || !formData.category}
        >
          Publikasikan Kampanye
        </Button>
      </div>
    </div>
  );
}