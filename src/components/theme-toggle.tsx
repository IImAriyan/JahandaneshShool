
import { Moon, Sun, Palette, Laptop, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // اطمینان از صحت تم اولیه با localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme && theme !== savedTheme) {
      setTheme(savedTheme as any);
    }
  }, []);
  
  const themeOptions = [
    { value: "light", label: "روشن", icon: Sun, color: "bg-gradient-to-br from-yellow-100 to-orange-50" },
    { value: "dark", label: "تیره", icon: Moon, color: "bg-gradient-to-br from-gray-800 to-slate-900" },
    { value: "blue", label: "آبی", icon: Palette, color: "bg-gradient-to-br from-blue-500 to-blue-400" },
    { value: "purple", label: "بنفش", icon: Palette, color: "bg-gradient-to-br from-purple-500 to-purple-400" },
    { value: "green", label: "سبز", icon: Palette, color: "bg-gradient-to-br from-green-500 to-green-400" },
    { value: "system", label: "سیستم", icon: Laptop, color: "bg-gradient-to-br from-gray-300 to-gray-200" },
  ];

  // نمایش آیکون مناسب بر اساس تم فعلی
  const getIconForCurrentTheme = () => {
    switch(theme) {
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case 'blue':
        return <Palette className="h-[1.2rem] w-[1.2rem] text-blue-500" />;
      case 'purple':
        return <Palette className="h-[1.2rem] w-[1.2rem] text-purple-500" />;
      case 'green':
        return <Palette className="h-[1.2rem] w-[1.2rem] text-green-500" />;
      case 'system':
        return <Laptop className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };
  
  const handleThemeChange = (themeValue: string) => {
    setTheme(themeValue as any);
    
    // ذخیره تم در localStorage و اعمال مستقیم به <html> برای اطمینان از تغییر فوری
    localStorage.setItem("jahan-danesh-theme", themeValue);
    
    // اعمال مستقیم کلاس به root المنت
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "blue", "purple", "green");
    if (themeValue !== "system") {
      root.classList.add(themeValue);
    } else {
      // اگر سیستم انتخاب شده، بررسی می‌کنیم که تم سیستم چیست
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    }
    
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full overflow-hidden border-2 hover:border-primary transition-all duration-300"
          aria-label="تغییر تم"
        >
          {getIconForCurrentTheme()}
          <span className="sr-only">انتخاب تم</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-56 p-2 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-2 border-primary/20 rounded-xl shadow-xl"
      >
        <div className="grid grid-cols-2 gap-2">
          {themeOptions.map((option) => {
            const isActive = theme === option.value;
            const Icon = option.icon;
            
            return (
              <DropdownMenuItem 
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 h-20 md:h-24 rounded-lg transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 ring-2 ring-primary" 
                    : "hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center",
                  option.color
                )}>
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1"
                    >
                      <Check className="h-3 w-3" />
                    </motion.div>
                  )}
                </div>
                <span className={cn(
                  "text-xs md:text-sm font-medium",
                  isActive ? "text-primary" : "text-foreground"
                )}>
                  {option.label}
                </span>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
