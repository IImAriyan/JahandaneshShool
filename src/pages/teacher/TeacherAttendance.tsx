
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TeacherAttendance() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const classes = [
    { id: 1, name: "ریاضی - پایه هفتم" },
    { id: 2, name: "ریاضی - پایه هشتم" },
    { id: 3, name: "ریاضی - پایه نهم" },
  ];
  
  const students = [
    { id: 1, name: "علی محمدی", present: true },
    { id: 2, name: "رضا حسینی", present: true },
    { id: 3, name: "محمد کریمی", present: false },
    { id: 4, name: "امیر رضایی", present: true },
    { id: 5, name: "حسین علوی", present: true },
  ];
  
  const handleSaveAttendance = () => {
    toast({
      title: "حضور و غیاب ثبت شد",
      description: "حضور و غیاب با موفقیت ثبت شد",
    });
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="teacher">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">ثبت حضور و غیاب</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>انتخاب تاریخ و کلاس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md p-3"
                  />
                </div>
                
                <div className="space-y-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کلاس" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>لیست دانش آموزان</CardTitle>
                <CardDescription>ثبت حضور و غیاب برای تاریخ {date?.toLocaleDateString('fa-IR')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام دانش آموز</TableHead>
                      <TableHead>حضور</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Checkbox defaultChecked={student.present} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAttendance}>ثبت حضور و غیاب</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>گزارش حضور و غیاب</CardTitle>
              <CardDescription>گزارش حضور و غیاب کلاس در ماه جاری</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام دانش آموز</TableHead>
                      <TableHead>تعداد حضور</TableHead>
                      <TableHead>تعداد غیبت</TableHead>
                      <TableHead>درصد حضور</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>علی محمدی</TableCell>
                      <TableCell>۱۲</TableCell>
                      <TableCell>۰</TableCell>
                      <TableCell>۱۰۰٪</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>رضا حسینی</TableCell>
                      <TableCell>۱۰</TableCell>
                      <TableCell>۲</TableCell>
                      <TableCell>۸۳٪</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>محمد کریمی</TableCell>
                      <TableCell>۹</TableCell>
                      <TableCell>۳</TableCell>
                      <TableCell>۷۵٪</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>امیر رضایی</TableCell>
                      <TableCell>۱۱</TableCell>
                      <TableCell>۱</TableCell>
                      <TableCell>۹۲٪</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>حسین علوی</TableCell>
                      <TableCell>۱۲</TableCell>
                      <TableCell>۰</TableCell>
                      <TableCell>۱۰۰٪</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
