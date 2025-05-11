
import { Users, BookOpen, School, Award, TrendingUp } from "lucide-react";
import { Trophy } from "./Trophy";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

type Stat = {
  icon: React.ElementType;
  value: number | string;
  label: string;
  increase?: string;
  color: {
    light: string;
    dark: string;
    blue: string;
    purple: string;
    green: string;
  };
};

export function StatsSection() {
  const { theme } = useTheme();
  
  const stats: Stat[] = [
    {
      icon: Users,
      value: 428,
      label: "دانش آموز",
      increase: "+12% نسبت به سال قبل",
      color: {
        light: "bg-blue-100 text-blue-600",
        dark: "bg-blue-900 text-blue-400",
        blue: "bg-blue-200 text-blue-700",
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-100 text-green-600"
      }
    },
    {
      icon: BookOpen,
      value: 32,
      label: "معلم",
      increase: "+4 استاد جدید",
      color: {
        light: "bg-green-100 text-green-600",
        dark: "bg-green-900 text-green-400",
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-200 text-purple-700",
        green: "bg-green-200 text-green-700"
      }
    },
    {
      icon: School,
      value: 9,
      label: "پایه تحصیلی",
      color: {
        light: "bg-purple-100 text-purple-600",
        dark: "bg-purple-900 text-purple-400",
        blue: "bg-blue-200 text-blue-700",
        purple: "bg-purple-300 text-purple-800",
        green: "bg-green-100 text-green-600"
      }
    },
    {
      icon: Award,
      value: 15,
      label: "سال سابقه",
      increase: "تجربه آموزشی",
      color: {
        light: "bg-amber-100 text-amber-600",
        dark: "bg-amber-900 text-amber-400",
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-200 text-green-700"
      }
    },
    {
      icon: Trophy,
      value: "85%",
      label: "قبولی در مدارس برتر",
      increase: "+5% نسبت به سال قبل",
      color: {
        light: "bg-red-100 text-red-600",
        dark: "bg-red-900 text-red-400",
        blue: "bg-blue-200 text-blue-700",
        purple: "bg-purple-200 text-purple-700",
        green: "bg-green-300 text-green-800"
      }
    }
  ];

  // انتخاب پس‌زمینه متناسب با تم
  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 to-gray-800";
      case "blue":
        return "bg-gradient-to-br from-blue-50 via-blue-100 to-white";
      case "purple":
        return "bg-gradient-to-br from-purple-50 via-purple-100 to-white";
      case "green":
        return "bg-gradient-to-br from-green-50 via-green-100 to-white";
      default:
        return "bg-gradient-to-br from-schoolblue-50 via-schoolblue-100 to-white";
    }
  };

  // انتخاب رنگ آیکون متناسب با تم
  const getIconColor = (stat: Stat) => {
    switch (theme) {
      case "dark":
        return stat.color.dark;
      case "blue":
        return stat.color.blue;
      case "purple":
        return stat.color.purple;
      case "green":
        return stat.color.green;
      default:
        return stat.color.light;
    }
  };

  // انیمیشن برای اعداد
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className={`py-20 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={cn(
            "text-4xl font-bold mb-2",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            آمار و دستاوردها
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-2xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            افتخار ما به نتایج درخشان دانش‌آموزان و کیفیت آموزشی ماست
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div 
                key={index}
                className={cn(
                  "rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl",
                  "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border",
                  theme === "green" ? "border-green-200 hover:border-green-300" : 
                  theme === "purple" ? "border-purple-200 hover:border-purple-300" : 
                  theme === "blue" ? "border-blue-200 hover:border-blue-300" : 
                  theme === "dark" ? "border-gray-700 hover:border-gray-600" :
                  "border-gray-100 hover:border-gray-200"
                )}
                variants={item}
                whileHover={{ 
                  y: -5, 
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden",
                    getIconColor(stat)
                  )}>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1
                      }}
                    >
                      <Icon className="w-10 h-10" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute inset-0 opacity-25"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: index * 0.2
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-current opacity-20"></div>
                    </motion.div>
                  </div>
                </div>
                
                <motion.div 
                  className={cn(
                    "text-4xl font-bold mb-1",
                    theme === "green" ? "text-green-700 dark:text-green-300" :
                    theme === "purple" ? "text-purple-700 dark:text-purple-300" :
                    theme === "blue" ? "text-blue-700 dark:text-blue-300" :
                    "text-gray-900 dark:text-white"
                  )}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-base font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
                
                {stat.increase && (
                  <div className="mt-2 flex items-center justify-center text-sm font-medium text-green-600 dark:text-green-400">
                    <TrendingUp size={14} className="mr-1" />
                    {stat.increase}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
