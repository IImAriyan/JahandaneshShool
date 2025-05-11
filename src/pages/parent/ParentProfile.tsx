
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ParentProfile() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    firstName: "رضا",
    lastName: "محمدی",
    email: "parent@jahan-danesh.edu",
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    homePhone: "۰۳۴۱۲۳۴۵۶۷۸",
    workPhone: "۰۳۴۸۷۶۵۴۳۲۱",
    address: "سیرجان، خیابان امام، کوچه ۵، پلاک ۱۰",
    emergencyContact: "۰۹۱۳۲۳۴۵۶۷۸",
    relationship: "پدر"
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSaveProfile = () => {
    // در آینده به API متصل خواهد شد
    toast({
      title: "اطلاعات ذخیره شد",
      description: "پروفایل شما با موفقیت به روز رسانی شد",
    });
  };
  
  const handleChangePassword = () => {
    // بررسی مطابقت رمز عبور جدید
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "خطا",
        description: "رمز عبور جدید و تکرار آن مطابقت ندارند",
        variant: "destructive"
      });
      return;
    }
    
    // در آینده به API متصل خواهد شد
    toast({
      title: "رمز عبور تغییر کرد",
      description: "رمز عبور شما با موفقیت تغییر کرد",
    });
    
    // پاک کردن فرم
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="parent">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">پروفایل</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>اطلاعات دانش آموز</CardTitle>
                <CardDescription>مشاهده اطلاعات دانش آموز</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-schoolblue-100 dark:bg-schoolblue-800 border-4 border-schoolblue-500 flex items-center justify-center mb-4">
                  <GraduationCap className="w-16 h-16 text-schoolblue-500 dark:text-schoolblue-300" />
                </div>
                <h3 className="text-xl font-bold">علی محمدی</h3>
                <p className="text-muted-foreground">پایه هشتم - کلاس ۸-۱</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>کد دانش آموزی: ۱۲۳۴۵۶</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>parent@jahan-danesh.edu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>۰۹۱۲۱۲۳۴۵۶۷</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>سیرجان، خیابان امام</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">ویرایش اطلاعات</TabsTrigger>
                  <TabsTrigger value="password">تغییر رمز عبور</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>اطلاعات والدین</CardTitle>
                      <CardDescription>اطلاعات تماس خود را به روز کنید</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">نام والد</Label>
                          <Input 
                            id="firstName" 
                            value={profile.firstName} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">نام خانوادگی والد</Label>
                          <Input 
                            id="lastName" 
                            value={profile.lastName} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">نسبت</Label>
                          <Input 
                            id="relationship" 
                            value={profile.relationship} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">ایمیل</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profile.email} 
                            onChange={handleInputChange} 
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
                          <Label htmlFor="homePhone">تلفن منزل</Label>
                          <Input 
                            id="homePhone" 
                            value={profile.homePhone} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workPhone">تلفن محل کار</Label>
                          <Input 
                            id="workPhone" 
                            value={profile.workPhone} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">آدرس منزل</Label>
                        <Input 
                          id="address" 
                          value={profile.address} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">شماره تماس اضطراری</Label>
                        <Input 
                          id="emergencyContact" 
                          value={profile.emergencyContact} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSaveProfile}>ذخیره تغییرات</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>تغییر رمز عبور</CardTitle>
                      <CardDescription>رمز عبور حساب خود را تغییر دهید</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          value={passwordForm.currentPassword} 
                          onChange={handlePasswordChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">رمز عبور جدید</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          value={passwordForm.newPassword} 
                          onChange={handlePasswordChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={passwordForm.confirmPassword} 
                          onChange={handlePasswordChange} 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleChangePassword}>تغییر رمز عبور</Button>
                    </CardFooter>
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
