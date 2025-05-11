
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { SchoolLogo } from "@/components/school-logo";
import { Menu, X, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

type HeaderProps = {
  navItems: { label: string; href: string; children?: { label: string; href: string }[] }[];
};

export function Header({ navItems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const headerClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300",
    scrolled 
      ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md py-2" 
      : "bg-white dark:bg-gray-950 py-4",
    "border-b border-gray-200 dark:border-gray-800"
  );

  const getButtonStyles = () => {
    switch (theme) {
      case "green":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "purple":
        return "bg-purple-600 hover:bg-purple-700 text-white";
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "dark":
        return "bg-schoolblue-600 hover:bg-schoolblue-700 text-white";
      default:
        return "bg-schoolblue-600 hover:bg-schoolblue-700 text-white";
    }
  };

  const handleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      closeDropdowns();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SchoolLogo size="small" />
          </motion.div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label} className="relative" onClick={(e) => e.stopPropagation()}>
                  {item.children ? (
                    <div>
                      <button 
                        className={cn(
                          "flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-schoolblue-600 dark:hover:text-schoolblue-400 transition-colors px-2 py-1 rounded-md",
                          theme === "green" ? "hover:text-green-600 dark:hover:text-green-400" : "",
                          theme === "purple" ? "hover:text-purple-600 dark:hover:text-purple-400" : "",
                          theme === "blue" ? "hover:text-blue-600 dark:hover:text-blue-400" : "",
                          activeDropdown === item.label ? "text-schoolblue-600 dark:text-schoolblue-400" : ""
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDropdown(item.label);
                        }}
                      >
                        {item.label}
                        <ChevronDown size={16} className={cn(
                          "transition-transform duration-200",
                          activeDropdown === item.label ? "transform rotate-180" : ""
                        )} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.children.map((child) => (
                              <a 
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-schoolblue-600 dark:hover:text-schoolblue-400"
                                onClick={() => closeDropdowns()}
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a 
                      href={item.href} 
                      className={cn(
                        "text-gray-700 dark:text-gray-300 hover:text-schoolblue-600 dark:hover:text-schoolblue-400 transition-colors px-2 py-1 rounded-md",
                        theme === "green" ? "hover:text-green-600 dark:hover:text-green-400" : "",
                        theme === "purple" ? "hover:text-purple-600 dark:hover:text-purple-400" : "",
                        theme === "blue" ? "hover:text-blue-600 dark:hover:text-blue-400" : ""
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-3 mr-2">
            <ThemeToggle />
            <Link to="/portal">
              <Button className={cn(
                "flex items-center gap-2 shadow-md transition-transform duration-300 hover:scale-105",
                getButtonStyles()
              )}>
                <Users className="h-4 w-4" />
                ورود به پورتال
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950 shadow-lg border-b border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col">
                <ul className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <div className="space-y-2">
                          <button 
                            className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-schoolblue-600 dark:hover:text-schoolblue-400 transition-colors px-2 py-2"
                            onClick={() => handleDropdown(item.label)}
                          >
                            {item.label}
                            <ChevronDown size={16} className={cn(
                              "transition-transform duration-200",
                              activeDropdown === item.label ? "transform rotate-180" : ""
                            )} />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pr-4 border-r-2 border-gray-200 dark:border-gray-700 mr-2"
                              >
                                {item.children.map((child) => (
                                  <a 
                                    key={child.label}
                                    href={child.href}
                                    className="block px-2 py-2 text-gray-600 dark:text-gray-400 hover:text-schoolblue-600 dark:hover:text-schoolblue-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a 
                          href={item.href} 
                          className="block text-gray-700 dark:text-gray-300 hover:text-schoolblue-600 dark:hover:text-schoolblue-400 transition-colors px-2 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                  <li>
                    <Link 
                      to="/portal" 
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className={cn(
                        "w-full flex items-center justify-center gap-2 shadow-md mt-2",
                        getButtonStyles()
                      )}>
                        <Users className="h-4 w-4" />
                        ورود به پورتال
                      </Button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
