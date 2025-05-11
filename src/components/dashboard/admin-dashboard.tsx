
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, UserPlus, School, User, BookOpen } from "lucide-react";

export function AdminDashboard() {
  const stats = [
    {
      title: "کل دانش آموزان",
      value: "428",
      icon: Users,
      color: "bg-schoolblue-100 text-schoolblue-700 dark:bg-schoolblue-900 dark:text-schoolblue-300",
      change: "+12",
      changeType: "positive",
    },
    {
      title: "کل معلمان",
      value: "32",
      icon: User,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      change: "+2",
      changeType: "positive",
    },
    {
      title: "کلاس ها",
      value: "18",
      icon: School,
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      change: "+1",
      changeType: "positive",
    },
    {
      title: "ثبت نام جدید",
      value: "8",
      icon: UserPlus,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      change: "+3",
      changeType: "positive",
    },
  ];

  const classes = [
    { name: "کلاس اول الف", teacher: "آقای محمدی", students: 24, attendance: 95 },
    { name: "کلاس سوم ب", teacher: "آقای رضایی", students: 22, attendance: 92 },
    { name: "کلاس پنجم الف", teacher: "آقای کریمی", students: 26, attendance: 88 },
    { name: "کلاس هفتم ب", teacher: "آقای امیری", students: 23, attendance: 91 },
    { name: "کلاس نهم الف", teacher: "آقای حسینی", students: 21, attendance: 97 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              } flex items-center`}>
                {stat.changeType === "positive" ? "+" : "-"}{stat.change} از ماه قبل
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>نرخ حضور و غیاب کلاس ها</CardTitle>
            <CardDescription>
              میزان حضور دانش آموزان در کلاس های مختلف
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((cls, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                    <div className="text-sm font-medium">{cls.attendance}%</div>
                  </div>
                  <Progress value={cls.attendance} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>آمار دانش آموزان</CardTitle>
            <CardDescription>
              آمار و اطلاعات کلی دانش آموزان مدرسه
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">توزیع پایه های تحصیلی</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-schoolblue-100 dark:bg-schoolblue-900 rounded-md p-3">
                    <div className="text-2xl font-bold text-schoolblue-700 dark:text-schoolblue-300">165</div>
                    <div className="text-xs text-muted-foreground">پایه 1-3</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-md p-3">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">148</div>
                    <div className="text-xs text-muted-foreground">پایه 4-6</div>
                  </div>
                  <div className="bg-indigo-100 dark:bg-indigo-900 rounded-md p-3">
                    <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">115</div>
                    <div className="text-xs text-muted-foreground">پایه 7-9</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">میانگین نمرات کلاس ها</div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">پایه 1-3</div>
                      <div className="text-sm font-medium">17.8</div>
                    </div>
                    <Progress value={89} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">پایه 4-6</div>
                      <div className="text-sm font-medium">16.5</div>
                    </div>
                    <Progress value={82} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">پایه 7-9</div>
                      <div className="text-sm font-medium">15.2</div>
                    </div>
                    <Progress value={76} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
