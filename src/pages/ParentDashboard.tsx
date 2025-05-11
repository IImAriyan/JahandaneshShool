
import { useEffect } from "react";
import { ParentDashboard } from "@/components/dashboard/parent-dashboard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";

export default function ParentDashboardPage() {
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
      <DashboardLayout userType="parent">
        <ParentDashboard />
      </DashboardLayout>
    </ThemeProvider>
  );
}
