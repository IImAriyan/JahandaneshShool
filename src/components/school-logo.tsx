
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";

interface SchoolLogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function SchoolLogo({ className, size = "medium" }: SchoolLogoProps) {
  const sizeClasses = {
    small: "h-8",
    medium: "h-12",
    large: "h-20",
  };

  return (
    <ThemeProvider>
        <div className={cn("flex items-center", className)}>
      <div className={cn("text-schoolblue-700 dark:text-schoolblue-400 font-bold", sizeClasses[size])}>
        <div className="flex items-center gap-2">
          <div className="relative">
              <img 
              src="https://s6.uupload.ir/files/logo_jahandanesh_hyfj.png"
              alt="jahandanesh sirjan"
              title="لوگو"
              className={'w-8'}
              />
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
