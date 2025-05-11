
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

export default function ParentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const events = [
    {
      id: 1,
      title: "جلسه اولیا و مربیان",
      date: "۱۴۰۴/۰۱/۲۵",
      time: "۱۶:۰۰ - ۱۸:۰۰",
      location: "سالن اجتماعات مدرسه",
      description: "جلسه هماهنگی و گزارش وضعیت تحصیلی دانش آموزان",
      type: "meeting"
    },
    {
      id: 2,
      title: "امتحانات میان ترم",
      date: "۱۴۰۴/۰۲/۰۱",
      time: "۸:۰۰ - ۱۲:۰۰",
      location: "کلاس های درس",
      description: "امتحانات میان ترم نیمسال دوم",
      type: "exam"
    },
    {
      id: 3,
      title: "اردوی دانش آموزی",
      date: "۱۴۰۴/۰۲/۱۵",
      time: "تمام روز",
      location: "پارک ملی سیرجان",
      description: "اردوی تفریحی-علمی دانش آموزان",
      type: "trip"
    },
    {
      id: 4,
      title: "مسابقات ورزشی",
      date: "۱۴۰۴/۰۲/۲۱",
      time: "۹:۰۰ - ۱۳:۰۰",
      location: "سالن ورزشی مدرسه",
      description: "مسابقات ورزشی بین کلاسی",
      type: "sports"
    },
    {
      id: 5,
      title: "تعطیلات نوروز",
      date: "۱۴۰۴/۰۱/۰۱",
      time: "تمام روز",
      location: "-",
      description: "شروع تعطیلات نوروز",
      type: "holiday"
    },
    {
      id: 6,
      title: "بازگشایی مدارس",
      date: "۱۴۰۴/۰۱/۱۵",
      time: "۸:۰۰",
      location: "مدرسه",
      description: "شروع کلاس ها پس از تعطیلات نوروز",
      type: "general"
    },
  ];
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "trip":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "sports":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "holiday":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  return (
    <ThemeProvider>
      <DashboardLayout userType="parent">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">تقویم آموزشی</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>تقویم</CardTitle>
                <CardDescription>مشاهده رویدادها و مناسبت های مدرسه</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md p-3"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>رویدادهای پیش رو</CardTitle>
                <CardDescription>لیست رویدادها و مناسبت های آینده</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <Badge className={getBadgeColor(event.type)}>
                          {event.type === "exam" ? "امتحان" :
                           event.type === "meeting" ? "جلسه" :
                           event.type === "trip" ? "اردو" :
                           event.type === "sports" ? "ورزشی" :
                           event.type === "holiday" ? "تعطیلی" : "عمومی"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>برنامه هفتگی دانش آموز</CardTitle>
              <CardDescription>برنامه کلاسی هفتگی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-3 px-2 font-medium">روز / ساعت</TableHead>
                      <TableHead className="py-3 px-2 font-medium">۸:۰۰ - ۹:۳۰</TableHead>
                      <TableHead className="py-3 px-2 font-medium">۹:۴۵ - ۱۱:۱۵</TableHead>
                      <TableHead className="py-3 px-2 font-medium">۱۱:۳۰ - ۱۳:۰۰</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y">
                    <TableRow>
                      <TableCell className="py-3 px-2 font-medium">شنبه</TableCell>
                      <TableCell className="py-3 px-2">ریاضی</TableCell>
                      <TableCell className="py-3 px-2">علوم</TableCell>
                      <TableCell className="py-3 px-2">عربی</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-3 px-2 font-medium">یکشنبه</TableCell>
                      <TableCell className="py-3 px-2">ادبیات</TableCell>
                      <TableCell className="py-3 px-2">زبان</TableCell>
                      <TableCell className="py-3 px-2">ورزش</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-3 px-2 font-medium">دوشنبه</TableCell>
                      <TableCell className="py-3 px-2">ریاضی</TableCell>
                      <TableCell className="py-3 px-2">اجتماعی</TableCell>
                      <TableCell className="py-3 px-2">ادبیات</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-3 px-2 font-medium">سه‌شنبه</TableCell>
                      <TableCell className="py-3 px-2">علوم</TableCell>
                      <TableCell className="py-3 px-2">زبان</TableCell>
                      <TableCell className="py-3 px-2">هنر</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-3 px-2 font-medium">چهارشنبه</TableCell>
                      <TableCell className="py-3 px-2">دینی</TableCell>
                      <TableCell className="py-3 px-2">ریاضی</TableCell>
                      <TableCell className="py-3 px-2">عربی</TableCell>
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
