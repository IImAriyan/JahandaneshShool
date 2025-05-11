
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SchoolLogo } from "@/components/school-logo";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  userType: "admin" | "teacher" | "parent";
}

export function AuthCard({
  children,
  title,
  description,
  footer,
  className,
  userType,
}: AuthCardProps) {
  const cardBackgrounds = {
    admin: "bg-gradient-to-br from-schoolblue-100 to-schoolblue-50 dark:from-schoolblue-900 dark:to-schoolblue-950 border-schoolblue-200 dark:border-schoolblue-800",
    teacher: "bg-gradient-to-br from-schoolblue-50 to-blue-50 dark:from-schoolblue-950 dark:to-blue-950 border-blue-200 dark:border-blue-900",
    parent: "bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-schoolblue-900 border-blue-100 dark:border-blue-800",
  };

  const titleColors = {
    admin: "text-schoolblue-700 dark:text-schoolblue-300",
    teacher: "text-schoolblue-700 dark:text-schoolblue-400", 
    parent: "text-schoolblue-600 dark:text-schoolblue-400",
  };

  return (
    <Card 
      className={cn(
        "w-full max-w-md shadow-lg border",
        cardBackgrounds[userType],
        className
      )}
    >
      <CardHeader className="pb-0 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center">
          <SchoolLogo size="large" className="mb-2" />
          <CardTitle className={`text-2xl font-bold mb-2 ${titleColors[userType]}`}>{title}</CardTitle>
          {description && (
            <CardDescription className="text-center rtl">{description}</CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
