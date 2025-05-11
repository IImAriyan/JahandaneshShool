
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Download, Filter, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

export default function AdminReports() {
  // Historical attendance data (monthly averages)
  const attendanceData = [
    { month: "فروردین", attendance: 92, year: "1401", prevYear: 90 },
    { month: "اردیبهشت", attendance: 90, year: "1401", prevYear: 89 },
    { month: "خرداد", attendance: 88, year: "1401", prevYear: 87 },
    { month: "تیر", attendance: 94, year: "1401", prevYear: 92 },
    { month: "مرداد", attendance: 95, year: "1401", prevYear: 93 },
    { month: "شهریور", attendance: 93, year: "1401", prevYear: 92 },
    { month: "مهر", attendance: 91, year: "1401", prevYear: 90 },
    { month: "آبان", attendance: 89, year: "1401", prevYear: 88 },
    { month: "آذر", attendance: 92, year: "1401", prevYear: 91 },
    { month: "دی", attendance: 94, year: "1401", prevYear: 92 },
    { month: "بهمن", attendance: 93, year: "1401", prevYear: 90 },
    { month: "اسفند", attendance: 91, year: "1401", prevYear: 89 },
  ];

  // Historical grades data by subject
  const gradesData = [
    { subject: "ریاضی", grade: 17.2, year: "1400", prevYear: 16.8 },
    { subject: "علوم", grade: 16.8, year: "1400", prevYear: 16.2 },
    { subject: "ادبیات", grade: 18.3, year: "1400", prevYear: 17.9 },
    { subject: "زبان", grade: 15.9, year: "1400", prevYear: 15.5 },
    { subject: "اجتماعی", grade: 17.6, year: "1400", prevYear: 17.1 },
    { subject: "هنر", grade: 19.2, year: "1400", prevYear: 18.8 },
  ];

  // Historical enrollment data
  const enrollmentData = [
    { year: "۱۳۹۹", students: 380, boys: 195, girls: 185 },
    { year: "۱۴۰۰", students: 395, boys: 200, girls: 195 },
    { year: "۱۴۰۱", students: 410, boys: 205, girls: 205 },
    { year: "۱۴۰۲", students: 422, boys: 210, girls: 212 },
    { year: "۱۴۰۳", students: 428, boys: 215, girls: 213 },
  ];

  // Grade distribution data
  const gradeDistributionData = [
    { name: "۱۸-۲۰", value: 35, color: "#10b981" },
    { name: "۱۵-۱۸", value: 40, color: "#3b82f6" },
    { name: "۱۲-۱۵", value: 15, color: "#f59e0b" },
    { name: "۱۰-۱۲", value: 7, color: "#f97316" },
    { name: "زیر ۱۰", value: 3, color: "#ef4444" },
  ];

  // Sample grades history data for specific students
  const gradesHistoryData = [
    { id: 1, name: "علی محمدی", class: "هفتم الف", 
      grades: [
        { subject: "ریاضی", midterm1: 16, final1: 18, midterm2: 17, final2: 19 },
        { subject: "علوم", midterm1: 15, final1: 17, midterm2: 16, final2: 18 },
        { subject: "ادبیات", midterm1: 18, final1: 19, midterm2: 17, final2: 20 },
      ]
    },
    { id: 2, name: "محمد احمدی", class: "هفتم الف", 
      grades: [
        { subject: "ریاضی", midterm1: 14, final1: 16, midterm2: 15, final2: 17 },
        { subject: "علوم", midterm1: 13, final1: 15, midterm2: 14, final2: 16 },
        { subject: "ادبیات", midterm1: 17, final1: 18, midterm2: 16, final2: 19 },
      ]
    },
    { id: 3, name: "رضا کریمی", class: "هفتم ب", 
      grades: [
        { subject: "ریاضی", midterm1: 15, final1: 17, midterm2: 16, final2: 18 },
        { subject: "علوم", midterm1: 14, final1: 16, midterm2: 15, final2: 17 },
        { subject: "ادبیات", midterm1: 16, final1: 18, midterm2: 17, final2: 19 },
      ]
    },
  ];

  // Attendance details for specific students
  const attendanceDetailsData = [
    { id: 1, name: "علی محمدی", class: "هفتم الف", 
      attendance: { 
        total: 180, present: 165, absent: 10, late: 5, 
        percentageByMonth: [95, 92, 94, 88, 90, 91]
      }
    },
    { id: 2, name: "محمد احمدی", class: "هفتم الف", 
      attendance: { 
        total: 180, present: 170, absent: 8, late: 2, 
        percentageByMonth: [96, 94, 95, 90, 92, 93]
      }
    },
    { id: 3, name: "رضا کریمی", class: "هفتم ب", 
      attendance: { 
        total: 180, present: 155, absent: 15, late: 10, 
        percentageByMonth: [89, 86, 90, 84, 86, 88]
      }
    },
  ];

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">گزارشات</h2>
            
            <Tabs defaultValue="attendance">
              <TabsList className="mb-4">
                <TabsTrigger value="attendance">حضور و غیاب</TabsTrigger>
                <TabsTrigger value="grades">نمرات</TabsTrigger>
                <TabsTrigger value="enrollment">ثبت نام</TabsTrigger>
                <TabsTrigger value="student-history">تاریخچه تحصیلی</TabsTrigger>
              </TabsList>
              
              <TabsContent value="attendance">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>میانگین حضور سالانه</CardTitle>
                        <CardDescription>میانگین حضور دانش آموزان در هر ماه</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="1401">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="سال" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1401">۱۴۰۱</SelectItem>
                            <SelectItem value="1400">۱۴۰۰</SelectItem>
                            <SelectItem value="1399">۱۳۹۹</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={attendanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[80, 100]} />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" name="سال ۱۴۰۱" dataKey="attendance" stroke="#3b82f6" fill="#93c5fd" />
                          <Area type="monotone" name="سال ۱۴۰۰" dataKey="prevYear" stroke="#6b7280" fill="#d1d5db" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>جزئیات حضور و غیاب دانش آموزان</CardTitle>
                        <CardDescription>آمار حضور و غیاب به تفکیک دانش آموز</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="w-full md:w-64">
                        <Label className="mb-2 block">کلاس</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کلاس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه کلاس‌ها</SelectItem>
                            <SelectItem value="7a">هفتم الف</SelectItem>
                            <SelectItem value="7b">هفتم ب</SelectItem>
                            <SelectItem value="8a">هشتم الف</SelectItem>
                            <SelectItem value="8b">هشتم ب</SelectItem>
                            <SelectItem value="9a">نهم الف</SelectItem>
                            <SelectItem value="9b">نهم ب</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-64">
                        <Label className="mb-2 block">بازه زمانی</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="بازه زمانی" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">کل سال تحصیلی</SelectItem>
                            <SelectItem value="term1">نیمسال اول</SelectItem>
                            <SelectItem value="term2">نیمسال دوم</SelectItem>
                            <SelectItem value="month1">ماه جاری</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:flex-1">
                        <Label className="mb-2 block">جستجوی دانش آموز</Label>
                        <div className="flex">
                          <Input placeholder="نام دانش آموز..." className="rounded-l-none" />
                          <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>نام دانش آموز</TableHead>
                          <TableHead>کلاس</TableHead>
                          <TableHead>روزهای حضور</TableHead>
                          <TableHead>غیبت</TableHead>
                          <TableHead>تاخیر</TableHead>
                          <TableHead>درصد حضور</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceDetailsData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell className="font-medium">{student.attendance.present}</TableCell>
                            <TableCell className="text-red-600">{student.attendance.absent}</TableCell>
                            <TableCell className="text-amber-600">{student.attendance.late}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={(student.attendance.present / student.attendance.total) * 100} 
                                  className="h-2 w-20"
                                />
                                <span>
                                  {Math.round((student.attendance.present / student.attendance.total) * 100)}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="grades">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>میانگین نمرات درسی</CardTitle>
                          <CardDescription>میانگین نمرات دروس مختلف در کل مدرسه</CardDescription>
                        </div>
                        <Select defaultValue="1400">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="سال" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1401">۱۴۰۱</SelectItem>
                            <SelectItem value="1400">۱۴۰۰</SelectItem>
                            <SelectItem value="1399">۱۳۹۹</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={gradesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis domain={[10, 20]} />
                            <Tooltip />
                            <Legend />
                            <Bar name="سال ۱۴۰۰" dataKey="grade" fill="#3b82f6" />
                            <Bar name="سال ۱۳۹۹" dataKey="prevYear" fill="#d1d5db" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>توزیع نمرات دانش آموزان</CardTitle>
                          <CardDescription>درصد دانش آموزان در هر بازه نمره</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={gradeDistributionData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {gradeDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>جزئیات نمرات دانش آموزان</CardTitle>
                        <CardDescription>نمرات دانش آموزان در آزمون‌های مختلف</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="w-full md:w-64">
                        <Label className="mb-2 block">کلاس</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کلاس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه کلاس‌ها</SelectItem>
                            <SelectItem value="7a">هفتم الف</SelectItem>
                            <SelectItem value="7b">هفتم ب</SelectItem>
                            <SelectItem value="8a">هشتم الف</SelectItem>
                            <SelectItem value="8b">هشتم ب</SelectItem>
                            <SelectItem value="9a">نهم الف</SelectItem>
                            <SelectItem value="9b">نهم ب</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:w-64">
                        <Label className="mb-2 block">درس</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب درس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه دروس</SelectItem>
                            <SelectItem value="math">ریاضی</SelectItem>
                            <SelectItem value="science">علوم</SelectItem>
                            <SelectItem value="literature">ادبیات</SelectItem>
                            <SelectItem value="english">زبان انگلیسی</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full md:flex-1">
                        <Label className="mb-2 block">جستجوی دانش آموز</Label>
                        <div className="flex">
                          <Input placeholder="نام دانش آموز..." className="rounded-l-none" />
                          <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>نام دانش آموز</TableHead>
                          <TableHead>کلاس</TableHead>
                          <TableHead>درس</TableHead>
                          <TableHead>میان ترم اول</TableHead>
                          <TableHead>پایان ترم اول</TableHead>
                          <TableHead>میان ترم دوم</TableHead>
                          <TableHead>پایان ترم دوم</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {gradesHistoryData.flatMap(student => 
                          student.grades.map((gradeItem, index) => (
                            <TableRow key={`${student.id}-${index}`}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.class}</TableCell>
                              <TableCell>{gradeItem.subject}</TableCell>
                              <TableCell>{gradeItem.midterm1}</TableCell>
                              <TableCell>{gradeItem.final1}</TableCell>
                              <TableCell>{gradeItem.midterm2}</TableCell>
                              <TableCell>{gradeItem.final2}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="enrollment">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>آمار ثبت نام سالیانه</CardTitle>
                    <CardDescription>تعداد دانش آموزان ثبت نام شده در هر سال</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={enrollmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar name="کل دانش آموزان" dataKey="students" fill="#3b82f6" />
                          <Bar name="پسران" dataKey="boys" fill="#60a5fa" />
                          <Bar name="دختران" dataKey="girls" fill="#93c5fd" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>توزیع جنسیتی</CardTitle>
                      <CardDescription>نسبت دانش آموزان پسر و دختر</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'پسران', value: 215 },
                                { name: 'دختران', value: 213 },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={70}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#3b82f6" />
                              <Cell fill="#ec4899" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>توزیع پایه‌های تحصیلی</CardTitle>
                      <CardDescription>تعداد دانش‌آموزان هر پایه</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'هفتم', value: 143 },
                                { name: 'هشتم', value: 147 },
                                { name: 'نهم', value: 138 },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={70}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#3b82f6" />
                              <Cell fill="#8b5cf6" />
                              <Cell fill="#10b981" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>روند ثبت نام</CardTitle>
                      <CardDescription>درصد تکمیل ظرفیت کلاس‌ها</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>هفتم الف</Label>
                            <span className="text-sm">92%</span>
                          </div>
                          <Progress value={92} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>هفتم ب</Label>
                            <span className="text-sm">88%</span>
                          </div>
                          <Progress value={88} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>هشتم الف</Label>
                            <span className="text-sm">100%</span>
                          </div>
                          <Progress value={100} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>هشتم ب</Label>
                            <span className="text-sm">95%</span>
                          </div>
                          <Progress value={95} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="student-history">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>تاریخچه تحصیلی دانش آموزان</CardTitle>
                        <CardDescription>مشاهده کامل سوابق تحصیلی، حضور و غیاب و نمرات</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Select defaultValue="7a">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="کلاس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7a">هفتم الف</SelectItem>
                            <SelectItem value="7b">هفتم ب</SelectItem>
                            <SelectItem value="8a">هشتم الف</SelectItem>
                            <SelectItem value="8b">هشتم ب</SelectItem>
                            <SelectItem value="9a">نهم الف</SelectItem>
                            <SelectItem value="9b">نهم ب</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input placeholder="جستجوی دانش آموز..." className="pl-10" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {gradesHistoryData.map(student => (
                        <Card key={student.id} className="bg-muted/20">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{student.name}</CardTitle>
                                <CardDescription>کلاس: {student.class}</CardDescription>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <FileText className="h-4 w-4" />
                                کارنامه کامل
                                <ChevronDown className="h-4 w-4 mr-1" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-md font-medium mb-3">نمرات اخیر</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>درس</TableHead>
                                      <TableHead>میان ترم</TableHead>
                                      <TableHead>پایان ترم</TableHead>
                                      <TableHead>معدل</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {student.grades.map((grade, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell>{grade.subject}</TableCell>
                                        <TableCell>{grade.midterm2}</TableCell>
                                        <TableCell>{grade.final2}</TableCell>
                                        <TableCell>
                                          {((grade.midterm2 + grade.final2) / 2).toFixed(1)}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              
                              <div>
                                <h4 className="text-md font-medium mb-3">حضور و غیاب</h4>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-medium">
                                      {attendanceDetailsData.find(a => a.id === student.id)?.attendance.present}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">حضور</div>
                                      <div className="text-xs text-muted-foreground">روزهای حاضر</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-medium">
                                      {attendanceDetailsData.find(a => a.id === student.id)?.attendance.absent}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">غیبت</div>
                                      <div className="text-xs text-muted-foreground">روزهای غایب</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="h-[100px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={
                                      attendanceDetailsData.find(a => a.id === student.id)?.attendance.percentageByMonth.map((percent, idx) => ({
                                        month: idx + 1,
                                        attendance: percent
                                      })) || []
                                    }>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="month" />
                                      <YAxis domain={[80, 100]} />
                                      <Tooltip />
                                      <Line type="monotone" dataKey="attendance" stroke="#3b82f6" />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
