
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, FileCheck, Save, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data for classes
const classData = [
  { id: 1, name: "کلاس هفتم الف", room: "۱۰۱", count: 24 },
  { id: 2, name: "کلاس هفتم ب", room: "۱۰۲", count: 22 },
  { id: 3, name: "کلاس هشتم الف", room: "۱۰۳", count: 25 },
  { id: 4, name: "کلاس هشتم ب", room: "۲۰۱", count: 23 },
  { id: 5, name: "کلاس نهم الف", room: "۲۰۲", count: 21 },
  { id: 6, name: "کلاس نهم ب", room: "۲۰۳", count: 22 },
];

// Mock data for students
const studentsData = {
  1: [
    { id: 101, name: "علی محمدی", attendance: { "1401-06-15": "present", "1401-06-16": "late" } },
    { id: 102, name: "محمد احمدی", attendance: { "1401-06-15": "present", "1401-06-16": "present" } },
    { id: 103, name: "رضا کریمی", attendance: { "1401-06-15": "absent", "1401-06-16": "present" } },
    { id: 104, name: "حسین رضایی", attendance: { "1401-06-15": "present", "1401-06-16": "present" } },
    { id: 105, name: "مهدی حسینی", attendance: { "1401-06-15": "present", "1401-06-16": "absent" } },
  ],
  2: [
    { id: 201, name: "امیر موسوی", attendance: { "1401-06-15": "present", "1401-06-16": "present" } },
    { id: 202, name: "سینا جعفری", attendance: { "1401-06-15": "absent", "1401-06-16": "present" } },
    { id: 203, name: "پارسا عباسی", attendance: { "1401-06-15": "present", "1401-06-16": "late" } },
    { id: 204, name: "سعید نادری", attendance: { "1401-06-15": "present", "1401-06-16": "present" } },
    { id: 205, name: "احسان قاسمی", attendance: { "1401-06-15": "late", "1401-06-16": "present" } },
  ],
  // Add more classes as needed
};

// Define the attendance form schema
const attendanceFormSchema = z.object({
  date: z.string().min(1, "تاریخ را وارد کنید"),
  classId: z.string().min(1, "کلاس را انتخاب کنید"),
});

export default function AdminAttendance() {
  const { toast } = useToast();
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceList, setAttendanceList] = useState<Record<number, string>>({});

  const form = useForm<z.infer<typeof attendanceFormSchema>>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      classId: "",
    },
  });

  const handleSelectClass = (classId: number) => {
    setSelectedClassId(classId);
    
    // Initialize attendance list for the selected class
    const newAttendanceList: Record<number, string> = {};
    studentsData[classId as keyof typeof studentsData]?.forEach(student => {
      newAttendanceList[student.id] = "present"; // Default to present
    });
    setAttendanceList(newAttendanceList);
  };

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, this would save to an API
    toast({
      title: "ثبت حضور و غیاب",
      description: `حضور و غیاب کلاس ${classData.find(c => c.id === selectedClassId)?.name} در تاریخ ${selectedDate} با موفقیت ثبت شد.`,
    });
  };

  const getPastAttendance = (studentId: number, classId: number | null) => {
    if (!classId) return [];
    
    const student = studentsData[classId as keyof typeof studentsData]?.find(s => s.id === studentId);
    if (!student) return [];
    
    return Object.entries(student.attendance).map(([date, status]) => ({
      date,
      status,
    }));
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">مدیریت حضور و غیاب</h2>
          
          <Tabs defaultValue="attendance">
            <TabsList className="mb-4">
              <TabsTrigger value="attendance">ثبت حضور و غیاب</TabsTrigger>
              <TabsTrigger value="history">تاریخچه حضور و غیاب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="attendance" className="space-y-4">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    ثبت حضور و غیاب روزانه
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>تاریخ</Label>
                      <Input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 lg:col-span-2">
                      <Label>جستجوی کلاس</Label>
                      <div className="flex">
                        <Input placeholder="نام یا شماره کلاس..." className="rounded-l-none" />
                        <Button variant="outline" size="icon" className="rounded-r-none border-r-0">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-medium text-lg mb-4">انتخاب کلاس</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {classData.map((cls) => (
                      <Card 
                        key={cls.id} 
                        className={`cursor-pointer transition-all ${selectedClassId === cls.id ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => handleSelectClass(cls.id)}
                      >
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h4 className="font-medium">{cls.name}</h4>
                            <p className="text-sm text-muted-foreground">اتاق {cls.room}</p>
                            <p className="text-xs mt-2">{cls.count} دانش آموز</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {selectedClassId && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-lg">
                          ثبت حضور و غیاب {classData.find(c => c.id === selectedClassId)?.name}
                        </h3>
                        <Button onClick={handleSaveAttendance} className="gap-2">
                          <Save className="h-4 w-4" />
                          ذخیره
                        </Button>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>نام دانش آموز</TableHead>
                            <TableHead>وضعیت</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentsData[selectedClassId as keyof typeof studentsData]?.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>
                                <RadioGroup
                                  value={attendanceList[student.id] || "present"}
                                  onValueChange={(value) => handleAttendanceChange(student.id, value)}
                                  className="flex space-x-4 space-x-reverse"
                                >
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value="present" id={`present-${student.id}`} />
                                    <Label htmlFor={`present-${student.id}`} className="text-green-600">حاضر</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                                    <Label htmlFor={`absent-${student.id}`} className="text-red-600">غایب</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value="late" id={`late-${student.id}`} />
                                    <Label htmlFor={`late-${student.id}`} className="text-amber-600">تاخیر</Label>
                                  </div>
                                </RadioGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    تاریخچه حضور و غیاب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>انتخاب کلاس</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کلاس" />
                        </SelectTrigger>
                        <SelectContent>
                          {classData.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id.toString()}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>انتخاب دانش آموز</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب دانش آموز" />
                        </SelectTrigger>
                        <SelectContent>
                          {studentsData[1].map((student) => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>محدوده تاریخ</Label>
                      <div className="flex gap-2">
                        <Input type="date" className="flex-1" />
                        <Input type="date" className="flex-1" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mb-6 gap-2">
                    <Search className="h-4 w-4" />
                    جستجو
                  </Button>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>نام دانش آموز</TableHead>
                        <TableHead>کلاس</TableHead>
                        <TableHead>تاریخ</TableHead>
                        <TableHead>وضعیت</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Sample data rows */}
                      <TableRow>
                        <TableCell>علی محمدی</TableCell>
                        <TableCell>هفتم الف</TableCell>
                        <TableCell>۱۴۰۱/۰۶/۱۵</TableCell>
                        <TableCell className="text-green-600">حاضر</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>علی محمدی</TableCell>
                        <TableCell>هفتم الف</TableCell>
                        <TableCell>۱۴۰۱/۰۶/۱۶</TableCell>
                        <TableCell className="text-amber-600">تاخیر</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>رضا کریمی</TableCell>
                        <TableCell>هفتم الف</TableCell>
                        <TableCell>۱۴۰۱/۰۶/۱۵</TableCell>
                        <TableCell className="text-red-600">غایب</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
