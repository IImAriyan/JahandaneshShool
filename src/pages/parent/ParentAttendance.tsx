
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ParentAttendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const attendanceLog = [
    { date: "۱۴۰۳/۱۱/۰۱", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۲", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۳", status: "absent", note: "بیماری" },
    { date: "۱۴۰۳/۱۱/۰۴", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۵", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۶", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۷", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۰۸", status: "excused", note: "مراجعه به پزشک" },
    { date: "۱۴۰۳/۱۱/۰۹", status: "present", note: "" },
    { date: "۱۴۰۳/۱۱/۱۰", status: "present", note: "" },
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "absent":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "excused":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "present":
        return "حاضر";
      case "absent":
        return "غایب";
      case "excused":
        return "با مجوز";
      default:
        return "";
    }
  };

  return (
    <ThemeProvider>
      <DashboardLayout userType="parent">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">گزارش حضور و غیاب</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="space-y-1 w-full max-w-xs">
              <Select defaultValue="month3">
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب ماه" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month1">مهر ۱۴۰۳</SelectItem>
                  <SelectItem value="month2">آبان ۱۴۰۳</SelectItem>
                  <SelectItem value="month3">آذر ۱۴۰۳</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقویم حضور و غیاب</CardTitle>
                <CardDescription>نمایش وضعیت حضور و غیاب در ماه جاری</CardDescription>
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
            
            <Card>
              <CardHeader>
                <CardTitle>آمار حضور ماهانه</CardTitle>
                <CardDescription>وضعیت حضور دانش آموز در ماه جاری</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center mb-6">
                    <div className="h-24 w-24 rounded-full border-8 border-schoolblue-500 flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold">۹۲٪</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>حاضر</span>
                          <span className="font-medium text-green-600">۹۲٪</span>
                        </div>
                        <Progress value={92} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>غایب</span>
                          <span className="font-medium text-red-600">۳٪</span>
                        </div>
                        <Progress value={3} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>با مجوز</span>
                          <span className="font-medium text-amber-600">۵٪</span>
                        </div>
                        <Progress value={5} className="h-2 bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>سوابق حضور و غیاب</CardTitle>
              <CardDescription>جزئیات حضور و غیاب روزانه</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>توضیحات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceLog.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span>{getStatusText(log.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.note || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}
