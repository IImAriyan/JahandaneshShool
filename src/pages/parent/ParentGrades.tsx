
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ParentGrades() {
  const subjects = [
    { name: "ریاضی", grade: 19, teacher: "آقای رضایی" },
    { name: "علوم", grade: 18.5, teacher: "آقای محمدی" },
    { name: "ادبیات", grade: 17, teacher: "آقای حسینی" },
    { name: "عربی", grade: 16.5, teacher: "آقای علوی" },
    { name: "انگلیسی", grade: 18, teacher: "آقای کریمی" },
    { name: "اجتماعی", grade: 17.5, teacher: "آقای امیری" },
    { name: "دینی", grade: 19.5, teacher: "آقای جعفری" },
    { name: "ورزش", grade: 20, teacher: "آقای رحیمی" },
  ];
  
  const examData = [
    { name: "میان ترم اول", grade: 17.5 },
    { name: "پایان ترم اول", grade: 18.2 },
    { name: "میان ترم دوم", grade: 18.8 },
    { name: "پایان ترم دوم", grade: 19.1 },
  ];

  const data = subjects.map((subject) => ({
    name: subject.name,
    grade: subject.grade,
  }));




  return (
    <ThemeProvider>
      <DashboardLayout userType="parent">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">کارنامه تحصیلی</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="space-y-1 w-full max-w-xs">
              <Select defaultValue="term2">
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب ترم تحصیلی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term1">نیمسال اول ۱۴۰۳-۱۴۰۴</SelectItem>
                  <SelectItem value="term2">نیمسال دوم ۱۴۰۳-۱۴۰۴</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>نمرات دروس</CardTitle>
                <CardDescription>نمرات نهایی دروس در نیمسال دوم ۱۴۰۳-۱۴۰۴</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام درس</TableHead>
                      <TableHead>نمره</TableHead>
                      <TableHead>معلم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject, i) => (
                      <TableRow key={i}>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{subject.grade}</span>
                            <Progress
                              value={(subject.grade / 20) * 100}
                              className={`h-2 w-16 ${
                                subject.grade >= 17
                                  ? "bg-green-500"
                                  : subject.grade >= 15
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{subject.teacher}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>نمودار نمرات</CardTitle>
                <CardDescription>نمودار مقایسه ای نمرات دروس مختلف</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[10, 20]} />
                      <Tooltip />
                      <Bar dataKey="grade" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>روند پیشرفت تحصیلی</CardTitle>
              <CardDescription>روند تغییرات معدل در آزمون های مختلف</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">معدل های اخیر</h3>
                  <div className="space-y-6">
                    {examData.map((exam, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>{exam.name}</span>
                          <span className="font-medium">{exam.grade}</span>
                        </div>
                        <Progress
                          value={(exam.grade / 20) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">آمار کلی</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex justify-between items-center">
                        <p className="text-blue-700 dark:text-blue-400">معدل کل</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">۱۸.۲</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                      <div className="flex justify-between items-center">
                        <p className="text-green-700 dark:text-green-400">بالاترین نمره</p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">۲۰</p>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-1">درس ورزش</p>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                      <div className="flex justify-between items-center">
                        <p className="text-amber-700 dark:text-amber-400">پایین ترین نمره</p>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">۱۶.۵</p>
                      </div>
                      <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">درس عربی</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
