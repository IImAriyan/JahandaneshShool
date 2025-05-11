
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TeacherReports() {
  const gradesData = [
    { name: "میان ترم اول", avg: 16.2 },
    { name: "پایان ترم اول", avg: 17.5 },
    { name: "میان ترم دوم", avg: 16.8 },
    { name: "پایان ترم دوم", avg: 18.1 },
  ];

  const attendanceData = [
    { month: "مهر", attendance: 95 },
    { month: "آبان", attendance: 92 },
    { month: "آذر", attendance: 90 },
    { month: "دی", attendance: 88 },
    { month: "بهمن", attendance: 91 },
    { month: "اسفند", attendance: 93 },
    { month: "فروردین", attendance: 94 },
    { month: "اردیبهشت", attendance: 90 },
    { month: "خرداد", attendance: 87 },
  ];

  return (
    <ThemeProvider>
      <DashboardLayout userType="teacher">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">گزارشات</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="space-y-1 w-full max-w-xs">
              <Select defaultValue="grade7">
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کلاس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade7">ریاضی - پایه هفتم</SelectItem>
                  <SelectItem value="grade8">ریاضی - پایه هشتم</SelectItem>
                  <SelectItem value="grade9">ریاضی - پایه نهم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="grades">
            <TabsList className="mb-4">
              <TabsTrigger value="grades">نمرات</TabsTrigger>
              <TabsTrigger value="attendance">حضور و غیاب</TabsTrigger>
              <TabsTrigger value="performance">عملکرد کلی</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle>میانگین نمرات کلاس</CardTitle>
                  <CardDescription>میانگین نمرات کلاس در آزمون های مختلف</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gradesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[10, 20]} />
                        <Tooltip />
                        <Bar dataKey="avg" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>میزان حضور در کلاس</CardTitle>
                  <CardDescription>درصد حضور دانش آموزان در طول سال تحصیلی</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="attendance" stroke="#3b82f6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>عملکرد کلاس</CardTitle>
                  <CardDescription>آمار کلی عملکرد کلاس در سال جاری</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">۹۲٪</p>
                      <p className="text-green-700 dark:text-green-500">میانگین حضور</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">۱۷.۲</p>
                      <p className="text-blue-700 dark:text-blue-500">میانگین نمرات</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 text-center">
                      <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">۹۶٪</p>
                      <p className="text-amber-700 dark:text-amber-500">تکمیل تکالیف</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">توزیع نمرات دانش آموزان:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-20 text-sm">۱۸ - ۲۰</span>
                        <div className="flex-grow bg-gray-200 h-4 rounded-md overflow-hidden">
                          <div className="bg-green-500 h-full w-[35%]"></div>
                        </div>
                        <span className="w-12 text-left text-sm">۳۵٪</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">۱۶ - ۱۸</span>
                        <div className="flex-grow bg-gray-200 h-4 rounded-md overflow-hidden">
                          <div className="bg-blue-500 h-full w-[40%]"></div>
                        </div>
                        <span className="w-12 text-left text-sm">۴۰٪</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">۱۴ - ۱۶</span>
                        <div className="flex-grow bg-gray-200 h-4 rounded-md overflow-hidden">
                          <div className="bg-amber-500 h-full w-[15%]"></div>
                        </div>
                        <span className="w-12 text-left text-sm">۱۵٪</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">۱۰ - ۱۴</span>
                        <div className="flex-grow bg-gray-200 h-4 rounded-md overflow-hidden">
                          <div className="bg-red-500 h-full w-[10%]"></div>
                        </div>
                        <span className="w-12 text-left text-sm">۱۰٪</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
