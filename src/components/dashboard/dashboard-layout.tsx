
import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolLogo } from "@/components/school-logo";
import { cn } from "@/lib/utils";
import { LogOut, Bell, Home, Calendar, Users, User, Clock, BookOpen, ChartBar, Settings, FileCheck, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";

interface DashboardLayoutProps {
  userType: "admin" | "teacher" | "parent";
  children: React.ReactNode;
}

export function DashboardLayout({ userType, children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [userName, setUserName] = useState("کاربر جهان دانش"); // In a real app this would come from auth

  // اطمینان از بارگذاری تم از localStorage و اجرا در کل برنامه
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
      
      // اگر تم ذخیره شده با تم فعلی متفاوت است، آن را به‌روز می‌کنیم
      if (theme !== savedTheme) {
        setTheme(savedTheme as any);
      }
    }
  }, [theme, setTheme]);

  // Define menu items based on user type
  const getMenuItems = () => {
    switch (userType) {
      case "admin":
        return [
          { title: "داشبورد", url: `/${userType}-dashboard`, icon: Home },
          { title: "مدیریت کاربران", url: `/${userType}-dashboard/users`, icon: Users },
          { title: "مدیریت کلاس ها", url: `/${userType}-dashboard/classes`, icon: Calendar },
          { title: "حضور و غیاب", url: `/${userType}-dashboard/attendance`, icon: FileCheck },
          { title: "برنامه کلاسی", url: `/${userType}-dashboard/schedule`, icon: CalendarDays },
          { title: "گزارشات", url: `/${userType}-dashboard/reports`, icon: ChartBar },
          { title: "تنظیمات", url: `/${userType}-dashboard/settings`, icon: Settings },
        ];
      case "teacher":
        return [
          { title: "داشبورد", url: `/${userType}-dashboard`, icon: Home },
          { title: "ثبت نمرات", url: `/${userType}-dashboard/grades`, icon: BookOpen },
          { title: "حضور و غیاب", url: `/${userType}-dashboard/attendance`, icon: Clock },
          { title: "گزارشات", url: `/${userType}-dashboard/reports`, icon: ChartBar },
          { title: "پروفایل", url: `/${userType}-dashboard/profile`, icon: User },
        ];
      case "parent":
        return [
          { title: "داشبورد", url: `/${userType}-dashboard`, icon: Home },
          { title: "کارنامه", url: `/${userType}-dashboard/grades`, icon: BookOpen },
          { title: "حضور و غیاب", url: `/${userType}-dashboard/attendance`, icon: Clock },
          { title: "پروفایل", url: `/${userType}-dashboard/profile`, icon: User },
          { title: "تقویم آموزشی", url: `/${userType}-dashboard/calendar`, icon: Calendar },
        ];
      default:
        return [];
    }
  };

  const isActiveLink = (url: string) => {
    return location.pathname === url;
  };

  const handleLogout = () => {
    toast({
      title: "خروج موفق",
      description: "شما با موفقیت از سیستم خارج شدید",
    });
    navigate("/portal");
  };

  // انتخاب کلاس‌های sidebar بر اساس تم
  const getSidebarClasses = () => {
    const baseClasses = "w-64 border-l border-sidebar-border h-screen flex flex-col";
    
    switch (theme) {
      case "light":
        return `${baseClasses} bg-white`;
      case "dark":
        return `${baseClasses} bg-gray-900`;
      case "blue":
        return `${baseClasses} bg-blue-50`;
      case "purple":
        return `${baseClasses} bg-purple-50`;
      case "green":
        return `${baseClasses} bg-green-50`;
      default:
        return `${baseClasses} bg-sidebar`;
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse rtl bg-background">
      {/* Right Sidebar - Fixed position */}
      <aside className={getSidebarClasses()}>
        <div className="flex items-center justify-center py-6">
          <SchoolLogo size="medium" />
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto px-2">
          <div className="mb-4">
            <div className="px-2 mb-2">
              <h3 className="text-xs font-medium text-sidebar-foreground/70">منوی اصلی</h3>
            </div>
            <ul className="space-y-1">
              {getMenuItems().map((item) => (
                <li key={item.title}>
                  <Link 
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActiveLink(item.url) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {userName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userType === "admin" ? "مدیر سیستم" : 
                   userType === "teacher" ? "معلم" : "والدین"}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="h-4 w-4" />
            <span>خروج</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-card">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              {userType === "admin" ? "پنل مدیریت" : 
               userType === "teacher" ? "پنل معلم" : "پنل والدین"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
