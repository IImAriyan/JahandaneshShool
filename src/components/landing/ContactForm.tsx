
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MailCheck } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here we would normally send the form data to a server
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "پیام شما با موفقیت ارسال شد",
        description: "به زودی با شما تماس خواهیم گرفت.",
      });

      // Reset form and show success state
      setFormValues({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "خطا در ارسال پیام",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <MailCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">پیام شما با موفقیت ارسال شد</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">به زودی با شما تماس خواهیم گرفت.</p>
          <Button onClick={() => setIsSuccess(false)}>ارسال پیام دیگر</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                نام و نام خانوادگی
              </label>
              <Input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ایمیل
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
                placeholder="example@domain.com"
                className="w-full ltr"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                شماره تماس
              </label>
              <Input
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                required
                placeholder="0912345678"
                className="w-full ltr"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                موضوع
              </label>
              <Input
                id="subject"
                name="subject"
                value={formValues.subject}
                onChange={handleInputChange}
                required
                placeholder="موضوع پیام خود را وارد کنید"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              پیام
            </label>
            <Textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleInputChange}
              required
              placeholder="پیام خود را وارد کنید..."
              rows={5}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
          </Button>
        </form>
      )}
    </div>
  );
}
