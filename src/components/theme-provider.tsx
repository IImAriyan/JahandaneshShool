
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "blue" | "purple" | "green" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "jahan-danesh-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // پاک کردن تمام کلاس‌های تم قبلی
    root.classList.remove("light", "dark", "blue", "purple", "green");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    
    // به‌روزرسانی localStorage در صورت تغییر تم
    localStorage.setItem(storageKey, theme);
    
    // اطلاع رسانی به بقیه صفحات در مورد تغییر تم
    const event = new StorageEvent('storage', {
      key: storageKey,
      newValue: theme,
      storageArea: localStorage
    });
    window.dispatchEvent(event);
  }, [theme, storageKey]);

  // گوش دادن به تغییرات localStorage برای همگام‌سازی بین صفحات
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setTheme(e.newValue as Theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // اطمینان از بارگذاری صحیح تم در هنگام اولین بارگذاری صفحه
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
