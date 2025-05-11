
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "تنظیمات ذخیره شد",
      description: "تنظیمات با موفقیت به روز رسانی شد",
    });
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">تنظیمات</h2>
            
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">عمومی</TabsTrigger>
                <TabsTrigger value="security">امنیت</TabsTrigger>
                <TabsTrigger value="notifications">اعلان ها</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات عمومی</CardTitle>
                    <CardDescription>تنظیمات پایه سیستم را تغییر دهید</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">نام مدرسه</Label>
                      <Input id="schoolName" defaultValue="مدرسه جهان دانش سیرجان" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schoolPhone">شماره تماس</Label>
                      <Input id="schoolPhone" defaultValue="034-1234-5678" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schoolEmail">ایمیل</Label>
                      <Input id="schoolEmail" defaultValue="info@jahan-danesh.edu" type="email" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schoolAddress">آدرس</Label>
                      <Input id="schoolAddress" defaultValue="سیرجان، خیابان معلم، کوچه 5، پلاک 12" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>ذخیره تغییرات</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات امنیتی</CardTitle>
                    <CardDescription>امنیت سیستم را کنترل کنید</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">تایید دو مرحله ای</p>
                        <p className="text-sm text-muted-foreground">افزایش امنیت حساب کاربری با تایید دو مرحله ای</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">ثبت فعالیت‌های کاربران</p>
                        <p className="text-sm text-muted-foreground">ثبت تمام فعالیت های کاربران در سیستم</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy">سیاست رمز عبور</Label>
                      <Input id="passwordPolicy" defaultValue="8 کاراکتر با حروف بزرگ و کوچک و اعداد" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>ذخیره تغییرات</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات اعلان ها</CardTitle>
                    <CardDescription>نحوه دریافت اعلان ها را تنظیم کنید</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">اعلان های ایمیلی</p>
                        <p className="text-sm text-muted-foreground">دریافت اعلان ها از طریق ایمیل</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">اعلان های سیستمی</p>
                        <p className="text-sm text-muted-foreground">نمایش اعلان ها در داشبورد</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">اعلان های پیامکی</p>
                        <p className="text-sm text-muted-foreground">دریافت اعلان ها از طریق پیامک</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>ذخیره تغییرات</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
