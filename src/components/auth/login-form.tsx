
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Key } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import ReCAPTCHA from "react-google-recaptcha";



interface LoginFormProps {
  userType: "admin" | "teacher" | "parent";
  onLogin: (username: string, password: string) => Promise<[boolean, string]>;
}

export function LoginForm({ userType, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasttext, setToastText] = useState<string>("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const titles = {
    admin: "ورود مدیر سیستم",
    teacher: "ورود معلمین",
    parent: "ورود والدین",
  };

  const descriptions = {
    admin: "لطفا با حساب مدیر خود وارد شوید",
    teacher: "لطفا با حساب معلم خود وارد شوید",
    parent: "لطفا با کد دانش آموزی وارد شوید",
  };

  const usernamePlaceholders = {
    admin: "نام کاربری مدیر",
    teacher: "کد پرسنلی",
    parent: "کد دانش آموزی",
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    if (!captchaVerified) {
      toast({
        variant: "destructive",
        title: "خطا در ورود",
        description: "لطفا تایید کنید که ربات نیستید",
      });
      return;
    }
    
    setIsLoading(true);
    


    try {
      // In a real application, this would be an API call
      const [success, text] = await onLogin(username, password);      
      setToastText(text)
      if (success) {
        toast({
          title: "ورود موفق",
          description: "در حال انتقال به داشبورد...",
        });
        
        // Navigate to the appropriate dashboard
        navigate(`/${userType}-dashboard`);
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ورود",
          description: toasttext,
        });
        
        // Reset the reCAPTCHA
        recaptchaRef.current?.reset();
        setCaptchaVerified(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "خطا در ورود",
        description: toasttext,
      });
      
      // Reset the reCAPTCHA
      recaptchaRef.current?.reset();
      setCaptchaVerified(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard 
      title={titles[userType]} 
      description={descriptions[userType]}
      userType={userType}
      footer={
        <div className="text-center w-full text-sm text-muted-foreground">
          مدرسه جهان دانش سیرجان - سیستم پورتال © {new Date().getFullYear()}
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 rtl">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-right block">
            {usernamePlaceholders[userType]}
          </Label>
          <div className="relative">
            <Input
              id="username"
              placeholder={usernamePlaceholders[userType]}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pl-10 text-right"
            />
            <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-right block">
            کلمه عبور
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="کلمه عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 text-right"
            />
            <Key className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex justify-center my-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
            onChange={handleCaptchaChange}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-schoolblue-600 hover:bg-schoolblue-700" 
          disabled={isLoading || !captchaVerified}
        >
          {isLoading ? "در حال ورود..." : "ورود به سیستم"}
        </Button>
      </form>
    </AuthCard>
  );
}
