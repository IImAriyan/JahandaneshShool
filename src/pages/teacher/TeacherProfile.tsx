
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, BookOpen, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TeacherProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    id: "user-123",
    first_name: "محمد",
    last_name: "رضایی",
    email: "teacher@jahan-danesh.edu",
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    address: "سیرجان، خیابان مطهری",
    education: "کارشناسی ارشد ریاضیات",
    experience: "۱۵ سال",
    subject: "ریاضی",
    bio: "معلم با تجربه ریاضی با بیش از ۱۵ سال سابقه تدریس در مدارس مختلف"
  });

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      // اینجا در آینده به API متصل خواهیم شد
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "اطلاعات ذخیره شد",
        description: "پروفایل شما با موفقیت به روز رسانی شد",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "خطا در ذخیره اطلاعات",
        description: "مشکلی در ذخیره اطلاعات پروفایل رخ داده است",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get('current-password') as string;
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    
    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "لطفا تمام فیلدها را پر کنید",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "رمز عبور جدید و تکرار آن مطابقت ندارند",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // اینجا در آینده به API متصل خواهیم شد
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clear the form
      event.currentTarget.reset();
      
      toast({
        title: "رمز عبور تغییر کرد",
        description: "رمز عبور شما با موفقیت تغییر کرد",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "خطا در تغییر رمز عبور",
        description: "مشکلی در تغییر رمز عبور رخ داده است",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="teacher">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">پروفایل معلم</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>اطلاعات معلم</CardTitle>
                <CardDescription>مشاهده اطلاعات پروفایل</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-schoolblue-100 dark:bg-schoolblue-800 border-4 border-schoolblue-500 flex items-center justify-center mb-4">
                  <User className="w-16 h-16 text-schoolblue-500 dark:text-schoolblue-300" />
                </div>
                <h3 className="text-xl font-bold">{profile.first_name} {profile.last_name}</h3>
                <p className="text-muted-foreground">معلم {profile.subject}</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.experience} سال سابقه تدریس</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">ویرایش پروفایل</TabsTrigger>
                  <TabsTrigger value="password">تغییر رمز عبور</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>اطلاعات پروفایل</CardTitle>
                      <CardDescription>اطلاعات پروفایل خود را به روز کنید</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">نام</Label>
                          <Input 
                            id="first_name" 
                            value={profile.first_name || ""}
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">نام خانوادگی</Label>
                          <Input 
                            id="last_name" 
                            value={profile.last_name || ""}
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">ایمیل</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profile.email}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">شماره تماس</Label>
                          <Input 
                            id="phone" 
                            value={profile.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">تخصص</Label>
                          <Input 
                            id="subject" 
                            value={profile.subject}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="education">مدرک تحصیلی</Label>
                          <Input 
                            id="education" 
                            value={profile.education}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">سابقه تدریس</Label>
                          <Input 
                            id="experience" 
                            value={profile.experience}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">آدرس</Label>
                        <Input 
                          id="address" 
                          value={profile.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">بیوگرافی</Label>
                        <Textarea 
                          id="bio" 
                          value={profile.bio}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>تغییر رمز عبور</CardTitle>
                      <CardDescription>رمز عبور خود را تغییر دهید</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleChangePassword}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">رمز عبور فعلی</Label>
                          <Input id="current-password" name="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">رمز عبور جدید</Label>
                          <Input id="new-password" name="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
                          <Input id="confirm-password" name="confirm-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={loading}>
                          {loading ? "در حال تغییر..." : "تغییر رمز عبور"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
