
import { useEffect } from "react";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";

export default function AdminDashboardPage() {
  // بارگذاری تم از localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <ThemeProvider>
      <DashboardLayout userType="admin">
        <AdminDashboard />
      </DashboardLayout>
    </ThemeProvider>
  );
}
