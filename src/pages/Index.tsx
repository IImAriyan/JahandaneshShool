
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import axios from 'axios';

export default function Index() {
  const [activeTab, setActiveTab] = useState<"admin" | "teacher" | "parent">("admin");
  const { theme, setTheme } = useTheme();

  const BASE_URL = import.meta.env.VITE_API_URL
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
      

      if (theme !== savedTheme) {
        setTheme(savedTheme as any);
      }
    }
  }, [theme, setTheme]);
  

  const loginHandler = async (username: string, password: string) => {
    console.clear();
    try {
      const response = await axios.post(BASE_URL+'/auth/login', {
        "username": username,
        "password": password,
        "role": activeTab
      });
  
      if (response.status === 200) {
        console.log('ورود موفقیت‌آمیز بود');
        localStorage.setItem("token",response.data['token'])

        return [true, response.data['token']];
      } else {
        console.error('ورود ناموفق بود');
        return [false , "ورود ناموفق بود"];
      }
    } catch (error) {
      console.log(error)
      return [false, error.response.data['text']];
    }
  };
  
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
          onLogin={loginHandler} 
        />
        

      </div>
    </div>
  );
}
