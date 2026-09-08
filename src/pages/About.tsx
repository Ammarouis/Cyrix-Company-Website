import { motion } from "framer-motion";
import { ShieldCheck, Code2, BrainCircuit, Rocket, Users, Target, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      title: t("about.values.0.title"),
      description: t("about.values.0.description"),
    },
    {
      icon: Code2,
      title: t("about.values.1.title"),
      description: t("about.values.1.description"),
    },
    {
      icon: BrainCircuit,
      title: t("about.values.2.title"),
      description: t("about.values.2.description"),
    },
    {
      icon: Target,
      title: t("about.values.3.title"),
      description: t("about.values.3.description"),
    },
    {
      icon: Users,
      title: t("about.values.4.title"),
      description: t("about.values.4.description"),
    },
    {
      icon: Rocket,
      title: t("about.values.5.title"),
      description: t("about.values.5.description"),
    },
  ];

  const stats = [
    { value: "40+", label: t("about.stats.projects") },
    { value: "99.9%", label: t("about.stats.satisfaction") },
    { value: "24h", label: t("about.stats.response") },
    { value: "3", label: t("about.stats.specializations") },
  ];

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
            {t("about.heroTitle")} <span className="text-gradient font-normal">{t("about.heroTitleHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm text-foreground/70 font-light max-w-md mx-auto"
          >
            {t("about.heroSubtitle")}
          </motion.p>
        </div>
      </div>

      <main>
        {/* Our Story Section */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("about.storyLabel")}</span>
              <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-2 mb-8">{t("about.storyTitle")}</h1>

              <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                {t("about.story.0") && <p>{t("about.story.0")}</p>}
                {t("about.story.1") && <p>{t("about.story.1")}</p>}
                {t("about.story.2") && <p>{t("about.story.2")}</p>}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("about.missionLabel")}</span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-2 mb-8">{t("about.missionTitle")}</h2>

              <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                {t("about.mission.0") && <p>{t("about.mission.0")}</p>}
                {t("about.mission.1") && <p>{t("about.mission.1")}</p>}
                {t("about.mission.2") && <p>{t("about.mission.2")}</p>}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Founder Portfolio Section */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">{t("about.founderLabel")}</span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">{t("about.founderTitle")}</h2>
              <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("about.founderDescription")}
              </p>
              <a
                href="https://protfileo.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] uppercase tracking-wider font-normal px-8">
                  {t("about.founderButton")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-light text-gradient mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-light uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 lg:py-32 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("about.valuesLabel")}</span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-2">{t("about.valuesTitle")}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-8 border border-border rounded-lg bg-card shadow-soft hover:shadow-md hover:border-primary/40 transition-all duration-300"
                >
                  <value.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-light tracking-tight mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
