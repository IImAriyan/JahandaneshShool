
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image, Play, Pause, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

type ImageItem = {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  description?: string;
};



const galleryImages: ImageItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "فضای آموزشی مدرسه جهان دانش",
    caption: "فضای آموزشی مدرن و پیشرفته مدرسه جهان دانش",
    description: "کلاس‌های درس مجهز به تجهیزات آموزشی مدرن شامل تخته هوشمند و پروژکتور"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "دانش آموزان در حال یادگیری",
    caption: "کلاس های پویا و مشارکتی",
    description: "محیط یادگیری فعال با رویکرد مشارکتی برای افزایش خلاقیت و مهارت‌های اجتماعی دانش‌آموزان"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "آزمایشگاه علوم",
    caption: "آزمایشگاه مجهز علوم",
    description: "آزمایشگاه علوم با امکانات پیشرفته برای انجام آزمایش‌های فیزیک، شیمی و زیست‌شناسی"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "کتابخانه مدرسه",
    caption: "کتابخانه غنی و جامع مدرسه",
    description: "کتابخانه با بیش از 5000 جلد کتاب در موضوعات متنوع علمی، ادبی و هنری"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1540151812223-7e51f2c5e4ad?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "زنگ ورزش",
    caption: "امکانات ورزشی متنوع",
    description: "زمین‌های ورزشی مجهز برای ورزش‌های مختلف از جمله فوتسال، والیبال و بسکتبال"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?ixlib=rb-4.0.3&q=80&auto=format&fit=crop&w=1200",
    alt: "فضای سبز مدرسه",
    caption: "فضای سبز مدرسه",
    description: "محوطه سبز و زیبای مدرسه برای استراحت و تفریح دانش‌آموزان در زنگ تفریح"
  }
];


export function Gallery() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isLightbox, setIsLightbox] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // تنظیم کلاس‌های مناسب برای پس‌زمینه بر اساس تم
  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900";
      case "blue":
        return "bg-blue-50";
      case "purple":
        return "bg-purple-50";
      case "green":
        return "bg-green-50";
      default:
        return "bg-white";
    }
  };
  
  // تنظیم کلاس‌های مناسب برای عنصر فعال بر اساس تم
  const getActiveThumbClass = () => {
    switch (theme) {
      case "dark":
        return "ring-amber-400";
      case "blue":
        return "ring-blue-500";
      case "purple":
        return "ring-purple-500";
      case "green":
        return "ring-green-500";
      default:
        return "ring-schoolblue-500";
    }
  };

  // Get button styles based on theme
  const getButtonBaseClass = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-800/80 hover:bg-gray-700/80 text-white";
      case "blue":
        return "bg-blue-500/80 hover:bg-blue-600/80 text-white";
      case "purple":
        return "bg-purple-500/80 hover:bg-purple-600/80 text-white";
      case "green":
        return "bg-green-500/80 hover:bg-green-600/80 text-white";
      default:
        return "bg-schoolblue-500/80 hover:bg-schoolblue-600/80 text-white";
    }
  };

  return (
    <section id="gallery" className={`py-24 ${getBackgroundClasses()}`}>
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
              گالری تصاویر
            </span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            نگاهی به فضای آموزشی و امکانات مدرسه جهان دانش
          </p>
        </motion.div>

        <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 rounded-2xl shadow-inner z-20 pointer-events-none"
            style={{
              boxShadow: 'inset 0 2px 20px 1px rgba(0,0,0,0.2)'
            }}
          ></div>
          
          {/* Carousel Images */}
          {galleryImages.map((image, index) => (
            <motion.div 
              key={image.id}
              className={cn(
                "absolute top-0 left-0 w-full h-full",
                index === currentIndex ? "z-10" : "z-0"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setIsLightbox(true)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover cursor-pointer"
              />
              <AnimatePresence>
                {(image.caption || image.description) && (isHovering || isAutoplay) && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-black/70 text-white backdrop-blur-sm p-5 transform"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {image.caption && (
                      <p className="text-xl font-semibold">{image.caption}</p>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-200 mt-2">{image.description}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {/* Navigation Arrows */}
          <Button 
            variant="outline" 
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full w-12 h-12 transition-opacity duration-300",
              isHovering ? "opacity-100" : "opacity-0 md:opacity-60",
              "hover:opacity-100",
              getButtonBaseClass()
            )}
            onClick={(e) => { 
              e.stopPropagation(); 
              prevSlide(); 
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full w-12 h-12 transition-opacity duration-300",
              isHovering ? "opacity-100" : "opacity-0 md:opacity-60",
              "hover:opacity-100",
              getButtonBaseClass()
            )}
            onClick={(e) => { 
              e.stopPropagation(); 
              nextSlide(); 
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Controls */}
          <div className="absolute top-4 right-4 z-30 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "transition-opacity duration-300",
                isHovering ? "opacity-100" : "opacity-0 md:opacity-60",
                "hover:opacity-100",
                getButtonBaseClass()
              )}
              onClick={(e) => {
                e.stopPropagation();
                setShowThumbnails(!showThumbnails);
              }}
            >
              <Image className="h-4 w-4 ml-2" />
              {showThumbnails ? "مخفی کردن تصاویر" : "نمایش تصاویر بیشتر"}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-opacity duration-300",
                isHovering ? "opacity-100" : "opacity-0 md:opacity-60",
                "hover:opacity-100",
                getButtonBaseClass()
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoplay(!isAutoplay);
              }}
            >
              {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "transition-opacity duration-300",
                isHovering ? "opacity-100" : "opacity-0 md:opacity-60",
                "hover:opacity-100",
                getButtonBaseClass()
              )}
              onClick={(e) => {
                e.stopPropagation();
                window.open(galleryImages[currentIndex].src, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Dots */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 hover:scale-125",
                  index === currentIndex 
                    ? cn(
                        "w-6",
                        theme === "dark" ? "bg-amber-400" :
                        theme === "green" ? "bg-green-500" :
                        theme === "purple" ? "bg-purple-500" :
                        theme === "blue" ? "bg-blue-500" :
                        "bg-schoolblue-500"
                      )
                    : "bg-white/30 hover:bg-white/50"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div 
              className="flex justify-center mt-8 gap-4 overflow-x-auto pb-4 px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={`thumb-${image.id}`}
                  className={cn(
                    "w-24 h-24 md:w-32 md:h-24 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all",
                    index === currentIndex 
                      ? `ring-2 ${getActiveThumbClass()} ring-offset-2 shadow-lg` 
                      : "opacity-60 hover:opacity-100"
                  )}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={image.src} 
                    alt={`thumbnail-${image.alt}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Lightbox */}
        <AnimatePresence>
          {isLightbox && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightbox(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl max-h-[80vh] md:max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={galleryImages[currentIndex].src} 
                  alt={galleryImages[currentIndex].alt} 
                  className="max-w-full max-h-[80vh] md:max-h-[90vh] object-contain"
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={() => setIsLightbox(false)}
                >
                  <X size={20} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    prevSlide(); 
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    nextSlide(); 
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                {(galleryImages[currentIndex].caption || galleryImages[currentIndex].description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                    {galleryImages[currentIndex].caption && (
                      <p className="text-xl font-semibold">{galleryImages[currentIndex].caption}</p>
                    )}
                    {galleryImages[currentIndex].description && (
                      <p className="text-sm text-gray-300 mt-2">{galleryImages[currentIndex].description}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
