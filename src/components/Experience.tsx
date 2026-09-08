import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShieldCheck, Zap, Users, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Experience = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: ShieldCheck,
      title: t("experience.features.0.title"),
      description: t("experience.features.0.description"),
    },
    {
      icon: Zap,
      title: t("experience.features.1.title"),
      description: t("experience.features.1.description"),
    },
    {
      icon: Users,
      title: t("experience.features.2.title"),
      description: t("experience.features.2.description"),
    },
    {
      icon: Award,
      title: t("experience.features.3.title"),
      description: t("experience.features.3.description"),
    },
  ];

  return (
    <section id="why-us" className="py-32 lg:py-40 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">
            {t("experience.label")}
          </span>
          <h2 className="text-2xl md:text-3xl font-light mb-4 text-foreground tracking-tight">
            {t("experience.title")} <span className="text-gradient font-normal">{t("experience.titleHighlight")}</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto font-light">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 0, scale: 1 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 group hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 cursor-pointer transition-colors duration-500"
              >
                {/* Gradient sheen on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-5">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-normal mb-1 text-foreground tracking-tight transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
