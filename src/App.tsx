
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

// Admin Dashboard Pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminSchedule from "./pages/admin/AdminSchedule";

// Teacher Dashboard Pages
import TeacherGrades from "./pages/teacher/TeacherGrades";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherReports from "./pages/teacher/TeacherReports";
import TeacherProfile from "./pages/teacher/TeacherProfile";

// Parent Dashboard Pages
import ParentGrades from "./pages/parent/ParentGrades";
import ParentAttendance from "./pages/parent/ParentAttendance";
import ParentProfile from "./pages/parent/ParentProfile";
import ParentCalendar from "./pages/parent/ParentCalendar";

const App = () => {
  // بارگذاری تم از localStorage و اعمال آن به کل برنامه
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
    }
    
    // گوش دادن به تغییرات localStorage برای همگام‌سازی تم بین صفحات
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "jahan-danesh-theme" && e.newValue) {
        document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
        document.documentElement.classList.add(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeProvider defaultTheme={localStorage.getItem("jahan-danesh-theme") as any || "light"}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portal" element={<Index />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/users" element={<AdminUsers />} />
            <Route path="/admin-dashboard/classes" element={<AdminClasses />} />
            <Route path="/admin-dashboard/reports" element={<AdminReports />} />
            <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
            <Route path="/admin-dashboard/attendance" element={<AdminAttendance />} />
            <Route path="/admin-dashboard/schedule" element={<AdminSchedule />} />
            
            {/* Teacher Dashboard Routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-dashboard/grades" element={<TeacherGrades />} />
            <Route path="/teacher-dashboard/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher-dashboard/reports" element={<TeacherReports />} />
            <Route path="/teacher-dashboard/profile" element={<TeacherProfile />} />
            
            {/* Parent Dashboard Routes */}
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/parent-dashboard/grades" element={<ParentGrades />} />
            <Route path="/parent-dashboard/attendance" element={<ParentAttendance />} />
            <Route path="/parent-dashboard/profile" element={<ParentProfile />} />
            <Route path="/parent-dashboard/calendar" element={<ParentCalendar />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
