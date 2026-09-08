import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Inbox, Users, TrendingUp, CheckCircle, Mail, Phone, ArrowLeft, LogOut, Eye } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockInquiries, getInquiryStats } from "@/data/inquiries";
import { useServices } from "@/hooks/useServices";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

const Admin = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  const { user, loading, signOut } = useAuth();
  const [selectedService, setSelectedService] = useState("all");
  const stats = getInquiryStats();
  const services = useServices();

  useEffect(() => {
    if (!loading && !user && !isDemo) {
      navigate("/auth");
    }
  }, [loading, user, navigate, isDemo]);

  if (loading && !isDemo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground font-light">{t("admin.loading")}</p>
      </div>
    );
  }

  const filteredInquiries = selectedService === "all"
    ? mockInquiries
    : mockInquiries.filter((i) => i.serviceId === selectedService);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-primary/15 text-primary border-primary/30";
      case "in-progress":
        return "bg-accent/15 text-accent border-accent/30";
      case "closed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBudgetLabel = (budget: string) => {
    return t(`inquiry.budgets.${budget}`) || budget;
  };

  const getTimelineLabel = (timeline: string) => {
    return t(`inquiry.timelines.${timeline}`) || timeline;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-[11px] uppercase tracking-wider font-normal"
              >
                <ArrowLeft className="mr-2 h-3 w-3 rtl:rotate-180" />
                {t("admin.backHome")}
              </Button>
              {isDemo ? (
                <Badge variant="outline" className="gap-1 text-xs font-light border-primary/30 text-primary">
                  <Eye className="h-3 w-3" />
                  {t("admin.demoMode")}
                </Badge>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-[11px] uppercase tracking-wider font-normal text-destructive hover:text-destructive"
                >
                  <LogOut className="mr-2 h-3 w-3" />
                  {t("admin.signOut")}
                </Button>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
              {t("admin.title")}
            </h1>
            <p className="text-sm text-muted-foreground font-light">
              {t("admin.subtitle")}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            <Card className="p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Inbox className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-light mb-1">{stats.total}</p>
              <p className="text-xs text-muted-foreground font-light">{t("admin.totalInquiries")}</p>
            </Card>

            <Card className="p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-light mb-1">{stats.newInquiries}</p>
              <p className="text-xs text-muted-foreground font-light">{t("admin.new")}</p>
            </Card>

            <Card className="p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
              </div>
              <p className="text-2xl font-light mb-1">{stats.inProgress}</p>
              <p className="text-xs text-muted-foreground font-light">{t("admin.inProgress")}</p>
            </Card>

            <Card className="p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
              <p className="text-2xl font-light mb-1">{stats.closed}</p>
              <p className="text-xs text-muted-foreground font-light">{t("admin.closed")}</p>
            </Card>
          </motion.div>

          {/* Service Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="all" onValueChange={setSelectedService}>
              <TabsList className="mb-6 flex-wrap h-auto gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-xs font-light border border-border"
                >
                  {t("admin.allServices")}
                </TabsTrigger>
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-xs font-light border border-border"
                  >
                    {service.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedService} className="mt-0">
                <Card className="border border-border shadow-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.client")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.service")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.budget")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.timeline")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.received")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.status")}</TableHead>
                          <TableHead className="text-[11px] uppercase tracking-wider font-normal">{t("admin.contact")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInquiries.map((inquiry) => {
                          const service = services.find((s) => s.id === inquiry.serviceId);
                          return (
                            <TableRow key={inquiry.id} className="border-border">
                              <TableCell>
                                <div>
                                  <p className="text-sm font-normal">{inquiry.clientName}</p>
                                  <p className="text-xs text-muted-foreground font-light">{inquiry.id}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-light">{service?.name || inquiry.serviceId}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-light">{getBudgetLabel(inquiry.budget)}</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-light">{getTimelineLabel(inquiry.timeline)}</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-light">{format(inquiry.createdAt, "MMM d, yyyy")}</span>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`text-xs font-light capitalize ${getStatusColor(inquiry.status)}`}
                                >
                                  {inquiry.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <a
                                    href={`mailto:${inquiry.email}`}
                                    className="text-xs text-muted-foreground hover:text-primary font-light flex items-center gap-1"
                                  >
                                    <Mail className="h-3 w-3" />
                                    {inquiry.email}
                                  </a>
                                  <a
                                    href={`tel:${inquiry.phone}`}
                                    className="text-xs text-muted-foreground hover:text-primary font-light flex items-center gap-1"
                                  >
                                    <Phone className="h-3 w-3" />
                                    {inquiry.phone}
                                  </a>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-sm text-muted-foreground font-light">{t("admin.noInquiries")}</p>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
