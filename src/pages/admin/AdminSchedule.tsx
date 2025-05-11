
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Edit, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Mock data for teachers
const teachersData = [
  { id: 1, name: "آقای محمدی", subject: "ریاضی" },
  { id: 2, name: "آقای رضایی", subject: "علوم" },
  { id: 3, name: "آقای کریمی", subject: "ادبیات" },
  { id: 4, name: "آقای امیری", subject: "زبان انگلیسی" },
  { id: 5, name: "آقای حسینی", subject: "اجتماعی" },
  { id: 6, name: "آقای قربانی", subject: "عربی" },
  { id: 7, name: "آقای صالحی", subject: "ورزش" },
  { id: 8, name: "آقای موسوی", subject: "هنر" },
  { id: 9, name: "آقای جعفری", subject: "قرآن" },
];

// Mock data for classes
const classesData = [
  { id: 1, name: "کلاس هفتم الف", room: "۱۰۱" },
  { id: 2, name: "کلاس هفتم ب", room: "۱۰۲" },
  { id: 3, name: "کلاس هشتم الف", room: "۱۰۳" },
  { id: 4, name: "کلاس هشتم ب", room: "۲۰۱" },
  { id: 5, name: "کلاس نهم الف", room: "۲۰۲" },
  { id: 6, name: "کلاس نهم ب", room: "۲۰۳" },
];

// Mock schedule data
const initialScheduleData = [
  { id: 1, classId: 1, teacherId: 1, day: "شنبه", time: "8:00-9:30", subject: "ریاضی" },
  { id: 2, classId: 1, teacherId: 2, day: "شنبه", time: "9:45-11:15", subject: "علوم" },
  { id: 3, classId: 1, teacherId: 3, day: "شنبه", time: "11:30-13:00", subject: "ادبیات" },
  { id: 4, classId: 1, teacherId: 1, day: "یکشنبه", time: "8:00-9:30", subject: "ریاضی" },
  { id: 5, classId: 1, teacherId: 4, day: "یکشنبه", time: "9:45-11:15", subject: "زبان انگلیسی" },
  { id: 6, classId: 2, teacherId: 1, day: "شنبه", time: "11:30-13:00", subject: "ریاضی" },
  { id: 7, classId: 2, teacherId: 2, day: "یکشنبه", time: "8:00-9:30", subject: "علوم" },
];

type ScheduleItem = {
  id: number;
  classId: number;
  teacherId: number;
  day: string;
  time: string;
  subject: string;
};

export default function AdminSchedule() {
  const { toast } = useToast();
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(initialScheduleData);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Omit<ScheduleItem, 'id'>>({
    classId: 0,
    teacherId: 0,
    day: "",
    time: "",
    subject: ""
  });

  const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه"];
  const timeSlots = ["8:00-9:30", "9:45-11:15", "11:30-13:00", "14:00-15:30"];

  const handleAddSchedule = () => {
    const teacher = teachersData.find(t => t.id === newSchedule.teacherId);
    if (teacher) {
      const newItem: ScheduleItem = {
        id: scheduleData.length + 1,
        ...newSchedule,
        subject: teacher.subject
      };
      
      setScheduleData(prev => [...prev, newItem]);
      setIsDialogOpen(false);
      
      toast({
        title: "برنامه جدید اضافه شد",
        description: `برنامه کلاسی برای ${classesData.find(c => c.id === newSchedule.classId)?.name} در روز ${newSchedule.day} ثبت شد.`,
      });

      // Reset form
      setNewSchedule({
        classId: 0,
        teacherId: 0,
        day: "",
        time: "",
        subject: ""
      });
    }
  };

  // Filter schedule by class or teacher
  const filteredSchedule = scheduleData.filter(item => {
    if (selectedClass && selectedTeacher) {
      return item.classId === selectedClass && item.teacherId === selectedTeacher;
    } else if (selectedClass) {
      return item.classId === selectedClass;
    } else if (selectedTeacher) {
      return item.teacherId === selectedTeacher;
    }
    return true;
  });

  const getTeacherScheduleByDay = (teacherId: number, day: string) => {
    return scheduleData
      .filter(item => item.teacherId === teacherId && item.day === day)
      .map(item => ({
        time: item.time,
        className: classesData.find(c => c.id === item.classId)?.name || "",
      }));
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">مدیریت برنامه کلاسی</h2>
          
          <Tabs defaultValue="class-schedule">
            <TabsList className="mb-4">
              <TabsTrigger value="class-schedule">برنامه کلاس ها</TabsTrigger>
              <TabsTrigger value="teacher-schedule">برنامه معلمان</TabsTrigger>
            </TabsList>
            
            <TabsContent value="class-schedule" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-64">
                    <Label className="mb-2 block">انتخاب کلاس</Label>
                    <Select onValueChange={(value) => setSelectedClass(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کلاس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">همه کلاس‌ها</SelectItem>
                        {classesData.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id.toString()}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      افزودن برنامه جدید
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>افزودن برنامه کلاسی جدید</DialogTitle>
                      <DialogDescription>
                        معلم و زمان کلاس را مشخص کنید.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">کلاس</Label>
                        <Select onValueChange={(value) => setNewSchedule({...newSchedule, classId: Number(value)})}>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب کلاس" />
                          </SelectTrigger>
                          <SelectContent>
                            {classesData.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher">معلم</Label>
                        <Select onValueChange={(value) => setNewSchedule({...newSchedule, teacherId: Number(value)})}>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب معلم" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachersData.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                {teacher.name} - {teacher.subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="day">روز هفته</Label>
                        <Select onValueChange={(value) => setNewSchedule({...newSchedule, day: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب روز" />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">ساعت کلاس</Label>
                        <Select onValueChange={(value) => setNewSchedule({...newSchedule, time: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب ساعت" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleAddSchedule}>ثبت برنامه</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {selectedClass ? (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedClass ? classesData.find(c => c.id === selectedClass)?.name : "همه کلاس‌ها"}
                    </CardTitle>
                    <CardDescription>برنامه هفتگی کلاس</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ساعت</TableHead>
                          {daysOfWeek.map((day) => (
                            <TableHead key={day}>{day}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((time) => (
                          <TableRow key={time}>
                            <TableCell className="font-medium">{time}</TableCell>
                            {daysOfWeek.map((day) => {
                              const scheduleItem = scheduleData.find(
                                item => item.classId === selectedClass && item.day === day && item.time === time
                              );
                              
                              return (
                                <TableCell key={day} className="relative">
                                  {scheduleItem ? (
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                                      <div className="font-medium">{teachersData.find(t => t.id === scheduleItem.teacherId)?.name}</div>
                                      <div className="text-xs text-muted-foreground">{scheduleItem.subject}</div>
                                    </div>
                                  ) : null}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {classesData.map((cls) => (
                    <Card key={cls.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle>{cls.name}</CardTitle>
                        <CardDescription>اتاق {cls.room}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {daysOfWeek.slice(0, 3).map((day) => {
                            const daySchedule = scheduleData.filter(
                              item => item.classId === cls.id && item.day === day
                            );
                            
                            if (daySchedule.length === 0) return null;
                            
                            return (
                              <div key={day} className="flex items-center">
                                <div className="min-w-[60px] text-sm font-medium">{day}</div>
                                <div className="flex flex-wrap gap-1">
                                  {daySchedule.map((item) => (
                                    <div key={item.id} className="text-xs bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                      {item.time} - {item.subject}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <Button variant="link" className="mt-2 h-8 p-0" onClick={() => setSelectedClass(cls.id)}>
                          مشاهده کامل
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="teacher-schedule">
              <div className="mb-6">
                <div className="flex gap-4 mb-6">
                  <div className="w-64">
                    <Label className="mb-2 block">انتخاب معلم</Label>
                    <Select onValueChange={(value) => setSelectedTeacher(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب معلم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">همه معلم‌ها</SelectItem>
                        {teachersData.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id.toString()}>
                            {teacher.name} - {teacher.subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {selectedTeacher ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {selectedTeacher ? teachersData.find(t => t.id === selectedTeacher)?.name : "همه معلم‌ها"}
                      </CardTitle>
                      <CardDescription>برنامه هفتگی معلم</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">ساعت</TableHead>
                            {daysOfWeek.map((day) => (
                              <TableHead key={day}>{day}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {timeSlots.map((time) => (
                            <TableRow key={time}>
                              <TableCell className="font-medium">{time}</TableCell>
                              {daysOfWeek.map((day) => {
                                const scheduleItem = scheduleData.find(
                                  item => item.teacherId === selectedTeacher && item.day === day && item.time === time
                                );
                                
                                return (
                                  <TableCell key={day}>
                                    {scheduleItem ? (
                                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                                        <div className="font-medium">{classesData.find(c => c.id === scheduleItem.classId)?.name}</div>
                                        <div className="text-xs text-muted-foreground">{scheduleItem.subject}</div>
                                      </div>
                                    ) : null}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {teachersData.map((teacher) => (
                      <Card key={teacher.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>{teacher.name}</CardTitle>
                          <CardDescription>{teacher.subject}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {daysOfWeek.slice(0, 3).map((day) => {
                              const teacherDaySchedule = getTeacherScheduleByDay(teacher.id, day);
                              
                              if (teacherDaySchedule.length === 0) return null;
                              
                              return (
                                <div key={day} className="flex items-center">
                                  <div className="min-w-[60px] text-sm font-medium">{day}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {teacherDaySchedule.map((item, index) => (
                                      <div key={index} className="text-xs bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                        {item.time} - {item.className}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <Button variant="link" className="mt-2 h-8 p-0" onClick={() => setSelectedTeacher(teacher.id)}>
                            مشاهده کامل
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
