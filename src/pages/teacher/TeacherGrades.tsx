
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function TeacherGrades() {
  const { toast } = useToast();
  
  const classes = [
    { id: 1, name: "ریاضی - پایه هفتم" },
    { id: 2, name: "ریاضی - پایه هشتم" },
    { id: 3, name: "ریاضی - پایه نهم" },
  ];
  
  const students = [
    { id: 1, name: "علی محمدی", grade: 18.5 },
    { id: 2, name: "رضا حسینی", grade: 17.0 },
    { id: 3, name: "محمد کریمی", grade: 19.5 },
    { id: 4, name: "امیر رضایی", grade: 16.0 },
    { id: 5, name: "حسین علوی", grade: 18.0 },
  ];
  
  const handleSaveGrades = () => {
    toast({
      title: "نمرات ذخیره شدند",
      description: "نمرات با موفقیت ثبت شدند",
    });
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="teacher">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">ثبت نمرات</h2>
          
          <div className="flex items-center space-x-4">
            <div className="space-y-1 w-full max-w-xs">
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
            
            <div className="space-y-1 w-full max-w-xs">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب آزمون" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">میان ترم</SelectItem>
                  <SelectItem value="final">پایان ترم</SelectItem>
                  <SelectItem value="quiz">کوییز</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>لیست دانش آموزان</CardTitle>
              <CardDescription>نمرات دانش آموزان کلاس ریاضی - پایه هفتم</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام دانش آموز</TableHead>
                    <TableHead>نمره (از ۲۰)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          max="20" 
                          step="0.25" 
                          defaultValue={student.grade.toString()} 
                          className="w-20"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGrades}>ثبت نمرات</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>نمودار آماری</CardTitle>
              <CardDescription>توزیع نمرات دانش آموزان در آزمون میان ترم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-10 mb-2 flex items-center">
                <span className="w-10">۰-۱۰</span>
                <div className="flex-1 bg-gray-200 h-6 rounded-md overflow-hidden">
                  <div className="w-[10%] h-full bg-red-500"></div>
                </div>
                <span className="w-10 text-left">۱۰٪</span>
              </div>
              <div className="h-10 mb-2 flex items-center">
                <span className="w-10">۱۰-۱۵</span>
                <div className="flex-1 bg-gray-200 h-6 rounded-md overflow-hidden">
                  <div className="w-[20%] h-full bg-yellow-500"></div>
                </div>
                <span className="w-10 text-left">۲۰٪</span>
              </div>
              <div className="h-10 mb-2 flex items-center">
                <span className="w-10">۱۵-۱۸</span>
                <div className="flex-1 bg-gray-200 h-6 rounded-md overflow-hidden">
                  <div className="w-[40%] h-full bg-blue-500"></div>
                </div>
                <span className="w-10 text-left">۴۰٪</span>
              </div>
              <div className="h-10 flex items-center">
                <span className="w-10">۱۸-۲۰</span>
                <div className="flex-1 bg-gray-200 h-6 rounded-md overflow-hidden">
                  <div className="w-[30%] h-full bg-green-500"></div>
                </div>
                <span className="w-10 text-left">۳۰٪</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
