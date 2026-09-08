import { Instagram, Facebook, Mail, ExternalLink, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import SyrianFlag from "./SyrianFlag";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background text-foreground py-20 lg:py-24 relative overflow-hidden border-t border-border">
      {/* Subtle glow accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col gap-10 lg:gap-12">
          {/* Brand Row */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/cyrix-logo.png" alt="CYRIX" className="h-6 w-auto" />
            </div>
            <p className="text-muted-foreground text-xs font-light leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Pages Row */}
          <div>
            <h4 className="text-sm font-medium mb-4">{t("footer.pages")}</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light">
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light">
                  {t("footer.getQuote")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Row */}
          <div>
            <h4 className="text-sm font-medium mb-4">{t("footer.contactUs")}</h4>
            <div className="flex flex-col gap-2 mb-6">
              <a href={`mailto:${t("footer.email")}`} className="text-muted-foreground hover:text-foreground smooth-hover text-xs font-light flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {t("footer.email")}
              </a>
              <p className="text-muted-foreground text-xs font-light flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <SyrianFlag className="h-3 w-4 rounded-sm" />
                {t("footer.location")}
              </p>
              <p className="text-muted-foreground text-xs font-light">
                {t("footer.hours")}
              </p>
            </div>

            <a
              href="https://protfileo.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-8 text-xs font-light text-primary hover:text-primary/80 smooth-hover"
            >
              <ExternalLink className="h-3 w-3" />
              {t("footer.portfolio")}
            </a>

            <h4 className="text-sm font-medium mb-4">{t("footer.followUs")}</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/cyrix.software?stkn=eW90OGJoaGprcWdi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground smooth-hover hover:text-accent transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/share/1BXvnvjPFd" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground smooth-hover hover:text-accent transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-12 text-center text-muted-foreground text-xs font-light">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
