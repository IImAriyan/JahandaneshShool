
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

interface TestCredentials {
  [key: string]: {
    username: string;
    password: string;
  };
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<"admin" | "teacher" | "parent">("admin");
  const { theme, setTheme } = useTheme();
  
  // بارگذاری تم از localStorage در هنگام بارگذاری صفحه
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
  
  // Login handlers - in a real app these would make API calls
  const handleAdminLogin = async (username: string, password: string) => {
    console.log("Admin login:", username, password);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return username === "admin" && password === "admin123";
  };

  const handleTeacherLogin = async (username: string, password: string) => {
    console.log("Teacher login:", username, password);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return username === "teacher" && password === "teacher123";
  };

  const handleParentLogin = async (username: string, password: string) => {
    console.log("Parent login:", username, password);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return username === "parent" && password === "parent123";
  };

  const loginHandlers = {
    admin: handleAdminLogin,
    teacher: handleTeacherLogin,
    parent: handleParentLogin,
  };

  const testCredentials: TestCredentials = {
    admin: { username: "admin", password: "admin123" },
    teacher: { username: "teacher", password: "teacher123" },
    parent: { username: "parent", password: "parent123" },
  };

  // تعیین کلاس‌های پس‌زمینه بر اساس تم فعلی
  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "from-gray-900 to-gray-950";
      case "blue":
        return "from-blue-50 to-blue-100";
      case "purple":
        return "from-purple-50 to-purple-100";
      case "green":
        return "from-green-50 to-green-100";
      default:
        return "from-schoolblue-50 to-white";
    }
  };

  // تعیین کلاس‌های اطلاعیه تست بر اساس تم
  const getNoticeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-yellow-900/20 border-yellow-800 text-yellow-300";
      case "blue":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "purple":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "green":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundClasses()} p-4 rtl`}>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/90 transition-colors">
            <ArrowLeft className="h-4 w-4 ml-1" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
          
        </div>
        
        <div className="mb-6 flex justify-center">
          <Tabs
            defaultValue="admin"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="admin">مدیر</TabsTrigger>
              <TabsTrigger value="teacher">معلم</TabsTrigger>
              <TabsTrigger value="parent">والدین</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <LoginForm 
          userType={activeTab} 
          onLogin={loginHandlers[activeTab]} 
        />
        
        <div className={`mt-6 p-4 rounded-lg border text-sm ${getNoticeClasses()}`}>
          <h3 className="font-bold mb-1">اطلاعات کاربری برای تست</h3>
          <p className="mb-2">برای ورود به سیستم، از اطلاعات زیر استفاده کنید:</p>
          <div className="space-y-2">
            <p><span className="font-bold">نام کاربری:</span> {testCredentials[activeTab].username}</p>
            <p><span className="font-bold">کلمه عبور:</span> {testCredentials[activeTab].password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
