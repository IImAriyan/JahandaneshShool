
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, User, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";

export function TeacherDashboard() {
  const todayClasses = [
    {
      className: "ریاضی - پایه نهم",
      time: "8:00 - 9:30",
      room: "۱۰۱",
      status: "completed",
    },
    {
      className: "ریاضی - پایه هشتم",
      time: "10:00 - 11:30",
      room: "۱۰۲",
      status: "upcoming",
    },
    {
      className: "ریاضی - پایه هفتم",
      time: "13:00 - 14:30",
      room: "۱۰۳",
      status: "upcoming",
    },
  ];
  
  const upcomingTasks = [
    {
      title: "تصحیح امتحان میان ترم",
      dueDate: "۱۴۰۴/۰۱/۱۵",
      priority: "high",
    },
    {
      title: "ثبت نمرات کلاس هشتم",
      dueDate: "۱۴۰۴/۰۱/۲۰",
      priority: "medium",
    },
    {
      title: "آماده سازی آزمون پایانی",
      dueDate: "۱۴۰۴/۰۲/۰۵",
      priority: "low",
    },
  ];
  
  const studentAttendance = { present: 85, absent: 10, excused: 5 };
  
  const assignments = [
    { name: "تکلیف فصل ۱", submitted: 18, total: 24 },
    { name: "تکلیف فصل ۲", submitted: 20, total: 24 },
    { name: "تکلیف فصل ۳", submitted: 16, total: 24 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>کلاس های امروز</span>
              <Calendar className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("fa-IR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((cls, i) => (
              <div
                key={i}
                className={`p-3 rounded-md border ${
                  cls.status === "completed"
                    ? "bg-muted border-muted"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{cls.className}</h4>
                  {cls.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-600" />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>کلاس {cls.room}</span>
                  <span>{cls.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              مشاهده تمام کلاس ها
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>وضعیت حضور و غیاب</span>
              <User className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              آمار حضور و غیاب دانش آموزان
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-md p-3">
                <div className="text-xl font-bold text-green-700 dark:text-green-400">{studentAttendance.present}%</div>
                <div className="text-xs text-muted-foreground">حاضر</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-md p-3">
                <div className="text-xl font-bold text-red-700 dark:text-red-400">{studentAttendance.absent}%</div>
                <div className="text-xs text-muted-foreground">غایب</div>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-md p-3">
                <div className="text-xl font-bold text-amber-700 dark:text-amber-400">{studentAttendance.excused}%</div>
                <div className="text-xs text-muted-foreground">با مجوز</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">وضعیت تحویل تکالیف</h4>
              {assignments.map((assignment, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{assignment.name}</span>
                    <span>
                      {assignment.submitted} از {assignment.total}
                    </span>
                  </div>
                  <Progress
                    value={(assignment.submitted / assignment.total) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              گزارش کامل
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>وظایف آینده</span>
              <BookOpen className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              تکالیف و وظایف پیش رو
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, i) => (
                <div
                  key={i}
                  className="p-3 rounded-md border flex items-start gap-3"
                >
                  <div
                    className={`rounded-full p-1 ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : task.priority === "medium"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      <span>تاریخ تحویل: </span>
                      <span>{task.dueDate}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              مدیریت وظایف
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>کلاس های من</CardTitle>
          <CardDescription>
            وضعیت کلی کلاس های شما در این ترم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-right font-medium">نام کلاس</th>
                  <th className="py-3 px-4 text-center font-medium">روزهای هفته</th>
                  <th className="py-3 px-4 text-center font-medium">ساعت</th>
                  <th className="py-3 px-4 text-center font-medium">تعداد دانش آموز</th>
                  <th className="py-3 px-4 text-center font-medium">حضور و غیاب</th>
                  <th className="py-3 px-4 text-center font-medium">میانگین نمرات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4">ریاضی - پایه هفتم</td>
                  <td className="py-3 px-4 text-center">شنبه، دوشنبه</td>
                  <td className="py-3 px-4 text-center">۸:۰۰ - ۹:۳۰</td>
                  <td className="py-3 px-4 text-center">۲۴</td>
                  <td className="py-3 px-4 text-center">۹۲٪</td>
                  <td className="py-3 px-4 text-center">۱۷.۵</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">ریاضی - پایه هشتم</td>
                  <td className="py-3 px-4 text-center">یکشنبه، سه‌شنبه</td>
                  <td className="py-3 px-4 text-center">۱۰:۰۰ - ۱۱:۳۰</td>
                  <td className="py-3 px-4 text-center">۲۲</td>
                  <td className="py-3 px-4 text-center">۹۰٪</td>
                  <td className="py-3 px-4 text-center">۱۶.۸</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">ریاضی - پایه نهم</td>
                  <td className="py-3 px-4 text-center">دوشنبه، چهارشنبه</td>
                  <td className="py-3 px-4 text-center">۱۳:۰۰ - ۱۴:۳۰</td>
                  <td className="py-3 px-4 text-center">۲۵</td>
                  <td className="py-3 px-4 text-center">۸۹٪</td>
                  <td className="py-3 px-4 text-center">۱۷.۲</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
