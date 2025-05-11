
import { useEffect } from "react";
import { ThemeShowcase } from "./ThemeShowcase";
import { useTheme } from "@/components/theme-provider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  // اطمینان از اینکه تم از localStorage بارگذاری می‌شود
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      // اعمال مستقیم تم به المنت HTML
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
      
      // اگر تم ذخیره شده با تم فعلی متفاوت است، آن را به‌روز می‌کنیم
      if (theme !== savedTheme) {
        setTheme(savedTheme as any);
      }
      
      // اطلاع رسانی به بقیه صفحات در مورد تغییر تم
      const event = new StorageEvent('storage', {
        key: "jahan-danesh-theme",
        newValue: savedTheme,
        storageArea: localStorage
      });
      window.dispatchEvent(event);
    }
  }, []);
  
  return <ThemeShowcase />;
}
