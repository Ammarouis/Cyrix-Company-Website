import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ShieldCheck, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const canvasParticles = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const PARTICLE_COUNT = Math.min(90, Math.floor((width * height) / 18000));
  const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
    });
  }

  const LINK_DIST = 130;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(48, 224, 240, 0.55)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(48, 112, 208, ${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  let animationFrameId = requestAnimationFrame(draw);

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", handleResize);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", handleResize);
  };
};

const Hero = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Code2, label: t("hero.highlights.software") },
    { icon: ShieldCheck, label: t("hero.highlights.security") },
    { icon: BrainCircuit, label: t("hero.highlights.ai") },
  ];

  useEffect(() => {
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const cleanup = canvasParticles(canvas);
    return cleanup;
  }, []);

  return (
      <section className="relative min-h-screen w-full overflow-hidden hero-bg flex items-center justify-center">
      {/* Particle Canvas */}
      <canvas id="hero-canvas" className="absolute inset-0 w-full h-full" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      {/* Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[130px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-[-20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-accent/15 blur-[130px]"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-28 pb-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <img
            src="/cyrix-logo.png"
            alt="CYRIX"
            className="h-14 md:h-20 w-auto drop-shadow-[0_0_25px_rgba(48,224,240,0.35)]"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] uppercase tracking-wider text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 flex flex-col items-center text-white"
        >
          <span>{t("hero.title1")}</span>
          <span className="text-gradient font-normal">{t("hero.title2")}</span>
          <span>{t("hero.title3")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm md:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Service Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 shadow-soft smooth-hover hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(48,112,208,0.25)]"
            >
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-xs font-light text-white/90">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_25px_rgba(48,112,208,0.35)] hover:shadow-[0_6px_35px_rgba(48,112,208,0.5)]"
          >
            {t("hero.ctaPrimary")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
          </button>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            {t("hero.ctaSecondary")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
