import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { z } from "zod";

const Auth = () => {
  const { t } = useLanguage();
  const loginSchema = z.object({
    email: z.string().email(t("auth.invalidCredentials")),
    password: z.string().min(6, t("auth.genericError")),
  });

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/admin");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: t("auth.validationError"),
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast({
            title: t("auth.loginFailed"),
            description: error.message === "Invalid login credentials" 
              ? t("auth.invalidCredentials")
              : error.message,
            variant: "destructive",
          });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: t("auth.accountExists"),
              description: t("auth.alreadyRegistered"),
              variant: "destructive",
            });
          } else {
            toast({
              title: t("auth.signUpFailed"),
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: t("auth.checkEmail"),
            description: t("auth.confirmationSent"),
          });
        }
      }
    } catch {
      toast({
        title: t("auth.signUpFailed"),
        description: t("auth.genericError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/cyrix-logo.png" alt="CYRIX" className="h-5 w-auto" />
          </div>
          <h1 className="text-2xl font-light text-foreground mb-2 tracking-tight">
            {isLogin ? t("auth.login") : t("auth.signup")}
          </h1>
          <p className="text-xs text-muted-foreground font-light">
            {isLogin
              ? t("auth.loginSubtitle")
              : t("auth.signupSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[11px] uppercase tracking-wider font-normal text-muted-foreground">
              {t("auth.email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="bg-muted border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[11px] uppercase tracking-wider font-normal text-muted-foreground">
              {t("auth.password")}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className="bg-muted border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full text-[11px] uppercase tracking-wider font-normal"
          >
            {loading ? t("auth.pleaseWait") : isLogin ? t("auth.signIn") : t("auth.createAccount")}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-muted-foreground hover:text-foreground font-light transition-colors"
          >
            {isLogin ? t("auth.needAccount") : t("auth.haveAccount")}
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button
            variant="default"
            onClick={() => navigate("/admin?demo=true")}
            className="w-full rounded-full text-[11px] uppercase tracking-wider font-normal"
          >
            {t("auth.demoMode")}
          </Button>
          <button
            onClick={() => navigate("/")}
            className="text-xs text-muted-foreground hover:text-foreground font-light transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3 rtl:rotate-180" />
            {t("auth.backToSite")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
