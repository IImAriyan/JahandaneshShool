
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Moon, Palette, Laptop, Check } from "lucide-react";

export function ThemeShowcase() {
  const { theme, setTheme } = useTheme();
  
  const themeOptions = [
    {
      value: "light",
      label: "روشن",
      icon: Sun,
      color: "bg-gradient-to-br from-yellow-100 to-orange-50",
      accent: "ring-yellow-300",
      description: "تم کلاسیک با پس زمینه روشن",
      preview: "bg-white border-gray-200"
    },
    {
      value: "dark",
      label: "تیره",
      icon: Moon,
      color: "bg-gradient-to-br from-gray-800 to-slate-900",
      accent: "ring-gray-700",
      description: "تم با پس زمینه تیره برای استفاده در شب",
      preview: "bg-gray-900 border-gray-700"
    },
    {
      value: "blue",
      label: "آبی",
      icon: Palette,
      color: "bg-gradient-to-br from-blue-500 to-blue-400",
      accent: "ring-blue-400",
      description: "تم با رنگ‌های آبی آرامش‌بخش",
      preview: "bg-blue-50 border-blue-200"
    },
    {
      value: "purple",
      label: "بنفش",
      icon: Palette,
      color: "bg-gradient-to-br from-purple-500 to-purple-400",
      accent: "ring-purple-400",
      description: "تم بنفش خلاقانه و متفاوت",
      preview: "bg-purple-50 border-purple-200"
    },
    {
      value: "green",
      label: "سبز",
      icon: Palette,
      color: "bg-gradient-to-br from-green-500 to-green-400",
      accent: "ring-green-400",
      description: "تم سبز با انرژی طبیعت",
      preview: "bg-green-50 border-green-200"
    },
    {
      value: "system",
      label: "سیستم",
      icon: Laptop,
      color: "bg-gradient-to-br from-gray-300 to-gray-200",
      accent: "ring-gray-400",
      description: "تم منطبق با تنظیمات سیستم شما",
      preview: "bg-gradient-to-br from-white to-gray-100 border-gray-200"
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  // همگام‌سازی state با تم فعلی در صورت تغییر از خارج
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleThemeChange = (themeValue: string) => {
    setSelectedTheme(themeValue as any);
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
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">انتخاب تم مورد علاقه شما</h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base">تم مورد نظر خود را انتخاب کنید تا با سلیقه شما تطبیق یابد</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {themeOptions.map((option) => {
            const isActive = selectedTheme === option.value;
            const isHovered = hoveredTheme === option.value;
            const Icon = option.icon;
            
            return (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02, y: -3 }}
                className={cn(
                  "relative overflow-hidden rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300",
                  "border-2",
                  isActive ? "border-primary shadow-primary/20" : "border-transparent"
                )}
                onMouseEnter={() => setHoveredTheme(option.value)}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <div 
                  className={cn(
                    "p-4 md:p-6 h-full flex flex-col",
                    option.preview
                  )}
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center",
                      option.color
                    )}>
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold">{option.label}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{option.description}</p>
                    </div>
                    
                    {isActive && (
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-primary rounded-full p-1 text-primary-foreground">
                        <Check className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 mb-3 md:mb-4">
                    <div className="w-full h-16 md:h-24 rounded-lg border flex items-center justify-center mb-2">
                      <div className="w-full max-w-[80%] h-2 md:h-3 rounded-full bg-primary/70"></div>
                    </div>
                    <div className="flex gap-1 md:gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-primary/70"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-secondary/70"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-md bg-muted/70"></div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleThemeChange(option.value)}
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "w-full transition-all duration-300 text-sm md:text-base py-1 md:py-2",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    {isActive ? "انتخاب شده" : "انتخاب تم"}
                  </Button>
                </div>
                
                {(isActive || isHovered) && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
