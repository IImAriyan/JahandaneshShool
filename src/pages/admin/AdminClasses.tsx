
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminClasses() {
  const classes = [
    { id: 1, name: "کلاس اول الف", teacher: "آقای محمدی", students: 24, room: "۱۰۱" },
    { id: 2, name: "کلاس سوم ب", teacher: "آقای رضایی", students: 22, room: "۱۰۲" },
    { id: 3, name: "کلاس پنجم الف", teacher: "آقای کریمی", students: 26, room: "۱۰۳" },
    { id: 4, name: "کلاس هفتم ب", teacher: "آقای امیری", students: 23, room: "۲۰۱" },
    { id: 5, name: "کلاس نهم الف", teacher: "آقای حسینی", students: 21, room: "۲۰۲" },
  ];

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">مدیریت کلاس ها</h2>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              افزودن کلاس
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>لیست کلاس ها</CardTitle>
              <div className="flex items-center w-full max-w-sm">
                <Input placeholder="جستجو..." className="rounded-l-none" />
                <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام کلاس</TableHead>
                    <TableHead>معلم</TableHead>
                    <TableHead>تعداد دانش آموزان</TableHead>
                    <TableHead>شماره اتاق</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.name}</TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>{cls.room}</TableCell>
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
      </DashboardLayout>
    </ThemeProvider>
  );
}
