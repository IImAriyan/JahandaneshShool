import { useEffect, useState } from "react";
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
import {userDataInt, TokenPayload} from "@/interfaces/Interfaces"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {decodeJWT} from "jwt-parse";

type UserRole = "teacher" | "admin" | "user";

export default function AdminUsers() {
  const { toast } = useToast();
  String()
  const [users, setUsers] = useState<userDataInt[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "والدین"
  });

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");


  useEffect(() => {

    const fetchUsersData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/user/list", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUsers(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUsersData();

  }, [BASE_URL, token, navigate]);

  function getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const addUser = async (user:userDataInt,password:string) => {
    const response = await axios.post(BASE_URL + '/user/add',{
      "ROW": 1,
      "USER_ID": "set_in_backend",
      "username": user.username,
      "password": password,
      "email": user.email,
      "phone_number": user.phone_number.toString(),
      "USER_ROLE": user.USER_ROLE,
      "nationalCode": user.nationalCode,
      "address": user.address,
      "full_name": user.full_name,
      "profile_picture_url": "",
      "created_at": "2024-05-20T12:34:56Z",
      "updated_at": "2024-05-21T08:22:11Z",
      "is_active": 0,
      "last_login": "2025-05-21 14:30:00",
      "gender": user.gender,
      "birthdate": user.birthdate,
      "grade": user.grade,
      "parent_phone_number": user.parent_phone_number
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    if (name === 'role') {
      const roleValue = value as UserRole;
      setNewUser(prev => ({ ...prev, 'role': roleValue }));
    } else {
      setNewUser(prev => ({ ...prev, 'role': value }));
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = user.full_name ?? "";
    const role = user.USER_ROLE ?? "";
    const username = user.username ?? "";

    return (
      fullName.includes(searchTerm) ||
      role.includes(searchTerm) ||
      username.includes(searchTerm)
    );
  });

  const createUser = async () => {
    setIsLoading(true);

    try {
      setTimeout(() => {
        toast({
          title: "کاربر با موفقیت افزوده شد",
          description: `${newUser.first_name} ${newUser.last_name} به سیستم افزوده شد.`,
        });

        const dateTime = getCurrentDateTime();
        const date = getCurrentDate();

        const roleMap: Record<string, string> = {
          "user": "user",
          "teacher": "teacher",
          "admin": "admin"
        };

        const userAdd: userDataInt = {
          "ROW": 1,
          "USER_ID": "set_in_backend",
          "username": newUser.username,
          "email": newUser.email,
          "phone_number": 0,
          "USER_ROLE": roleMap[newUser.role] || "user",
          "nationalCode": 0,
          "address": "",
          "full_name": newUser.first_name + " " + newUser.last_name,
          "profile_picture_url": "",
          "created_at": dateTime.toString(),
          "updated_at": dateTime.toString(),
          "is_active": 0,
          "last_login": dateTime.toString(),
          "gender": "",
          "birthdate": date.toString(),
          "grade": "",
          "parent_phone_number": ""
        };

        addUser(userAdd, newUser.password);
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
                    <TableHead>نام کاربری</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.USER_ID}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.USER_ROLE}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-sm ${
                          user.is_active === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.is_active === 1 ? "فعال" : "غیرفعال"}
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

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>افزودن کاربر جدید</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">نام</Label>
                  <Input 
                    id="first_name"
                    name="first_name" 
                    placeholder="نام" 
                    value={newUser.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">نام خانوادگی</Label>
                  <Input 
                    id="last_name"
                    name="last_name" 
                    placeholder="نام خانوادگی" 
                    value={newUser.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">نام کاربری</Label>
                <Input 
                  id="username"
                  name="username"  
                  placeholder="نام کاربری" 
                  value={newUser.username}
                  onChange={handleInputChange}
                />
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
                  onValueChange={value => handleSelectChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="انتخاب نقش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">والدین</SelectItem>
                    <SelectItem value="teacher">معلم</SelectItem>
                    <SelectItem value="admin">مدیر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} onClick={createUser}>
                افزودن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ThemeProvider>
  );
}
