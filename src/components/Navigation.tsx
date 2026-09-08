import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleContact = () => {
    if (isHomePage) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  const navItems = [
    { label: t("nav.services"), href: "/services", isRoute: true },
    { label: t("nav.about"), href: "/about", isRoute: true },
    { label: t("nav.contact"), href: "/contact", isRoute: true },
  ];

  const languages = [
    { value: "en" as const, label: "EN" },
    { value: "ar" as const, label: "AR" },
    { value: "de" as const, label: "DE" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
        isMobileMenuOpen
          ? "bg-background"
          : isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src="/cyrix-logo.png"
                alt="CYRIX"
                className="h-5 md:h-6 w-auto transition-all brightness-0 invert"
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-white"
                >
                  {item.label}
                </a>
              )
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-normal transition-all duration-300 ${
                    language === lang.value
                      ? "bg-white text-background"
                      : "text-white/70 hover:text-white"
                  }`}
                  aria-label={t(`language.${lang.value}`)}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full smooth-hover text-[11px] uppercase tracking-wider font-normal backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 bg-white/10 text-white hover:bg-primary hover:text-white hover:border-primary"
              onClick={handleContact}
            >
              {t("nav.getQuote")}
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-normal transition-all duration-300 ${
                    language === lang.value
                      ? "bg-white text-background"
                      : "text-white/70 hover:text-white"
                  }`}
                  aria-label={t(`language.${lang.value}`)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden mt-6 pb-4 -mx-6 px-6 rounded-b-xl bg-background"
            >
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-3 text-[11px] uppercase tracking-wider font-normal smooth-hover hover:opacity-60 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <Button
                variant="outline"
                className="w-full mt-4 rounded-full text-[11px] uppercase tracking-wider font-normal backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-5 bg-white/10 text-white hover:bg-primary hover:text-white hover:border-primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleContact();
                }}
              >
                {t("nav.getQuote")}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
