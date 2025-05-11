
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ParentDashboard() {
  const student = {
    name: "ارین اسماعیل زاده",
    family:'اسماعیل زاده',
    grade: "هفتم",
    class: "۸-۱",
    attendanceRate: 92,
    gpa: 19.21,
  };
  
  const upcomingEvents = [
    {
      title: "جلسه اولیا و مربیان",
      date: "۱۴۰۴/۰۱/۲۵",
      time: "۱۶:۰۰ - ۱۸:۰۰",
    },
    {
      title: "امتحانات میان ترم",
      date: "۱۴۰۴/۰۲/۰۱",
      time: "۸:۰۰ - ۱۲:۰۰",
    },
    {
      title: "اردوی دانش آموزی",
      date: "۱۴۰۴/۰۲/۱۵",
      time: "تمام روز",
    },
  ];

  const Weekly_Hadith = {
    hadith:"بهترین خوبی ها اخلاق خوب است !",
    speaker : "امام حسن (ع)",
  }
  
  const recentGrades = [
    { subject: "ریاضی", grade: 19, maxGrade: 20 },
    { subject: "علوم", grade: 18.5, maxGrade: 20 },
    { subject: "ادبیات فارسی", grade: 17, maxGrade: 20 },
    { subject: "عربی", grade: 16.5, maxGrade: 20 },
    { subject: "زبان انگلیسی", grade: 18, maxGrade: 20 },
  ];
  
  const attendance = {
    present: 92,
    absent: 3,
    excused: 5,
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-start items-center">
        <div className="w-[40rem] h-auto bg-green-200  rounded-xl">
            <div className="text-right font-bold text-xl text-green-500 p-6">
              حدیث هفتگی مدرسه جهان دانش
            </div>
            <div className="text-white text-center p-4 font-bold bg-green-300 rounded-xl m-4 flex flex-col ">
              <h1 className='text-[1rem] text-right text-green-600'>{Weekly_Hadith.speaker}</h1>
              <p>{Weekly_Hadith.hadith}</p>
            </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-gradient-to-r from-schoolblue-600 to-schoolblue-800 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
             سلام خانواده  {student.family} به پورتال والدین خوش آمدید
            </h1>
            <p className="opacity-90 mt-1">
              اطلاعات و وضعیت تحصیلی دانش آموز: {student.name}
            </p>
          </div>
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <GraduationCap className="h-8 w-8" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm">
            <p className="text-sm opacity-75">کلاس</p>
            <p className="text-lg font-bold">
              پایه {student.grade} - کلاس {student.class}
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm">
            <p className="text-sm opacity-75">میزان حضور</p>
            <p className="text-lg font-bold">{student.attendanceRate}%</p>
          </div>
          <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm">
            <p className="text-sm opacity-75">معدل</p>
            <p className="text-lg font-bold">{student.gpa}</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>آخرین نمرات</span>
              <BookOpen className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              نمرات اخیر در دروس مختلف
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((subject, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span>
                    {subject.grade} از {subject.maxGrade}
                  </span>
                </div>
                <Progress
                  value={(subject.grade / subject.maxGrade) * 100}
                  className={`h-2 ${
                    subject.grade >= 17
                      ? "bg-green-500"
                      : subject.grade >= 15
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link to="/parent-dashboard/grades"  className="w-full">
            <Button variant="outline" className="w-full" size="sm">
              مشاهده تمام نمرات
            </Button>
            </Link>

          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>رویدادهای آینده</span>
              <Calendar className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              رویدادهای نزدیک مدرسه
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="p-3 rounded-md border flex items-start gap-3"
              >
                <div className="rounded-full p-2 bg-schoolblue-100 text-schoolblue-700 dark:bg-schoolblue-900 dark:text-schoolblue-300">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {event.date} | {event.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              مشاهده تقویم آموزشی
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>حضور و غیاب</span>
              <CheckCircle className="h-5 w-5 text-schoolblue-600" />
            </CardTitle>
            <CardDescription>
              وضعیت حضور و غیاب در ماه جاری
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6 gap-6">
              <div className="h-24 w-24 rounded-full border-8 border-schoolblue-500 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold">{attendance.present}%</span>
              </div>
              <div className="space-y-2 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>حاضر</span>
                    <span className="font-medium text-green-600">{attendance.present}%</span>
                  </div>
                  <Progress value={attendance.present} className="h-2 bg-muted" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>غایب</span>
                    <span className="font-medium text-red-600">{attendance.absent}%</span>
                  </div>
                  <Progress value={attendance.absent} className="h-2 bg-muted" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>با مجوز</span>
                    <span className="font-medium text-amber-600">{attendance.excused}%</span>
                  </div>
                  <Progress value={attendance.excused} className="h-2 bg-muted" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>

            <Link to='/parent-dashboard/attendance' className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                گزارش کامل حضور و غیاب
              </Button>
            </Link>

          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>برنامه درسی هفتگی</CardTitle>
          <CardDescription>
              {new Date().toLocaleDateString("fa-IR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 font-medium">روز / ساعت</th>
                  <th className="py-3 px-2 font-medium">۸:۰۰ - ۹:۳۰</th>
                  <th className="py-3 px-2 font-medium">۹:۴۵ - ۱۱:۱۵</th>
                  <th className="py-3 px-2 font-medium">۱۱:۳۰ - ۱۳:۰۰</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-2 font-medium">شنبه</td>
                  <td className="py-3 px-2">ریاضی</td>
                  <td className="py-3 px-2">علوم</td>
                  <td className="py-3 px-2">عربی</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">یکشنبه</td>
                  <td className="py-3 px-2">ادبیات</td>
                  <td className="py-3 px-2">زبان</td>
                  <td className="py-3 px-2">ورزش</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">دوشنبه</td>
                  <td className="py-3 px-2">ریاضی</td>
                  <td className="py-3 px-2">اجتماعی</td>
                  <td className="py-3 px-2">ادبیات</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">سه‌شنبه</td>
                  <td className="py-3 px-2">علوم</td>
                  <td className="py-3 px-2">زبان</td>
                  <td className="py-3 px-2">هنر</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">چهارشنبه</td>
                  <td className="py-3 px-2">دینی</td>
                  <td className="py-3 px-2">ریاضی</td>
                  <td className="py-3 px-2">عربی</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
