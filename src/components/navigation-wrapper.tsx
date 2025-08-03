import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation } from "@/components/bottom-navigation";

const bottomNavItems = [
  { label: "Beranda", icon: "home" },
  { label: "Riwayat", icon: "history" },
  { label: "Buat", icon: "add_circle" },
  { label: "Profil", icon: "profile" }
];

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active index based on current route
  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/history') return 1;
    if (path === '/create-campaign') return 2;
    if (path === '/profile') return 3;
    return 0;
  };

  const handleNavigation = (index: number) => {
    switch (index) {
      case 0:
        navigate('/');
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

  // Hide navigation on certain pages
  const shouldShowNavigation = () => {
    const hiddenPaths = ['/campaign/', '/donation/', '/notifications'];
    return !hiddenPaths.some(path => location.pathname.includes(path));
  };

  return (
    <>
      {children}
      {shouldShowNavigation() && (
        <BottomNavigation
          items={bottomNavItems.map((item, index) => ({
            ...item,
            onClick: () => handleNavigation(index)
          }))}
          activeIndex={getActiveIndex()}
        />
      )}
    </>
  );
}