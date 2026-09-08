import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative z-10 text-center px-6">
        <img src="/cyrix-logo.png" alt="CYRIX" className="h-10 w-auto mx-auto mb-10" />
        <h1 className="mb-4 text-7xl md:text-8xl font-light text-gradient">404</h1>
        <p className="mb-2 text-xl font-light text-foreground">
          {t("notFound.title")}
        </p>
        <p className="mb-10 text-sm text-muted-foreground font-light">
          {t("notFound.subtitle")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_25px_rgba(48,112,208,0.35)]"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
