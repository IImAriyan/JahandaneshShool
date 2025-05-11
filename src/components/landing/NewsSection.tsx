
import { CalendarIcon, ArrowRight, Bell, Tag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags?: string[];
  image?: string;
  important?: boolean;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "ثبت نام سال تحصیلی جدید",
    excerpt: "ثبت نام برای سال تحصیلی ۱۴۰۴-۱۴۰۵ از تاریخ ۱۵ خرداد آغاز می‌شود. لطفاً جهت اطلاع از مدارک مورد نیاز به سایت مراجعه نمایید.",
    date: "۱۴۰۴/۰۲/۲۵",
    category: "اطلاعیه",
    tags: ["ثبت نام", "سال تحصیلی جدید"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&q=80&auto=format&fit=crop",
    important: true
  },
  {
    id: 2,
    title: "برگزاری جشن پایان سال تحصیلی",
    excerpt: "جشن پایان سال تحصیلی با حضور دانش آموزان و والدین در تاریخ ۵ خرداد در سالن اجتماعات مدرسه برگزار خواهد شد.",
    date: "۱۴۰۴/۰۲/۲۰",
    category: "رویداد",
    tags: ["جشن", "پایان سال"],
    image: "https://images.unsplash.com/photo-1540151812223-7e51f2c5e4ad?ixlib=rb-4.0.3&q=80&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "نتایج مسابقات علمی استانی",
    excerpt: "دانش آموزان مدرسه جهان دانش موفق به کسب ۵ مقام برتر در مسابقات علمی استان کرمان شدند.",
    date: "۱۴۰۴/۰۲/۱۰",
    category: "افتخارات",
    tags: ["مسابقات علمی", "افتخارآفرینی"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&q=80&auto=format&fit=crop"
  }
];

export function NewsSection() {
  const { theme } = useTheme();
  
  // تعیین کلاس‌های مناسب برای پس‌زمینه بر اساس تم
  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-b from-gray-900 to-gray-950";
      case "blue":
        return "bg-gradient-to-b from-blue-50 to-blue-100/30";
      case "purple":
        return "bg-gradient-to-b from-purple-50 to-purple-100/30";
      case "green":
        return "bg-gradient-to-b from-green-50 to-green-100/30"; 
      default:
        return "bg-gradient-to-b from-gray-50 to-white";
    }
  };
  
  // تعیین کلاس‌های مناسب برای کارت مهم بر اساس تم
  const getImportantCardBorderClass = () => {
    switch (theme) {
      case "dark":
        return "border-amber-500/50";
      case "blue":
        return "border-blue-400";
      case "purple":
        return "border-purple-400";
      case "green":
        return "border-green-400";
      default:
        return "border-schoolblue-400";
    }
  };

  const getBadgeClass = (important: boolean) => {
    if (!important) return "bg-gray-500/70 hover:bg-gray-600";
    
    switch (theme) {
      case "dark":
        return "bg-amber-500 hover:bg-amber-600";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "purple":
        return "bg-purple-500 hover:bg-purple-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-schoolblue-500 hover:bg-schoolblue-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "اطلاعیه":
        return <Bell size={14} className="ml-1" />;
      case "رویداد":
        return <Tag size={14} className="ml-1" />;
      case "افتخارات":
        return <Star size={14} className="ml-1" />;
      default:
        return null;
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <section id="news" className={`py-20 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            <span className={cn(
              "inline-block relative",
              theme === "dark" 
                ? "after:bg-amber-500/20" 
                : theme === "green" 
                  ? "after:bg-green-200" 
                  : theme === "purple" 
                    ? "after:bg-purple-200" 
                    : theme === "blue" 
                      ? "after:bg-blue-200" 
                      : "after:bg-schoolblue-200",
              "after:absolute after:right-0 after:left-0 after:bottom-2 after:h-3 after:-z-10"
            )}>
              اخبار و اطلاعیه‌ها
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            آخرین اخبار و رویدادهای مدرسه جهان دانش را دنبال کنید
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {newsItems.map((news) => (
            <motion.div 
              key={news.id} 
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card 
                className={cn(
                  "h-full overflow-hidden transition-all duration-300 hover:shadow-xl",
                  news.important ? `border-2 ${getImportantCardBorderClass()} shadow-lg` : "",
                  theme === "green" ? "border-green-200" : 
                  theme === "purple" ? "border-purple-200" : 
                  theme === "blue" ? "border-blue-200" : "",
                  "border"
                )}
              >
                {news.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "py-1 px-3 flex items-center",
                          getBadgeClass(!!news.important)
                        )}
                      >
                        {getCategoryIcon(news.category)}
                        {news.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-sm text-white flex items-center">
                      <CalendarIcon className="h-3 w-3 ml-1" />
                      <span>{news.date}</span>
                    </div>
                  </div>
                )}
                
                <CardHeader className={news.image ? "pt-4 pb-2" : "pb-2"}>
                  <div className={cn("flex justify-between items-start", news.image ? "" : "mb-2")}>
                    {!news.image && (
                      <Badge 
                        variant={news.important ? "default" : "secondary"} 
                        className={cn(
                          "flex items-center",
                          !news.image && getBadgeClass(!!news.important)
                        )}
                      >
                        {getCategoryIcon(news.category)}
                        {news.category}
                      </Badge>
                    )}
                    {!news.image && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 ml-1" />
                        <span>{news.date}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className={cn(
                    "text-lg md:text-xl font-bold",
                    theme === "green" ? "text-green-800 dark:text-green-300" :
                    theme === "purple" ? "text-purple-800 dark:text-purple-300" :
                    theme === "blue" ? "text-blue-800 dark:text-blue-300" :
                    "text-gray-900 dark:text-white"
                  )}>{news.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{news.excerpt}</p>
                  
                  {news.tags && news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {news.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={cn(
                            "text-xs inline-block py-1 px-2 rounded-full",
                            theme === "dark" ? "bg-gray-800 text-gray-300" :
                            theme === "green" ? "bg-green-100 text-green-700" :
                            theme === "purple" ? "bg-purple-100 text-purple-700" :
                            theme === "blue" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          )}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "w-full gap-2 justify-center border",
                      theme === "green" ? "text-green-700 hover:text-green-800 border-green-200 hover:bg-green-50" :
                      theme === "purple" ? "text-purple-700 hover:text-purple-800 border-purple-200 hover:bg-purple-50" :
                      theme === "blue" ? "text-blue-700 hover:text-blue-800 border-blue-200 hover:bg-blue-50" :
                      theme === "dark" ? "text-amber-400 hover:text-amber-300 border-gray-800 hover:bg-gray-800" :
                      "text-schoolblue-700 hover:text-schoolblue-800 border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    مشاهده جزئیات
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className={cn(
              "group relative overflow-hidden transition-all duration-300 border-2",
              theme === "green" ? "border-green-500 text-green-700 hover:text-white" :
              theme === "purple" ? "border-purple-500 text-purple-700 hover:text-white" :
              theme === "blue" ? "border-blue-500 text-blue-700 hover:text-white" :
              theme === "dark" ? "border-amber-500 text-amber-400 hover:text-black" :
              "border-schoolblue-500 text-schoolblue-700 hover:text-white"
            )}
          >
            <span className={cn(
              "absolute inset-0 w-0 group-hover:w-full transition-all duration-300 h-full",
              theme === "green" ? "bg-green-500" :
              theme === "purple" ? "bg-purple-500" :
              theme === "blue" ? "bg-blue-500" :
              theme === "dark" ? "bg-amber-500" :
              "bg-schoolblue-500"
            )}></span>
            <span className="relative flex items-center gap-2">
              مشاهده همه اخبار
              <ArrowRight size={16} className="rtl:rotate-180" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
