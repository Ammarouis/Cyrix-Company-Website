import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Quote, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useServices, useServiceById } from "@/hooks/useServices";
import { useLanguage } from "@/hooks/useLanguage";

const ServiceDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const service = useServiceById(id);
  const services = useServices();

  const relatedServices = services.filter((s) => s.id !== id).slice(0, 2);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-light mb-4">{t("serviceDetail.notFound")}</h1>
          <Button onClick={() => navigate("/")} variant="outline" size="sm" className="text-xs font-light">
            {t("serviceDetail.backHome")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background" />
      </div>

      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16 max-w-full overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/services")}
            className="mb-8 text-[11px] uppercase tracking-wider font-normal"
          >
            <ArrowLeft className="mr-2 h-3 w-3 rtl:rotate-180" />
            {t("serviceDetail.backToServices")}
          </Button>

          {/* Title, Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="font-light">{service.location}</span>
              <div className="flex items-center gap-1 ml-4">
                <Sparkles className="h-3 w-3 fill-primary text-primary" />
                <span className="font-light text-foreground">{service.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
              {service.name}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-2xl">
              {service.description}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-8 border border-border shadow-soft">
                  <h2 className="text-[11px] uppercase tracking-wider font-normal mb-6">{t("serviceDetail.capabilities")}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.amenities.map((amenity, index: number) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-normal mb-1">{amenity.label}</h3>
                            <p className="text-xs text-muted-foreground font-light">{amenity.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-8 border border-border shadow-soft">
                  <h2 className="text-[11px] uppercase tracking-wider font-normal mb-6">{t("serviceDetail.included")}</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {service.details.map((detail: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* Testimonials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="p-8 border border-border shadow-soft">
                  <h2 className="text-[11px] uppercase tracking-wider font-normal mb-6">{t("serviceDetail.testimonials")}</h2>
                  <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                    {service.reviews.map((review, index) => (
                      <div key={index} className="p-6 bg-accent/10 rounded-lg border border-accent/15">
                        <Quote className="h-6 w-6 text-primary/30 mb-4" />
                        <p className="text-sm text-muted-foreground font-light mb-4 leading-relaxed">
                          "{review.comment}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-normal text-foreground block">{review.author}</span>
                            <span className="text-xs text-muted-foreground font-light">{review.role}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Sparkles key={i} className="h-3 w-3 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Related Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-[11px] uppercase tracking-wider font-normal mb-6">{t("serviceDetail.alsoExplore")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedServices.map((related) => (
                    <Link
                      key={related.id}
                      to={`/service/${related.id}`}
                      className="group p-6 border border-border rounded-lg bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="text-sm font-normal mb-1 group-hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-light">{related.tagline}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sticky CTA */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <Card className="p-8 border border-border shadow-soft relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-light">{t("serviceDetail.customQuote")}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Sparkles className="h-3 w-3 fill-primary text-primary" />
                      <span className="font-light">{t("serviceDetail.response24h")}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-sm text-muted-foreground font-light">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {t("serviceDetail.freeConsultation")}
                    </li>
                  </ul>

                  <Button
                    size="default"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md smooth-hover text-[11px] uppercase tracking-wider font-normal shadow-[0_4px_20px_rgba(48,112,208,0.25)]"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    {t("serviceDetail.requestQuote")}
                  </Button>
                  <p className="text-[11px] text-muted-foreground font-light text-center mt-4">
                    {t("serviceDetail.noCommitment")}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
