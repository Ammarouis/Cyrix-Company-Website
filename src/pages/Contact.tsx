import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, MessageSquare, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const CONTACT_EMAIL = "goldst422@gmail.com";

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    toast({
      title: t("contact.successTitle"),
      description: t("contact.successDescription"),
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <div className="relative w-full h-[50vh] overflow-hidden bg-background flex items-center justify-center">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-[-30%] left-[-10%] w-96 h-96 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-96 h-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative z-10 text-center px-6">
          <motion.img
            src="/cyrix-logo.png"
            alt="CYRIX"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-10 md:h-14 w-auto mx-auto mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-4"
          >
            {t("contact.heroTitle")} <span className="text-gradient font-normal">{t("contact.heroTitleHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm text-foreground/70 font-light max-w-md mx-auto"
          >
            {t("contact.heroSubtitle")}
          </motion.p>
        </div>
      </div>

      <main className="py-24 lg:py-32 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">
              {t("contact.label")}
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              {t("contact.subtitle")}
            </p>
          </div>

          <Card className="p-8 lg:p-10 shadow-soft border border-border bg-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <User className="h-3 w-3" />
                  {t("contact.name")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <Mail className="h-3 w-3" />
                  {t("contact.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <MessageSquare className="h-3 w-3" />
                  {t("contact.subject")}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="rounded-md text-sm font-light"
                />
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                  <FileText className="h-3 w-3" />
                  {t("contact.message")}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={5}
                  className="rounded-md resize-none text-sm font-light"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] uppercase tracking-wider font-normal shadow-[0_4px_20px_rgba(48,112,208,0.25)]"
              >
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-light">
              {t("contact.preferEmail")}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-primary/80 smooth-hover">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
