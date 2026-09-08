import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Briefcase, Clock, ArrowRight, ArrowLeft, CheckCircle, User, Mail, MessageSquare, FileText } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useLanguage } from "@/hooks/useLanguage";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

const CONTACT_EMAIL = "goldst422@gmail.com";

const Inquiry = () => {
  const { t } = useLanguage();
  const services = useServices();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Form step state
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  // Step 1 fields
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  // Step 2 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");

  const handleStep1Continue = () => {
    if (!service || !budget || !timeline) {
      toast.error(t("inquiry.errors.step1"));
      return;
    }
    setDirection(1);
    setStep(2);
  };

  const handleStep2Back = () => {
    setDirection(-1);
    setStep(1);
  };

  const buildMailtoLink = () => {
    const serviceName = getServiceLabel(service);
    const budgetLabel = t(`inquiry.budgets.${budget}`) || budget;
    const timelineLabel = t(`inquiry.timelines.${timeline}`) || timeline;
    const subject = encodeURIComponent(`CYRIX Project Inquiry - ${serviceName}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}\n\nService: ${serviceName}\nBudget: ${budgetLabel}\nTimeline: ${timelineLabel}\n\nProject Details:\n${details}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = () => {
    if (!name || !email || !details) {
      toast.error(t("inquiry.errors.step2"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("inquiry.errors.invalidEmail"));
      return;
    }

    setDirection(1);
    setStep(3);
  };

  const handleSendEmail = () => {
    window.location.href = buildMailtoLink();
  };

  const handleReset = () => {
    setDirection(-1);
    setStep(1);
    setService("");
    setBudget("");
    setTimeline("");
    setName("");
    setEmail("");
    setCompany("");
    setDetails("");
  };

  const getServiceLabel = (value: string) => {
    const s = services.find((x) => x.id === value);
    return s?.name || value;
  };

  return (
    <section id="contact" className="py-32 lg:py-40 bg-accent/5" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">
            {t("inquiry.label")}
          </span>
          <h2 className="text-2xl md:text-3xl font-light mb-4 text-foreground tracking-tight">
            {t("inquiry.title")} <span className="text-gradient font-normal">{t("inquiry.titleHighlight")}</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto font-light">
            {t("inquiry.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 lg:p-10 shadow-soft border border-border bg-card overflow-hidden relative">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/50" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="service" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                          <Briefcase className="h-3 w-3" />
                          {t("inquiry.step1.service")}
                        </Label>
                        <Select value={service} onValueChange={setService}>
                          <SelectTrigger id="service" className="rounded-md text-sm font-light">
                            <SelectValue placeholder={t("inquiry.step1.servicePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="budget" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                          <Clock className="h-3 w-3" />
                          {t("inquiry.step1.budget")}
                        </Label>
                        <Select value={budget} onValueChange={setBudget}>
                          <SelectTrigger id="budget" className="rounded-md text-sm font-light">
                            <SelectValue placeholder={t("inquiry.step1.budgetPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="< 5k">{t("inquiry.budgets.< 5k")}</SelectItem>
                            <SelectItem value="5k-15k">{t("inquiry.budgets.5k-15k")}</SelectItem>
                            <SelectItem value="15k-50k">{t("inquiry.budgets.15k-50k")}</SelectItem>
                            <SelectItem value="50k+">{t("inquiry.budgets.50k+")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4">
                        <Button
                          size="default"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md smooth-hover text-[11px] uppercase tracking-wider font-normal"
                          onClick={handleStep1Continue}
                        >
                          {t("inquiry.step1.continue")}
                          <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                        </Button>
                      </div>
                    </div>

                    <div>
                        <Label htmlFor="timeline" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                          <Clock className="h-3 w-3" />
                          {t("inquiry.step1.timeline")}
                        </Label>
                        <Select value={timeline} onValueChange={setTimeline}>
                          <SelectTrigger id="timeline" className="rounded-md text-sm font-light">
                            <SelectValue placeholder={t("inquiry.step1.timelinePlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">{t("inquiry.timelines.asap")}</SelectItem>
                            <SelectItem value="1-3m">{t("inquiry.timelines.1-3m")}</SelectItem>
                            <SelectItem value="3-6m">{t("inquiry.timelines.3-6m")}</SelectItem>
                            <SelectItem value="flexible">{t("inquiry.timelines.flexible")}</SelectItem>
                          </SelectContent>
                        </Select>

                      <div className="mt-8 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
                        <p className="text-[11px] uppercase tracking-wider text-primary mb-2">{t("inquiry.fastResponse.title")}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">
                          {t("inquiry.fastResponse.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="space-y-6 max-w-md mx-auto">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                        <User className="h-3 w-3" />
                        {t("inquiry.step2.name")}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t("inquiry.step2.namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md text-sm font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                        <Mail className="h-3 w-3" />
                        {t("inquiry.step2.email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("inquiry.step2.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md text-sm font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                        <Briefcase className="h-3 w-3" />
                        {t("inquiry.step2.company")}
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder={t("inquiry.step2.companyPlaceholder")}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="rounded-md text-sm font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="details" className="flex items-center gap-1.5 mb-3 text-card-foreground text-[11px] uppercase tracking-wider font-normal">
                        <MessageSquare className="h-3 w-3" />
                        {t("inquiry.step2.details")}
                      </Label>
                      <Textarea
                        id="details"
                        placeholder={t("inquiry.step2.detailsPlaceholder")}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={4}
                        className="rounded-md resize-none text-sm font-light"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        size="default"
                        className="flex-1 rounded-md smooth-hover text-[11px] uppercase tracking-wider font-normal"
                        onClick={handleStep2Back}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" />
                        {t("inquiry.step2.back")}
                      </Button>
                      <Button
                        size="default"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md smooth-hover text-[11px] uppercase tracking-wider font-normal"
                        onClick={handleSubmit}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {t("inquiry.step2.submit")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="text-center py-8 space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-light text-foreground">{t("inquiry.step3.title")}</h3>
                      <p className="text-sm text-muted-foreground font-light">
                        {t("inquiry.step3.subtitle", { name })}
                      </p>
                    </div>

                    <div className="bg-accent/10 rounded-md p-4 max-w-sm mx-auto text-start space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("inquiry.step3.summary")}</p>
                      <div className="text-sm font-light text-foreground space-y-1">
                        <p><span className="text-muted-foreground">{t("inquiry.step3.service")}:</span> {getServiceLabel(service)}</p>
                        <p><span className="text-muted-foreground">{t("inquiry.step3.budget")}:</span> {t(`inquiry.budgets.${budget}`) || budget}</p>
                        <p><span className="text-muted-foreground">{t("inquiry.step3.timeline")}:</span> {t(`inquiry.timelines.${timeline}`) || timeline}</p>
                        <p><span className="text-muted-foreground">{t("inquiry.step3.email")}:</span> {email}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-light">
                      {t("inquiry.step3.replyNote", { email })}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        size="default"
                        className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground smooth-hover text-[11px] uppercase tracking-wider font-normal"
                        onClick={handleSendEmail}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {t("inquiry.step3.openEmailClient")}
                      </Button>
                      <Button
                        variant="outline"
                        size="default"
                        className="rounded-md smooth-hover text-[11px] uppercase tracking-wider font-normal"
                        onClick={handleReset}
                      >
                        {t("inquiry.step3.reset")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Inquiry;
