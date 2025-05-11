
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { SchoolLogo } from "@/components/school-logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown,
  CheckCircle2,
  Globe2,
  Monitor,
  BookOpenCheck,
  GraduationCap,
  Trophy as TrophyIcon,
  Dna,
  Lightbulb,
  Clock,
  Target,
  School,
  Heart,
} from "lucide-react";
import { Trophy } from "@/components/landing/Trophy";
import { Gallery } from "@/components/landing/Gallery";
import { ContactForm } from "@/components/landing/ContactForm";
import { StatsSection } from "@/components/landing/StatsSection";
import { NewsSection } from "@/components/landing/NewsSection";
import { ThemeSelector } from "@/components/landing/ThemeSelector";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const schoolInfo = {
  name: "مدرسه پسرانه جهان دانش سیرجان",
  description: "مدرسه پسرانه جهان دانش محیطی پویا و پرانرژی برای آموزش و رشد دانش‌آموزان از پایه اول تا نهم فراهم می‌کند. این مدرسه با تأکید بر شادی، پشتکار و صمیمیت، هدف نهایی خود را تعلیم و تربیت دانش‌آموزان و ساختن شخصیت آن‌ها برای زندگی شایسته فردی و اجتماعی قرار داده است.",
  aboutText: [
    "مدرسه پسرانه جهان دانش، با بیش از 15 سال سابقه در زمینه آموزش، یکی از مدارس برتر استان کرمان است. ما با افتخار به پرورش نسل آینده ایران می پردازیم.",
    "در مدرسه جهان دانش، ما به هر دانش آموز به عنوان یک فرد منحصر به فرد نگاه می‌کنیم و تلاش می‌کنیم استعدادهای ویژه هر کدام را کشف و پرورش دهیم."
  ],
  features: [
    {
      title: "برنامه آموزشی پیشرفته",
      description: "برنامه های آموزشی مدرن و به روز همراه با روش های نوین آموزشی",
      icon: BookOpenCheck
    },
    {
      title: "معلمان مجرب",
      description: "کادر آموزشی با تجربه و متخصص در حوزه های مختلف آموزشی",
      icon: GraduationCap
    },
    {
      title: "فعالیت های فوق برنامه",
      description: "فعالیت های متنوع ورزشی، هنری و علمی برای رشد همه جانبه دانش آموزان",
      icon: Calendar
    }
  ],
  valuePropositions: [
    "کادر آموزشی مجرب و متخصص",
    "فضای آموزشی استاندارد و مدرن",
    "امکانات آزمایشگاهی و کارگاهی پیشرفته",
    "کلاس های فوق برنامه متنوع",
    "تقویت مهارت های زبان انگلیسی",
    "آموزش مهارت های فناوری و کامپیوتر",
    "برگزاری اردوهای علمی و تفریحی"
  ],
  educationalApproach: [
    {
      title: "یادگیری تجربی",
      description: "یادگیری از طریق تجربه و انجام فعالیت‌های عملی برای درک عمیق‌تر مفاهیم",
      icon: Dna
    },
    {
      title: "تفکر انتقادی",
      description: "پرورش مهارت‌های تحلیل، ارزیابی و استدلال برای تصمیم‌گیری آگاهانه",
      icon: Lightbulb
    },
    {
      title: "یادگیری شخصی‌سازی شده",
      description: "توجه به سبک‌های یادگیری متفاوت و نیازهای فردی دانش‌آموزان",
      icon: Target
    },
    {
      title: "مدیریت زمان",
      description: "آموزش برنامه‌ریزی و مدیریت زمان به دانش‌آموزان برای موفقیت تحصیلی",
      icon: Clock
    },
  ],
  contact: {
    phone: "034-4567-8901",
    email: "info@jahan-danesh.edu",
    address: "سیرجان، خیابان معلم، کوچه 5، پلاک 12"
  }
};

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  // اطمینان از اینکه تم از localStorage بارگذاری می‌شود
  useEffect(() => {
    const savedTheme = localStorage.getItem("jahan-danesh-theme");
    if (savedTheme) {
      document.documentElement.classList.remove("light", "dark", "blue", "purple", "green");
      document.documentElement.classList.add(savedTheme);
      
      if (theme !== savedTheme) {
        setTheme(savedTheme as any);
      }
    }
  }, []);

  const navItems = [
    { label: "صفحه اصلی", href: "#home" },
    { 
      label: "درباره ما", 
      href: "#about",
      children: [
        { label: "معرفی مدرسه", href: "#about" },
        { label: "روش آموزشی", href: "#educational-approach" },
        { label: "آمار و دستاوردها", href: "#stats" }
      ]
    },
    { 
      label: "امکانات", 
      href: "#features",
      children: [
        { label: "ویژگی‌ها", href: "#features" },
        { label: "گالری تصاویر", href: "#gallery" }
      ]
    },
    { label: "اخبار", href: "#news" },
    { label: "تماس با ما", href: "#contact" }
  ];
  
  // تعیین کلاس‌های پس‌زمینه بر اساس تم
  const getGradientClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900";
      case "blue":
        return "bg-gradient-to-br from-blue-50 via-white to-blue-100/30";
      case "purple":
        return "bg-gradient-to-br from-purple-50 via-white to-purple-100/30";
      case "green":
        return "bg-gradient-to-br from-green-50 via-white to-green-100/30";
      default:
        return "bg-gradient-to-br from-schoolblue-50 via-white to-schoolblue-100/30";
    }
  };

  const getButtonStyles = () => {
    switch (theme) {
      case "green":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "purple":
        return "bg-purple-600 hover:bg-purple-700 text-white";
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "dark":
        return "bg-amber-500 hover:bg-amber-600 text-black";
      default:
        return "bg-schoolblue-600 hover:bg-schoolblue-700 text-white";
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 rtl">
        {/* Header */}
        <Header navItems={navItems} />

        {/* Hero Section */}
        <section 
          id="home"
          className={`pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden ${getGradientClasses()} relative`}
        >
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute w-96 h-96 bg-gradient-to-br from-schoolblue-300/10 to-schoolblue-500/20 dark:from-schoolblue-300/5 dark:to-schoolblue-500/10 blur-3xl rounded-full top-24 -right-48 opacity-70"></div>
            <div className="absolute w-96 h-96 bg-gradient-to-br from-amber-300/10 to-amber-500/20 dark:from-amber-300/5 dark:to-amber-500/10 blur-3xl rounded-full bottom-24 -left-48 opacity-70"></div>
          </div>

          <div className="container mx-auto S">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div 
                className="flex-1 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col gap-5">
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className={cn(
                      "text-gradient",
                      theme === "dark" ? "bg-gradient-to-r from-amber-400 to-amber-200" :
                      theme === "green" ? "bg-gradient-to-r from-green-600 to-green-400" :
                      theme === "purple" ? "bg-gradient-to-r from-purple-600 to-purple-400" :
                      theme === "blue" ? "bg-gradient-to-r from-blue-600 to-blue-400" :
                      "bg-gradient-to-r from-schoolblue-600 to-schoolblue-400"
                    )}>
                      {schoolInfo.name}
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {schoolInfo.description}
                  </motion.p>
                </div>
                
                <motion.div 
                  className="flex flex-wrap gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link to="/portal">
                    <Button 
                      size="lg" 
                      className={cn(
                        "gap-2 px-8 py-6 rounded-xl text-lg shadow-lg transition-transform hover:scale-105",
                        getButtonStyles()
                      )}
                    >
                      <Users className="h-5 w-5" />
                      ورود به پورتال
                    </Button>
                  </Link>
                  <a href="#contact">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="gap-2 px-8 py-6 rounded-xl text-lg border-2 shadow-sm transition-transform hover:scale-105"
                    >
                      تماس با ما
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex-1 relative hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full h-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-schoolblue-900/20 transform rotate-1">
                  <img 
                    src="https://raghavfoundation.org.in/wp-content/uploads/2023/05/school-image.jpg" 
                    alt="مدرسه جهان دانش" 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="font-bold text-xl md:text-2xl">کیفیت آموزشی برتر</p>
                    <p className="text-base md:text-lg opacity-90">برای ساختن آینده‌ای درخشان</p>
                  </div>
                </div>
                
                {/* Student count floating card */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px] flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{ boxShadow: '0 10px 40px -15px rgba(0,0,0,0.2)' }}
                >
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <School className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold  text-gray-900 dark:text-white">428</p>
                    <p className=" text-gray-500 dark:text-gray-400">دانش‌آموز</p>
                  </div>
                </motion.div>
                
                {/* Award floating card */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-[200px] floating"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  style={{ boxShadow: '0 10px 40px -15px rgba(0,0,0,0.2)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">رتبه برتر</p>
                      <p className=" text-gray-500 dark:text-gray-400">استان کرمان</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-16 md:mt-24">
              <a 
                href="#about" 
                className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-schoolblue-600 dark:hover:text-schoolblue-400 transition-colors group"
              >
                <span className="text-sm mb-2 group-hover:transform group-hover:translate-y-1 transition-transform">
                  بیشتر بدانید
                </span>
                <ChevronDown className="h-7 w-7 animate-bounce" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div id="stats">
          <StatsSection />
        </div>

        {/* Educational Approach Section */}
        <section id="educational-approach" className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={cn(
                "text-4xl font-bold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "inline-block relative",
                  theme === "dark" 
                    ? "after:bg-amber-500/20" 
                    : theme === "green" 
                      ? "after:bg-green-200" 
                      : theme === "purple" 
                        ? "after:bg-purple-200" 
                        : theme === "blue" 
                          ? "after:bg-blue-200" 
                          : "after:bg-schoolblue-200",
                  "after:absolute after:right-0 after:left-0 after:bottom-2 after:h-3 after:-z-10"
                )}>
                  رویکرد آموزشی ما
                </span>
              </h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                شیوه‌های نوین آموزشی که در مدرسه جهان دانش به کار می‌گیریم
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {schoolInfo.educationalApproach.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div 
                    key={index}
                    className={cn(
                      "rounded-xl p-8 text-center transition-all duration-300 hover:shadow-xl border group",
                      theme === "dark" 
                        ? "bg-gray-800/50 border-gray-700 hover:border-amber-500/50" 
                        : theme === "green"
                          ? "bg-white border-green-200 hover:border-green-400"
                          : theme === "purple"
                            ? "bg-white border-purple-200 hover:border-purple-400"
                            : theme === "blue"
                              ? "bg-white border-blue-200 hover:border-blue-400"
                              : "bg-white border-gray-200 hover:border-schoolblue-400"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center mb-6">
                      <div className={cn(
                        "w-16 h-16 flex items-center justify-center rounded-full transition-colors duration-300",
                        theme === "dark" 
                          ? "bg-gray-700 text-amber-400 group-hover:bg-amber-500/20" 
                          : theme === "green"
                            ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                            : theme === "purple"
                              ? "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
                              : theme === "blue"
                                ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                                : "bg-schoolblue-100 text-schoolblue-600 group-hover:bg-schoolblue-200"
                      )}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <h3 className={cn(
                      "text-xl font-bold mb-4",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={cn(
                "text-4xl font-bold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "inline-block relative",
                  theme === "dark" 
                    ? "after:bg-amber-500/20" 
                    : theme === "green" 
                      ? "after:bg-green-200" 
                      : theme === "purple" 
                        ? "after:bg-purple-200" 
                        : theme === "blue" 
                          ? "after:bg-blue-200" 
                          : "after:bg-schoolblue-200",
                  "after:absolute after:right-0 after:left-0 after:bottom-2 after:h-3 after:-z-10"
                )}>
                ویژگی های مدرسه ما
              </span>
              </h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                خدمات و امکانات منحصر به فردی که به دانش‌آموزان ارائه می‌دهیم
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schoolInfo.features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <motion.div 
                    key={index} 
                    className={cn(
                      "rounded-xl p-8 border transition-all duration-300 hover:shadow-xl relative",
                      theme === "dark" ? "bg-gray-800/80 border-gray-700" :
                      theme === "green" ? "bg-green-50 border-green-200" :
                      theme === "purple" ? "bg-purple-50 border-purple-200" :
                      theme === "blue" ? "bg-blue-50 border-blue-200" :
                      "bg-schoolblue-50 border-schoolblue-200"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                      theme === "dark" ? "bg-gray-700" :
                      theme === "green" ? "bg-green-200" :
                      theme === "purple" ? "bg-purple-200" :
                      theme === "blue" ? "bg-blue-200" :
                      "bg-schoolblue-200"
                    )}>
                      <Icon className={cn(
                        "h-8 w-8",
                        theme === "dark" ? "text-amber-400" :
                        theme === "green" ? "text-green-700" :
                        theme === "purple" ? "text-purple-700" :
                        theme === "blue" ? "text-blue-700" :
                        "text-schoolblue-700"
                      )} />
                    </div>
                    
                    <h3 className={cn(
                      "text-2xl font-bold mb-3",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {feature.description}
                    </p>
                    
                    <div className="absolute top-0 right-0 h-full w-1 rounded-l-full overflow-hidden">
                      <div className={cn(
                        "h-full w-full",
                        theme === "dark" ? "bg-amber-500" :
                        theme === "green" ? "bg-green-500" :
                        theme === "purple" ? "bg-purple-500" :
                        theme === "blue" ? "bg-blue-500" :
                        "bg-schoolblue-500"
                      )}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Added Feature Card */}
            <motion.div 
              className={cn(
                "mt-10 rounded-xl p-8 border transition-all duration-300 hover:shadow-xl",
                theme === "dark" ? "bg-gray-800/80 border-gray-700" :
                theme === "green" ? "bg-green-50 border-green-200" :
                theme === "purple" ? "bg-purple-50 border-purple-200" :
                theme === "blue" ? "bg-blue-50 border-blue-200" :
                "bg-schoolblue-50 border-schoolblue-200"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <h3 className={cn(
                  "text-2xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  ویژگی‌های برجسته آموزشی
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  در مدرسه جهان دانش، ما به تمام جنبه‌های رشد و تعالی دانش‌آموزان توجه ویژه داریم
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {schoolInfo.valuePropositions.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <div className={cn(
                      "flex-shrink-0 rounded-full p-2",
                      theme === "dark" ? "bg-gray-700" :
                      theme === "green" ? "bg-green-200" :
                      theme === "purple" ? "bg-purple-200" :
                      theme === "blue" ? "bg-blue-200" :
                      "bg-schoolblue-200"
                    )}>
                      <CheckCircle2 className={cn(
                        "h-5 w-5",
                        theme === "dark" ? "text-amber-400" :
                        theme === "green" ? "text-green-700" :
                        theme === "purple" ? "text-purple-700" :
                        theme === "blue" ? "text-blue-700" :
                        "text-schoolblue-700"
                      )} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="rounded-xl overflow-hidden shadow-xl relative">
                  <img 
                    src="https://raghavfoundation.org.in/wp-content/uploads/2023/05/school-image.jpg" 
                    alt="درباره مدرسه جهان دانش" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 gap-3 border border-white/10">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                      theme === "dark" ? "bg-amber-500 text-black" :
                      theme === "green" ? "bg-green-500 text-white" :
                      theme === "purple" ? "bg-purple-500 text-white" :
                      theme === "blue" ? "bg-blue-500 text-white" :
                      "bg-schoolblue-500 text-white"
                    )}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">15+ سال</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تجربه آموزشی</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex-1 space-y-6">
                <motion.h2 
                  className={cn(
                    "text-4xl font-bold mb-2",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className={cn(
                    "inline-block relative",
                    theme === "dark" 
                      ? "after:bg-amber-500/20" 
                      : theme === "green" 
                        ? "after:bg-green-200" 
                        : theme === "purple" 
                          ? "after:bg-purple-200" 
                          : theme === "blue" 
                            ? "after:bg-blue-200" 
                            : "after:bg-schoolblue-200",
                    "after:absolute after:right-0 after:left-0 after:bottom-2 after:h-3 after:-z-10"
                  )}>
                    درباره مدرسه جهان دانش
                  </span>
                </motion.h2>
                
                {schoolInfo.aboutText.map((paragraph, index) => (
                  <motion.p 
                    key={index} 
                    className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    viewport={{ once: true }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                
                <motion.div
                  className="mt-8 flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className={cn(
                    "h-20 w-1 rounded-full",
                    theme === "dark" ? "bg-amber-500" :
                    theme === "green" ? "bg-green-500" :
                    theme === "purple" ? "bg-purple-500" :
                    theme === "blue" ? "bg-blue-500" :
                    "bg-schoolblue-500"
                  )}></span>
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                    ما تنها به آموزش محتوای درسی اکتفا نمی‌کنیم، بلکه به پرورش انسان‌هایی متفکر، خلاق و مسئولیت‌پذیر برای جامعه فردا می‌پردازیم.
                    <div className="mt-2 font-bold">
                      - مدیر مدرسه جهان دانش
                    </div>
                  </blockquote>
                </motion.div>
                
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className={cn(
                    "text-xl font-bold mb-4",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    چرا مدرسه جهان دانش؟
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {schoolInfo.valuePropositions.slice(0, 6).map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className={cn(
                          "flex-shrink-0 rounded-full p-1",
                          theme === "dark" ? "bg-gray-800 text-amber-400" :
                          theme === "green" ? "bg-green-100 text-green-600" :
                          theme === "purple" ? "bg-purple-100 text-purple-600" :
                          theme === "blue" ? "bg-blue-100 text-blue-600" :
                          "bg-schoolblue-100 text-schoolblue-600"
                        )}>
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />
        
        {/* News Section */}
        <NewsSection />

        {/* Theme Selector */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className={cn(
                "text-4xl font-bold mb-4",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                انتخاب تم نمایشی
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                تم مورد علاقه خود را برای وبسایت انتخاب کنید
              </p>
            </motion.div>
            <ThemeSelector />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={cn(
                "text-4xl font-bold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                <span className={cn(
                  "inline-block relative",
                  theme === "dark" 
                    ? "after:bg-amber-500/20" 
                    : theme === "green" 
                      ? "after:bg-green-200" 
                      : theme === "purple" 
                        ? "after:bg-purple-200" 
                        : theme === "blue" 
                          ? "after:bg-blue-200" 
                          : "after:bg-schoolblue-200",
                  "after:absolute after:right-0 after:left-0 after:bottom-2 after:h-3 after:-z-10"
                )}>
                  تماس با ما
                </span>
              </h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                در هر زمان می‌توانید با ما در ارتباط باشید
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={cn(
                  "text-2xl font-bold mb-6",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  فرم تماس
                </h3>
                <ContactForm />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={cn(
                  "text-2xl font-bold mb-6",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  اطلاعات تماس
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className={cn(
                    "p-6 rounded-xl shadow-around",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === "dark" ? "bg-gray-700 text-amber-400" :
                        theme === "green" ? "bg-green-100 text-green-600" :
                        theme === "purple" ? "bg-purple-100 text-purple-600" :
                        theme === "blue" ? "bg-blue-100 text-blue-600" :
                        "bg-schoolblue-100 text-schoolblue-600"
                      )}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">آدرس</h4>
                        <p className="text-gray-600 dark:text-gray-400">{schoolInfo.contact.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "p-6 rounded-xl shadow-around",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === "dark" ? "bg-gray-700 text-amber-400" :
                        theme === "green" ? "bg-green-100 text-green-600" :
                        theme === "purple" ? "bg-purple-100 text-purple-600" :
                        theme === "blue" ? "bg-blue-100 text-blue-600" :
                        "bg-schoolblue-100 text-schoolblue-600"
                      )}>
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">تلفن تماس</h4>
                        <p className="text-gray-600 dark:text-gray-400 ltr">{schoolInfo.contact.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "p-6 rounded-xl shadow-around",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === "dark" ? "bg-gray-700 text-amber-400" :
                        theme === "green" ? "bg-green-100 text-green-600" :
                        theme === "purple" ? "bg-purple-100 text-purple-600" :
                        theme === "blue" ? "bg-blue-100 text-blue-600" :
                        "bg-schoolblue-100 text-schoolblue-600"
                      )}>
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ایمیل</h4>
                        <p className="text-gray-600 dark:text-gray-400 ltr">{schoolInfo.contact.email}</p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 ltr">support@jahan-danesh.edu</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "p-6 rounded-xl shadow-around",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === "dark" ? "bg-gray-700 text-amber-400" :
                        theme === "green" ? "bg-green-100 text-green-600" :
                        theme === "purple" ? "bg-purple-100 text-purple-600" :
                        theme === "blue" ? "bg-blue-100 text-blue-600" :
                        "bg-schoolblue-100 text-schoolblue-600"
                      )}>
                        <Globe2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">شبکه های اجتماعی</h4>
                        <div className="flex gap-3 mt-2">
                          <a 
                            href="#" 
                            className={cn(
                              "p-2 rounded-full transition-colors",
                              theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" :
                              theme === "green" ? "bg-green-100 hover:bg-green-200 text-green-600" :
                              theme === "purple" ? "bg-purple-100 hover:bg-purple-200 text-purple-600" :
                              theme === "blue" ? "bg-blue-100 hover:bg-blue-200 text-blue-600" :
                              "bg-schoolblue-50 hover:bg-schoolblue-100 text-schoolblue-600"
                            )}
                            aria-label="Facebook"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                          </a>
                          <a 
                            href="#" 
                            className={cn(
                              "p-2 rounded-full transition-colors",
                              theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" :
                              theme === "green" ? "bg-green-100 hover:bg-green-200 text-green-600" :
                              theme === "purple" ? "bg-purple-100 hover:bg-purple-200 text-purple-600" :
                              theme === "blue" ? "bg-blue-100 hover:bg-blue-200 text-blue-600" :
                              "bg-schoolblue-50 hover:bg-schoolblue-100 text-schoolblue-600"
                            )}
                            aria-label="Instagram"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                            </svg>
                          </a>
                          <a 
                            href="#" 
                            className={cn(
                              "p-2 rounded-full transition-colors",
                              theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" :
                              theme === "green" ? "bg-green-100 hover:bg-green-200 text-green-600" :
                              theme === "purple" ? "bg-purple-100 hover:bg-purple-200 text-purple-600" :
                              theme === "blue" ? "bg-blue-100 hover:bg-blue-200 text-blue-600" :
                              "bg-schoolblue-50 hover:bg-schoolblue-100 text-schoolblue-600"
                            )}
                            aria-label="Twitter"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Map */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d870.2799935062377!2d55.69099205!3d29.461174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3effe5228205beff%3A0x26040aa08a5347b0!2z2YXYr9ix2LPZhyDYrNmH2KfZhiDYr9in2YbYtA!5e0!3m2!1sen!2s!4v1712536612489!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - مدرسه جهان دانش"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className={cn(
          "py-12",
          theme === "dark" ? "bg-gray-900 text-white" : 
          theme === "green" ? "bg-green-900 text-white" : 
          theme === "purple" ? "bg-purple-900 text-white" : 
          theme === "blue" ? "bg-blue-900 text-white" : 
          "bg-gray-900 text-white"
        )}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <SchoolLogo size="small" />
                  <h3 className="text-xl font-bold text-white">مدرسه جهان دانش</h3>
                </div>
                <p className="text-gray-400">محیطی پویا برای آموزش و رشد دانش آموزان پسر از پایه اول تا نهم</p>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">لینک های مفید</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Heart size={16} className="text-red-400" />صفحه اصلی</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Heart size={16} className="text-red-400" />درباره ما</a></li>
                  <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Heart size={16} className="text-red-400" />گالری تصاویر</a></li>
                  <li><a href="/portal" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Heart size={16} className="text-red-400" />پورتال</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Heart size={16} className="text-red-400" />تماس با ما</a></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">خدمات</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ثبت نام</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سیستم نمرات</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">کلاس های فوق برنامه</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مشاوره تحصیلی</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">استخدام</a></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">اطلاعات تماس</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-schoolblue-400 flex-shrink-0" />
                    <span className="text-gray-400">{schoolInfo.contact.address}</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 text-schoolblue-400 flex-shrink-0" />
                    <span className="text-gray-400 ltr">{schoolInfo.contact.phone}</span>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 text-schoolblue-400 flex-shrink-0" />
                    <span className="text-gray-400 ltr">{schoolInfo.contact.email}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                تمامی حقوق این سایت متعلق به مدرسه جهان دانش سیرجان است © ۱۴۰۴
              </p>
              
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link to="/portal" className="text-schoolblue-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <Users size={14} />
                  ورود به پورتال
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
