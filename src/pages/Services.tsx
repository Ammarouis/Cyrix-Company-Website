import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useLanguage } from "@/hooks/useLanguage";

const Services = () => {
  const { t } = useLanguage();
  const services = useServices();

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
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[11px] uppercase tracking-wider text-foreground/70 mb-4 block"
          >
            {t("services.label")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-4"
          >
            {t("services.title")} <span className="text-gradient font-normal">{t("services.titleHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm text-foreground/70 font-light max-w-md mx-auto"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>
      </div>

      <main className="py-24 lg:py-32 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-border bg-card shadow-soft hover:shadow-lg hover:border-primary/40 transition-all duration-300 group">
                  <Link to={`/service/${service.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                        <Sparkles className="h-3 w-3 fill-primary text-primary" />
                        <span className="font-light text-xs">{service.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-normal mb-1 text-card-foreground tracking-tight">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground mb-4 text-xs font-light">
                        <span>{service.tagline}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-[10px] uppercase tracking-wide px-2 py-1 bg-accent/15 text-primary rounded-sm font-light"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-muted-foreground">
                          {service.amenities.length} {t("services.capabilities")}
                        </span>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs font-light">
                          {t("services.learnMore")}
                          <ArrowRight className="ml-1 h-3 w-3 rtl:rotate-180" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
