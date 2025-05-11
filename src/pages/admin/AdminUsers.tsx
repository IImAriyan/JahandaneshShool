
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Define a type for the user role
type UserRole = "teacher" | "admin" | "parent";

// Define a type for the users array
interface User {
  id: number | string;
  name: string;
  role: string;
  subject: string;
  status: string;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "علی محمدی", role: "معلم", subject: "ریاضی", status: "فعال" },
    { id: 2, name: "حسن رضایی", role: "معلم", subject: "علوم", status: "فعال" },
    { id: 3, name: "محمد کریمی", role: "معلم", subject: "ادبیات", status: "فعال" },
    { id: 4, name: "رضا حسینی", role: "معلم", subject: "زبان", status: "غیرفعال" },
    { id: 5, name: "مریم علوی", role: "کارمند اداری", subject: "-", status: "فعال" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // User form state with correctly typed role property
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "teacher" as UserRole, // Type assertion to ensure role is of type UserRole
    subject: "",
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    // For role specifically, ensure it's of type UserRole
    if (name === 'role') {
      // Only allow values that match UserRole type
      const roleValue = value as UserRole;
      setNewUser(prev => ({ ...prev, [name]: roleValue }));
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSwitchChange = (checked) => {
    setNewUser(prev => ({ ...prev, isActive: checked }));
  };

  const filteredUsers = users.filter(user => 
    user.name.includes(searchTerm) || 
    user.role.includes(searchTerm) || 
    user.subject.includes(searchTerm)
  );

  const createUser = async () => {
    setIsLoading(true);
    
    try {
      // در آینده به API متصل خواهد شد
      setTimeout(() => {
        // ساخت کاربر جدید به صورت مصنوعی
        const newUserObj: User = {
          id: Date.now(),
          name: `${newUser.firstName} ${newUser.lastName}`,
          role: newUser.role === 'teacher' ? 'معلم' : 
                newUser.role === 'admin' ? 'مدیر' : 'والدین',
          subject: newUser.subject || "-",
          status: newUser.isActive ? "فعال" : "غیرفعال"
        };
        
        setUsers(prev => [...prev, newUserObj]);
        
        toast({
          title: "کاربر با موفقیت افزوده شد",
          description: `${newUser.firstName} ${newUser.lastName} به سیستم افزوده شد.`,
        });
        
        // Reset the form and close the dialog
        setNewUser({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          role: "teacher" as UserRole,
          subject: "",
          isActive: true
        });
        setIsOpen(false);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "خطا در افزودن کاربر",
        description: "در افزودن کاربر جدید خطایی رخ داد.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">مدیریت کاربران</h2>
            <Button className="gap-2" onClick={() => setIsOpen(true)}>
              <PlusCircle className="h-4 w-4" />
              افزودن کاربر
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>لیست کاربران</CardTitle>
              <div className="flex items-center w-full max-w-sm">
                <Input 
                  placeholder="جستجو..." 
                  className="rounded-l-none" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام کاربر</TableHead>
                    <TableHead>نقش</TableHead>
                    <TableHead>تخصص</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.subject}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-sm ${
                          user.status === "فعال" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">ویرایش</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Add User Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>افزودن کاربر جدید</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <Input 
                    id="firstName"
                    name="firstName" 
                    placeholder="نام" 
                    value={newUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input 
                    id="lastName"
                    name="lastName" 
                    placeholder="نام خانوادگی" 
                    value={newUser.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="ایمیل" 
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <Input 
                  id="password"
                  name="password" 
                  type="password" 
                  placeholder="رمز عبور" 
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">نقش</Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="انتخاب نقش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدیر</SelectItem>
                    <SelectItem value="teacher">معلم</SelectItem>
                    <SelectItem value="parent">والدین</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newUser.role === "teacher" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">تخصص</Label>
                  <Input 
                    id="subject"
                    name="subject" 
                    placeholder="تخصص (مثال: ریاضی)" 
                    value={newUser.subject}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="is-active" className="ml-2">وضعیت فعال</Label>
                <Switch 
                  id="is-active" 
                  checked={newUser.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                انصراف
              </Button>
              <Button onClick={createUser} disabled={isLoading}>
                {isLoading ? "در حال ثبت..." : "افزودن کاربر"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ThemeProvider>
  );
}
